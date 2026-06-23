import { defineStore } from 'pinia'
import { getCuerpos } from '../../services/grupoService';
 
export const useCuerpoStore = defineStore('proceso', {
  state: () => ({
    cuerpo: [],  
    selectedCuerpo: {
        id: '',
        nombre: '',
        alias: '',
        calle: '',
        numero: 0,
        pais: '',
        codigoPostal: 0,
        estado : '',
        municipio: '',
        colonia: '',
        regiones: []
    },
    activeStep: 0,
    activeClass: 'js-active position-relative',
    formSteps: 2,
    columns: [
      'Id',
      'alias',
      'nombre',
      'regiones',
    ], // Table columns
    rowsCuerpo: [],
    cuerpoTodo: {
        id: 'TODOS',
        nombre: 'TODOS',
        alias: 'TODOS',
        calle: '',
        numero: 0,
        pais: '',
        codigoPostal: 0,
        estado : '',
        municipio: '',
        colonia: '',
        regiones: [{id:-1, region:"TODOS"}],
    }
  }),

  actions: {

    async fetchCuerpo() {
      try {
        if (this.rowsCuerpo.length < 1){
          this.cuerpo = await getCuerpos()
          this.rowsCuerpo = this.cuerpo.map((val) => ({
            id: val.id,
            nombre: val.nombre,
            alias: val.alias,
            calle: val.calle,
            numero: val.numero,
            pais: val.pais,
            codigoPostal: val.codigoPostal,
            estado : val.estado,
            municipio: val.municipio,
            colonia: val.colonia,
            regiones: val.regiones,
          }));
        }
        
      } catch (error) {
        console.error('Error fetching:', error)
        this.loadingProgress = 0 // Reset progress on error
      }
    },async fetchCuerpoTodo() {
      try {

        this.cuerpo = await getCuerpos()
        this.rowsCuerpo = this.cuerpo.map((val) => ({
            id: val.id,
            nombre: val.nombre,
            alias: val.alias,
            calle: val.calle,
            numero: val.numero,
            pais: val.pais,
            codigoPostal: val.codigoPostal,
            estado : val.estado,
            municipio: val.municipio,
            colonia: val.colonia,
            regiones: val.regiones,
        }));
        this.rowsCuerpo.unshift(this.cuerpoTodo);
        //this.rowsCuerpo.push(this.cuerpoTodo);
      console.log(this.rowsCuerpo)
      } catch (error) {
        console.error('Error fetching:', error)
        this.loadingProgress = 0 // Reset progress on error
      }
    },
    reset() {      

      this.selectedCuerpo = {
        id: '',
        nombre: '',
        alias: '',
        calle: '',
        numero: 0,
        pais: '',
        codigoPostal: 0,
        estado : '',
        municipio: '',
        colonia: '',
        regiones: []
    }
        this.fetchCuerpo();
    },
    // Step-based navigation actions
    nextStep() {
      if (this.activeStep < this.formSteps) {
        this.activeStep += 1
      }
    },
    prevStep() {
      if (this.activeStep > 0) {
        this.activeStep -= 1
      }
    },
    setActiveStep(step) {
      if (step >= 0 && step <= this.formSteps) {
        this.activeStep = step
      }
    },
    // Action to reset the selectedProcess
    resetSelected() {
      this.selectedCuerpo = {
        id: '',
        nombre: '',
        alias: '',
        calle: '',
        numero: 0,
        pais: '',
        codigoPostal: 0,
        estado : '',
        municipio: '',
        colonia: '',
        regiones: []
      }
    },
    // Action to update the selectedProcess
    updateSelected(field, value) {
      if (Object.prototype.hasOwnProperty.call(this.selectedCuerpo, field)) {
        this.selectedCuerpo[field] = value
      }
    },
  },
})
