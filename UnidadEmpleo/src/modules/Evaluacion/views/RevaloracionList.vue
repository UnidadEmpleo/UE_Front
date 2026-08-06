<template>
  <div class="container-fluid py-4">

    <div class="text-uppercase h3 mt-4 text-center font-weight-bolder text-white bg-gradient-primary"
      style="letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
      Revaloraciones
    </div>
     
      <div class="card ">
        <div class="card-body">
            <h5 class="card-title">Datos de busqueda</h5>

            <div class="row container-fluid mt-3 ">
              <div class=" col-sm-3 ">        
                <MaterialInput id="curp" type="text" label="CURP" name="CURP" 
                                        placeholder="Ingrese la CURP"                                         
                                        v-model="curp"
                                        @input="curp = curp.toUpperCase()"
                                        @change="getCurpQr()"
                                    />
              </div>
            <div class="form-group button-group col-sm-3 mt-auto mb-auto">
              <material-button color="warning" variant="gradient" size="sm" @click="filtrar" class="me-2" >
                Buscar
              </material-button>              
            </div>
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

        <material-button color="primary" variant="gradient" size="sm" @click="handleEvaluar(row)" class="me-2" v-permiso="'Grupos.Editar'">
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
import { useAspiranteStore } from "../../Aspirante/store/useAspiranteStore";
import { useEvaluacionStore } from "../useEvaluacionStore";

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
   
    const { rowsSolicitudes, columns } = storeToRefs(solicitudStore);
    const router = useRouter();
    const { options } = storeToRefs(solicitudStore);
    const curp = ref('')

    const handleEvaluar = async (row) => {
      aspiranteStore.verifyAspiranteByCurp(row.Curp)
      evalStore.solicitudId = row.id
      evalStore.sexo = row.sexoid
      evalStore.rowsEvaluaciones = []
      
      if (options.value.perfilId == 1 || options.value.perfilId == 2 || options.value.perfilId == 3)
        evalStore.fetchEvaluaciones(row.id, row.sexoid)
      else if (options.value.perfilId == 4) // psicologia
        evalStore.fetchTipoEvaluacion(row.id, 3,0)
      else if (options.value.perfilId == 5) // medico
        evalStore.fetchTipoEvaluacion(row.id, 2,0)
      else if (options.value.perfilId == 6){ // antidoping
        if (!evalStore.sexo)  
          evalStore.fetchTipoEvaluacion(row.id, 4,5)
        else
          evalStore.fetchTipoEvaluacion(row.id, 4,0)
      }
      solicitudStore.fetchSolicitudById(row.id)

      router.push({ name: "EvaluacionForm" });
    };
   
    const filtrar = async () =>{
      console.log('Filtrando '+curp.value)
      await solicitudStore.fetchRowsRevaloracion(curp.value);
    }
    onBeforeMount(async () => {      
      solicitudStore.resetSelectedSolicitud()
      solicitudStore.setRecurso();      
      await solicitudStore.fetchRowsRevaloracion(curp.value);
    });

    const getCurpQr = async () =>{        
      try{          
          curp.value = curp.value.substring(0, 18)          
      }catch(e){console.log('Todo fallo '+e)}
    }

    return {
      rowsSolicitudes,
      columns,      
      handleEvaluar,      
      //consultas
      filtrar,
      curp,
      getCurpQr
      
    };
  },
};
</script>