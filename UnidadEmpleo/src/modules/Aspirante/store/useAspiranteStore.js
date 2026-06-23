import { defineStore } from 'pinia'
import localStorageService from "@/utils/localStorageService";
import {  getCodigoPostal, getAspirantes,fetchAspiranteByID,createAspirante,updateAspirante,deleteAspiranteByID,} from '@ue/services/aspiranteService.js'
import { useMainStore } from '@/store/useMainStore';


export const useAspiranteStore = defineStore('candidate', {
  state: () => ({
    aspirante: {
      Curp: '',
      Rfc: '',
      Nombre: '',
      Apellido_Paterno: '',
      Apellido_Materno: '',
      Fecha_Nacimiento: '',
      Sexo: 0,
      TelefonoCelular: '',
      Foto: 0,
      Estado_Civil: 0,
      Grado_Escolaridad: 0,
      EscolaridadConcluidaTrunca: 0,
      DocumentoAcreditaEscolaridad: '',
      PensionaodISSEMYM: false,
      Calle: '',
      EntreCalles: '',
      numero: 0,
      numeroInterior : 0,
      latitud:"",
      longitud:"",
      Pais: 'México',
      CodigoPostal: 0,
      Estado: '',
      Municipio: '',
      Colonia: '',
      TipoAsentamiento: '',
      IdCuerpoCaptura:'',
      IdRegionCaptura:0,
      Situacion:1,
    },
    aspirantes: [],
    activeStep: 0,
    activeClass: 'js-active position-relative',
    formSteps: 2,
    municipio: [],
    estado: [],
    tipoAsentamiento: [],
    asentamiento: [],
    columns: ['CURP','Nombre','Apellido Paterno','Apellido Materno','Cuerpo','Region','SOLICITUDES'], // Table columns
    rowsAspirantes: [],
    rowsSituacion:[],
    
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
    }
  }),
  
  actions: {
    async fetchAspirantes() {

      if (this.options.perfilId ===  8 || this.options.perfilId === 1 || this.options.perfilId == 2 || this.options.perfilId == 3 || this.options.perfilId == 7 ){
        
        try {
          const asps = await getAspirantes(this.options)        
          this.rowsAspirantes = asps.map((asp) => ({
              CURP: asp.curp,
              //Rfc: aspiranteById.Rfc,
              Nombre: asp.nombre,
              'Apellido Paterno': asp.apellido_Paterno,
              'Apellido Materno': asp.apellido_Materno,
              Cuerpo:asp.idCuerpoCaptura,
              Region:asp.idRegionCaptura,
          }))
        } catch (error) {
          console.error('Error fetching lists:', error)
          this.loadingProgress = 0 // Reset progress on error
        }
      }
    }
    ,
    async asignaAspirante(aspiranteById){
      
      try{
          this.aspirante = {
            Curp: aspiranteById.curp,
            Rfc: aspiranteById.rfc,
            Nombre: aspiranteById.Nombre,
            Apellido_Paterno: aspiranteById.apellido_Paterno,
            Apellido_Materno: aspiranteById.apellido_Materno,
            Fecha_Nacimiento: aspiranteById.fecha_Nacimiento,
            Sexo: aspiranteById.sexo,
            TelefonoCelular: aspiranteById.telefonoCelular,
            Foto: aspiranteById.foto,
            Estado_Civil: aspiranteById.estado_Civil,
            Grado_Escolaridad: aspiranteById.grado_Escolaridad,
            EscolaridadConcluidaTrunca: aspiranteById.escolaridadConcluidaTrunca,
            DocumentoAcreditaEscolaridad: aspiranteById.documentoAcreditaEscolaridad,
            PensionaodISSEMYM: aspiranteById.pensionaodISSEMYM,
            Calle: aspiranteById.calle,
            EntreCalles: aspiranteById.entreCalles,
            numero: aspiranteById.numero,
            numeroInterior : aspiranteById.numeroInterior,
            latitud:"",
            longitud:"",
            Pais: aspiranteById.pais,
            CodigoPostal: aspiranteById.codigoPostal,
            Estado: aspiranteById.estado,
            Municipio: aspiranteById.municipio,
            Colonia: aspiranteById.colonia,
            IdCuerpoCaptura:useMainStore.userData.cuerpoId,
            IdRegionCaptura:useMainStore.userData.regionId,
            Situacion : aspiranteById.Situacion
        }
      } catch (error) {
        console.error('Error fetching Aspirantes:', error)
      } 
    },


    async verifyAspiranteByCurp(curp) {
      var perfil = 8;
      var cuerpo = -1;
      var region = -1;
      
      try {
        let aspiranteResult = await fetchAspiranteByID(curp, perfil, cuerpo, region)
        if (aspiranteResult.success){
          let aspiranteById = aspiranteResult.data;
          this.aspirante = {
            Curp: aspiranteById.curp,
            Rfc: aspiranteById.rfc,
            Nombre: aspiranteById.nombre,
            Apellido_Paterno: aspiranteById.apellido_Paterno,
            Apellido_Materno: aspiranteById.apellido_Materno,
            Fecha_Nacimiento: aspiranteById.fecha_Nacimiento,
            Sexo: aspiranteById.sexo,
            TelefonoCelular: aspiranteById.telefonoCelular,
            Foto: aspiranteById.foto,
            Estado_Civil: aspiranteById.estado_Civil,
            Grado_Escolaridad: aspiranteById.grado_Escolaridad,
            EscolaridadConcluidaTrunca: aspiranteById.escolaridadConcluidaTrunca,
            DocumentoAcreditaEscolaridad: aspiranteById.documentoAcreditaEscolaridad,
            PensionaodISSEMYM: aspiranteById.pensionaodISSEMYM,
            Calle: aspiranteById.calle,
            EntreCalles: aspiranteById.entreCalles,
            numero: aspiranteById.numero,
            numeroInterior : aspiranteById.numeroInterior,
            latitud:aspiranteById.latitud,
            longitud:aspiranteById.longitud,
            Pais: aspiranteById.pais,
            CodigoPostal: aspiranteById.codigoPostal,
            Estado: aspiranteById.estado,
            Municipio: aspiranteById.municipio,
            TipoAsentamiento: aspiranteById.tipoColonia,
            Colonia: aspiranteById.colonia,
            IdCuerpoCaptura:aspiranteById.IdCuerpoCaptura,
            IdRegionCaptura:aspiranteById.IdRegionCaptura,
            Situacion : aspiranteById.Situacion
          }
          return true;
        }
          
        else{
          var tmpCurp = this.aspirante.Curp;
          this.resetSelectedAspirante()
          this.aspirante.Curp = tmpCurp
          return false;
        }
      } catch (error) {
        console.error('Error fetching Aspirantes:', error)
        useMainStore().triggerAlert({
          message: error || 'Error fetching Aspirante',color: 'danger',icon: 'error',
        })
        this.loadingProgress = 0
        return false
      }
    },
    async fetchAspiranteByCurp(curp,  cuerpo, region ) {
      var externalUser = localStorageService.get("externalUser");
      var perfil = externalUser.perfilId[0];
      try {
        let aspiranteResult = await fetchAspiranteByID(curp, perfil, cuerpo, region)
        if (aspiranteResult.success){
          let aspiranteById = aspiranteResult.data;
          this.aspirante = {
            Curp: aspiranteById.curp,
            Rfc: aspiranteById.rfc,
            Nombre: aspiranteById.nombre,
            Apellido_Paterno: aspiranteById.apellido_Paterno,
            Apellido_Materno: aspiranteById.apellido_Materno,
            Fecha_Nacimiento: aspiranteById.fecha_Nacimiento,
            Sexo: aspiranteById.sexo,
            TelefonoCelular: aspiranteById.telefonoCelular,
            Foto: aspiranteById.foto,
            Estado_Civil: aspiranteById.estado_Civil,
            Grado_Escolaridad: aspiranteById.grado_Escolaridad,
            EscolaridadConcluidaTrunca: aspiranteById.escolaridadConcluidaTrunca,
            DocumentoAcreditaEscolaridad: aspiranteById.documentoAcreditaEscolaridad,
            PensionaodISSEMYM: aspiranteById.pensionaodISSEMYM,
            Calle: aspiranteById.calle,
            EntreCalles: aspiranteById.entreCalles,
            numero: aspiranteById.numero,
            numeroInterior : aspiranteById.numeroInterior,
            latitud:aspiranteById.latitud,
            longitud:aspiranteById.longitud,
            Pais: aspiranteById.pais,
            CodigoPostal: aspiranteById.codigoPostal,
            Estado: aspiranteById.estado,
            Municipio: aspiranteById.municipio,
            TipoAsentamiento: aspiranteById.tipoColonia,
            Colonia: aspiranteById.colonia,
            IdCuerpoCaptura:aspiranteById.IdCuerpoCaptura,
            IdRegionCaptura:aspiranteById.IdRegionCaptura,
            Situacion : aspiranteById.Situacion
          }
        }
      } catch (error) {
        console.error('Error fetching Aspirantes:', error)
        useMainStore().triggerAlert({
          message: error || 'Error fetching Aspirante',
          color: 'danger',
          icon: 'error',
        })
        this.loadingProgress = 0
      }
    },
    async createAspirante() {
      try {
        return await createAspirante()     

      } catch (error) {
        console.error('Error creating Aspirante:', error)
      }
    },
    async updateAspirante() {
      try {      
        return await updateAspirante();    
       
      } catch (error) {
        console.error('Error updating Aspirante:', error)
      }
    },

    async deleteAspirante(id) {
      try {
        await deleteAspiranteByID()
        this.aspirantes = this.aspirantes.filter((g) => g.id !== id)
      } catch (error) {
        console.error('Error deleting CANDIDATE:', error)
      }
    },

    async fetchAspirantesOtro() {
      try {
        const fetchedAspirantes = await getAspirantes()
        
        // Map fetched users to the desired structure
        this.rowsAspirantes = fetchedAspirantes.map((aspirante) => ({
          curp: aspirante.Curp || '',
          nombre: aspirante.Nombre || '',
          app: aspirante.Apellido_Paterno || '',
          apm: aspirante.Apellido_Materno || '',
        }))    
        console.log('Dentro de fechaAspirantesOtro '+fetchedAspirantes[0]+ '   '  +this.aspirante);
       
      } catch (error) {
        console.error('Error fetching aspirantes:', error)
      }
    },  
   

    async fetchCP(cp) {
      try {
        let data = await getCodigoPostal(cp);
        //this.asentamiento = data.asentamiento
        this.asentamiento = data.asentamiento.map((t) => ({
            idasenta: t.c_tipo_asenta,
            "id": t.d_asenta,
            "desc": t.d_asenta,
            cestado : t.c_estado,
            cmunicipio: t.c_mnpio,
            ctipoAsentamiento: t.c_tipo_asenta,
            d_mnpio : t.d_mnpio,
            d_estado : t.d_estado,
            d_tipo : t.d_tipo_asenta,
            d_asenta : t.d_asenta,
            latitud: t.latitud,
            longitud: t.longitud
        }))

        this.municipio = data.municipio.map((municipio) => ({
            //"id": municipio.c_mnpio,
            "id": municipio.d_mnpio,
            "desc": municipio.d_mnpio
        }))
        
        this.estado = data.estado.map((edo) => ({
            "id": edo.d_estado,
            "desc": edo.d_estado
        }))

        //this.tipoAsentamiento = data.tipoAsentamiento,
        this.tipoAsentamiento = data.tipoAsentamiento.map((t) => ({
            "id": t.d_tipo_asenta,
            "desc": t.d_tipo_asenta,
            
        }))
        
        //forEach (v in asentamiento){
        for (let i = 0; i< this.asentamiento.length; i++)
         {
          this.aspirante.Estado = this.asentamiento[i].d_estado;
          this.aspirante.Municipio = this.asentamiento[i].d_mnpio;
          this.aspirante.Colonia = this.asentamiento[i].d_asenta;
          this.aspirante.TipoAsentamiento = this.asentamiento[i].d_tipo;
          this.aspirante.coordenadas = this.asentamiento[i].latitud +','+this.asentamiento[i].longitud;
          this.aspirante.longitud =  this.asentamiento[i].longitud;
          this.aspirante.latitud =  this.asentamiento[i].latitud;
          console.log('llenado de aspirante '+this.aspirante.latitud+','+this.aspirante.longitud);
          break;
        }

      } catch (error) {
        console.error('Error fetching Aspirantes:', error)
        useMainStore().triggerAlert({
          message: error || 'Error fetching Aspirante',
          color: 'danger',
          icon: 'error',
        })
        this.loadingProgress = 0
      }
    },

    setData(){
      for (let i = 0; i< this.asentamiento.length; i++)
         {
          if (this.aspirante.Colonia == this.asentamiento[i].d_asenta){
            this.aspirante.Estado = this.asentamiento[i].d_estado;
            this.aspirante.Municipio = this.asentamiento[i].d_mnpio;
            this.aspirante.Colonia = this.asentamiento[i].d_asenta;
            this.aspirante.TipoAsentamiento = this.asentamiento[i].d_tipo;
            this.aspirante.coordenadas = this.asentamiento[i].latitud +','+this.asentamiento[i].longitud;
            this.aspirante.longitud =  this.asentamiento[i].longitud;
            this.aspirante.latitud =  this.asentamiento[i].latitud;
          }
        }
    },

    // TipoRoles NoDefinido          = 0,Subdirector         = 1,Gerente             = 2,AtencionRegistro    = 3,Psicologo           = 4,Medico              = 5,
    //  Antidoping          = 6,Capturista          = 7,Administrador       = 8
    
    setRecurso(situacion = -1){
      var externalUser = localStorageService.get("externalUser");
      var userdata = localStorageService.get("userdata");

      this.options.cuerpoId = userdata.cuerpoId;   
      this.options.regionId = userdata.regionId;
      this.options.perfilId = externalUser.perfilId[0];
      this.options.situacion=situacion;
      console.log(this.options+ '  '+ this.options.perfilId)
      //si perfil es administrador o subdirector todo con opciones  
      if (this.options.perfilId === 8 || this.options.perfilId === 1) {
        this.cuerpoEnable = false;
        this.situacionEnable = false;
        this.regionEnable = false;
        console.log(' 8 o 1')
      // Perfil de Gerente y Atención a registro solo los del cuerpo  
      }else if ( this.options.perfilId === 2 || this.options.perfilId === 3) {
        this.cuerpoEnable = true;
        this.situacionEnable = false;
        this.regionEnable = false ;
        console.log(' 2 o 3')
      }else if ( this.options.perfilId === 7 ) {
        this.cuerpoEnable = true;
        this.situacionEnable = false;
        this.regionEnable = true ;
        console.log(' 7')
      }else{
        this.cuerpoEnable = true;
        this.situacionEnable = true;
        this.regionEnable = true ;
        console.log(' ninguno ')
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
   
    resetSelectedAspirante() {    
      this.aspirante =  {
            Curp: '',
            Rfc: '',
            Nombre: '',
            Apellido_Paterno: '',
            Apellido_Materno: '',
            Fecha_Nacimiento: '',
            Sexo: 0,
            TelefonoCelular: '',
            Foto: 0,
            Estado_Civil: 0,
            Grado_Escolaridad: 0,
            EscolaridadConcluidaTrunca: 0,
            DocumentoAcreditaEscolaridad: '',
            PensionaodISSEMYM: false,
            Calle: '',
            EntreCalles: '',
            numero: 0,
            numeroInterior : 0,
            coordenadas: '',
            Pais: 'México',
            CodigoPostal: '',
            Estado: '',
            Municipio: '',
            Colonia: '',
            IdCuerpoCaptura:'',
            IdRegionCaptura:0,
            Situacion:1,
            
          //'Fecha Creación': new Date(grupobyId.createdDateTime).toLocaleDateString(),        
          //'Fecha Actualización':  new Date(grupobyId.fechaActualizacion).toLocaleDateString(), 
        },
      this.aspirantes = [],
      this.activeStep = 0,
      this.activeClass = 'js-active position-relative',
      this.formSteps = 2,
      this.rowsAspirantes = []
    }
  },
})
