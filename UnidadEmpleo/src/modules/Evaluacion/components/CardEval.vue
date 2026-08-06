<template>

        <div class="card bg-custom " :style="{display: disabledDat}">
          <div class="card-header d-flex justify-content-between">
            <div  class="col-sm-6"> 
              <h3>{{ visualData[data.tipoEvaluacion-1].title }} </h3> 
            </div>            
            <div ><label>{{ data.id }}</label></div>
          </div>
          
          <div class="card col-sm-12"> 
              
            <material-button color="warning" size="sm" @click.prevent="ingreso(data.tipoEvaluacion)" 
            :disabled=" noPermiso.includes(options.perfilId)?  (options.perfilId == 3 && data.tipoEvaluacion ==1 ? data.ingreso.length == 0? disabledDat:true:true) :  data.ingreso.length == 0? disabledDat:true">Ingreso</material-button>
            <label  class="form-label  col-sm-auto"> {{ data.ingreso }}</label>            
          </div>

          <div class="card col-sm-12"> 
            
            <!--{{ disabledDat }}, {{ data.tipoEvaluacion }}, {{data.nombreUsuarioEvaluo}}-->
            <material-button color="success" size="sm" @click.prevent="termino(data.tipoEvaluacion, true, false)" :disabled="(data.salida == null || data.salida.length == 0) && data.salida != data.ingreso? disabledDat: true">Salida</material-button>
              <label  class="form-label col-sm-auto"> {{ data.salida }}</label>
          </div>

          <div class="row"> 
            <label  class="form-label font-weight-bolder col-sm-auto col-form-label-lg">{{visualData[data.tipoEvaluacion-1].subtitle}} </label>
          </div>

          <div v-if="data.tipoEvaluacion == 1" class="row col-sm-5 justify-content-start">
            <div class="row justify-content-center">
              <div class="col-sm-auto">
                <material-switch  id="resultado" name="resultado" :disabled="true" :label=visualData[data.tipoEvaluacion-1].op1  v-model:checked="data.resultado" />      
              </div>
              <hr>                    
              <div class="col-sm-auto">
                <material-switch  id="revalorables" name="revalorable" :disabled="disabledDat" :label= visualData[data.tipoEvaluacion-1].revalorable v-model:checked="data.revalorable" />              
              </div>
            </div>
            
            <ExpedienteCompleto 
                :visible="expedienteVisible"
                @update:completo="v => closeExpediente(v)"
                @close="expedienteVisible = false"
              />   
            
          </div>

          <div v-if="data.tipoEvaluacion > 1" class="col-sm-auto ">
              <div class="row justify-content-center">
                <div class="col-sm-auto">
                  <input class="form-check-input" type="radio" id="true" value="true" v-model="data.resultado" />
                  <label for="one">{{ visualData[data.tipoEvaluacion-1].op1 }}</label>
                </div>
                <div class="col-sm-auto">
                  <input class="form-check-input"  type="radio" id="false" value="false"  v-model="data.resultado"/>
                  <label for="two">{{ visualData[data.tipoEvaluacion-1].op2 }}</label>
                </div>
              </div>
              <hr>
              <div class="col-sm-auto d-flex justify-content-between ">
                -
                <material-switch  id="revalorable" name="revalorable" :disabled="disabledDat" :label=visualData[data.tipoEvaluacion-1].revalorable  v-model:checked="data.revalorable" />    
                <MaterialButton id="ev-nueva" color="secondary" variant="outline" @click.prevent="nuevaValoracion()"
                  :disabled="(!data.revalorable && !existePar(options.perfilId, data.tipoEvaluacion))"> Nueva valoración </MaterialButton>                  
              </div>
                 
          </div>

          <div>
            <RichTextEditor id="obs" label="Observaciones" v-model="data.observaciones" is-required :disabled="disabledDat"/>
          </div>
          <div v-if=" data.tipoEvaluacion == 1" >             
            <material-button  color="primary" variant="gradient" size="sm" @click.prevent="openExpediente()"  
            :disabled="(data.salida == null || data.salida.length == 0)? false:(data.observaciones? false:disabledDat) ">
            {{ visualData[data.tipoEvaluacion-1].validar }}</material-button>
            <label  class="form-label col-sm-auto label" >{{ data.nombreUsuarioEvaluo }} </label>
          </div>

          <div v-if=" data.tipoEvaluacion > 1">
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="termino(5,false,true)" :disabled=" (data.salida == null || data.salida.length == 0)? true:disabledDat">{{ visualData[data.tipoEvaluacion-1].validar }}</material-button>
            <label  class="form-label col-sm-auto label" >{{ data.nombreUsuarioEvaluo }} </label>
      
          </div>
        </div>

</template>

<style>
.label {font: italic small-caps bold 12px/2 cursive;}

.bg-custom {
    background-color: rgba(239, 248, 188, 0.6);
    color: black;
}
</style>

<script>

import { useMainStore } from '@/store/useMainStore.js'
import { useEvaluacionStore } from '../useEvaluacionStore.js'
import { useSolicitudStore } from "@ue/modules/Solicitud/store/solicitudStore.js"
import ExpedienteCompleto from './ExpedienteCompleto.vue'
import MaterialButton from '../../../../../src/components/common/MaterialButton.vue'
import MaterialSwitch from "@/components/common/MaterialSwitch.vue"
import Swal from 'sweetalert2'
import RichTextEditor from '@/components/common/RichTextEditor.vue'
import { storeToRefs } from "pinia"
import { ref } from 'vue'


export default {
  name: "SolicitudDatosBasicos",
  components: {
    MaterialButton,MaterialSwitch,
    RichTextEditor,ExpedienteCompleto
  },
  props: {    
    disabledData:{type:Boolean, default: false},
    tipo:{type:Number, default: 1},    
    valor: {"id": 0,
        "ingreso": '',
        "salida": '',
        "resultado": '',
        "observaciones": '',
        "revalorable": false,
        "idSoliciud": 0,
        "tipoEvaluacion": 1,
        "usuarioSalida": '',
        "usuarioIngreso": '',
        "usuarioEvaluo": '',
        "nombreUsuarioEvaluo": ''}
  },
  emits: ['addEvaluation'],
  setup(props, { emit }) {
    
    const store = useMainStore();    
    const evalStore = useEvaluacionStore()
    const { options } = storeToRefs(evalStore);
    const usuario = store.externalUser.username;
    const solicitudStore = useSolicitudStore();
    const { solicitud: sol } = storeToRefs(solicitudStore);
    const visualData = [      
      {tipo : 1, title :'REGISTRO', subtitle :'DOCUMENTACIÓN', op1:'Expediente completo', op2:'' , revalorable:'Concluye evaluación', validar:'Validar registro'},
      {tipo : 2, title :'M É D I C O', subtitle :'RESULTADO', op1:'APTO', op2:'NO APTO' , revalorable:'Revalorable', validar:'Validar médico'},
      {tipo : 3, title :'PSICOLOGÍA', subtitle :'RESULTADO', op1:'APTO', op2:'NO APTO' , revalorable:'Revalorable', validar:'Validar psicología'},
      {tipo : 4, title :'ANTIDOPING', subtitle :'RESULTADO', op1:'NEGATIVO', op2:'POSITIVO' , revalorable:'Revalorable', validar:'Validar antidoping'},
      {tipo : 5, title :'P I E ', subtitle :'RESULTADO', op1:'NEGATIVO', op2:'POSITIVO' , revalorable:'Revalorable', validar:'Validar PIE'}
    ]
    const noPermiso=[1,2,3,8]
    const activaRevaloracion = [[4, 3],[5, 2],[6, 4],[6, 5]];
    function existePar(a, b) {return activaRevaloracion.some(([x, y]) => x === a && y === b);}
    function nuevaValoracion( ){
       if (existePar(options.value.perfilId, data.value.tipoEvaluacion))        
        emit('addEvaluation',{
          solicitudId: data.value.idSoliciud,
          tipoEvaluacion: data.value.tipoEvaluacion
        })
        else
          Swal.fire({
            icon: "error",
            title: "Sin privilegios",
            text: "¡Solo el especialista puede agregar nueva valoración!",
          });

    }
    const data = ref({
        "id": props.valor.id,
        "ingreso": props.valor.ingreso,
        "salida": props.valor.salida,
        "resultado": props.valor.resultado,
        "observaciones": props.valor.observaciones,
        "revalorable": props.valor.revalorable,
        "idSoliciud": props.valor.idSoliciud,
        "tipoEvaluacion": props.valor.tipoEvaluacion,
        "usuarioSalida": props.valor.usuarioSalida,
        "usuarioIngreso": props.valor.usuarioIngreso,
        "usuarioEvaluo": props.valor.usuarioEvaluo,
        "nombreUsuarioEvaluo": props.valor.nombreUsuarioEvaluo
    })    

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

    const ingreso = async () => {
      //Levantar pupop para autenticar al usuario
      var continuar = false;
      let confirm = await confirmar().then((result) => {
        if (result=='') continuar = false
        else if (result != undefined && result == 'confirmar') continuar = true
        return result
      });

      if (continuar){
        let res = await evalStore.createEvaluaciones(data.value, usuario, confirm)
        if (!res)
          setEmptyDate()

      }

    }

    const setEmptyDate = () =>{
      data.value.salida = ''
    }

    //OPCION 1 a 5 DE ACUERDO AL TIPO DE EVALUACIÓN
    //termino = true se agrega la hora de termino, false: es validación
    //psw valor booleano true: pide password, fals: pide continuar
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
        let resp = await evalStore.updateEvaluaciones(data.value, usuario, dato, termino)        
        if(resp) {//Actualiza evaluación
          if (op == 1 & !termino)
            solicitudStore.fetchSolicitudById(data.value.idSoliciud)
            
        }else
          resp = true;
        
        if (resp && !termino){
            var ev = await evalStore.fetchEvaluacion(data.value.id)
            if (ev !=null)
              data.value = {
                "id": ev.id,
                "ingreso": ev.ingreso,
                "salida": ev.salida,
                "resultado": ev.resultado,
                "observaciones": ev.observaciones,
                "revalorable": ev.revalorable,
                "idSoliciud": ev.idSoliciud,
                "tipoEvaluacion": ev.tipoEvaluacion,
                "usuarioSalida": ev.usuarioSalida,
                "usuarioIngreso": ev.usuarioIngreso,
                "usuarioEvaluo": ev.usuarioEvaluo,
                "nombreUsuarioEvaluo": ev.nombreUsuarioEvaluo
              }

            EdicionRegistro()
        }
            

      }
    }
    const disabledDat = ref(props.disabledData)
    const EdicionRegistro = ()=> {
      if (data.value.tipoEvaluacion > 1)
        disabledDat.value = !disabledDat.value  
    }
    
    const expedienteVisible = ref(false)
    const openExpediente = ()=> {expedienteVisible.value = true}
    const closeExpediente = ()=> {
      
      data.value.resultado = sol.value.statusExp
      expedienteVisible.value = false
      termino(1,false,true);//crea el registro de atn y registro
    }


    return { 
      openExpediente,closeExpediente,expedienteVisible,
      ingreso,termino      
      ,data,visualData,disabledDat,options,noPermiso,existePar,nuevaValoracion
    };
  },
};
</script>