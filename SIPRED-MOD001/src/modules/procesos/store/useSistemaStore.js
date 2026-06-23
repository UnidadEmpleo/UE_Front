import { defineStore } from 'pinia'

import { getSistemas } from "@mod1/services/sistemaDbService.js";
 
export const useSistemaStore = defineStore('sistema', {
  state: () => ({
    proceso: [],  
    selectedSistema: {
      id: null,
      descripcion: '',
      name: '',
      nombre: '',
      activo: true,   
    },   
    activeStep: 0,
    activeClass: 'js-active position-relative',
    formSteps: 2,
    columns: [
      'id',
      'nombre',
      'activo',
    ], // Table columns
    rowsSistemas: [],
    listaSistema:[]
  }),
  
  actions: {
    async fetchSistema() {
      try {
       
        this.sistema = await getSistemas()
        
        this.listaSistema = this.sistema;
      
        this.listaSistema = this.sistema.map((val) => ({
            id: val.id,
            descripcion: val.descripcion,
            name: val.name,
            nombre: val.nombre,
            activo: val.activo,
        }));

        this.listaSistema = this.sistema.map((val) => ({
            id: val.id,
            descripcion: val.descripcion,
            name: val.name,
            nombre: val.nombre,
            activo: val.activo,
        }));

        this.rowsSistemas = this.proceso.map((val) => ({
          id : val.id,
          nombre: val.descr,
          'Sistema': '', // placeholder until backend provides it
          tipo: val.tipo == "A" ? 'AGRUPADOR' : 'PROCESO',
          icono: val.icono,
          activo: val.activo,
          ruta: val.ruta,         
          procesoPadreId: val.procesoPadreId,   
        }));


      } catch (error) {
        console.error('Error fetching:', error)
        this.loadingProgress = 0 // Reset progress on error
      }
    },
 },
})
