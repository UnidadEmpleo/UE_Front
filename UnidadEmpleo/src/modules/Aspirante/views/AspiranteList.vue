<template>
  <div class="container-fluid py-4">

    <div class="text-uppercase h3 mt-4 text-center font-weight-bolder text-dark"
      style="letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
      Gestión de Aspirantes
    </div>

    <div class="d-sm-flex justify-content-end ">
      <div class="me-4">
        <material-button v-permiso="'Usuarios.Agregar'" color="primary" variant="gradient" @click="navigateToCreate"
          class="d-flex align-items-center">
          <i class="material-icons-round me-2">person_add</i>
          Nuevo Aspirante
        </material-button>
      </div>
    </div>


    
      
      <div class="card ">
        <div class="row container-fluid mt-3 ">
              <div class="col-sm-3">
                <label for="CuerpoId" class="form-label">Cuerpo</label>
                <select id="CuerpoId" class="form-control" placeholder="Selecciona el cuerpo" 
                :disabled = "itmesStore.cuerpoEnable" v-model="options.cuerpoId" @click="availableRegiones">
                  <option v-for="row in rowsCuerpo" :key="row.id" :value="row.id" >
                    {{ row.alias }}
                  </option>
                </select>
              </div>
              <div class=" col-sm-3">
                <label for="AreaId" class="form-label">Gerencia o Región</label>
                <select id="AreaId" class="form-control" placeholder="Selecciona el cuerpo" :disabled="itmesStore.regionEnable" v-model="options.regionId">
                  <option v-for="row in regionesLista" :key="row.id" :value="row.id">
                    {{ row.region }}
                  </option>
                </select>
              </div>
              <div class=" col-sm-3">
                <label for="situacionId" class="form-label">Situacion</label>
                <select id="situacionId" class="form-control" placeholder="Selección de situación" :disabled="itmesStore.situacionEnable" v-model="options.situacion">
                  <option v-for="row in situacionesLista" :key="row.id" :value="row.id">
                    {{ row.name }}
                  </option>
                </select>
              </div>
            <div class="form-group button-group col-sm-3 mt-auto mb-auto">
              <material-button color="warning" variant="gradient" size="sm" @click="filtrar" class="me-2" v-permiso="'Grupos.Editar'">
                Buscar
              </material-button>
              
            </div>
          </div>
          
      </div>


    
    <!-- DataTable Component -->
    <DataTable 
      title="Aspirantes"
      description="Lista de Aspirantes"
      table-id="aspirante-table"
      :columns="columns"
      :rows="rowsAspirantes"
      :searchable="true"
      :loadingProgress="loadingProgress"
    >
      <!-- Custom Row Actions -->
      <template #row-actions="{ row }">
        <div>
          
        </div>
        <material-button color="primary" variant="gradient" size="sm" @click="handleUpdate(row)" class="me-2" v-permiso="'Grupos.Editar'">
          Actualizar
        </material-button>

        <material-button color="secondary" variant="gradient" size="sm" @click="openModalEvaluaciones(row)" class="me-2" v-permiso="'Grupos.Editar'">
          Solicitudes {{ row.Solicitudes }}
        </material-button>

      </template>
    </DataTable>


    <ModalEvaluacionesAspirante
    :visible="modVisible"
    :title="Evaluaciones"
    @update:completo="v => closeModEvaluacion()"
    @close="modVisible = false"
  />

  </div>
</template>

<script>
import DataTable from "@/components/widgets/DataTable.vue";
import MaterialButton from "@/components/common/MaterialButton.vue";
import MaterialComboBox from "@/components/common/MaterialComboBox.vue";
import { useAspiranteStore } from "@ue/modules/Aspirante/store/useAspiranteStore";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useCuerpoStore } from "@ue/modules/Cuerpo/useCuerpoStore";
import { getSituacionAspirante } from "@ue/services/catalogosDbService"

import ModalEvaluacionesAspirante from "../../Evaluacion/components/ModalEvaluacionesAspirante.vue";
import { useSolicitudStore } from '../../Solicitud/store/solicitudStore';
export default {
  name: "AspirantesList",
  components: {
    DataTable,
    MaterialButton,ModalEvaluacionesAspirante
  },
  setup() {
    const itmesStore = useAspiranteStore();
    const { rowsAspirantes, columns, loadingProgress } = storeToRefs(itmesStore);
    const cuerpoStore = useCuerpoStore();
    let { rowsCuerpo } = storeToRefs(cuerpoStore); 
    let regionesLista =  ref([]);
    const { options } = storeToRefs(itmesStore);
    
    
    const situacionesLista = getSituacionAspirante();

    const router = useRouter();
    const navigateToCreate = () => {
      itmesStore.resetSelectedAspirante();
      router.push({ name: "AspiranteForm" });
    };

    const handleUpdate = async (row) => {      
      itmesStore.aspirante = { ...row };
      await itmesStore.fetchAspiranteByCurp(row.CURP, row.Cuerpo, row.Region);
      router.push({ name: "AspiranteForm" });
    };

    const handleDelete = (row) => {
      if (confirm(`¿Estás seguro de que deseas eliminar el aspirante "${row.nombre}"?`)) {
        itmesStore.deleteAspirante(row.id);
      }
    };

    onBeforeMount(async () => {
      itmesStore.setRecurso();
      cuerpoStore.fetchCuerpoTodo();      
      availableRegiones();
      await itmesStore.fetchAspirantes();
    });

    const availableRegiones = () => {
        let existe = false;
        for (var i = 0; i<rowsCuerpo.value.length; i++){
          if (rowsCuerpo.value[i].id === options.value.cuerpoId){// cuperoSeleccionado.value){
           regionesLista.value = [];
           regionesLista.value =  rowsCuerpo.value[i].regiones
           
           regionesLista.value.find((e) => 
           {
            if (e.id == -1){
              existe = true;
            }
          })
          if (!existe)
            regionesLista.value.unshift({id:-1, region:"TODOS"});
          } 
        }
        
    }


    const filtrar = (async () =>{
      await itmesStore.fetchAspirantes();
    })


    //modal evaluaciones por aspirante
    const modVisible = ref(false)
    const solicitudStore = useSolicitudStore()
    function openModalEvaluaciones(row){
      solicitudStore.fetchSolicitudesPorAspirante(row.CURP)
      modVisible.value = true;
    } 

    function closeModEvaluacion(){
      modVisible.value = false;
    }
    
    return {
      rowsAspirantes,
      columns,
      loadingProgress,
      navigateToCreate,
      handleUpdate,
      handleDelete,
      rowsCuerpo,
      regionesLista,
      situacionesLista,
      MaterialComboBox,
      options,
      availableRegiones,
      filtrar,itmesStore,
      openModalEvaluaciones,closeModEvaluacion,modVisible

    };
  },
};
</script>