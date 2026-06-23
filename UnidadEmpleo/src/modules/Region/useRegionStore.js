import { defineStore } from 'pinia'

import { getSistemas } from "@mod1/services/sistemaDbService.js";
 
export const useSistemaStore = defineStore('sistema', {
  state: () => ({
    region: [],  
    selectedRegion: {
      id: null,
      region: '',
    },   
    activeStep: 0,
    activeClass: 'js-active position-relative',
    formSteps: 2,
    columns: [
      'id',
      'region',
    ], // Table columns
    rowsRegiones: [],
  }),
  
  actions: {
    async fetchRegion() {
      try {
       
        

      } catch (error) {
        console.error('Error fetching:', error)
        this.loadingProgress = 0 // Reset progress on error
      }
    },
 },
})
