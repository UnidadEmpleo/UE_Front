<template>
  <div  class="multisteps-form__panel border-radius-xl bg-white" data-animation="FadeIn"  >
    <div class="mb-3">
      <h5 class="font-weight-bolder mb-0">Evaluaciones</h5>
      <p class="mb-0 text-sm">Resultados</p>
    </div>
    

      <div class="row ">

        <div class="card col-sm-3" :style="{display: visibleRegistro}">
          <div class="card-header d-flex justify-content-between">
            <div  class="col-sm-6"> 
              <h3>R E G I S T R O</h3>
            </div>
            <div  class="col-sm-3"> 
              <MaterialButton @click.prevent="EdicionRegistro" :style="{display:'flex'}"  :disabled="disabledRregistro? true:false" size="sm">Modificar</MaterialButton>{{ disabledRregistro }}
            </div>
          </div>

          <div class="card col-sm-12">   
            <material-button color="warning" size="sm" @click.prevent="ingreso(1)" :disabled="registro.ingreso.length == 0? disabledRregistro: true">Ingreso</material-button>
            <label  class="form-label  col-sm-auto"> {{ registro.ingreso }}</label>
            
          </div>

          <div class="card col-sm-12"> 
            
              <material-button color="success" size="sm" @click.prevent="termino(1, true)" :disabled="(registro.salida == null || registro.salida.length == 0) && registro.salida != registro.ingreso? disabledRregistro: true">Salida</material-button>
              <label  class="form-label col-sm-auto"> {{ registro.salida }}</label>
            
          </div>

          <div class="row"> 
            <label  class="form-label font-weight-bolder col-sm-auto col-form-label-lg">DOCUMENTACIÓN </label>
          </div>

          <div class="row col-sm-5 justify-content-start">
            <material-switch  id="resultado" name="resultado" :disabled="disabledRregistro" label="Expediente completo" v-model:checked="registro.resultado" />      
            <hr>        
            <material-switch  id="revalorable" name="revalorable" :disabled="disabledRregistro" label="Revalorable" v-model:checked="registro.revalorable" />              
          </div>
          <div>
            <RichTextEditor id="obs" label="Observaciones" v-model="registro.observaciones" is-required :disabled="disabledRregistro"/>
          </div>
          <div>
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="openExpediente()" :disabled="registro.salida == null || registro.salida.length == 0 != registro.ingreso? disabledRregistro: true">Validar Registro</material-button>
            <label  class="form-label col-sm-auto label" >{{ registro.nombreUsuarioEvaluo }} </label>
          </div>
        </div>
        
        <div class="card col-sm-3 " :style="{display: visiblePsico}">
          <div class="card-header d-flex text-center">
              <h3>PSICOLOGÍA</h3>
          </div>
          
          <div class="card col-sm-7">   
            <div>
            <material-button color="warning" size="sm" @click.prevent="ingreso(3)" :disabled="psicologia.ingreso.length == 0? disabledPsico: true">Ingreso</material-button>
            <label  class="form-label  col-sm-auto"> {{ psicologia.ingreso }}</label>
            </div>
          </div>

          <div class="card col-sm-7"> 
            <div  class="justify-content-center"> 
              <material-button color="success" size="sm" @click.prevent="termino(3,true)" :disabled="(psicologia.salida == null || psicologia.salida.length == 0) && psicologia.salida != psicologia.ingreso? disabledPsico: true">Salida</material-button>
              <label  class="form-label col-sm-auto"> {{ psicologia.salida }}</label>     
            </div>  
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
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="termino(3,false)" :disabled=" psicologia.nombreUsuarioEvaluo.length == 0? disabledPsico : true">Validar Psicología</material-button>
            <label  class="form-label col-sm-auto label" >{{ psicologia.nombreUsuarioEvaluo }} </label>
          </div>
        </div>



        <div class="card col-sm-3" :style="{display: visibleMedico}">
          <div class="card-header d-flex text-center">
              <h3>M É D I C O</h3>
          </div>
          
          <div class="card col-sm-7">   
            <div>
            <material-button color="warning" size="sm" @click.prevent="ingreso(2)" :disabled="medico.ingreso.length == 0? disabledMedico: true">Ingreso</material-button>
            <label  class="form-label  col-sm-auto"> {{ medico.ingreso }}</label>
            </div>
          </div>

          <div class="card col-sm-7"> 
            <div  class="justify-content-center"> 
              <material-button color="success" size="sm" @click.prevent="termino(2,true)" :disabled="medico.salida == null || medico.salida.length == 0? disabledMedico: true">Salida</material-button>
              <label  class="form-label col-sm-auto"> {{ medico.salida }}</label>
            </div>  
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
                  <input class="form-check-input" type="radio" id="true" value="true"  v-model="medico.resultado"/>
                  <label for="one">APTO</label>
                </div>
                <div class="col-sm-auto">
                  <input class="form-check-input"  type="radio" id="false" value="false" v-model="medico.resultado" />
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
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="termino(2,false)" :disabled=" medico.nombreUsuarioEvaluo.length == 0? disabledMedico : true">Validar Médico</material-button>
            <label  class="form-label col-sm-auto label" >{{ medico.nombreUsuarioEvaluo }} </label>
          </div>
        </div>



        <div class="card col-sm-3" :style="{display: visibleAnti}">
          <div class="card-header d-flex text-center">
              <h3>ANTIDOPING</h3>
          </div>
          
          <div class="card col-sm-7">   
            <div>
            <material-button color="warning" size="sm" @click.prevent="ingreso(4)" :disabled="antidoping.ingreso.length == 0? disabledAnti: true">Ingreso</material-button>
            <label  class="form-label  col-sm-auto"> {{ antidoping.ingreso }}</label>
            </div>
          </div>

          <div class="card col-sm-7"> 
            <div  class="justify-content-center"> 
              <material-button color="success" size="sm" @click.prevent="termino(4,true)" :disabled="antidoping.salida == null || antidoping.salida.length == 0? disabledAnti: true">Salida</material-button>
              <label  class="form-label col-sm-auto"> {{ antidoping.salida }}</label>
            </div>  
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
                  <input class="form-check-input" type="radio" id="true" value="true"  v-model="antidoping.resultado"/>
                  <label for="one">APTO</label>
                </div>
                <div class="col-sm-auto">
                  <input class="form-check-input"  type="radio" id="false" value="false"  v-model="antidoping.resultado"/>
                  <label for="two">NO APTO</label>
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
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="termino(4,false)" :disabled=" antidoping.nombreUsuarioEvaluo.length == 0? disabledAnti : true">Validar Antidoping</material-button>
            <label  class="form-label col-sm-auto label" >{{ antidoping.nombreUsuarioEvaluo }} </label>
          </div>
        </div>


        <div class="card col-sm-3 " :style="{display: visiblePie}">
          <div class="card-header d-flex text-center ">
              <h3>P I E</h3>
          </div>
          
          <div class="card col-sm-7">   
            <div>
            <material-button color="warning" size="sm" @click.prevent="ingreso(5)" :disabled="pie.ingreso.length == 0? disabledPie:true">Ingreso</material-button>
            <label  class="form-label  col-sm-auto"> {{ pie.ingreso }}</label>
            </div>
          </div>

          <div class="card col-sm-7"> 
            <div  class="justify-content-center"> 
              <material-button color="success" size="sm" @click.prevent="termino(5,true)" :disabled="pie.salida.length == 0? disabledPie:true">Salida</material-button>
              <label  class="form-label col-sm-auto"> {{ pie.salida }}</label>
            </div>  
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
                  <input class="form-check-input" type="radio" id="true" value="true" v-model="pie.resultado" />
                  <label for="one">Positivo</label>
                </div>
                <div class="col-sm-auto">
                  <input class="form-check-input"  type="radio" id="false" value="false"  v-model="pie.resultado"/>
                  <label for="two">Negativo</label>
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
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="termino(5,false)" :disabled=" pie.nombreUsuarioEvaluo.length == 0? disabledPie : true">Validar PIE</material-button>
            <label  class="form-label col-sm-auto label" >{{ pie.nombreUsuarioEvaluo }} </label>
          </div>
        </div>


      </div>

    
    <ExpedienteCompleto
      :visible="expedienteVisible"
      @update:completo="v => closeExpediente()"
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
    const { registro, psicologia,medico,antidoping,pie, options } = storeToRefs(evalStore);
    const usuario = store.externalUser.username;

    const solicitudStore = useSolicitudStore();
    const { solicitud: sol } = storeToRefs(solicitudStore);
    const router = useRouter();
    const visibleRegistro="flex"
    const visiblePsico="flex"
    const visibleMedico="flex"
    const visibleAnti="flex"
    const visiblePie="flex"
    let disabledRregistro = registro.id == 0? true:false
    let disabledPsico = false
    let disabledMedico = false
    let disabledAnti = false
    let disabledPie = false
    const expedienteVisible = ref(false)
    //let enableRegistroUpd = false;
    function openExpediente() {
      expedienteVisible.value = true
    }
    
    function closeExpediente() {
      registro.value.resultado = sol.value.statusExp
      expedienteVisible.value = false
      termino(1,false);
    }

    const psw = async () =>{
      let { value: password } = await Swal.fire({
        title: "Introduce el password para "+usuario.value,
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
      let password = await psw();
      //Indicar la hora de inicio e igualar a la hora de termino en el store se hace
      //setear los datos del post en el store
      //post insert en el store
      //password = 'Password123!'
      let res = await evalStore.createEvaluaciones(op, usuario, password)
      if (res)
        EdicionRegistro()
      //resultado
    }

    const termino = async (op, termino) => {
      //Levantar pupop para autenticar al usuario
      let password = await psw();
      //Indicar la hora de termino      
      //setear los datos del put
      //put update
      if(await evalStore.updateEvaluaciones(op, usuario, password, termino)) //Actualiza evaluación
        store.updateSolicitud() //se actualiza datos de solicitud

    }

    const EdicionRegistro = ()=> {disabledRregistro = !disabledRregistro  
      console.log('disabled '+disabledRregistro)
    }

    onMounted(() => {
      console.log('En cardEval '+evalStore.solicitudId)
      evalStore.setRecurso()
      
      if (options.value.perfilId == null){
        alert('No hay perfil ');
        router.push({ name: "EvaluacionList" });
      }else if ()

      console.log(options)
      //if (options.perfilId == lñjkagsdflkjñadfslkñ) FALTA VER LOS PERFILES PARA VISUALIZACIÓN

    });

    return { visibleRegistro,visiblePsico,visibleMedico,visibleAnti,visiblePie,
      disabledRregistro,disabledPsico,disabledMedico,disabledAnti,disabledPie,
      registro, psicologia,medico,antidoping,pie,

      EdicionRegistro,
      ingreso,termino,openExpediente,closeExpediente,expedienteVisible

    };
  },
};
</script>