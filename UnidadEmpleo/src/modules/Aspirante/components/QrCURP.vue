<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal-card">
      <div class="modal-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Revisión de Expediente</h5>
        <button class="btn-close" @click="$emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="row">
          <MaterialInput id="Curp" type="text" label="Curp Qr" name="Curp" placeholder="Escanea QR" v-model="dato.Curp" @change="analitics()" />
        </div>

        <div class="d-flex justify-content-between mt-3">
          <button class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
          <div class="d-flex gap-2">
            <button class="btn btn-gold" :disabled="loading" @click.prevent="onPrevSave" >Terminar</button>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>

import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from "pinia";
import MaterialInput from "@/components/common/MaterialInput.vue";
import { useAspiranteStore } from "@ue/modules/Aspirante/store/useAspiranteStore";
import { getSexoByName } from '../../../services/catalogosDbService';
export default {
  name: 'ExpedienteCompleto',
  components: {    
    MaterialInput,
  },
  props: {
    visible: { type: Boolean, default: false },
    completo:{ type: Boolean, default: false },
    //previewHandler: { type: Function, required: true },
  },
  emits: ['close', 'update:completo'],
  setup(props, { emit }) {
    const store = useAspiranteStore();
    const { aspirante: dato } = storeToRefs(store);
    const foco = ref(false)
    const loading = ref(false)

    const analitics = async () =>{
        console.log(dato.value.Curp)
        const dataCurp = dato.value.Curp.split(']')
        
        dato.value.Curp = dataCurp[0]
        var result = await store.verifyAspiranteByCurp(dato.value.Curp)
        if(result){
            //store.resetSelectedAspirante()
            syncFilters(false)
            alert('Ya existe un elemento con esa CURP')
        }
        else{
            dato.value.Nombre = dataCurp[4]
            dato.value.Apellido_Paterno = dataCurp[2]
            dato.value.Apellido_Materno = dataCurp[3]
            const fechaPaso = dataCurp[6].split("-")
            dato.value.Fecha_Nacimiento = fechaPaso[2]+'-'+fechaPaso[1]+'-'+fechaPaso[0]
            dato.value.Sexo = getSexoByName(dataCurp[5])            
            dato.value.Rfc = dato.value.Curp.substring(0, 10)
        }  
    }


    

    watch(() => props.visible, (v) => {
      if (v) {
        //AQUI PUEDO AGREGAR UNA FUNCIÓN DE VALORES INICIALES
        console.log('whatching ExpedienteCompleto '+v)
      }
    }, { immediate: true })

    function syncFilters(estado) {
      const resultadoout = estado
      emit('update:completo', resultadoout)
      return resultadoout
    }
    
    async function onPrevSave() {
      syncFilters(true)
    }
    

    onMounted(() => {
        
        }
    );

    return { dato, loading, onPrevSave,analitics,foco};
  },
};
</script>

<style scoped>
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1050; }
  .modal-card { background: #fff; border-radius: 8px; width: min(1100px, 98vw); max-height: 90vh; overflow: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.modal-header { padding: 0.75rem 1rem; border-bottom: 1px solid #eee; }
.modal-body { padding: 1rem; }
.btn-close { background: transparent; border: none; font-size: 1.25rem; line-height: 1; }
.btn-gold { background-color: #C9A227; border-color: #C9A227; color: #111827; }
.btn-gold:hover { background-color: #B8931F; border-color: #B8931F; color: #111827; }
.btn-gray { background-color: #6B7280; border-color: #6B7280; color: #ffffff; }
.btn-gray:hover { background-color: #4B5563; border-color: #4B5563; }
.section-title { font-weight: 700; font-size: .9rem; color: #374151; text-transform: uppercase; margin-bottom: .5rem; }
</style>