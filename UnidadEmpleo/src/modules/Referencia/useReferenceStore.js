import { defineStore } from 'pinia'
import { useMainStore } from '@/store/useMainStore';
import { getItemsBySolicitud, getCodigoPostal, createReference,updateReference, deleteReference } from '@ue/services/referenciaService.js';
import {getParentescoName} from  "@ue/services/catalogosDbService";
export const useReferenciaStore = defineStore('referencia', {
  state: () => ({
    referencia : {
      id:0,solicitudId:0,
      Nombre: '',Apellido_Paterno: '',Apellido_Materno: '',Parentesco:'', parentesco:'',telefono:'',
      latitud:"",longitud:"",CodigoPostal: 0,
      Calle: '',EntreCalles: '',numero: 0,numeroInterior : 0,
      Pais: 'México',Estado: '',Municipio: '',Colonia: '',TipoAsentamiento: '',
      },
    rowsReferencias: [],
    municipioList :[] ,
    estadoList :[] ,
    tipoAsentamientoList:[],
    asentamientoList : [],
    
    activeClass: 'js-active position-relative',
    columns: ['Nombre Completo','Parentesco','Telefono','Estado','Municipio','Colonia'], 
  }),
  
  actions: {
    async fetchReferenciasBySolicitud(id) {
 
      try {
        const items = await getItemsBySolicitud(id)
        this.rowsReferencias = items.map((item) => ({
            "id": item.id,
            Parentesco:   getParentescoName(item.parentesco),         
            "parentesco": item.parentesco,
            "Telefono": item.telefonoLocal,
            latitud: item.latitud,
            longitud: item.longitud,
            "Nombre Completo": item.nombre + ' ' + item.apellido_Paterno + ' '+item.apellido_Materno,
            solicitudId: item.idSoliciud, 
            nombre: item.nombre,
            Apellido_Paterno:item.apellido_Paterno,
            Apellido_Materno : item.apellido_Materno,
            Calle: item.calle,
            EntreCalles: item.entreCalles,
            numero: item.numero,
            numeroInterior : item.numeroInterior,
            Pais: item.pais,
            CodigoPostal: item.codigoPostal,
            Estado: item.estado,
            Municipio: item.municipio,
            Colonia: item.colonia,
            TipoAsentamiento: item.tipoAsentamiento

        }))
        
      } catch (error) {
        console.error('Error fetching solicitudes:', error)
        this.loadingProgress = 0 // Reset progress on error
      }
    },
    async createReferencias(){
      try {
        let retorno = await createReference()
        if (retorno.success){
          this.referencia.id = retorno.data
          this.updateReferencia(this.referencia)
          this.rowsReferencias.push(this.referencia)
          this.resetReferencia();
          return true;
        }
        
      } catch (error) {
        console.error('Error creating References:', error)
        return false
      }
      
    },

    async updateReferencias(id) {
      try {   
           if (updateReference(id)){
              //quitar referencia del arreglo
              this.rowsReferencias =  this.rowsReferencias.filter((e) => e.id !== id)
              //Agregar la referencia actualizada al arreglo
              this.rowsReferencias.push(this.referencia)
              //Limpiar valores de formulario
              this.resetReferencia();
              return true
           }
            return false
      } catch (error) {        console.error('Error updating Aspirante:', error)      
        return false;
      }
    },

    async deleteReferencia(id){
      try {   
           if (deleteReference(id)){
              this.rowsReferencias =  this.rowsReferencias.filter((e) => e.id !== id)
           }  
      } catch (error) {        console.error('Error updating Aspirante:', error)      }
    },

    async fetchCP(cp) {
      try {
        let data = await getCodigoPostal(cp);
        //this.asentamiento = data.asentamiento
        this.asentamientoList = data.asentamiento.map((t) => ({
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

        this.municipioList = data.municipio.map((municipio) => ({
            "id": municipio.d_mnpio,
            "desc": municipio.d_mnpio
        }))
        
        this.estadoList = data.estado.map((edo) => ({
            "id": edo.d_estado,
            "desc": edo.d_estado
        }))

        this.tipoAsentamientoList = data.tipoAsentamiento.map((t) => ({
            "id": t.d_tipo_asenta,
            "desc": t.d_tipo_asenta,
            
        }))
        console.log('datos obtenidos '+this.asentamientoList[0].d_estado)
        //forEach (v in asentamiento){
        for (let i = 0; i< this.asentamientoList.length; i++)
         {
          //console.log('setting data ' + i)
          this.referencia.Estado = this.asentamientoList[i].d_estado;
          this.referencia.Municipio = this.asentamientoList[i].d_mnpio;
          this.referencia.Colonia = this.asentamientoList[i].d_asenta;
          this.referencia.TipoAsentamiento = this.asentamientoList[i].d_tipo;
          this.referencia.longitud =  this.asentamientoList[i].longitud;
          this.referencia.latitud =  this.asentamientoList[i].latitud;
          break;
        }

      } catch (error) {
        console.error('Error Codigo Postal No ENCONTRADO:', error)
        useMainStore().triggerAlert({message: error || 'Error Cogigo Postal',color: 'danger',icon: 'error',})
        this.loadingProgress = 0
      }
    },

    updateReferencia(item){ 
      this.referencia = {
            "id": item.id,
            Parentesco:   getParentescoName(item.parentesco),         
            "parentesco": item.parentesco,
            telefono: item.Telefono,
            latitud: item.latitud,
            longitud: item.longitud,
            "Nombre Completo": item.nombre + ' ' + item.Apellido_Paterno + ' '+item.Apellido_Paterno,
            solicitudId: item.solicitudId, 
            Nombre: item.nombre,
            Apellido_Paterno:item.Apellido_Paterno,
            Apellido_Materno : item.Apellido_Paterno,
            Calle: item.Calle,
            EntreCalles: item.EntreCalles,
            numero: item.numero,
            numeroInterior : item.numeroInterior,
            Pais: item.Pais,
            CodigoPostal: item.CodigoPostal,
            Estado: item.Estado,
            Municipio: item.Municipio,
            Colonia: item.Colonia,
            TipoAsentamiento: item.TipoAsentamiento
      }


    },
   
    resetReferencia4new() {    
      this.referencia = {id:0,solicitudId:0,Nombre: '',Apellido_Paterno: '',Apellido_Materno: '',Parentesco:'',parentesco:'',telefono:'',
        Calle: '',EntreCalles: '',numero: '0',numeroInterior : '0',latitud:"",longitud:"",Pais: 'México',CodigoPostal: 0,
        Estado: '',Municipio: '',Colonia: '',TipoAsentamiento: ''},
      
      this.municipioList = [] ,
      this.estadoList = [] ,
      this.tipoAsentamientoList = [],
      this.asentamientoList = [],
      this.rowsReferencias = []
    },
    resetReferencia() {    
      this.referencia = {
        id:0,               solicitudId:0,
        Nombre: '',         Apellido_Paterno: '',         Apellido_Materno: '',
        parentesco:'',      telefono:'',                  Calle: '',
        EntreCalles: '',    numero: 0,                    numeroInterior : 0,
        latitud:"",         longitud:"",                  Pais: 'México',
        CodigoPostal: 0,    Estado: '',                   Municipio: '',
        Colonia: '',        TipoAsentamiento: ''}
    }
  },
})
