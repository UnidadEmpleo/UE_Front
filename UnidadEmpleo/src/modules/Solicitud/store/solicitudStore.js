import { defineStore } from 'pinia'
import localStorageService from "@/utils/localStorageService";
import {getSolicitudById,getItems,getItemsByAspirante,getItemsByOptions,createItem,updateItem,deleteItem,} from '@ue/services/solicitudService.js'
import { getStatusSolicitudById } from '../../../services/catalogosDbService';
import { getSexoById } from "@ue/services/catalogosDbService"
import { useMainStore } from '@/store/useMainStore.js'

export const useSolicitudStore = defineStore('solicitud', {
  state: () => ({
    solicitud: {
        "id": 0,
        "corporacionId": "CGSIBCVCT",
        "regionId": 0,
        "telefonoCasa": "",
        "telefonoRecado": "",
        "curp": "",

        "fechaSolicitud": new Date(Date.now()),
        "statusExp": false,
        "fot": 0,
        "coordenadasVivienda": "",  // No va.
        
        "enteraEmpleo": 0, // nuevo
        "gobierno": false,
        "privada": false,
        "nombreEmpresa": "",
        "descripcionEmpresa": "",

        "puesto": "",
        "jefeInmediato": "",
        "telefonoEmpleo": "",
        "fechaInicio": "",
        "fechaFinal": "",
        "motivoBaja": "",
        
        "policia": false,
        "gradoInicioPolicia": "",
        "gradoFinalPolicia": "",

        "militar": false,
        "gradoInicioMilitar": "",
        "gradoFinalMilitar": "",
  
        //NUEVOS
        "tarjetaEnvio":false,
        "presolicitud":false,
        "fotografias":false,
        "croquis": false, 
        "referenciasDomicilio":false,

        "dependienteEconomico": false,
        "pre_cartillaLiberada": false,
        "certificadoEstudios": false,
        "actaNacimiento": false,
        "noAntecedentesPenales": false,
        "comprobanteDomicilio": false,
        "cartasRecomendacion": false,
        "curpActualizado": false,
        "ine": false,
        "rfcHomoclave": false,

        //copias esperadas
        "notarjetaEnvio":0,
        "nopre_cartillaLiberada": 0,
        "nocertificadoEstudios": 0,
        "noactaNacimiento": 0,
        "nonoAntecedentesPenales": 0,
        "nocomprobanteDomicilio": 0,
        "nocurpActualizado": 0,
        "noine": 0,
        "norfcHomoclave": 0,

        // valores se llenan al finalizar la evaluación
        "revalorable": false,  
        "status": 1,
        "observaciones": "Ninguna",
    },
    
    aspirante:{curp:""},
    solicitudes: [],
    activeStep: 0,
    activeClass: 'js-active position-relative',
    formSteps: 2,
    columns: ['Sexo','Nombre','Fecha solicitud','Expediente Completo','Revalorable','Estatus Solicitud', 'Observaciones'], // Table columns
    rowsSolicitudes: [],

    // para el filtro de List
    situacionSelected:0,
    cuerpoSelected:0,
    regionSelected:0,
    regionEnable:false,
    situacionEnable:false,
    cuerpoEnable:false,
    options : {
            cuerpoId:'',//useMainStore.externalUser.cuerpoId,
            regionId:0,//useMainStore.externalUser.regionId,
            perfilId:0,//useMainStore.externalUser.perfilId,
            situacion:0,
            fechaInicio:'',
            fechaFinal:''
    },

    
  }),
  
  actions: {
    async fetchSolicitudes() {
 
      try {
        const evals = await getItems()
        this.rowsSolicitudes = evals.map((ev) => ({
            "id": ev.id,
            "Nombre": ev.aspirante.Nombre + ' '+ev.aspirante.apellido_Paterno+' '+ev.aspirante.apellido_Materno,
            "Fecha solicitud": ev.fechaSolicitud,
            "Expediente Completo":ev.statusExp? 'Sí':'No',
            "Revalorable": ev.revalorable? 'Sí':'No',
            "Estatus Solicitud":  getStatusSolicitudById(ev.status),
            "Observaciones": ev.observaciones,
            "CorporacionId": ev.corporacionId,
            "RegionId": ev.regionId,
            "Curp": ev.curp,
        }))
      } catch (error) {
        console.error('Error fetching solicitudes:', error)
        this.loadingProgress = 0 // Reset progress on error
      }
    },
    async fetchRowsSolicitudes() {
      try {

        const evals = await getItems()
        this.rowsSolicitudes = evals.map((ev) => ({
            "id": ev.id,
            "Nombre": ev.aspirante.nombre + ' '+ev.aspirante.apellido_Paterno+' '+ev.aspirante.apellido_Materno,
            "Fecha solicitud": ev.fechaSolicitud,
            "Expediente Completo":ev.statusExp? 'Sí':'No',
            "Revalorable": ev.revalorable? 'Sí':'No',
            "Estatus Solicitud":  getStatusSolicitudById(ev.status),
            "Observaciones": ev.observaciones,
            "CorporacionId": ev.corporacionId,
            "RegionId": ev.regionId,
            "Curp": ev.curp,
            "Sexo": getSexoById(ev.aspirante.sexo),
            "sexoid":ev.aspirante.sexo
        }))


      } catch (error) {
        console.error('Error fetching groups:', error)
        this.loadingProgress = 0 // Reset progress on error
      }
    },

    async fetchRowsByOptions(){
      
      if (this.options.perfilId ===  8 || this.options.perfilId === 1 || this.options.perfilId == 2 || this.options.perfilId == 3 || this.options.perfilId == 7 ){
        try {
          const evals = await getItemsByOptions(this.options)
          //const evals = await getItems()
          this.rowsSolicitudes = evals.map((ev) => ({
            "id": ev.id,
            "Nombre": ev.aspirante.nombre + ' '+ev.aspirante.apellido_Paterno+' '+ev.aspirante.apellido_Materno,
            "Fecha solicitud": ev.fechaSolicitud,
            "Expediente Completo":ev.statusExp? 'Sí':'No',
            "Revalorable": ev.revalorable? 'Sí':'No',
            "Estatus Solicitud":  getStatusSolicitudById(ev.status),
            "Observaciones": ev.observaciones,
            "CorporacionId": ev.corporacionId,
            "RegionId": ev.regionId,
            "Curp": ev.curp,
            "Sexo": getSexoById(ev.aspirante.sexo),
            "sexoid":ev.aspirante.sexo
        }))

        } catch (error) {
          console.error('Error fetching solicitudes:', error)
          useMainStore().triggerAlert({message: error || 'Error fetching solicitudes',
            color: 'danger',icon: 'error',})
          this.loadingProgress = 0
        }
      }
    },

    async fetchSolicitudesPorAspirante(curp) {
      try {
        const asps = await getItemsByAspirante(curp)
        this.rowsSolicitudes = asps.map((asp) => ({
            "id": asp.id,
            "Fecha solicitud": asp.fechaSolicitud,
            "Estatus Expediente": asp.statusExp,
            "Revalorable": asp.revalorable,
            "Etatus Examen": asp.status,
            "Observaciones": asp.observaciones,
            "CorporacionId": asp.corporacionId,
            "RegionId": asp.regionId,
            "Curp": asp.curp,
        }))
      } catch (error) {
        console.error('Error fetching solicitudes:', error)
        this.loadingProgress = 0 // Reset progress on error
      }
    },

    async fetchSolicitudesPorAreaYPeriodo(corporacionId, regionId, fechaInicio, fechaFin, status) {
      if (this.options.perfilId ===  8 || this.options.perfilId === 1 || this.options.perfilId == 2 || this.options.perfilId == 3 || this.options.perfilId == 7 ){
        console.log('' +corporacionId)
        console.log(' '+ regionId )
        console.log( ' ' + fechaInicio +' '+ fechaFin +' '+ status)
        try {
          let solicitudes = await getItemsByOptions(corporacionId, regionId, fechaInicio, fechaFin, status)
          this.rowsSolicitudes = solicitudes.map((asp) => ({
            "id": asp.id,
            "Fecha solicitud": asp.fechaSolicitud,
            "Expediente Completo": asp.statusExp==true? 'Sí':'No',
            "Revalorable": asp.revalorable,
            "Etatus Examen": asp.status,
            "Observaciones": asp.observaciones,
            "CorporacionId": asp.corporacionId,
            "RegionId": asp.regionId,
            "Curp": asp.curp,
          }))
        } catch (error) {
          console.error('Error fetching solicitudes:', error)
          useMainStore().triggerAlert({message: error || 'Error fetching solicitudes',
            color: 'danger',icon: 'error',})
          this.loadingProgress = 0
        }
      }
    },

    async fetchSolicitudById(id) {
        try {
          let solicitud = await getSolicitudById(id)
          if (solicitud.success){
            let itemStore = solicitud.data
            this.solicitud = {
              "id": itemStore.id,
              "coordenadasVivienda" : itemStore.coordenadasVivienda,
              
              "corporacionId": itemStore.corporacionId,
              "regionId": itemStore.regionId,
              "curp": itemStore.curp,
              "telefonoCasa": itemStore.telefonoCasa,
              "telefonoRecado": itemStore.telefonoRecado,

              "fot": parseInt(itemStore.fot),
              "fechaSolicitud": itemStore.fechaSolicitud,
              "statusExp": parseInt(itemStore.statusExp),
              
              "enteraEmpleo":  parseInt(itemStore.enteraEmpleo), 
              "gobierno": itemStore.gobierno,
              "privada": itemStore.privada,
              "nombreEmpresa": itemStore.nombreEmpresa,
              "descripcionEmpresa": itemStore.descripcionEmpresa,

              "puesto": itemStore.puesto,
              "jefeInmediato": itemStore.jefeInmediato,
              "telefonoEmpleo": itemStore.telefonoEmpleo,
              "fechaInicio": itemStore.fechaInicio,
              "fechaFinal": itemStore.fechaFinal,
              "motivoBaja": itemStore.motivoBaja,

              "policia": itemStore.policia,
              "gradoInicioPolicia": itemStore.gradoInicioPolicia,
              "gradoFinalPolicia": itemStore.gradoFinalPolicia,

              "militar": itemStore.militar,
              "gradoInicioMilitar": itemStore.gradoInicioMilitar,
              "gradoFinalMilitar": itemStore.gradoFinalMilitar,
          
              "tarjetaEnvio":itemStore.tarjetaEnvio,
              "presolicitud":itemStore.presolicitud,
              "fotografias":itemStore.fotografias,
              "croquis": itemStore.croquis, 
              "referenciasDomicilio":itemStore.referenciasDomicilio,

              "dependienteEconomico": itemStore.dependienteEconomico,
              "pre_cartillaLiberada": itemStore.cartillaLiberada,
              "certificadoEstudios": itemStore.certificadoEstudios,
              "actaNacimiento": itemStore.actaNacimiento,
              "noAntecedentesPenales": itemStore.noAntecedentesPenales,
              "comprobanteDomicilio": itemStore.comprobanteDomicilio,
              "cartasRecomendacion": itemStore.cartasRecomendacion,
              "curpActualizado": itemStore.curpActualizado,
              "ine": itemStore.ine,
              "rfcHomoclave": itemStore.rfcHomoclave,

              //copias esperadas
              "notarjetaEnvio":itemStore.notarjetaEnvio,
              "nopre_cartillaLiberada": itemStore.nopre_cartillaLiberada,
              "nocertificadoEstudios": itemStore.nocertificadoEstudios,
              "noactaNacimiento": itemStore.noactaNacimiento,
              "nonoAntecedentesPenales": itemStore.nonoAntecedentesPenales,
              "nocomprobanteDomicilio": itemStore.nocomprobanteDomicilio,
              "nocurpActualizado": itemStore.nocurpActualizado,
              "noine": itemStore.noine,
              "norfcHomoclave": itemStore.norfcHomoclave,

              // valores se llenan al finalizar la evaluación
              "revalorable": itemStore.revalorable,  
              "status": itemStore.status,
              "observaciones": itemStore.observaciones,

              "aspirante":{
                "sexo": itemStore.aspirante.sexo,
              }
            }
          }
        } catch (error) {
          console.error('Error fetching solicitudes:', error)
          useMainStore().triggerAlert({message: error || 'Error fetching solicitudes',color: 'danger',icon: 'error',})
          this.loadingProgress = 0
        }      
    },

    

    async createSolicitud() {
      try {
        var result = await createItem()
        if (result.success){
          this.solicitud.id = result.data
          return true
        }
        return false
      } catch (error) {
        console.error('Error creating Solicitud:', error)
      }
    },

    async updateSolicitud() {
      try {      
        return await updateItem();    
      } catch (error) {        console.error('Error updating Aspirante:', error)      }
    },

    async deleteSolicitud(id) {
      try {
        await deleteItem()
        this.rowsSolicitudes = this.rowsSolicitudes.filter((g) => g.id !== id)
      } catch (error) {
        console.error('Error deleting CANDIDATE:', error)
      }
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

    ftFecha(fecha) {
      var formato = 'yyyy-mm-dd'
      const mapa = {
      dd: fecha.getDate().toString().padStart(2, '0'),
      mm: (fecha.getMonth() + 1).toString().padStart(2, '0'),
      yyyy: fecha.getFullYear(),
      };
      return formato.replace(/dd|mm|yyyy/gi, (coincidencia) => mapa[coincidencia]);
    },
  
    setRecurso(sit = -1){
      var externalUser = localStorageService.get("externalUser");
      var userdata = localStorageService.get("userdata");
      
      this.options.cuerpoId = userdata.cuerpoId;   
      this.options.regionId = userdata.regionId;
      this.options.perfilId = externalUser.perfilId[0];
      this.options.situacion=sit;
      var hoy = new Date();
      this.options.fechaInicio = this.ftFecha(hoy)
      this.options.fechaFinal = this.ftFecha(hoy)
      
      //si perfil es administrador o subdirector todo con opciones  
      if (this.options.perfilId === 8 || this.options.perfilId === 1) {
        this.cuerpoEnable = false;
        this.situacionEnable = false;
        this.regionEnable = false;
        
      // Perfil de Gerente y Atención a registro solo los del cuerpo  
      }else if ( this.options.perfilId === 2 || this.options.perfilId === 3) {
        this.cuerpoEnable = true;
        this.situacionEnable = false;
        this.regionEnable = false;
        console.log(' 2 o 3')
        
      }else if ( this.options.perfilId === 7 ) { 
        //CAPTURISTA
        this.cuerpoEnable = true;
        this.situacionEnable = false;
        this.regionEnable = true ;
        console.log(' 7')
      }else{
        //PERFILES DE EVALUACION
        this.cuerpoEnable = true;
        this.situacionEnable = true;
        this.regionEnable = true;
        this.options.regionId = 0;
        console.log(' ninguno ')
      }

    },

   
    resetSelectedSolicitud() {    
      const fecha = new Date(Date.now());
      this.solicitud = {
        "id": 0,
        "nombre":"",
        "fechaSolicitud": fecha.getFullYear()+'-'+(fecha.getMonth() + 1).toString().padStart(2, '0')+'-'+fecha.getDate().toString().padStart(2, '0'),
        "statusExp": false,
        "revalorable": false,
        "status": 1,
        "observaciones": "Ninguna",
        "corporacionId": "CGSIBCVCT",
        "regionId": 0,
        "curp": "",
        "gobierno": false,
        "privada": false,
        "nombreEmpresa": "",
        "descripcionEmpresa": "",
        "puesto": "striaquing",
        "jefeInmediato": "",
        "telefonoEmpleo": "",
        "fechaInicio": "",
        "fechaFinal": "",
        "motivoBaja": "",
        "policia": false,
        "gradoInicioPolicia": "",
        "gradoFinalPolicia": "",
        "militar": false,
        "gradoInicioMilitar": "",
        "gradoFinalMilitar": "",
    
        "fot": 0,
        "coordenadasVivienda": "0",
        "croquis": false,
        "dependienteEconomico": false,
        "cartillaLiberada": false,
        "certificadoEstudios": false,
        "actaNacimiento": false,
        "noAntecedentesPenales": false,
        "comprobanteDomicilio": false,
        "cartasRecomendacion": false,
        "curpActualizado": false,
        "ine": false,
        "rfcHomoclave": false,
  
        "telefonoCasa": "",
        "telefonoRecado": "",
      },
      this.aspirantes = [],
      this.activeStep = 0,
      this.activeClass = 'js-active position-relative',
      this.formSteps = 4,
      this.rowsAspirantes = []
    }
  },
})
