<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal-card" :style="{ width, height }">
      <div class="modal-header d-flex justify-content-between align-items-center">

        <h5 class="mb-0">Cambiar contraseña</h5>
        <button class="btn-close" @click="$emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="d-flex justify-content-center align-items-center">
           <i class="material-icons-round me-2">shield-lock</i>
        
        </div>
        <div class="card ">
             <form role="form" class="text-start mt-2" @submit.prevent="login">
                <div class="mb-3">
                  <material-input id="password" v-model="data.password" type="password" label="Constraseña actual"
                    autocomplete="current-password" name="password"  onke></material-input>                  
                </div>
                
                <div class="mb-3">
                  <material-input id="password1" v-model="data.password1" type="password" label="Nueva Constraseña"
                    autocomplete="current-password" name="password" onke></material-input>
                </div>

                <div class="mb-3">
                  <material-input id="password2" v-model="data.password2" type="password" label="Confirme Nueva Constraseña"                     
                  autocomplete="current-password" name="password" onke></material-input>
                </div>

              
                <div class="d-flex justify-content-between mt-3">
                  <button class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
                  <div class="d-flex gap-2">
                    <button class="btn btn-gold" :disabled="loading" @click.prevent="onPrevSave">Terminar</button>
                  </div>
                </div>
              
              </form>
        </div>
        
      </div>
    </div>
  </div>
  
</template>

<script>
import { ref, watch } from 'vue';
import { useMainStore } from '@/store/useMainStore' 
import MaterialInput from "@/components/common/MaterialInput.vue";

export default {
  name: 'ExpedienteCompleto',
  components: {    
    MaterialInput,
    
  },
  props: {
    visible: { type: Boolean, default: false },
    completo:{ type: Boolean, default: false },
    width: { type: String, default: '400px' },
    height: { type: String, default: 'auto' }
  },
  emits: ['close', 'update:completo'],
  setup(props, { emit }) {
    const data = ref({password:'', password1:'', password2:''})
    const mainStore = useMainStore();
    watch(() => props.visible, (v) => {
      if (v) {
        console.log('. '+v)
      }
    }, { immediate: true })

    function syncFilters(value) {      
      emit('update:completo', data)
      return value;
    }
    
    async function onPrevSave() {
      let isValid = true;
      if (!data.value.password){ 
          isValid = false;       
          mainStore.triggerAlert({message: "Capture la contraseña actual",color: "warning",icon: "warning",});
          return
        }
      if (!data.value.password1){ 
          isValid = false;       
          mainStore.triggerAlert({message: "Capture la contraseña nueva",color: "warning",icon: "warning",});
          return
        }
      if (!data.value.password2){ 
          isValid = false;       
          mainStore.triggerAlert({message: "Confirme la contraseña nueva",color: "warning",icon: "warning",});
          return
        }

      if (data.value.password2 != data.value.password1){ 
          isValid = false;       
          mainStore.triggerAlert({message: "La contraseña nueva y su confirmación no coinciden",color: "warning",icon: "warning",});
          return
        }
      if (isValid){
        syncFilters(isValid)        
      }
      
    }
    
    return { data,  onPrevSave,};
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