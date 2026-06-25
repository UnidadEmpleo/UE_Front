<template>
  <div class="container-fluid py-4">
    
    
    
    <div class="card ">
        <div class="row container-fluid mt-3 ">
              <div class="col-sm-3">
                <label for="CuerpoId" class="form-label">Cuerpo</label>
                <select id="CuerpoId" class="form-control" placeholder="Selecciona el cuerpo" 
                :disabled = "solicitudStore.cuerpoEnable" v-model="options.cuerpoId" @click="availableRegiones()">
                  <option v-for="row in rowsCuerpo" :key="row.id" :value="row.id" >
                    {{ row.alias }}
                  </option>
                </select>
              </div>
              <div class=" col-sm-3">
                <label for="AreaId" class="form-label">Gerencia o Región</label>
                <select id="AreaId" class="form-control" placeholder="Selecciona el cuerpo" :disabled="solicitudStore.regionEnable" v-model="options.regionId">
                  <option v-for="row in regionesLista" :key="row.id" :value="row.id">
                    {{ row.region }}
                  </option>
                </select>
              </div>
              
              <div class="col-sm-3 mb-2">
                <MaterialInput id="f_inico" type="date" label="Fecha de Inicio" v-model="options.fechaInicio"/>
                <div class="mt-2">
                  <MaterialInput id="f_termino" type="date" label="Fecha de termino" v-model="options.fechaFinal"/>
                </div>
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
      title="Evaluando"
      description="Lista de personal en examenes"
      table-id="evaluacion-table"
      :columns="columns"
      :rows="rowsSolicitudes"
      :searchable="true"
      :loadingProgress="loadingProgress"
    >
      <!-- Custom Row Actions -->
      <template #row-actions="{ row }">
        <div>
          
        </div>
        <material-button
         color="primary"
          variant="gradient"
          size="sm"
          @click="handleEvaluar(row)"
          class="me-2"
          v-permiso="'Grupos.Editar'">
          Evaluar
        </material-button>
        
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "@/components/widgets/DataTable.vue";
import MaterialButton from "@/components/common/MaterialButton.vue";
import MaterialInput from "@/components/common/MaterialInput.vue";
import { useSolicitudStore } from "@ue/modules/Solicitud/store/solicitudStore";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useCuerpoStore } from "@ue/modules/Cuerpo/useCuerpoStore";
import { useAspiranteStore } from "../../Aspirante/store/useAspiranteStore";
import { useEvaluacionStore } from "../useEvaluacionStore";
import { getStatusSolicitud } from "../../../services/catalogosDbService";
export default {
  name: "SolicitudesList",
  components: {
    DataTable,
    MaterialButton,MaterialInput
  },
  setup() {
    const solicitudStore = useSolicitudStore();
    const aspiranteStore = useAspiranteStore();
    const evalStore = useEvaluacionStore();
    const { rowsSolicitudes, columns, loadingProgress } = storeToRefs(solicitudStore);
    const router = useRouter();
    const { options } = storeToRefs(solicitudStore);
    const cuerpoStore = useCuerpoStore();
    let { rowsCuerpo } = storeToRefs(cuerpoStore); 
    let regionesLista =  ref([]);
    const statusLista = getStatusSolicitud();

    const navigateToCreate = () => {
      solicitudStore.resetSelectedSolicitud();
      router.push({ name: "SolicitudForm" });
    };

    const handleEvaluar = async (row) => {
      aspiranteStore.verifyAspiranteByCurp(row.Curp)
      evalStore.solicitudId = row.id
      evalStore.sexo = row.sexoid
      //evalStore.fetchEvaluaciones(row.id)
      solicitudStore.fetchSolicitudById(row.id)
      console.log('aspiorante ' +aspiranteStore.aspirante.Sexo)
      router.push({ name: "EvaluacionForm" });
    };

    const handleDelete = (row) => {
      if (confirm(`¿Estás seguro de que deseas eliminar la solicitud "${row.nombre}"?`)) {
        //itmesStore.deleteAspirante(row.id);
      }
    };

    const filtrar = async () =>{
      await solicitudStore.fetchRowsByOptions();
    }
    onBeforeMount(async () => {
      solicitudStore.setRecurso(2);
      options.situacion = 2;
      cuerpoStore.fetchCuerpoTodo();
      availableRegiones();
      await solicitudStore.fetchRowsByOptions();
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

    return {
      rowsSolicitudes,
      columns,
      loadingProgress,
      navigateToCreate,
      handleEvaluar,
      handleDelete,
      
      //consultas
      filtrar,
      solicitudStore,options,rowsCuerpo,
      regionesLista,availableRegiones,statusLista
    };
  },
};
</script>