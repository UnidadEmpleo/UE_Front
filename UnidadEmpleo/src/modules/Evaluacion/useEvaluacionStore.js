import { defineStore } from 'pinia'
import localStorageService from "@/utils/localStorageService";
import {getEvaluacion, getEvaluaciones, createEvaluation, updateEvaluation } from '../../services/evaluacionService';

export const useEvaluacionStore = defineStore('evaluacion', {
  state: () => ({
    registro: 
    {
        "id": 0,
        "ingreso": '',
        "salida": '',
        "resultado": '',
        "observaciones": '',
        "revalorable": false,
        "idSoliciud": 0,
        "tipoEvaluacion": 0,
        "usuarioSalida": '',
        "usuarioIngreso": '',
        "usuarioEvaluo": '',
        "nombreUsuarioEvaluo": ''
    },
    psicologia: 
    {
        "id": 0,"ingreso": "","salida": "","resultado": false,
        "observaciones": "Observaciones","revalorable": false,"idSoliciud": 0,
        "tipoEvaluacion": 2,  "usuarioEvaluo":"","nombreUsuarioEvaluo":""
    },
    medico: 
    {
        "id": 0,"ingreso": "","salida": "","resultado": false,
        "observaciones": "Observaciones","revalorable": false,"idSoliciud": 0,
        "tipoEvaluacion": 3,  "usuarioEvaluo":"","nombreUsuarioEvaluo":""
    },
    antidoping: 
    {
        "id": 0,"ingreso": "","salida": "","resultado": false,
        "observaciones": "Observaciones","revalorable": false,"idSoliciud": 0,
        "tipoEvaluacion": 4,  "usuarioEvaluo":"","nombreUsuarioEvaluo":""
    },
    pie: 
    {
        "id": 0,"ingreso": "","salida": "","resultado": false,
        "observaciones": "Observaciones","revalorable": false,"idSoliciud": 0,
        "tipoEvaluacion": 5,  "usuarioEvaluo":"","nombreUsuarioEvaluo":""
    },
    solicitudId:0,
    activeStep: 0,
    activeClass: 'js-active position-relative',
    formSteps: 4,
    rowsEvaluaciones: [],
    options : {
            cuerpoId:'',//useMainStore.externalUser.cuerpoId,
            regionId:0,//useMainStore.externalUser.regionId,
            perfilId:0,//useMainStore.externalUser.perfilId,
            situacion:2,
    },
    cuerpoSelected:0,
    regionSelected:0,
    regionEnable:false,
    situacionEnable:false,
    cuerpoEnable:false,

    columns: ["id",
        "ingreso",
        "salida",
        "resultad",
        "observaciones",
        "revalorable",
        "idSoliciud",
        "tipoEvaluacion","usuarioEvaluo",
        "nombreUsuarioEvaluo"], 
  }),
  
  actions: {
    async fetchEvaluaciones(solicitudId) {
        try {
          
          const evaluaciones = await getEvaluaciones(solicitudId)        
          this.rowsEvaluaciones = evaluaciones.map((ev) => ({
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
          }))
          
          let a=false,b=false,c=false,d=false,p=false;
          
          this.rowsEvaluaciones.forEach(e => {
            
            switch (e.tipoEvaluacion) {
              case 1:
                a = true
                this.registro = e;
                break;
              case 2:
                b = true
                this.medico = e;
                break;
              case 3:
                c = true                
                this.psicologia = e;
                break;
              case 4:
                d = true
                this.antidoping = e;
                break;
              case 5:
                p = true
                this.pie = e;
                break;
            }
          });

          if (!a)
            this.resetRegistro()
          if (!b)
            this.resetMedico()
          if (!c)
            this.resetPsicologia()
          if (!d)
            this.resetAntidoping()
          if (!p)
            this.resetPie()
        } catch (error) {
          console.error('Error fetching lists:', error)
          this.loadingProgress = 0 // Reset progress on error
        }
      },

    //Definir donde quedara este paso.
    async createEvaluaciones(tipo, usuario, password) {
      let result;
      //try {
       
        switch (tipo) {
          case 1:
            this.registro.idSoliciud = this.solicitudId
            this.registro.ingreso = new Date()
            result = await createEvaluation(this.registro, usuario, password)
            if (result.success){
              this.registro.id = result.data
              return true
            }
            this.registro.ingreso = ""
            return false
            
          case 2:
            this.medico.idSoliciud = this.solicitudId
            this.medico.ingreso = new Date()
            result = await createEvaluation(this.medico,usuario, password)
            if (result.success){
              this.medico.id = result.data
              return true;
            }
            this.medico.ingreso = ""
            return false;
            
          case 3:
            this.psicologia.idSoliciud = this.solicitudId
            this.psicologia.ingreso = new Date()
            result = await createEvaluation(this.psicologia,usuario, password)
            if (result.success){
              this.psicologia.id = result.data
              return true
            }
            this.psicologia.ingreso = ""
            return false

          case 4:
            this.antidoping.idSoliciud = this.solicitudId
            this.antidoping.ingreso = new Date()
            result = await createEvaluation(this.antidoping,usuario, password)
            if (result.success){
              this.antidoping.id = result.data
              return true;
            }
            this.antidoping.ingreso = ""
            return false;

          case 5:
            this.pie.idSoliciud = this.solicitudId
            this.pie.ingreso = new Date()
            result = await createEvaluation(this.pie,usuario, password)
            if (result.success){
              this.pie.id = result.data
              return true;
            }
            this.pie.ingreso = ""
            return false;
        }
       /* 
      } catch (error) {
        console.error('Error al crear las evaluaciones:', error)
      }*/
    },
    
    async updateEvaluaciones(tipo, usuario, password, termino) {
      try {      
        
        switch (tipo) {
          case 1:
            if (termino)
              this.registro.salida = new Date();
            
            if (!await updateEvaluation(this.registro,usuario, password,termino))
              console.log('Error')
            else
              if (!termino){
                const data = await getEvaluacion(this.registro.id);
                if (!Array.isArray(data) || data.length > 0) {
                  this.registro.nombreUsuarioEvaluo = data.nombreUsuarioEvaluo
                }
              }
              
            break;
          case 2:
            if (termino)
              this.medico.salida = new Date()

            if (!await updateEvaluation(this.medico,usuario, password,termino))
              console.log('Error')
            else
              if (!termino){
                const data = await getEvaluacion(this.medico.id);
                if (!Array.isArray(data) || data.length > 0) {
                  this.medico.nombreUsuarioEvaluo = data.nombreUsuarioEvaluo
                  console.log('el dato se ha actualizado '+this.medico.nombreUsuarioEvaluo)
                }
              }            
            break;
          case 3:
            if (termino)
              this.psicologia.salida = new Date()
            
            if (!await updateEvaluation(this.psicologia,usuario, password,termino))
              console.log('Error')
            else
              if (!termino){
                const data = await getEvaluacion(this.psicologia.id);
                if (!Array.isArray(data) || data.length > 0) {
                  this.psicologia.nombreUsuarioEvaluo = data.nombreUsuarioEvaluo
                  console.log('el dato se ha actualizado '+this.psicologia.nombreUsuarioEvaluo)
                }
              }
            break;
          case 4:
            if (termino)
              this.antidoping.salida = new Date()

            if (!await updateEvaluation(this.antidoping,usuario, password,termino))
              console.log('Error')
            else
              if (!termino){
                const data = await getEvaluacion(this.antidoping.id);
                if (!Array.isArray(data) || data.length > 0) {
                  this.antidoping.nombreUsuarioEvaluo = data.nombreUsuarioEvaluo
                  console.log('el dato se ha actualizado '+this.antidoping.nombreUsuarioEvaluo)
                }
              }
            break;
          case 5:
            if (termino)
              this.pie.salida = new Date()
            if (!await updateEvaluation(this.pie,usuario, password,termino))
              console.log('Error')
            else
              if (!termino){
                const data = await getEvaluacion(this.pie.id);
                if (!Array.isArray(data) || data.length > 0) {
                  this.pie.nombreUsuarioEvaluo = data.nombreUsuarioEvaluo
                  console.log('el dato se ha actualizado '+this.pie.nombreUsuarioEvaluo)
                }
              }
            break;
        }
        
      } catch (error) {
        console.error('Error updating Aspirante:', error)
      }
    },

    setRecurso(){
      var externalUser = localStorageService.get("externalUser");
      //Aqui vamos a dar visibilidad a los examenes de acuerdo al perfil
      // Administrador, gerente y subdirector TODAS las evaluaciones con opcion a modificar resultados en espera de que digan
      // las evaluaciones solo con su perfil medico al medico,  psicologico con éste y medico, psicotropico y PIE juntos 
      var userdata = localStorageService.get("userdata");
      this.options.cuerpoId = userdata.cuerpoId;   
      this.options.regionId = userdata.regionId;
      this.options.perfilId = externalUser.perfilId[0];
    },

    nextStep() {
      if (this.activeStep < this.formSteps) {
        this.activeStep += 1;
      }
    },
    prevStep() {
      if (this.activeStep > 0) {
        this.activeStep -= 1;
      }
    },
    setActiveStep(step) {
      if (step >= 0 && step <= this.formSteps) {
        this.activeStep = step;
      }
    },
    resetRegistro() {    
      this.registro=  {
        "id": 0,"ingreso": '',"salida": '',"resultado": false,"observaciones": '',"revalorable": false,"idSoliciud": 0,"tipoEvaluacion": 1,"usuarioSalida": '',
        "usuarioIngreso": '',"usuarioEvaluo": '',"nombreUsuarioEvaluo": ''
      }
    },
    resetMedico() {    
      this.medico =  {
        "id": 0,"ingreso": '',"salida": '',"resultado": false,"observaciones": '',"revalorable": false,"idSoliciud": 0,"tipoEvaluacion": 2,"usuarioSalida": '',
        "usuarioIngreso": '',"usuarioEvaluo": '',"nombreUsuarioEvaluo": ''
      }
    },
    resetPsicologia() {    
      this.psicologia =  {
        "id": 0,"ingreso": '',"salida": '',"resultado": false,"observaciones": '',"revalorable": false,"idSoliciud": 0,"tipoEvaluacion": 3,"usuarioSalida": '',
        "usuarioIngreso": '',"usuarioEvaluo": '',"nombreUsuarioEvaluo": ''
      }
    },
    resetAntidoping() {    
      this.antidoping =  {
        "id": 0,"ingreso": '',"salida": '',"resultado": false,"observaciones": '',"revalorable": false,"idSoliciud": 0,"tipoEvaluacion": 4,"usuarioSalida": '',
        "usuarioIngreso": '',"usuarioEvaluo": '',"nombreUsuarioEvaluo": ''
      }
    },
    resetPie() {    
      this.pie =  {
        "id": 0,"ingreso": '',"salida": '',"resultado": false,"observaciones": '',"revalorable": false,"idSoliciud": 0,"tipoEvaluacion": 5,"usuarioSalida": '',
        "usuarioIngreso": '',"usuarioEvaluo": '',"nombreUsuarioEvaluo": ''
      }
    },
    resetAll(){
      this.resetRegistro();
      this.resetMedico();
      this.resetPsicologia();
      this.resetAntidoping();
      this.resetPie();
    }
  },
})
