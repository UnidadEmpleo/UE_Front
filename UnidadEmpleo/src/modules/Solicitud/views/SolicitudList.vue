<template>
  <div class="container-fluid py-4">

    <div class="text-uppercase h3 mt-4 text-center font-weight-bolder text-dark"
      style="letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
      Gestión de Solicitudes de Aspirantes
    </div>

    <div class="d-sm-flex justify-content-end ">
      <div class="me-4">
        <material-button v-permiso="'Usuarios.Agregar'" color="primary" variant="gradient" @click="navigateToCreate"
          class="d-flex align-items-center">
          <i class="material-icons-round me-2">person_add</i>
          Nueva Solicitud
        </material-button>
      </div>
    </div>


    <div class="card ">
        <div class="row container-fluid mt-3 ">
              <div class="col-sm-3">
                <label for="CuerpoId" class="form-label">Cuerpo</label>
                <select id="CuerpoId" class="form-control" placeholder="Selecciona el cuerpo" 
                :disabled = "itmesStore.cuerpoEnable" v-model="options.cuerpoId" @click="availableRegiones()">
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
                <label for="situacionId" class="form-label">Estatus</label>
                <select id="situacionId" class="form-control" placeholder="Selección de situación" :disabled="itmesStore.situacionEnable" v-model="options.situacion">
                  <option v-for="row in statusLista" :key="row.id" :value="row.id">
                    {{ row.name }}
                  </option>
                </select>
              </div>
              <div class="col-sm-3 mb-2">
                <MaterialInput id="f_inico" type="date" label="Fecha de Inicio" v-model="options.fechaInicio"/>
                <div class="mt-2">
                  <MaterialInput id="f_termino" type="date" label="Fecha de termino" v-model="options.fechaFinal"/>
                </div>
                {{ options.fechaInicio }}-{{ options.fechaFinal }}
              </div>
            <div class="form-group button-group col-sm-3 mt-auto mb-auto">
              <material-button color="warning" variant="gradient" size="sm" @click="filtrar" class="me-2" >
                Buscar
              </material-button>
              
            </div>
          </div>
          
      </div>

    <!-- DataTable Component -->
    <DataTable
      title="Solicitudes"
      description="Lista de Solicitudes"
      table-id="solicitud-table"
      :columns="columns"
      :rows="rowsSolicitudes"
      :searchable="true"
      :loadingProgress="loadingProgress"
    >
      <!-- Custom Row Actions -->
      <template #row-actions="{ row }">
        <div>
          
        </div>
        <material-button color="primary" variant="gradient"
          size="sm" @click="handleUpdate(row)"
          class="me-2" v-permiso="'Grupos.Editar'">
          Actualizar
        </material-button>
        
        <material-button color="secundary" variant="gradient"
          size="sm" @click="printSolicitud(row)"
          class="me-2" v-permiso="'Grupos.Editar'">
          pdf
        </material-button>

      </template>
    </DataTable>

  <PdfContainer
    :visible="pdfVisible"
    :IdSolicitud="idSolicitud"
    :curp:="curpSelected"
    @update:completo="v => closePdfView(v)"
    @close="pdfVisible = false"
  />


  </div>


</template>

<script>
import DataTable from "@/components/widgets/DataTable.vue";
import MaterialButton from "@/components/common/MaterialButton.vue";
import MaterialInput from "@/components/common/MaterialInput.vue";
import { useSolicitudStore } from "@ue/modules/Solicitud/store/solicitudStore";
import { useReferenciaStore } from "@ue/modules/Referencia/useReferenceStore";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useCuerpoStore } from "@ue/modules/Cuerpo/useCuerpoStore";
import { useAspiranteStore } from "../../Aspirante/store/useAspiranteStore";
import { getStatusSolicitud } from "../../../services/catalogosDbService";
import PdfContainer from "./PdfContainer.vue";
export default {
  name: "SolicitudesList",
  components: {
    DataTable,
    MaterialButton,MaterialInput,PdfContainer
  },
  setup() {
    const itmesStore = useSolicitudStore();
    const referenceStore = useReferenciaStore();
    const { rowsSolicitudes, columns, loadingProgress } = storeToRefs(itmesStore);
    const router = useRouter();
    const { options } = storeToRefs(itmesStore);
    const cuerpoStore = useCuerpoStore();
    let { rowsCuerpo } = storeToRefs(cuerpoStore); 
    let regionesLista =  ref([]);
    let idSolicitud =  ref([]);
    let curpSelected =  ref([]);    
    const pdfVisible = ref(false)
    const statusLista = getStatusSolicitud();
    const aspiranteStore = useAspiranteStore();
    

    const navigateToCreate = () => {
      itmesStore.resetSelectedSolicitud();
      referenceStore.resetReferencia4new();
      router.push({ name: "SolicitudForm" });
    };

    const printSolicitud = async (row)=>{     
      idSolicitud.value = row.id
      curpSelected.value = row.Curp
      console.log('curp  '+curpSelected.value)
      pdfVisible.value = true      
    }
    
    function closePdfView() {    
      
      pdfVisible.value = false      
      
    }
  

    const handleUpdate = async (row) => {
      itmesStore.aspirante = { ...row };    
      await itmesStore.fetchSolicitudById(row.id);
      aspiranteStore.verifyAspiranteByCurp(row.Curp) 
      router.push({ name: "SolicitudForm" });
    };

    const filtrar = async () =>{
      console.log('Filtrar SolicitudList'+options.value.cuerpoId)
      //await itmesStore.fetchSolicitudesPorAreaYPeriodo(options.cuerpoId, options.regionId, options.fechaInicio, options.fechaFin, options.status);
      await itmesStore.fetchRowsByOptions();
    }
    onBeforeMount(async () => {
      cuerpoStore.fetchCuerpoTodo();
      itmesStore.setRecurso();
      await itmesStore.fetchRowsByOptions();
      availableRegiones();
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
      handleUpdate,
      //consultas
      filtrar,
      itmesStore,options,rowsCuerpo,
      regionesLista,availableRegiones,statusLista,
      printSolicitud, idSolicitud,pdfVisible,closePdfView,curpSelected
    };
  },
};
</script>