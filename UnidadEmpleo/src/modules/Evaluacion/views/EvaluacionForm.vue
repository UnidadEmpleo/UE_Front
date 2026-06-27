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
            <form class="multisteps-form__form">
              <CardEval :sexo="asp.Sexo" :class="activeStep === 0 ? activeClass : ''"/>
              
              <div class="mt-4 d-flex justify-content-between">
                
                <MaterialButton id="next-step-button" :color="sigColor" :variant="sigVariant" :disabled="sigPaso"
                  @click.prevent="activeStep === 0 ? handleSave() : handleNextStep()">
                  {{ activeStep !== 0 ? "Continuar con su evaluacion" : "Terminar" }}
                </MaterialButton>

              </div>
            </form>
      </div>
    </div>
  </div>  
</template>

<script>

import CardEval from "../components/CardEval.vue";
import { getSexoById,calculaEdad } from "@ue/services/catalogosDbService"
import { useAspiranteStore } from "@ue/modules/Aspirante/store/useAspiranteStore";
import { useSolicitudStore } from "@ue/modules/Solicitud/store/solicitudStore";
import { useEvaluacionStore } from "../useEvaluacionStore.js";
import fotoDefault from "@/assets/img/user.png";

import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";


export default {
  name: "EvaluacionActive",
  components: {
     CardEval,
     

  },
  setup() {
    
    const solicitudStore = useSolicitudStore();
    const evalStore = useEvaluacionStore();
    const { activeStep, activeClass } = storeToRefs(evalStore); 
    const { nextStep, prevStep } = evalStore;
    const { solicitud: sol } = storeToRefs(solicitudStore);
    
    const aspiranteStore = useAspiranteStore();
    const { aspirante: asp } = storeToRefs(aspiranteStore);
    
    const router = useRouter();
    const fecha = new Date();
    
    let sigPaso = ref( true);
    let sigColor = ref('secundary');
    let sigVariant = ref('outline');
    
    let isCreateMode = sol.value.id == 0;

    const placeholder = fotoDefault;
    
    onMounted(() => {
      activeStep.value = 0;      
      console.log('EvaluacionForm   '+evalStore.sexo +'  '+ asp.value.Sexo)
    });
    
   
    const navigateToList = () => {
      aspiranteStore.resetSelectedAspirante();
      evalStore.resetAll();
      solicitudStore.resetSelectedSolicitud();
      activeStep.value = 0;
      router.push({ name: "EvaluacionList" });
    }

    const handleSave = () => {
        router.push({ name: "EvaluacionList" }); // DE AQUI SE VA A LA PAGINA DE EVALUAR
    }

    const verifyData = () => {
      if (validateStep()) {
        let result = false;
        if (isCreateMode && sol.value.id == 0){
          sol.value.fechaSolicitud = fecha.getFullYear()+'-'+(fecha.getMonth() + 1).toString().padStart(2, '0')+'-'+fecha.getDate().toString().padStart(2, '0')
          result = solicitudStore.createSolicitud();
        }
        else result =  solicitudStore.updateSolicitud();
        
        if (result){
          sigColor.value = 'primary';
          sigVariant.value = 'gradient';
          sigPaso.value = false;
          console.log(sigColor.value+'  '+sigVariant.value+ ' '+sigPaso.value)
        }
      }
    }
      

    const setActiveStep = () => {
      if (validateStep()) {
        nextStep();
      }
    };

    const handlePrevStep = ()=>{
      prevStep()
    }

    const handleNextStep = () => {
      if (validateStep()) {
        if (activeStep.value === 0){
            
            nextStep();

        }else if (activeStep.value === 1){
           nextStep();
        }
      }
    };

    const validateStep = () => {
      let isValid = true;
      return isValid;
    };

    const nodeWasClicked = () => {
      alert("Node clicked");
    };

    return {
      activeStep,activeClass,
      nextStep,handlePrevStep,
      isCreateMode,handleNextStep,
      handleSave,setActiveStep,
      navigateToList,nodeWasClicked,
      asp,sol,placeholder,
      calculaEdad,getSexoById,
      fecha,verifyData,sigPaso,sigColor,sigVariant
      
    };
  },
};
</script>
