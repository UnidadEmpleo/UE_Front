<template>
  <div class="py-4 container-fluid">
    <div class="d-sm-flex justify-content-between">
      <material-button color="primary" variant="gradient" @click="navigateToList">Regresar</material-button>
    </div>

    <div class="row ">
      <div class=" m-auto">
                <h3 class=" mb-0 text-center">
                Evaluaciones
                </h3>
      </div>
      <div class="card ">
              <div class="row container-fluid ">
                  <label  class="form-label font-weight-bolder col-sm-9">INFORMACIÓN DEL ASPIRANTE</label>
                  <label  class="form-label font-weight-bolder col-sm-2">Fecha: {{ fecha.toLocaleDateString() }}</label>
              </div>
                
             <div class="row container-fluid mb-1">
                <div class="col-sm-1 mb-auto mt-auto">
                    <div class="avatar avatar-xl position-relative">
                        <img :src="placeholder" alt="Ver detalle" class="shadow-sm avatar-img"  />
                    </div>
                </div>
                <div class="col-sm-11 container-fluid mb-1">
                  <div class="container-fluid ">
                    <label  class="form-label font-weight-bolder col-sm-auto">Apellido Paterno: </label><label  class="form-label  col-sm-2">{{ asp.Apellido_Paterno }}</label>
                    <label  class="form-label font-weight-bolder col-sm-auto">Apellido Materno: </label><label  class="form-label  col-sm-2">{{ asp.Apellido_Materno }}</label>
                    <label  class="form-label font-weight-bolder col-sm-auto">Nombre: </label><label  class="form-label  col-sm-2">{{asp.Nombre}}</label>
                    <label  class="form-label font-weight-bolder col-sm-auto">Sexo: </label><label  class="form-label  col-sm-1">{{getSexoById(asp.Sexo) }}  {{ asp.Sexo }}</label>                  </div>
                  <div class="container-fluid ">
                    <label  class="form-label font-weight-bolder col-sm-auto">CURP: </label><label  class="form-label  col-sm-2">{{ asp.Curp }}</label>
                    <label  class="form-label font-weight-bolder col-sm-auto">RFC: </label><label  class="form-label  col-sm-2">{{ asp.Rfc }}</label>
                    <label  class="form-label font-weight-bolder col-sm-auto">Fecha de Nacimiento: </label><label  class="form-label  col-sm-2">{{ asp.Fecha_Nacimiento }}</label>
                    <label  class="form-label font-weight-bolder col-sm-auto">Edad: </label><label  class="form-label  col-sm-1">{{ calculaEdad(asp.Fecha_Nacimiento) }} años</label>
                  </div>
                  
                </div>
              </div>
          
      </div>
    </div>
    <div class="card ">
      <div class="col-sm-11 container-fluid mb-1">
        <div class="container-fluid ">
          <label  class="form-label font-weight-bolder col-sm-auto">No Prealta: </label><label  class="form-label  col-sm-2">{{ sol.id }}</label>
          <label  class="form-label font-weight-bolder col-sm-auto">Documentación completa: </label><label  class="form-label  col-sm-2">{{ sol.statusExp=='true'? 'Sí': 'No' }}</label>
          <label  class="form-label font-weight-bolder col-sm-auto">Revalorable: </label><label  class="form-label  col-sm-2">{{ sol.revalorable=='true'? 'Sí': 'No' }}</label>
          <label  class="form-label font-weight-bolder col-sm-auto">Situación: </label><label  class="form-label  col-sm-2">{{getStatusSolicitudById(sol.status)}}</label>          
        </div>                  
      </div>
    </div>
          
    <div class="row ">
      <div class="card">
            <div class="card-header p-1 position-relative mt-n1 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3"            >
                <div class="multisteps-form__progress">
                  <button class="multisteps-form__progress-btn" type="button" title="Información de la solicitud">
                    <span>Registro</span>
                  </button>
                  <button class="multisteps-form__progress-btn" type="button" title="Información de la solicitud">
                    <span>Psicología</span>
                  </button>
                  <button class="multisteps-form__progress-btn" type="button" title="Información de la solicitud">
                    <span>Examen Médico</span>
                  </button>
                  <button class="multisteps-form__progress-btn" type="button" title="Referencias">
                    <span>Antidoping</span>
                  </button>
                  <button class="multisteps-form__progress-btn" type="button" title="Referencias">
                    <span>PIE</span>
                  </button>
                </div>
              </div>
            </div>
      </div>

      <div class="card-body">
            <form class="row flex justify-content-center">
             
                <div class="col-sm-4" v-for="(item, index) in rowsEvaluaciones" :key="index">                  
                    <CardEval 
                    :disabledData="(item.nombreUsuarioEvaluo=='' )? false:item.tipoEvaluacion == 1? false:true" 
                    :tipo="item.tipoEvaluacion" 
                    :valor="item"
                    @addEvaluation="agregarEvaluacion"/>                    
                </div>
      
              <div class="mt-4 d-flex justify-content-between">                
                <MaterialButton id="next-step-button" :color="sigColor" :variant="sigVariant" :disabled="sigPaso"
                  @click.prevent="handleSave()">
                  Terminar
                </MaterialButton>
              </div>
           
            </form> 
      </div>
    </div>
    
  </div>  
</template>

<script>

import CardEval from "../components/CardEval.vue";
import { getSexoById,calculaEdad,getStatusSolicitudById } from "@ue/services/catalogosDbService"
import { useAspiranteStore } from "@ue/modules/Aspirante/store/useAspiranteStore";
import { useEvaluacionStore } from "../useEvaluacionStore.js";
import fotoDefault from "@/assets/img/user.png";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useSolicitudStore } from "@ue/modules/Solicitud/store/solicitudStore";
import MaterialButton from "../../../../../src/components/common/MaterialButton.vue";

export default {
  name: "EvaluacionActive",
  components: {
     CardEval,MaterialButton
  },
  setup() {        
    const solicitudStore = useSolicitudStore();
    const evalStore = useEvaluacionStore();
    
    const { rowsEvaluaciones } = storeToRefs(evalStore);     
    const aspiranteStore = useAspiranteStore();
    const { aspirante: asp } = storeToRefs(aspiranteStore);    
    const { solicitud:sol } = storeToRefs(solicitudStore);
    const router = useRouter();
    const fecha = new Date();    
    const placeholder = fotoDefault;
    const solicitudId = ref(null)
    const tipoEvaluacion = ref(null)

    onMounted(() => {      
      evalStore.setRecurso()            
    });

    function agregarEvaluacion(data) {
      evalStore.initEvaluacion(data.solicitudId,data.tipoEvaluacion)
    }
   
    const navigateToList = () => {
      aspiranteStore.resetSelectedAspirante();
      evalStore.resetAll();
      solicitudStore.resetSelectedSolicitud();      
      router.push({ name: "EvaluacionList" });
    }

    const handleSave = () => {
        router.push({ name: "EvaluacionList" }); // DE AQUI SE VA A LA PAGINA DE EVALUAR
    }


    return {      
      handleSave,
      navigateToList,
      asp,placeholder,
      calculaEdad,getSexoById,
      fecha
      ,rowsEvaluaciones
      ,solicitudId,tipoEvaluacion,agregarEvaluacion
      ,sol,getStatusSolicitudById
    };
  },
};
</script>

<style scoped>
.eval {
    display: flex;      /* Coloca los hijos en horizontal */
    list-style: none;   /* Elimina los puntos */
    padding: 0;
    margin: 0;
    gap: 20px;          /* Espacio entre elementos */
}

.eval li {
    padding: 10px 20px;
    background-color: rgba(243, 245, 230, 0.6);
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.eval li:hover {
     background-color: rgba(160, 158, 158, 0.6);
}

</style>