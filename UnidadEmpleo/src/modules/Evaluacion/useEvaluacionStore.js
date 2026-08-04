import { defineStore } from 'pinia'
import localStorageService from "@/utils/localStorageService";
import {getEvaluacion, getEvaluaciones, createEvaluation, updateEvaluation,getTipoEvaluacion } from '../../services/evaluacionService';

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
        "tipoEvaluacion": 1,
        "usuarioSalida": '',
        "usuarioIngreso": '',
        "usuarioEvaluo": '',
        "nombreUsuarioEvaluo": ''
    },    
    solicitudId:0,
    activeStep: 0,
    activeClass: 'js-active position-relative',
    formSteps: 4,
    evaluacion:{
      "id": 0,"ingreso": '',"salida": '',"resultado": false,"observaciones": '',"revalorable": false,"idSoliciud": 0,"tipoEvaluacion": 1,"usuarioSalida": '',
        "usuarioIngreso": '',"usuarioEvaluo": '',"nombreUsuarioEvaluo": ''
    },
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
    sexo:false,
    columns: ["id",
        "ingreso",
        "salida",
        "resultad",
        "observaciones",
        "revalorable",
        "idSoliciud",
        "tipoEvaluacion","usuarioEvaluo",
        "nombreUsuarioEvaluo"], 
    visiblePsico : "flex",
    visibleMedico : "flex",
    visibleAnti : "flex",
    visiblePie : "flex",
    
    disabledPsico : false,
    disabledMedico : false,
    disabledAnti : false,
    disabledPie : false,
  }),
  
  actions: {
    async fetchEvaluaciones(solicitudId, mujer) {
      
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

          
          if (this.rowsEvaluaciones.length==0)
            this.setInitBasico(0,mujer==0,solicitudId)
          else{
            console.log('que pedo')
            for (let i = 1; i<6; i++){                
                let x = this.rowsEvaluaciones.find((e) => e.tipoEvaluacion == i)       
                try{
                  x.tipoEvaluacion
                }catch{                  
                  this.setInitBasico(i,i==5? mujer==0:false,solicitudId)          
                }
            }
            this.rowsEvaluaciones.sort((a, b) => a.tipoEvaluacion - b.tipoEvaluacion) 
          }
          
        } catch (error) {
          console.error('Error fetching lists:', error)
          this.loadingProgress = 0 // Reset progress on error
        }
      },
    
      async fetchTipoEvaluacion(solicitudId, tipo, tipo5) {
        try {

          const evaluaciones = await getTipoEvaluacion(solicitudId, tipo, tipo5)

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
          
          if (this.rowsEvaluaciones.length == 0){
            this.setInitBasico(tipo,tipo5==5,solicitudId)
          }
          
        } catch (error) {
          console.error('Error fetching lists:', error)
          this.loadingProgress = 0 // Reset progress on error
        }
      },

    async fetchEvaluacion(id) {
        try {
          const evaluacion = await getEvaluacion(id)
          return evaluacion         
        } catch (error) {
          console.error('Error fetching lists:', error)
          this.loadingProgress = 0 // Reset progress on error
          return null
        }
      },

    //Definir donde quedara este paso.
    async createEvaluaciones(ev, usuario, password) {
            ev.ingreso = new Date()
            //console.log(ev.ingreso)
            //ev.idSoliciud = this.solicitudId
            ev.usuarioIngreso = usuario
            
            let result = await createEvaluation(ev, usuario, password)
            if (result.success){
              ev.id = result.data
              return ev
            }
            ev.ingreso = ""
            return false
     
    },
    
    async updateEvaluaciones(ev, usuario, password, termino) {
      try {      
        
            if (termino)
              ev.salida = new Date();
            
            if (!await updateEvaluation(ev,usuario, password,termino))
              return false;  
            else
              if (!termino){
                const data = await getEvaluacion(ev.id);
                if (!Array.isArray(data) || data.length > 0) {
                  this.registro.nombreUsuarioEvaluo = data.nombreUsuarioEvaluo
                }
              }
            return true; 
        
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

    setInitBasico(tipo, femenino, idSol){    
      if (tipo == 0){
        for (let i = 1; i<5; i ++)
          this.initEvaluacion(idSol,i)        
        console.log('0 basic')
      }
      else if (tipo >= 1 && tipo <=4)
        this.initEvaluacion(idSol,tipo)
      
      if (femenino)
            this.initEvaluacion(idSol,5)
        
    },

    initEvaluacion(idSol = 0, tipo) {  
      this.rowsEvaluaciones.push(  {
        "id": 0,"ingreso": '',"salida": '',"resultado": false,"observaciones": '',"revalorable": false,"idSoliciud": idSol,"tipoEvaluacion": tipo,"usuarioSalida": '',
        "usuarioIngreso": '',"usuarioEvaluo": '',"nombreUsuarioEvaluo": ''
      })
    },
    resetAll(){
      
      this.options = {
            cuerpoId:'',
            regionId:0,
            perfilId:0,
            situacion:2,
      }
    }
  },
})
