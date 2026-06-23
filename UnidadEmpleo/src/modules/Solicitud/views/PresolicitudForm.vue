<template>
    <div class="py-4 container-fluid">
        <div class="d-sm-flex justify-content-between">
            <material-button color="primary" variant="gradient" @click="navigateToList">Regresar</material-button>
        </div>

        <div class="row ">
            <div class=" m-auto">
                <h3 class=" mb-0 text-center">
                {{    isCreateMode ? "Nueva " : "Editar " }} solicitud 
                </h3>
                <p class="lead font-weight-normal opacity-8 mb-0 text-center">
                    Rellena los campos para {{ isCreateMode ? "AGREGAR una nueva " : "EDITAR la " }} solicitud
                </p>
            </div>
            <div class="card ">
              <div class="row container-fluid ">
                  <label  class="form-label font-weight-bolder col-sm-9">INFORMACIÓN DEL ASPIRANTE</label>
                  <label  class="form-label font-weight-bolder col-sm-2">Fecha: {{ fecha.toLocaleDateString() }}</label>
              </div>
                
             <div class="row container-fluid mb-1">
                <div class="col-sm-1 mb-auto mt-auto">
                    <div class="avatar avatar-xl position-relative">
                        <img :src="placeholder" alt="Ver detalle" class="shadow-sm avatar-img" @click="navigateToView" />
                    </div>
                </div>
                <div class="col-sm-3 mt-4">
                    <MaterialInput id="curp" type="text" label="CURP" name="curp" v-model="asp.Curp" />
                </div>
                <div class="col-sm-2 mt-4">
                  <div class="container-fluid ">
                    <MaterialButton @click="existencia" color="success" size="sm">Existe?</MaterialButton>
                    <MaterialButton @click="navigateToCreate" color="info" size="sm">Crear</MaterialButton> 
                    
                  </div>
                </div>
                <div class="col-sm-3 mt-4">
                    <MaterialInput id="givenRfc" type="text" label="Rfc" name="givenRfc" v-model="asp.Rfc" disabled="true" />
                </div>
                <div class="col-sm-3 mt-4">
                    <MaterialComboBox id="givenSex" label="Sexo" v-model="asp.Sexo" :options="sexoOptions" disabled="true"/>
                </div>
                <div class="col-sm-3 mb-1">
                    <MaterialInput id="Apellido_Paterno" type="text" label="Apellido Paterno" name="Apellido_Paterno" v-model="asp.Apellido_Paterno" disabled="true"/>
                </div>
                <div class="col-sm-3 mb-1">
                    <MaterialInput id="Apellido_Materno" type="text" label="Apellido Materno" name="Apellido_Materno" v-model="asp.Apellido_Materno" disabled="true"/>
                </div>
                <div class="col-sm-3 mb-1">
                    <MaterialInput id="givenName" type="text" label="Nombre" name="givenName" v-model="asp.Nombre"  disabled="true"/>
                </div>
                <div class="col-sm-3 mb-2">
                    <MaterialInput id="givenfechaNacimiento" v-model="asp.Fecha_Nacimiento" label="Fecha de Nacimiento" disabled="true"/>
                </div>
                <div class="col-sm-3 mb-2">
                    <MaterialComboBox id="givenEdoCivil" label="Estado Civil" v-model="asp.Estado_Civil" :options="edoCivilOptions" disabled="true"/>
                </div>
            
                <div class="col-sm-3 mb-2">
                    <MaterialInput id="mobilePhone" type="phone" label="Tel. Celular" v-model="asp.TelefonoCelular" disabled="true"/>
                </div>
                
                <div class="col-sm-3 mb-3 ">           
                    <material-switch id="accountEnabled" name="accountEnabled" label="Pensionado ISSEMYM" v-model:checked="asp.PensionaodISSEMYM" disabled="true"/>
                </div>  

            </div>
          
        </div>
    <div class="mb-3 min-vh-80">
          
    <div class="row ">
        <div class="card">
          <div class="card-header p-1 position-relative mt-n1 mx-3 z-index-2">
            <div
              class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3"            >
              <div class="multisteps-form__progress">
                <button class="multisteps-form__progress-btn" type="button" title="Información de la solicitud">
                  <span>Solicitud</span>
                </button>
                <button class="multisteps-form__progress-btn" type="button" title="Referencias">
                  <span>Referencias</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body">
          <form class="multisteps-form__form">
            <solicitudDatosBasicos :class="activeStep === 0 ? activeClass : ''"/>
            <Referencias :class="activeStep === 1 ? activeClass : ''"/>
            

            
            <div class="mt-4 d-flex justify-content-between">
              <MaterialButton id="prev-step-button" color="secondary" variant="outline"
                :disabled="activeStep === 0" @click.prevent="handlePrevStep">
                Anterior
              </MaterialButton>

              <MaterialButton id="verify" color="primary" variant="gradient" @click.prevent="verifyData()" :disabled="activeStep === 1" >
                {{ activeStep === 0 ? "Guardar y continuar..." : "-" }}
                
              </MaterialButton>
           
              <MaterialButton id="next-step-button" :color="sigColor" :variant="sigVariant" :disabled="sigPaso"
                @click.prevent="activeStep === 1 ? handleSave() : handleNextStep()">
                {{ activeStep === 1 ? "Continuar con su evaluacion" : "Siguiente" }}
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
import MaterialSwitch from "@/components/common/MaterialSwitch.vue";
import MaterialInput from "@/components/common/MaterialInput.vue";
import MaterialComboBox from "@/components/common/MaterialComboBox.vue";
import {getGradoescolaridad, getEstadoEscolaridad, getSexo, getEdoCivil } from "@ue/services/catalogosDbService"
import { useAspiranteStore } from "@ue/modules/Aspirante/store/useAspiranteStore";
import { useSolicitudStore } from "../store/solicitudStore";
import { useReferenciaStore } from "../../Referencia/useReferenceStore.js";
import { useEvaluacionStore } from "../../Evaluacion/useEvaluacionStore.js";
import fotoDefault from "@/assets/img/user.png";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMainStore } from "@/store/useMainStore";
import { onMounted, ref } from "vue";

import SolicitudDatosBasicos from "../componentes/SolicitudDatosBasicos.vue";
import Referencias from "../componentes/Referencias.vue";


export default {
  name: "AspiranteCreate",
  components: {
    MaterialButton,
    SolicitudDatosBasicos,Referencias,
    MaterialInput,MaterialComboBox, MaterialSwitch, 
  },
  setup() {
    const gradoEscolaridadOptions = getGradoescolaridad();
    const estadoEscolaridadOptions = getEstadoEscolaridad();
    const sexoOptions = getSexo();
    const edoCivilOptions = getEdoCivil();
    const evalStore = useEvaluacionStore();
    const solicitudStore = useSolicitudStore();
    const { activeStep, activeClass } = storeToRefs(solicitudStore); 
    const { nextStep, prevStep } = solicitudStore;
    const { solicitud: sol } = storeToRefs(solicitudStore);
    const referenciaStore = useReferenciaStore();
    const rowsReferencias = referenciaStore;
    const aspiranteStore = useAspiranteStore();
    const { aspirante: asp } = storeToRefs(aspiranteStore);
    const mainStore = useMainStore();
    const router = useRouter();
    const fecha = new Date();
    
    let sigPaso = ref( true);
    let sigColor = ref('secundary');
    let sigVariant = ref('outline');
    
    let isCreateMode = sol.value.id == 0;

    const placeholder = fotoDefault;
    onMounted(() => {
      activeStep.value = 0;
      if (!isCreateMode)
        referenciaStore.fetchReferenciasBySolicitud(sol.value.id)      
    });

    const existencia = () => {
      return aspiranteStore.verifyAspiranteByCurp(asp.value.Curp)
    }

    const navigateToCreate = () => {
      aspiranteStore.resetSelectedAspirante();
      router.push({ name: "AspiranteForm" });
    }

    const navigateToView = () => {
      router.push({ name: "AspiranteForm" });
    }

    const navigateToList = () => {
      aspiranteStore.resetSelectedAspirante();
      activeStep.value = 0;
      router.push({ name: "SolicitudList" });
    }

    const handleSave = () => {
        if (sol.value.status <2){
          sol.value.status = 2
          solicitudStore.updateSolicitud();
        }
        evalStore.solicitudId = sol.value.id
        evalStore.fetchEvaluaciones(sol.value.id)

        router.push({ name: "EvaluacionForm" }); // DE AQUI SE VA A LA PAGINA DE EVALUAR
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
            //sol.value.fechaSolicitud =  fecha.toLocaleDateString()
            referenciaStore.resetReferencia();
            nextStep();

        }else if (activeStep.value === 1){
           nextStep();
        }
      }
    };

    const validateStep = () => {
      let isValid = true;
      // AGREGAR LOS CAMPOS DE CUERPO, REGION Y SITUACION
      sol.value.corporacionId = mainStore.userdata.cuerpoId;
      sol.value.regionId = mainStore.userdata.regionId;
      sol.value.coordenadasVivienda = '0'
      if (!sol.value.fechaSolicitud)
        sol.value.fechaSolicitud = fecha.getFullYear()+'-'+(fecha.getMonth() + 1).toString().padStart(2, '0')+'-'+fecha.getDate().toString().padStart(2, '0')
      
      if (!sol.value.fot)
        sol.value.fot= 0
      

      if (activeStep.value === 0) {
        // Validar campos del paso 1 (Información de Usuarios)

        if(!asp.value.Curp) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Falta identificar al aspirante, a través de la CURP",
                color: "warning",icon: "warning",});
              return isValid;    
        }
        if (!existencia()){
            isValid = false;       
            mainStore.triggerAlert({message: "No se puede guardar actualizar el registro",color: "warning",icon: "warning",});
            return isValid; 
        }

        sol.value.curp = asp.value.Curp;

        if( sol.value.telefonoCasa != null ){
          if(sol.value.telefonoCasa.length < 10){
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el Teléfono de casa",color: "warning",icon: "warning",});
              return isValid;
            }    
        }

        if(sol.value.telefonoRecado != null ){
          if(sol.value.telefonoRecado.length < 10){
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el Teléfono para recados",color: "warning",icon: "warning",});
              return isValid;  
            }  
        }
        
        if(!sol.value.enteraEmpleo) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Seleccione la forma en que se entero del empleo ",color: "warning",icon: "warning",});
              return isValid;    
        }
        
        if (!sol.value.gobierno && !sol.value.privada){
              isValid = false;       
              mainStore.triggerAlert({message: "Seleccione opcion privada o gobierno en ultimo empleo",color: "warning",icon: "warning",});
              return isValid;    
        }
        
        if(!sol.value.nombreEmpresa) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el Nombre de la empresa",
                color: "warning",icon: "warning",});
              return isValid;    
        }
        
        if(!sol.value.descripcionEmpresa) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture la descripción de la empresa",
                color: "warning",icon: "warning",});
              return isValid;    
        }
        
        if(!sol.value.motivoBaja) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el motivo baja",
                color: "warning",icon: "warning",});
              return isValid;    
        }

        if(!sol.value.puesto) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el puesto que desempeñó",
                color: "warning",icon: "warning",});
              return isValid;    
        }
        
        if(!sol.value.jefeInmediato) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el nombre del jefe inmediato",
                color: "warning",icon: "warning",});
              return isValid;    
        }
        
        if(!sol.value.telefonoEmpleo) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el teléfono de empleo",
                color: "warning",icon: "warning",});
              return isValid;    
        }
        
        if(!sol.value.fechaInicio) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture la fecha de Inicio",
                color: "warning",icon: "warning",});
              return isValid;    
        }
        
        if(!sol.value.fechaFinal) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture la fecha de termino",
                color: "warning",icon: "warning",});
              return isValid;    
        }
        
        if(sol.value.policia==true) {  
          if(!sol.value.gradoInicioPolicia) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el grado de inicio de policía",
                color: "warning",icon: "warning",});
              return isValid;    
          }      
          if(!sol.value.gradoFinalPolicia) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el grado final al salir de policía",
                color: "warning",icon: "warning",});
              return isValid;    
          }
        }
        
        if(sol.value.militar == true) {  
          if(!sol.value.gradoInicioMilitar) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el grado con que inicio como militar",
                color: "warning",icon: "warning",});
              return isValid;    
          }
          if(!sol.value.gradoFinalMilitar) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Capture el grado con que concluyó como militar",
                color: "warning",icon: "warning",});
              return isValid;    
          }
        }

        if(!sol.value.observaciones) {  
              isValid = false;       
              mainStore.triggerAlert({message: "Si no agrega observaciones agregue el texto SIN OBSERVACIONES",
                color: "warning",icon: "warning",});
              return isValid;    
        }

        console.log('Previo  eval sol.value.statusExp')

        if (sol.value.tarjetaEnvio == true &&         sol.value.presolicitud == true &&         sol.value.fotografias == true &&         sol.value.croquis == true &&
          sol.value.referenciasDomicilio == true &&        sol.value.dependienteEconomico == true &&        sol.value.pre_cartillaLiberada == true &&
          sol.value.certificadoEstudios == true &&        sol.value.actaNacimiento == true &&        sol.value.noAntecedentesPenales == true &&
          sol.value.comprobanteDomicilio == true &&        sol.value.cartasRecomendacion == true &&        sol.value.curpActualizado == true &&
          sol.value.ine == true &&        sol.value.rfcHomoclave == true 
          ){ 
            console.log('Eval sol.value.statusExp = true')
            sol.value.statusExp = true  
          }          
        else{ 
          console.log('Eval sol.value.statusExp = false')
          sol.value.statusExp = false
        }
        console.log('Ya se evaluo sol.value.statusExp ' + sol.value.statusExp)
        ///CREAR REGISTRO EN LA BASE DE DATOS

      } else if (activeStep.value === 1) {
        
        console.log("aqui valida 1");
      }
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
      gradoEscolaridadOptions, estadoEscolaridadOptions,sexoOptions,edoCivilOptions,
      existencia,navigateToCreate,navigateToView,fecha,verifyData,sigPaso,sigColor,sigVariant,
      rowsReferencias
    };
  },
};
</script>
