import { defineStore } from 'pinia';
import {selectIndicadores} from "@ue/services/ejecutivoService"

export const useEjecutivoStore = defineStore('ejecutivo', {
  state: () => ({
    indicadores: [
        { key: 0, label:"Evaluando",value: 10,amount: null,suffix: 'sufijo',mainIsCurrency: false, meta: null,},
        { key: 1, label:"Aptos",value: 10,amount: null,suffix: 'sufijo',mainIsCurrency: false,},
        { key: 2, label:"No Aptos",value: 4,amount: null,suffix: 'sufijo',mainIsCurrency: false,},
        { key: 2, label:"Captura",value: 2,amount: null,suffix: 'sufijo',mainIsCurrency: false,},
    ],
    filters: createDefaultFilters(),
    loading: false,
    error: null,
  }),
  getters: {
    hasData: (state) => !!state.indicadores?.length,
  },
  actions: {
    async loadIndicadores(nextFilters) {
       var data = await selectIndicadores(nextFilters);
       this.indicadores = [];
       this.indicadores = data.map((ind) => (
            { 
                key: ind.key, label:ind.label,value: ind.value, amount: null,suffix: ind.suffix,mainIsCurrency: false, meta: null,
            }))
    },

    
    resetFilters() {
      this.filters = createDefaultFilters();
    },
  }
});


// *************
// SE QUEDA MODIFICADO
// **
function createDefaultFilters() {
  return {
    coporacionId: '',
    regionId: -1,
    fechaDesde: '',
    fechaHasta: '',
  };
}
/*
function coerceFilters(source = {}) {
  const result = createDefaultFilters();
  if ('corporacionId' in source) {
    const value = toStringValue(source.corporacionId);
    result.corporacionId = value && value !== 'null' ? value : '';
  }
  if ('regionId' in source) {
    result.regionId = source.regionId;
  }
  if ('fechaDesde' in source) {
    result.fechaDesde = toDateString(source.fechaDesde);
  }
  if ('fechaHasta' in source) {
    result.fechaHasta = toDateString(source.fechaHasta);
  }
  return result;
}

function toStringValue(value) {
  if (Array.isArray(value)) return value[0] != null ? String(value[0]).trim() : '';
  return value != null ? String(value).trim() : '';
}

function toDateString(value) {
  const str = toStringValue(value);
  return str ? str.slice(0, 10) : '';
}

*/
