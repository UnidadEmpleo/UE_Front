<script setup>
import { ref, watchEffect, watch } from "vue";
import PDF from "pdf-vue3";


const props = defineProps({
  visible: { type: Boolean, default: false },
  completo:{ type: Boolean, default: false },
  IdSolicitud: {type: String, defatul:'00'},
  curp: {type: String, defatul:'unico'},
})
const emit = defineEmits(['close', 'update:completo'])
const isMobile = ref(false);
const page = ref(1);
const scale = ref(1);
const virtual = ref(true);
const pdfRef = ref(null);
const pdfUrl = ref(process.env.VUE_APP_API_BASE_URL+"/Pdf/presolicitud");

const handlePageChange = (newPage) => {
  console.log(`new page: ${newPage}`);
  page.value = newPage;
};

const handleError = (err) => {
  console.error("PDF error:", err);
};

const resize = () => {
  isMobile.value = window.innerWidth < 768;
};

watchEffect(() => {
  resize();
  window.addEventListener("resize", resize);
  return () => {
    window.removeEventListener("resize", resize);
  };
});

/**
 *
 * @param {import('pdf-vue3').PDFDocumentProxy} pdf - The PDF document proxy object.
 * @returns {void}
 */
const handlePdfInit = (pdf) => {
  console.log("PDF init, total pages:", pdf.numPages);
};

  watch(() => props.visible, (v) => {
      if (v) {
        //AQUI PUEDO AGREGAR UNA FUNCIÓN DE VALORES INICIALES
        console.log('whatching ExpedienteCompleto '+v)

        getPdf(props.IdSolicitud)

        console.log('props.IdSolicitud = '+props.curp)
      }
  }, { immediate: true })


  async function getPdf(id){
    pdfUrl.value = process.env.VUE_APP_API_BASE_URL+"/Pdf/presolicitud/"+id
    /*
    try {
      var result = await itmesStore.imprimirSolicitud(id)
      const candidate = (result && result.data && result.data instanceof Blob) ? result.data : result
      const blobCandidate = new Blob(candidate.data, { type: "application/pdf" });
      console.log('candidate '+blobCandidate)
      if (blobCandidate instanceof Blob) {
          if (blobCandidate.type && blobCandidate.type.includes('application/json')) {
            try { const text = await blobCandidate.text(); console.warn('Export devolvió JSON en lugar de archivo:', text) } catch {console.error('Error leyendo blob JSON de exportación')}
          }
          this.pdfUrl = URL.createObjectURL(blobCandidate)
          
      } else if (result?.fileBytes && result?.contentType) {
          const byteChars = atob(result.fileBytes)
          const byteNumbers = Array.from({ length: byteChars.length }, (_, i) => byteChars.charCodeAt(i))
          const byteArray = new Uint8Array(byteNumbers)
          const blob = new Blob([byteArray], { type: result.contentType })
          this.pdfUrl = URL.createObjectURL(blob)
      } else {
          this.pdfUrl =  URL.createObjectURL(blobCandidate.data)
          console.warn('Formato no reconocido', result)
        }
      } catch (e) { console.warn('Export error', e) }  
       */
  }

  function syncFilters(estado) {
      const resultadoout = estado
      emit('update:completo', resultadoout)
      return resultadoout
  }
    
  async function onPrevSave() {
      syncFilters(true)
  }


//const onPrint = () => pdfRef.value?.print();
const onDownload = () => pdfRef.value?.download(props.curp+".pdf");
const onZoomIn = () => (scale.value = Math.min(scale.value + 0.25, 4));
const onZoomOut = () => (scale.value = Math.max(scale.value - 0.25, 0.25));
const onZoomReset = () => (scale.value = 1);

</script>

<template>
<div v-if="visible" class="modal-backdrop">
  <div class="modal-body">
    
    <div class="row">
      <div class="col">
        <label>Pagina </label>
        <input type="number" v-model.number="page" :min="1" />
      </div>
      <div class="col f-flex">
        <label>Escala</label>
        <button @click="onZoomOut">-</button>
        <span>{{ (scale * 100).toFixed(0) }}%</span>
        <button @click="onZoomIn">+</button>
        <button @click="onZoomReset">1:1</button>
      </div>
      <div class="col">
          <input type="checkbox" v-model="virtual" />
          {{ props.curp }}

      </div>
      <div class="col d-flex justify-content-between ">
        <button class ="btn-lg btn-primary" @click="onDownload">Descargar</button>
        <button class="btn btn-outline-primary" @click="$emit('close')">Cancelar</button>
        <button class="btn" :disabled="loading" @click.prevent="onPrevSave" >Terminar</button>
      </div>

    </div>
  
    <div >
      <PDF
        ref="pdfRef"
        :page="page"
        :pdf-width="isMobile ? '100%' : '1020'"
        :row-gap="isMobile ? 4 : 8"
        :scale="scale"
        :virtual="virtual"
        :preload-pages="2"
        :src=pdfUrl
        @on-pdf-init="handlePdfInit"
        @on-page-change="handlePageChange"
        @on-error="handleError"
      >
      </PDF>
    </div>
  </div>
</div>
</template>

<style scoped>

@media (min-width: 768px) {
  ::v-deep(.pdf-vue3-backToTopBtn) {
    right: 32px !important;
  }
}

.tool-bar {
  position: fixed;
  left: 16px;
  bottom: 16px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 0px 4px #777;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 220px;
}

.tool-bar .row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tool-bar label {
  min-width: 50px;
}

.tool-bar input[type="number"] {
  width: 60px;
}

.tool-bar button {
  padding: 2px 8px;
  cursor: pointer;
}
</style>