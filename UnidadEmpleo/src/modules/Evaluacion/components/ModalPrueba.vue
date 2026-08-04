<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal-card">
      <div class="modal-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">{{ title }}</h5>
        <button class="btn-close" @click="$emit('close')">×</button>
      </div>
      <div class="modal-body">
        <!-- Selección de datos -->
        <div class="section-title">Evaluaciones de Aspirante</div>

           ¡¡¡¡¡ Vamonos al angel !!!!!

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
import { defineComponent,  watch } from 'vue'

export default defineComponent({
  name: 'ModalPrueba',
  components: {    
    
  },
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: '' },
    completo:{ type: Boolean, default: false },   
  },
  emits: ['close', 'update:completo'],
  setup(props, { emit }) {      

    
    // Inicializa los filtros locales y limpia la vista previa al abrir/cerrar el modal
    watch(() => props.visible, (v) => {
      if (v) {
        //AQUI PUEDO AGREGAR UNA FUNCIÓN DE VALORES INICIALES
        console.log('whatching ExpedienteCompleto '+v)
      }
    }, { immediate: true })

    async function onPrevSave() {
      syncFilters(true)
    }

    function syncFilters(estado) {
      const resultadoout = estado
      emit('update:completo', resultadoout)
      return resultadoout
    }

    

    return { onPrevSave}
  }
})
</script>

<style scoped>
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1050; }
.modal-card { background: #fff; border-radius: 8px; width: min(1100px, 95vw); max-height: 90vh; overflow: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.modal-header { padding: 0.75rem 1rem; border-bottom: 1px solid #eee; }
.modal-body { padding: 1rem; }
.btn-close { background: transparent; border: none; font-size: 1.25rem; line-height: 1; }
.btn-gold { background-color: #C9A227; border-color: #C9A227; color: #111827; }
.btn-gold:hover { background-color: #B8931F; border-color: #B8931F; color: #111827; }
.btn-gray { background-color: #6B7280; border-color: #6B7280; color: #ffffff; }
.btn-gray:hover { background-color: #4B5563; border-color: #4B5563; }
.section-title { font-weight: 700; font-size: .9rem; color: #374151; text-transform: uppercase; margin-bottom: .5rem; }
.section-subtitle { font-weight: 600; font-size: .85rem; color: #6B7280; text-transform: uppercase; margin: .75rem 0 .25rem 0; }
.form-check { display: inline-flex; align-items: center; gap: .35rem; }
</style>