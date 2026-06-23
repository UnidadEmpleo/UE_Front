<template>
  <div class="py-4 container-fluid">

    <div class="d-sm-flex justify-content-between">
      <div>
        <material-button color="primary" variant="gradient" @click="navigateToList">
          Regresar
        </material-button>
      </div>
    </div>

    <div class="row min-vh-10">
      <div class="col-lg-8 col-md-10 col-12 m-auto">
        <h3 class="mt-3 mb-0 text-center">{{ isCreateMode ? "Crear Nuevo " : "Editar " }} Aspirante</h3>
        <p class="lead font-weight-normal opacity-8 mb-7 text-center">
          Rellena los campos para {{ isCreateMode ? "AGREGAR un nuevo XXXX " : "EDITAR el " }} Aspirante
        </p>
        <div class="card">         
           <div class="card-header p-0 position-relative mt-n5 mx-3 z-index-2">
            <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <div class="multisteps-form__progress">

                <button class="multisteps-form__progress-btn" type="button" title="Información del Aspirante">
                    <span>Información del aspirante</span>
                </button>
                
                <button class="multisteps-form__progress-btn" type="button" title="direccion">
                    <span>Direccion</span>
                </button>
              </div>
            </div>
          </div>
          <div class="card-body">
            <form class="multisteps-form__form">
              
              <AspiranteGeneral :class="activeStep === 0 ? activeClass : ''" />
              <AspiranteAddress :class="activeStep === 1 ? activeClass : ''" />
              
              <div class="mt-4 d-flex justify-content-between">
              
                <MaterialButton
                  id="prev-step-button"
                  color="secondary"
                  variant="outline"
                  :disabled="activeStep === 0"
                  @click.prevent="prevStep"
                >
                  Anterior
                </MaterialButton>
               
                <MaterialButton
                  id="next-step-button"
                  color="primary"
                  variant="gradient"
                  @click.prevent="activeStep === 1 ? handleSave() : handleNextStep()"
                >
                {{ activeStep === 1 ? "Guardar e iniciar solicitud" : "Siguiente" }}
                </MaterialButton>
              </div> 

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MaterialButton from "@/components/common/MaterialButton.vue";
import AspiranteGeneral from "../components/AspiranteGeneral.vue";
import AspiranteAddress from "../components/AspiranteAddress.vue";
import { useAspiranteStore } from "@ue/modules/Aspirante/store/useAspiranteStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMainStore } from '@/store/useMainStore' 
import { onMounted } from "vue";
 
export default {
  name: "AspiranteCreate",
  components: {
    AspiranteGeneral,
    AspiranteAddress,
   // AreasTreeView,
    MaterialButton,
  },
      setup() {
        const aspiranteStore = useAspiranteStore();
        const { activeStep, activeClass } = storeToRefs(aspiranteStore); // Use storeToRefs for reactivity
        const { nextStep, prevStep } = aspiranteStore;
        const mainStore = useMainStore();
        const router = useRouter();        
        const isCreateMode = aspiranteStore.aspirante.Curp =='';
        
        onMounted(() => {
          activeStep.value = 0;
        });

        const navigateToList = () => {
            aspiranteStore.resetSelectedAspirante(); 
            activeStep.value = 0;
            router.push({ name: "AspirantesList" });
          };
          
        const handleSave = () => {
          if (validateStep()) {
            save();
          }
        };
        const save = async () => {
            
              let result;
              console.log('isCreateMode = '+ isCreateMode.value +' '+ isCreateMode)
              if (isCreateMode) 
                result =  await aspiranteStore.createAspirante();             
              else 
                result = await aspiranteStore.updateAspirante();  

              if(result)
                router.push({ name: "SolicitudForm" }); 
            
            
        };



        const setActiveStep= () => {
          if (validateStep()) {
            nextStep();
          }
        };
        const handleNextStep = () => {
          if (validateStep()) {
            nextStep();
          }
          
        };


        const validateStep = () => {
          let isValid = true;
          // AGREGAR LOS CAMPOS DE CUERPO, REGION Y SITUACION
          aspiranteStore.aspirante.IdCuerpoCaptura = mainStore.userdata.cuerpoId
          aspiranteStore.aspirante.IdRegionCaptura = mainStore.userdata.regionId
          aspiranteStore.aspirante.Situacion = 1


          if (activeStep.value === 0) {
          // Validar campos del paso 1 (Información de Usuarios)

            if(!aspiranteStore.aspirante.Curp) {  

              isValid = false;       
              mainStore.triggerAlert({message: "Capture el CURP",
                color: "warning",icon: "warning",});
              return isValid;    
            }
          
            if(!aspiranteStore.aspirante.Rfc) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el Rfc",
                color: "warning",icon: "warning",});
              return isValid;    
            }

            if(!aspiranteStore.aspirante.Nombre) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el Nombre",
                color: "warning",icon: "warning",});
              return isValid;    
            }   
          
              if(aspiranteStore.aspirante.Sexo < 0) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Seleccione el sexo",
                    color: "warning",icon: "warning",});
                  return isValid;    
                }  

              if(aspiranteStore.aspirante.TelefonoCelular != null ){
                  if(aspiranteStore.aspirante.TelefonoCelular.length < 10){
                    isValid = false; 
                    mainStore.triggerAlert({message: "El telefono debe tener al menos 10 caracteres.",
                    color: "warning", icon: "warning",});
                  return isValid;    
                  }
                }

                if(aspiranteStore.aspirante.Estado_Civil < 0) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Seleccione el Estado Civil",
                    color: "warning",icon: "warning",});
                  return isValid;    
                }  

                if(aspiranteStore.aspirante.Grado_Escolaridad < 0) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Seleccione el Grado de Escolaridad",
                    color: "warning",icon: "warning",});
                  return isValid;    
                }  
                
                if(aspiranteStore.aspirante.EscolaridadConcluidaTrunca < 0) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Seleccione si concluyo o no",
                    color: "warning",icon: "warning",});
                  return isValid;    
                }  

                if(!aspiranteStore.aspirante.DocumentoAcreditaEscolaridad) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Indique el documento que acredita la escolaridad",
                    color: "warning",icon: "warning",});
                  return isValid;    
                }
              
        } else if (activeStep.value === 1) {
          
          
              if(!aspiranteStore.aspirante.Calle) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture la Calle",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }   
              if(!aspiranteStore.aspirante.numero) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture el numero",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!aspiranteStore.aspirante.EntreCalles) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture EntreCalles",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!aspiranteStore.aspirante.TipoAsentamiento) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Indique el tipo de colonia",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!aspiranteStore.aspirante.Pais) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture el Pais",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!aspiranteStore.aspirante.CodigoPostal) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture el CodigoPostal",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!aspiranteStore.aspirante.Estado) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture el Estado",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!aspiranteStore.aspirante.Municipio) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture el Municipio",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!aspiranteStore.aspirante.Colonia) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture la Colonia",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!aspiranteStore.aspirante.latitud) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Latitud falta",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!aspiranteStore.aspirante.longitud) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Longitud falta",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }


        }
        return isValid;
        };

        const nodeWasClicked = () => { alert('Node clicked')}

    return {
      activeStep,
      activeClass,
      nextStep,
      prevStep,
      isCreateMode,
      handleNextStep,
      handleSave,
      setActiveStep,
      navigateToList,
      nodeWasClicked,
    };
  },
};
</script>
