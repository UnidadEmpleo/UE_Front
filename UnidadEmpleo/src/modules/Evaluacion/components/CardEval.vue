<template>
  <div  class="multisteps-form__panel border-radius-xl bg-white" data-animation="FadeIn"  >
    <div class="mb-3">
      <h5 class="font-weight-bolder mb-0">Evaluaciones</h5>
      <p class="mb-0 text-sm">Resultados</p>
      {{ perfil }}
    </div>
    

      <div class="row justify-content-center">

        <div class="card col-sm-3" :style="{display: visibleRegistro}">
          <div class="card-header d-flex justify-content-between">
            <div  class="col-sm-6"> 
              <h3>REGISTRO</h3>
            </div>
            
          </div>

          <div class="card col-sm-12">   
            
            <material-button color="warning" size="sm" @click.prevent="ingreso(1)" :disabled="registro.ingreso.length == 0? disabledRregistro: true">Ingreso</material-button>
            <label  class="form-label  col-sm-auto"> {{ registro.ingreso }}</label>
            
          </div>

          <div class="card col-sm-12"> 
            
            <material-button color="success" size="sm" @click.prevent="termino(1, true, false)" :disabled="(registro.salida == null || registro.salida.length == 0) && registro.salida != registro.ingreso? disabledRregistro: true">Salida</material-button>
              <label  class="form-label col-sm-auto"> {{ registro.salida }}</label>
            
          </div>

          <div class="row"> 
            <label  class="form-label font-weight-bolder col-sm-auto col-form-label-lg">DOCUMENTACIÓN </label>
          </div>

          <div class="row col-sm-5 justify-content-start">
            <material-switch  id="resultado" name="resultado" :disabled="true" label="Expediente completo" v-model:checked="registro.resultado" />      
            <hr>                    
            <material-switch  id="revalorables" name="revalorable" :disabled="disabledRregistro" label="Concluye evaluación" v-model:checked="registro.revalorable" />  
            
          </div>
          <div>
            <RichTextEditor id="obs" label="Observaciones" v-model="registro.observaciones" is-required :disabled="disabledRregistro"/>
          </div>
          <div class=""> 
            
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="openExpediente()" :disabled="
              (registro.salida == null || registro.salida.length == 0)? false:(registro.observaciones? false:disabledRregistro) ">Validar Registro</material-button>
            <label  class="form-label col-sm-auto label" >{{ registro.nombreUsuarioEvaluo }} </label>
          </div>
        </div>
        
        <div class="card col-sm-3 " :style="{display: visiblePsico}">
          <div class="card-header d-flex text-center">
              <h3>PSICOLOGÍA</h3>
          </div>
          
          <div class="card col-sm-12">   
            
            <material-button color="warning" size="sm" 
            @click.prevent="ingreso(3)" 
            :disabled="psicologia.ingreso.length == 0? disabledPsico: true">
            Ingreso</material-button>
            <label  class="form-label  col-sm-auto"> {{ psicologia.ingreso }}</label>
            
          </div>

          <div class="card col-sm-12"> 
            
              <material-button color="success" size="sm" @click.prevent="termino(3,true,false)" :disabled="(psicologia.salida == null || psicologia.salida.length == 0) && psicologia.salida != psicologia.ingreso? disabledPsico: true">Salida</material-button>
              <label  class="form-label col-sm-auto"> {{ psicologia.salida }}</label>     
            
          </div>

          <div class="row"> 
            <label  class="form-label font-weight-bolder col-sm-auto col-form-label-lg">RESULTADO </label>
          </div>

          <div class="row">
            <div class="col-sm-auto">

            </div>
            <div class="col-sm-6 ">
              <div class="row justify-content-center">
                <div class="col-sm-auto">
                  <input class="form-check-input" type="radio" id="true" value="true" v-model="psicologia.resultado" />
                  <label for="one">APTO</label>
                </div>
                <div class="col-sm-auto">
                  <input class="form-check-input"  type="radio" id="false" value="false"  v-model="psicologia.resultado"/>
                  <label for="two">NO APTO</label>
                </div>
              </div>
              <hr>
              <material-switch  id="revalorable" name="revalorable" :disabled="disabledPsico" label="Revalorable" v-model:checked="psicologia.revalorable" />              
            </div>
          </div>
          <div>
            <RichTextEditor id="obs" label="Observaciones" v-model="psicologia.observaciones" is-required :disabled="disabledPsico"/>
          </div>
          <div>
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="termino(3,false,true)" :disabled=" (psicologia.salida == null || psicologia.salida.length == 0)? true: disabledPsico">Validar Psicología</material-button>
            <label  class="form-label col-sm-auto label" >{{ psicologia.nombreUsuarioEvaluo }} </label>
          </div>
        </div>

        <div class="card col-sm-3" :style="{display: visibleMedico}">
          <div class="card-header d-flex text-center">
              <h3>M É D I C O</h3>
          </div>
          
          <div class="card col-sm-12">   
            
            <material-button color="warning" size="sm" @click.prevent="ingreso(2)" :disabled="medico.ingreso.length == 0? disabledMedico: true">Ingreso</material-button>
            <label  class="form-label  col-sm-auto"> {{ medico.ingreso }}</label>
            
          </div>

          <div class="card col-sm-12"> 
            
              <material-button color="success" size="sm" @click.prevent="termino(2,true,false)" :disabled="(medico.salida == null || medico.salida.length == 0) && medico.salida != medico.ingreso? disabledMedico: true">Salida</material-button>
              <label  class="form-label col-sm-auto"> {{ medico.salida }}</label>
             
          </div>

          <div class="row"> 
            <label  class="form-label font-weight-bolder col-sm-auto col-form-label-lg">RESULTADO </label>
          </div>

          <div class="row">
            <div class="col-sm-auto">

            </div>
            <div class="col-sm-6 ">
              <div class="row justify-content-start">
                <div class="col-sm-auto">
                  <input class="form-check-input" type="radio" id="true" value=true  v-model="medico.resultado"/>
                  <label for="one">APTO</label>
                </div>
                <div class="col-sm-auto">
                  <input class="form-check-input"  type="radio" id="false" value=false v-model="medico.resultado" />
                  <label for="two">NO APTO</label>
                </div>
              </div>
              <hr>
              <material-switch  id="revalorables" name="revalorable" :disabled="disabledMedico" label="Revalorable" v-model:checked="medico.revalorable" />              
            </div>
          </div>
          <div>
            <RichTextEditor id="obs" label="Observaciones" v-model="medico.observaciones" is-required :disabled="disabledMedico"/>
          </div>
          <div>
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="termino(2,false,true)" :disabled=" (medico.salida == null || medico.salida.length == 0)? true:disabledMedico">Validar Médico</material-button>
            <label  class="form-label col-sm-auto label" >{{ medico.nombreUsuarioEvaluo }} </label>
          </div>

          
        </div>

        <div class="card col-sm-3" :style="{display: visibleAnti}">
          <div class="card-header d-flex text-center">
              <h3>ANTIDOPING</h3>
          </div>
          
          <div class="card col-sm-12">   
            
            <material-button color="warning" size="sm" @click.prevent="ingreso(4)" :disabled="antidoping.ingreso.length == 0? disabledAnti: true">Ingreso</material-button>
            <label  class="form-label  col-sm-auto"> {{ antidoping.ingreso }}</label>
            
          </div>

          <div class="card col-sm-12"> 
            
              <material-button color="success" size="sm" @click.prevent="termino(4,true,false)" :disabled="(antidoping.salida == null || antidoping.salida.length == 0) && antidoping.salida != antidoping.ingreso? disabledAnti: true">Salida</material-button>
              <label  class="form-label col-sm-auto"> {{ antidoping.salida }}</label>
           
          </div>

          <div class="row"> 
            <label  class="form-label font-weight-bolder col-sm-auto col-form-label-lg">RESULTADO </label>
          </div>

          <div class="row">
            <div class="col-sm-auto">

            </div>
            <div class="col-sm-6 ">
              <div class="row justify-content-start">
                <div class="col-sm-auto">
                  <input class="form-check-input" type="radio" id="true" value=true  v-model="antidoping.resultado"/>
                  <label for="one">NEGATIVO</label>
                </div>
                <div class="col-sm-auto">
                  <input class="form-check-input"  type="radio" id="false" value=false  v-model="antidoping.resultado"/>
                  <label for="two">POSITIVO</label>
                </div>
              </div>
              <hr>
              <material-switch  id="revalorable" name="revalorable" :disabled="disabledAnti" label="Revalorable" v-model:checked="antidoping.revalorable" />              
            </div>
          </div>
          <div>
            <RichTextEditor id="obs" label="Observaciones" v-model="antidoping.observaciones" is-required :disabled="disabledAnti"/>
          </div>
          <div>
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="termino(4,false,true)" :disabled=" (antidoping.salida == null || antidoping.salida.length == 0)? true:disabledAnti">Validar Antidoping</material-button>
            <label  class="form-label col-sm-auto label" >{{ antidoping.nombreUsuarioEvaluo }} </label>
          </div>
        </div>


        <div class="card col-sm-3 " :style="{display: visiblePie}">
          <div class="card-header d-flex text-center ">
              <h3>P I E</h3>
          </div>
          
          <div class="card col-sm-12">   
            
            <material-button color="warning" size="sm" @click.prevent="ingreso(5)" :disabled="pie.ingreso.length == 0? disabledPie:true">Ingreso</material-button>
            <label  class="form-label  col-sm-auto"> {{ pie.ingreso }}</label>
            
          </div>

          <div class="card col-sm-12"> 
            
              <material-button color="success" size="sm" @click.prevent="termino(5,true,false)" :disabled="(pie.salida == null || pie.salida.length == 0) && pie.salida != pie.ingreso? disabledPie:true">Salida</material-button>
              <label  class="form-label col-sm-auto"> {{ pie.salida }}</label>
            
          </div>

          <div class="row"> 
            <label  class="form-label font-weight-bolder col-sm-auto col-form-label-lg">RESULTADO </label>
          </div>

          <div class="row">
            <div class="col-sm-auto">

            </div>
            <div class="col-sm-6 ">
              <div class="row justify-content-start">
                <div class="col-sm-auto">
                  <input class="form-check-input" type="radio" id="true" value=true v-model="pie.resultado" />
                  <label for="one">NEGATIVO</label>
                </div>
                <div class="col-sm-auto">
                  <input class="form-check-input"  type="radio" id="false" value=false  v-model="pie.resultado"/>
                  <label for="two">POSITIVO</label>
                </div>
              </div>
              <hr>
              <material-switch  id="revalorable" name="revalorable" :disabled="disabledPie" label="Revalorable" v-model:checked="pie.revalorable" />              
            </div>
          </div>
          <div>
            <RichTextEditor id="obs" label="Observaciones" v-model="pie.observaciones" is-required :disabled="disabledPie"/>
          </div>
          <div>
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="termino(5,false,true)" :disabled=" (pie.salida == null || pie.salida.length == 0)? true:disabledPie">Validar PIE</material-button>
            <label  class="form-label col-sm-auto label" >{{ pie.nombreUsuarioEvaluo }} </label>
          </div>
        </div>

      </div>

    
    <ExpedienteCompleto
      :visible="expedienteVisible"
      @update:completo="v => closeExpediente(v)"
      @close="expedienteVisible = false"
    />

  </div>

</template>

<style>
.label {font: italic small-caps bold 12px/2 cursive;}
</style>

<script>

import { useMainStore } from '@/store/useMainStore.js';
import { useEvaluacionStore } from '../useEvaluacionStore.js';
import { useSolicitudStore } from "@ue/modules/Solicitud/store/solicitudStore";

import ExpedienteCompleto from './ExpedienteCompleto.vue';
import MaterialButton from '../../../../../src/components/common/MaterialButton.vue';
import MaterialSwitch from "@/components/common/MaterialSwitch.vue";
import Swal from 'sweetalert2'
import RichTextEditor from '@/components/common/RichTextEditor.vue';
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";


export default {
  components: {
    MaterialButton,MaterialSwitch,
    RichTextEditor,ExpedienteCompleto
  },
  
  name: "SolicitudDatosBasicos",
  setup() {
    
    const store = useMainStore();    
    const evalStore = useEvaluacionStore()
    const { registro, psicologia,medico,antidoping,pie, options, } = storeToRefs(evalStore);
    const usuario = store.externalUser.username;
    const solicitudStore = useSolicitudStore();
    const { solicitud: sol } = storeToRefs(solicitudStore);
    const router = useRouter();
    const perfil = ref()
    let visibleRegistro=ref("flex")
    let visiblePsico=ref("flex")
    let visibleMedico=ref("flex")
    let visibleAnti=ref("flex")
    let visiblePie= ref("flex")
    let disabledRregistro = registro.id == 0? true:ref(false)
    let disabledPsico = ref(false)
    let disabledMedico = ref(false)
    let disabledAnti = ref(false)
    let disabledPie = ref(false)
    const expedienteVisible = ref(false)

    const setPerfilVisibleDisabled= (vr,vp,vm,va,vpi,dr,dp,dm,da,dpi) =>{

      visibleRegistro.value = vr
      visiblePsico.value = vp
      visibleMedico.value = vm
      visibleAnti.value = va
      visiblePie.value = vpi

      disabledRregistro.value = dr
      disabledPsico.value = dp
      disabledMedico.value = dm
      disabledAnti.value = da
      disabledPie.value = dpi

    }

    //let enableRegistroUpd = false;
    function openExpediente() {
      expedienteVisible.value = true
    }
    
    function closeExpediente() {
      registro.value.resultado = sol.value.statusExp
      expedienteVisible.value = false
      termino(1,false,true);//crea el registro de atn y registro
    }

    const confirmar = async () =>{
      let { value: confirmar } = await Swal.fire({
        title: 'CAPTURA "confirmar" PARA CONTINUAR ',
        input: "text",
        value: "",
        inputLabel: "confirmar",        
        inputAttributes: {
          maxlength: "20",
          autocapitalize: "off",
          autocorrect: "off"
        },
        inputValidator: (value) => {
          console.log(value)
          if (value != 'confirmar') return "confirma";
        }
      });

      return confirmar
    }


    const psw = async () =>{
      let { value: password } = await Swal.fire({
        title: "Introduce la CONTRASEÑA para "+usuario,
        input: "password",
        value: "Password123!",
        inputLabel: "Password",
        inputPlaceholder: "Introduce tu contraseña",
        inputAttributes: {
          maxlength: "20",
          autocapitalize: "off",
          autocorrect: "off"
        },
        inputValidator: (value) => {
          if (!value) return "Requieres ingresar la contraseña";
        }
      });

      return password
    }

    const ingreso = async (op) => {
      //Levantar pupop para autenticar al usuario
      var continuar = false;
      let confirm = await confirmar().then((result) => {
        if (result=='') continuar = false
        else if (result != undefined && result == 'confirmar') continuar = true
        return result
      });

      if (continuar){
        let res = await evalStore.createEvaluaciones(op, usuario, confirm)
        if (res)
          EdicionRegistro()
        else
          setEmptyDate(op)
      }

    }

    const setEmptyDate = (op) =>{
      
      switch (op) {
        case 1:
          registro.value.salida = '';
          break;
        case 2:
          medico.value.salida = '';
          break;
        case 3:
          psicologia.value.salida = '';
          break;
        case 4:
          antidoping.value.salida = '';
          break;
        case 5:
          pie.value.salida = '';
          break;               
      }          
    }

    //OPCION 1 a 5 DE ACUERDO AL TIPO DE EVALUACIÓN
    //termino = true se agrega la hora de termino
    const termino = async (op, termino, pswd) => {
      
      //Levantar pupop para autenticar al usuario
      var continuar = false;
      let dato = ''
      if (pswd)
        dato = await psw().then((result) => {
          if (result=='') continuar = false
          else if (result != undefined ) continuar = true
          return result
        });
      else
        dato = await confirmar().then((result) => {
          if (result=='') continuar = false
          else if (result != undefined && result == 'confirmar') continuar = true
          return result
        });  
    
      if (continuar){
        
        let resp = await evalStore.updateEvaluaciones(op, usuario, dato, termino)
        
        if(resp) {//Actualiza evaluación
          if (op == 1 & !termino)
            solicitudStore.updateSolicitud() //se actualiza datos de solicitud
        }else 
          setEmptyDate(op)

      }
    }

    const EdicionRegistro = ()=> {disabledRregistro = !disabledRregistro  }

    onMounted(() => {
      
      evalStore.setRecurso()

      perfil.value = options.value.perfilId
      
      if (options.value.perfilId == null ){
        alert('No hay perfil o se perdió la solicitud');
        router.push({ name: "EvaluacionList" });
      }else if (options.value.perfilId == 8){ //Administrador
        if (!evalStore.sexo)
          setPerfilVisibleDisabled("flex","flex","flex","flex","flex",false,false,false,false,false)
        else
          setPerfilVisibleDisabled("flex","flex","flex","flex","none",false,false,false,false,true)
        
      }      
      else if (options.value.perfilId == 1 || options.value.perfilId == 2){ //Subdirector y gerente
        if (!evalStore.sexo)
          setPerfilVisibleDisabled("flex","flex","flex","flex","flex",true,true,true,true,true)  
        else
          setPerfilVisibleDisabled("flex","flex","flex","flex","none",true,true,true,true,true)
        
      }
      else if (options.value.perfilId == 3){  //Atención y registro
        if (evalStore.sexo)
          setPerfilVisibleDisabled("flex","flex","flex","flex","none",false,true,true,true,true)
        else
          setPerfilVisibleDisabled("flex","flex","flex","flex","flex",false,true,true,true,true)
      }
      else if (options.value.perfilId == 4){ //Psicologo
        setPerfilVisibleDisabled("none","flex","none","none","none",true,false,true,true,true)
      }
      else if (options.value.perfilId == 5){ //Medico
        setPerfilVisibleDisabled("none","none","flex","none","none",true,true,false,true,true)
      }
      else if (options.value.perfilId == 6){//Antidoping
        if (!evalStore.sexo)
          setPerfilVisibleDisabled("none","none","none","flex","flex",true,true,true,false,false)
        else
          setPerfilVisibleDisabled("none","none","none","flex","none",true,true,true,false,true)
      }
      
    });

    return { visibleRegistro,visiblePsico,visibleMedico,visibleAnti,visiblePie,
      disabledRregistro,disabledPsico,disabledMedico,disabledAnti,disabledPie,
      registro, psicologia,medico,antidoping,pie,

      EdicionRegistro,
      ingreso,termino,openExpediente,closeExpediente,expedienteVisible,perfil
      


    };
  },
};
</script>