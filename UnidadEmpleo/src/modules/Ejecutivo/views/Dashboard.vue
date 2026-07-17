<template>
  <div class="container-fluid py-3">
    <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-3">
      <div>
        <h4 class="mb-1">Resumen Ejecutivo</h4>
        <p v-if="filterSummary" class="text-muted small mb-0">{{ filterSummary }}</p>
      </div>
      <button type="button" class="btn btn-outline-primary btn-sm" @click="openFilters" :disabled="loading">
        <i class="ni ni-settings-gear-65 me-1"></i> Filtros
      </button>
    </div>

    <FilterModal :visible="showFilters" @close="closeFilters" @apply="applyFilters">
      <div class="filter-modal-section">
        <label class="form-label small fw-semibold">Fecha inicio</label>
        <input type="date" class="form-control form-control-sm" v-model="modalFilters.fechaDesde" />
      </div>
      <div class="filter-modal-section">
        <label class="form-label small fw-semibold">Fecha fin</label>
        <input type="date" class="form-control form-control-sm" v-model="modalFilters.fechaHasta" />
      </div>
      <div class="filter-modal-section">
        <label class="form-label small fw-semibold">Corporación</label>
        <select class="form-select form-select-sm" v-model="modalFilters.corporacionId" @click="availableRegiones()">
          <option v-for="opt in rowsCuerpo" :key="opt.id" :value="opt.id">
            {{ opt.alias }}
          </option>
        </select>
      </div>
      <div class="filter-modal-section">
        <label for="AreaId" class="form-label">Gerencia o Región</label>
        <select id="AreaId" class="form-control" placeholder="Selecciona el cuerpo" v-model="modalFilters.regionId">
            <option v-for="row in regionesLista" :key="row.id" :value="row.id">
                {{ row.region }}
            </option>
        </select>
      </div>
      <button type="button" class="btn btn-link btn-sm px-0" @click="resetModalFilters">
        Limpiar filtros
      </button>
    </FilterModal>

    <!-- Indicadores -->
    <template v-if="loading">
      <div class="count-summary-skeleton">
        <div v-for="n in 6" :key="n" class="skeleton-item" />
      </div>
    </template>
    <template v-else>
      <CountSummary
        v-if="hasIndicadores"
        :counts="indicatorBoxes"
        @item-click="onIndicatorClick"
      />
      <div v-else class="empty-state small">
        <div class="empty-title">Indicadores</div>
        <div class="empty-text">No hay datos para mostrar.</div>
        <button class="btn btn-sm btn-outline-primary mt-2" :disabled="loading" @click="retryLoad">
          <i class="ni ni-refresh-02 me-1"></i> Reintentar
        </button>
      </div>
    </template>

  </div>
</template>

<script setup>
//*******
//  Filtros de consulta
//*******
import { useCuerpoStore } from "@ue/modules/Cuerpo/useCuerpoStore";
    const cuerpoStore = useCuerpoStore();
    let { rowsCuerpo } = storeToRefs(cuerpoStore); 
    let regionesLista =  ref([]);
    const availableRegiones = () => {
        
        let existe = false;
        for (var i = 0; i<rowsCuerpo.value.length; i++){
            console.log(modalFilters.value.corporacionId)
          if (rowsCuerpo.value[i].id === modalFilters.value.corporacionId){// cuperoSeleccionado.value){
           regionesLista.value = [];
           regionesLista.value =  rowsCuerpo.value[i].regiones           
           regionesLista.value.find((e) => 
           {
            if (e.id == -1){
              existe = true;
            }
          })
          if (!existe)
            regionesLista.value.unshift({id:-1, region:"TODOS"});
          } 
        }
    }


import { useEjecutivoStore } from "../useEjecutivoStore";
import { yyyymmddFecha } from "@ue/services/utilService"
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import CountSummary from '@/components/CountSummary.vue'
import FilterModal from '@/components/FilterModal.vue'

const ejecutivoStore = useEjecutivoStore()
const { indicadores,  loading, filters: appliedFilters } = storeToRefs(ejecutivoStore)


 const indicatorBoxes = computed(() =>
  (indicadores.value || []).map(x => ({
     label: x.label,
     value: x.value,
     amount: typeof x.amount !== 'undefined' ? x.amount : null,
     suffix: x.label === 'PACIENTES ATENDIDOS' ? null : (x.suffix || null),
     mainIsCurrency: !!x.mainIsCurrency,
     meta: x.meta || null,
     key: x.key,
  }))
)

const hasIndicadores = computed(() => (indicadores.value || []).length > 0)

const showFilters = ref(true)
const modalFilters = ref(createModalFilters(appliedFilters.value))

function openFilters() {
  //modalFilters.value = createModalFilters(appliedFilters.value)
  showFilters.value = true
}

function closeFilters() {
  showFilters.value = false
}

function resetModalFilters() {
  modalFilters.value = createModalFilters()
}

function onIndicatorClick() {
  
  const query = buildFilterQuery(appliedFilters.value)
  console.log(query)
  /*
  if (item?.key === 'recetasConInexistencia') {
    router.push({ name: 'MedicamentosInexistentesList', query })
    return
  }
  // Open generic DireccionDetalle by default for 'medicamentoInexistente'
  if (item?.key === 'medicamentoInexistente') {
    router.push({ name: 'DireccionDetalle', query })
    return
  }
  if (item?.key === 'medicamentoControlado') {
    router.push({ name: 'MedicamentosControladosList', query })
    return
  }
  console.log('Navigating to DireccionDetalle with tipo:', item?.key);
  router.push({ name: 'DireccionDetalle', query: { ...query, tipo: item?.key } })
  */
}

async function applyFilters() {  
  const payload = {
    fechaDesde: modalFilters.value.fechaDesde,
    fechaHasta: modalFilters.value.fechaHasta,
    corporacionId: modalFilters.value.corporacionId,
    regionId: modalFilters.value.regionId,    
  }
  
  await ejecutivoStore.loadIndicadores(payload)
  
  //showFilters.value = false
}

onMounted(async () => {
  cuerpoStore.fetchCuerpoTodo();  
  var hoy = new Date();
  
  modalFilters.value = {
    fechaDesde: yyyymmddFecha(hoy),
    fechaHasta: yyyymmddFecha(hoy),
    corporacionId: "TODOS",
    regionId: -1,    
  }
  
  await ejecutivoStore.loadIndicadores(modalFilters.value)
})

async function retryLoad() {
    //Carga de datos
  //await direccionStore.loadAll(direccionStore.filters)
}

function buildFilterQuery(current = {}) {
  const query = {}
  if (current?.fechaDesde) query.fechaDesde = current.fechaDesde
  if (current?.fechaHasta) query.fechaHasta = current.fechaHasta
  if (current?.farmaciaId) {
    query.corporacionId = current.corporacionId
    if (current?.corporacionNombre) query.corporacionNombre = current.corporacionNombre
  }
  return query
}


function createModalFilters(source = {}) {
  const defaults = getDefaultDateRange()
  const wrap = value => (value === null || typeof value === 'undefined' ? undefined : String(value))
  return {
    fechaDesde: wrap(source?.fechaDesde) ?? defaults.fechaDesde,
    fechaHasta: wrap(source?.fechaHasta) ?? defaults.fechaHasta,
    corporacionId: source?.corporacionId || '',
    regionId:source?.regionId || '',
    corporacionNombre: source?.coroporacionNombre || 'default aqui',
  }
}

/*
function asString(value) {
  if (Array.isArray(value)) return value[0] != null ? String(value[0]) : ''
  if (value == null) return ''
  return String(value)
}
*/

function getDefaultDateRange() {
  const now = new Date()
  const start = yyyymmddFecha(now)
  const end = yyyymmddFecha(now)
  return {
    fechaDesde: start,
    fechaHasta: end
  }
}

</script>

<style scoped>
.count-summary-skeleton {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1rem;
}
.skeleton-item {
  width: 140px;
  height: 72px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f0f3f7 25%, #e6eaf0 37%, #f0f3f7 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}
.chart-skeleton {
  width: 100%;
  height: 380px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f0f3f7 25%, #e6eaf0 37%, #f0f3f7 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}
/* Empty state */
.empty-state {
  width: 100%;
  background: #fff;
  border: 1.5px dashed #d7dde7;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  text-align: center;
}
.empty-state.small { padding: 1.25rem; }
.empty-state.tall { height: 380px; padding: 1rem; }
.empty-title { font-weight: 600; color: #334155; margin-bottom: 0.25rem; }
.empty-text { font-size: 0.95rem; }
.filter-modal-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}
@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
</style>
