<template>
  <div class="multisteps-form__panel border-radius-xl bg-white" data-animation="FadeIn">

    <div class="card">
      
      <div class="mb-3">
        <h5 class="font-weight-bolder mb-0">REFERENCIAS:</h5>
        <p class="mb-0 text-sm">1. Padre, madre, esposa o hermano</p>
        <p class="mb-0 text-sm">2. Padre, madre, esposa o hermano</p>
        <p class="mb-0 text-sm">3. Padre, madre, esposa o hermano</p>
      </div>

      <div class="multisteps-form__content">      
        <div class="row container-fluid mt-2">
          <div class="col-sm-8">
            <div class="card ">
              <div class="card-header d-flex justify-content-between">
                        <div  class="col-sm-6"> 
                          <p class="font-weight-bolder">{{ dato.id === 0? 'Nuevo registro': 'Actualiza registro con id = '+dato.id }} </p>
                        </div>
                        <div  class="col-sm-3"> 
                          <MaterialButton @click.prevent="handleCleanReference()" :disabled="dato.id === 0? true:false" size="sm">Limpiar datos</MaterialButton>
                        </div>
              </div>
              <div class="row"> 
                      <div class="row container-fluid mt-3">  
                        <div class="col-sm-3 mb-1">
                            <MaterialInput id="Apellido_Paterno" type="text" label="Apellido Paterno" name="Apellido_Paterno" v-model="dato.Apellido_Paterno" />
                        </div>
                        <div class="col-sm-3 mb-1">
                            <MaterialInput id="Apellido_Materno" type="text" label="Apellido Materno" name="Apellido_Materno" v-model="dato.Apellido_Materno" />
                        </div>
                        <div class="col-sm-3 mb-1">
                            <MaterialInput id="givenName" type="text" label="Nombre" name="givenName" v-model="dato.Nombre"  />
                        </div>
                        <div class="col-sm-3 mb-1">
                            <select id="parentesco" class="form-control" placeholder="Selecciona el parentesco" v-model="dato.parentesco">
                              <option v-for="row in parienteList" :key="row.id" :value="row.id" >
                                  {{ row.name }} 
                              </option>
                            </select>
                        </div>
                        <div class="col-sm-4 mt-2">
                            <MaterialInput id="telLocalRecado" type="phone" label="Teléfono Local o Respaldos" name="telLocalRecado" v-model="dato.telefono"  />
                        </div>
                      </div>
              </div>

              <div class="row container-fluid"> 
                <div class="mb-3">
                    <h5 class="font-weight-bolder mb-0">Domicilio:</h5>
                </div>

                <div class="row container-fluid mt-3">
                  <div class="col-sm-8 mb-3">
                    <MaterialInput id="givenCalle"  type="text" label="Calle" name="givenCalle"
                      v-model="dato.Calle" :isRequired="true" placeholder="Escribe la Calle"
                      @input="dato.Calle = dato.Calle.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,'').toUpperCase()"/>
                  </div>

                  <div class="col-sm-2 mb-3">
                    <MaterialInput id="givennumero" type="text" label="No. Ext." name="givennumero"
                      v-model="dato.numero" :isRequired="true" placeholder="Escribe el numero"/>
                  </div>

                  <div class="col-sm-2 mb-3">
                    <MaterialInput id="givennumeroint" type="text" label="No. Int." name="givennumeroint"
                      v-model="dato.numeroInterior" :isRequired="true" placeholder="Escribe el numero"/>
                  </div>

                  <div class="col-sm-12 mb-3">
                    <MaterialInput id="givenEntreCalles" type="text" label="Entre Calles" name="givenEntreCalles"
                      v-model="dato.EntreCalles" :isRequired="true" placeholder="Escribe Entre Calles se encuentra" 
                      @input="dato.EntreCalles = dato.EntreCalles.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,'').toUpperCase()"
                      />
                  </div>

                  <div class="col-sm-3 mb-3">
                      <MaterialInput id="givenPais" type="text" label="Pais" name="givenPais" v-model="dato.Pais" :isRequired="true" placeholder="Escribe el Pais"/>
                  </div>

                  <div class="col-sm-3 mb-3">
                      <MaterialInput id="givenCodigoPostal" type="text" label="Codigo Postal" name="givenCodigoPostal" v-model="dato.CodigoPostal" :isRequired="true" placeholder="Escribe el Codigo Postal"
                      @input="dato.CodigoPostal = dato.CodigoPostal.replace(/[^0-9]/g, '') " />
                  </div>
                  <div class="col-sm-3 mb-3">
                    <MaterialButton  @click.prevent="fetchFilteredCP(dato.CodigoPostal)" color="success">
                      Buscar CP {{ dato.CodigoPostal }}
                    </MaterialButton>
                  </div>
                </div>

                <div class="row container-fluid mt-3">
                  <div class="form-group col-sm-1">
                      <label for="asentamiento" class="form-label">Asentamiento</label>
                      <select id="asentamiento"  class="form-control" placeholder="Selecciona el Asentamiento"
                      v-model="dato.Colonia">
                      <option v-for="row in asentamientoList" :key="row.id" :value="row.id" >
                          {{ row.desc }}
                      </option>
                      </select>
                  </div>

                  <div class="mt-4 mb-3 col-sm-3">
                      <MaterialInput id="asentamientoi"  type="text" label="Asentamiento" name="asentamientoi" v-model="dato.Colonia"
                      :isRequired="true" placeholder="Colonia" @input="dato.Colonia = dato.Colonia.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,'').toUpperCase()"
                      />
                  </div>

                  <div class="form-group col-sm-1">
                      <label for="tipo" class="form-label">Tipo </label>
                      <select id="tipo" class="form-control" placeholder="Selecciona el tipo de asentamiento"
                      v-model="dato.TipoAsentamiento">
                      <option v-for="row in tipoAsentamientoList" :key="row.id" :value="row.id">
                          {{ row.desc }}
                      </option>
                      </select>
                  </div>
                  <div class="mt-4 mb-3 col-sm-3">
                      <MaterialInput id="tipoasentamiento" type="text" label="Tipo Asentamiento" name="tipoasentamiento"
                      v-model="dato.TipoAsentamiento" :isRequired="true" placeholder="Tipo de asentamiento"
                      @input="dato.TipoAsentamiento = dato.TipoAsentamiento.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,'').toUpperCase()"/>
                  </div>
                  <div class="form-group col-sm-1">
                      <label for="municipio" class="form-label">Municipio</label>
                      <select id="municipio" class="form-control" placeholder="Selecciona el municipio" v-model="dato.Municipio">
                      <option v-for="row in municipioList" :key="row.id" :value="row.id">
                          {{ row.desc }}
                      </option>
                      </select>
                  </div>
                  <div class="mt-4 mb-3 col-sm-3">
                      <MaterialInput id="givenMunicipio" type="text" label="Municipio" name="givenMunicipio" v-model="dato.Municipio" :isRequired="true"
                      disabled="true" @input="dato.Municipio = dato.Municipio.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,'').toUpperCase()"/>
                  </div>

                  <div class="form-group col-sm-1">
                      <label for="estado" class="form-label">Estado</label>
                      <select id="estado" class="form-control" placeholder="Selecciona el Estado" v-model="dato.Estado">
                      <option v-for="row in estadoList" :key="row.id" :value="row.id">
                          {{ row.desc }}
                      </option>
                      </select>
                  </div>

                  <div class="mt-4 mb-3 col-sm-3">
                      <MaterialInput id="givenEstado" type="text" label="Estado" name="givenEstado"
                      v-model="dato.Estado" :isRequired="true" disabled="true"
                      @input="dato.Estado = dato.Estado.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,'').toUpperCase()"/>
                  </div>
                  
                  <div class="col-sm-3 mb-3 mt-4">
                      <MaterialInput id="givenlatitud" type="text" label="Latitud" name="givenlatitud" v-model="dato.latitud" :isRequired="true"  disabled="true"/>
                  </div>
                  <div class="col-sm-3 mb-3 mt-4">
                      <MaterialInput id="givenlongitud" type="text" label="Longitud" name="givenlongitud" v-model="dato.longitud" :isRequired="true" disabled="true"/>
                  </div>

                </div>                
              </div>
            </div>
          </div>

          <div class="col-sm-4">
            <div ref="mapContainer" style="width: 400px; height: 400px; align-content: center;"></div>
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="handleSave()"  class="me-2 mt-5" >
              Agregar - Actualiziar DOMICILIO
            </material-button>
          </div>
       
          <div class="mt-4 d-flex justify-content-between">          
            <material-button color="info" variant="gradient" size="sm" @click.prevent="verReferencias()" class="me-2" >
              Actualizar lista de domicilios
            </material-button>
          </div>
        
        </div>
        
        <DataTable title="Referencias" description="Lista de Referencias" table-id="referencia-table" :columns="columns" :rows="rowsReferencias" >
          <template #row-actions="{ row }">
            <div>
            
            </div>
            <MaterialButton @click.prevent="handleUpdate(row)" size="sm">Actualizar</MaterialButton>/
            
            <material-button color="danger" variant="gradient" size="sm" @click.prevent="handleDelete(row)" class="me-2" v-permiso="'Grupos.Editar'">
              eliminar
            </material-button>
          
          </template>
        </DataTable>     
      </div>
    </div>

  </div>
</template>

<script>
import { useReferenciaStore } from "@ue/modules/Referencia/useReferenceStore";
import { useSolicitudStore } from "../store/solicitudStore";
import {getGradoescolaridad,getEstadoEscolaridad,getSexo,getEdoCivil,Parentesco} from "@ue/services/catalogosDbService";
import { storeToRefs } from "pinia";
import MaterialInput from "@/components/common/MaterialInput.vue";
import MaterialButton from "@/components/common/MaterialButton.vue";
import { onMounted, ref } from "vue";
import L from "leaflet";
import DataTable from "@/components/widgets/DataTable.vue";
import { useMainStore } from '@/store/useMainStore' 

export default {
  components: {
    MaterialInput,DataTable,MaterialButton
  },
  name: "AspiranteInfo",
  setup() {    
    const mainStore = useMainStore();
    const referenciaStore = useReferenciaStore();
    const solicitudStore = useSolicitudStore();
    const { solicitud } = storeToRefs(solicitudStore);
    const {referencia: dato, municipioList,estadoList,tipoAsentamientoList,asentamientoList, columns, rowsReferencias} = storeToRefs(referenciaStore);
    const parienteList = Parentesco //.filter(record => record.ref == 1)
    const gradoEscolaridadOptions = getGradoescolaridad();
    const estadoEscolaridadOptions = getEstadoEscolaridad();
    const sexoOptions = getSexo();
    const edoCivilOptions = getEdoCivil();
    const lat = ref(19.528243303790916);
    const lng = ref(-99.21203763207524);
    const map = ref();
    
    const mapContainer = ref();
    const marker = ref();
    
    //let isCreateMode = dato.value.id == 0;
    const getLocation = (n) => {
      if (navigator.geolocation) {
        
        if (n == 1){
          lat.value = 19.528243303790916;
          lng.value = -99.21203763207524;
          
        }else if (n == 2){
          lat.value = 19.521482;
          lng.value = -99.170230;
        }else if (n == 3){
          lat.value = 19.29521179366615;
          lng.value = -99.53441583725936;
        }
        else if (n == 4){
          lat.value = 17.1201812;
          lng.value = -93.0040382;
        }
        else if (n == 5){
          lat.value = dato.value.latitud;
          lng.value = dato.value.longitud;
        }
          
        map.value.setView([lat.value, lng.value], 13);
        
      }
    };

    const fetchFilteredCP = async (cp) => {
      if (cp != 0) await referenciaStore.fetchCP(cp);  
      getLocation(5);
    };

    const verReferencias = async ()=>{
      referenciaStore.fetchReferenciasBySolicitud(solicitud.value.id)
    }

    const handleSave = async () => {
      
      if (validateStep()) {
        if (dato.value.id == 0){
          dato.value.solicitudId = solicitud.value.id
          if ( referenciaStore.createReferencias()){
            handleCleanReference()
          } 
        }
        else {
          if (referenciaStore.updateReferencias(dato.value.id))
            verReferencias()
        }
      }
    }

    const handleCleanReference = () => referenciaStore.resetReferencia()
    

    const handleUpdate = (row) => {
      // asignar valores de row a referencia
      referenciaStore.updateReferencia(row);
      // posicionar mapa y agregar punto de referencia
      map.value.removeLayer(marker.value)
      marker.value = L.marker([dato.value.latitud, dato.value.longitud],{draggable:true}).addTo(map.value).on("dragend", (event) => 
           {dato.value.latitud = event.target._latlng.lat;dato.value.longitud = event.target._latlng.lng;});
      marker.value.on("dblclick", () => {map.value.removeLayer(marker.value)});
      getLocation(5);
    }

    const handleDelete = (row) => {
      referenciaStore.deleteReferencia(row.id)
    }

    const setData = () => {
      for (let i = 0; i< this.asentamientoList.length; i++)
         {
          if (this.dato.Colonia == this.asentamientoList[i].d_asenta){
            this.dato.Estado = this.asentamientoList[i].d_estado;
            this.dato.Municipio = this.asentamientoList[i].d_mnpio;
            this.dato.Colonia = this.asentamientoList[i].d_asenta;
            this.dato.TipoAsentamiento = this.asentamientoList[i].d_tipo;
            this.dato.longitud =  this.asentamientoList[i].longitud;
            this.dato.latitud =  this.asentamientoList[i].latitud;
          }
        }
      
      marker.value = L.marker([dato.value.latitud, dato.value.longitud],{draggable:true}).addTo(map.value).on("dragend", (event) => 
           {dato.coordenadas = event.target._latlng.lat + ' '+event.target._latlng.lng;
            dato.value.latitud = event.target._latlng.lat;
            dato.value.longitud = event.target._latlng.lng;
           });
      marker.value.on("dblclick", () => {map.value.removeLayer(marker.value)});
      getLocation(5);
    }

    const createMarker = (e)=>{
      marker.value = L.marker(e.latlng,{draggable:true}).addTo(map.value).on("dragend", (event) => 
           {dato.coordenadas = event.target._latlng.lat + ' '+event.target._latlng.lng;
            dato.value.latitud = event.target._latlng.lat;
            dato.value.longitud = event.target._latlng.lng;
           });
      marker.value.on("dblclick", () => {map.value.removeLayer(marker.value)});
      dato.coordenadas = e.latlng.lat + ' '+e.latlng.lng;
      dato.value.latitud = e.latlng.lat;
      dato.value.longitud = e.latlng.lng;
      
      getLocation(5); 
    }

    const validateStep = () => {
      var isValid = true;
      console.log(dato.value.Calle)
      if(!dato.value.Calle) {
        isValid = false;       
        mainStore.triggerAlert({message: "Capture la Calle",color: "warning",icon: "warning",});return isValid;    
      }   
      if(!dato.value.parentesco) {  
        isValid = false;       
        mainStore.triggerAlert({message: "Seleccione un parentesco",color: "warning",icon: "warning",});
        return isValid;    
      }  
              if(!dato.value.numero) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture el numero",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!dato.value.EntreCalles) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture EntreCalles",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!dato.value.TipoAsentamiento) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Indique el tipo de colonia",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!dato.value.Pais) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture el Pais",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!dato.value.CodigoPostal) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture el CodigoPostal",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!dato.value.Estado) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture el Estado",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!dato.value.Municipio) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture el Municipio",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!dato.value.Colonia) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Capture la Colonia",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!dato.value.latitud) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Latitud falta",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
              if(!dato.value.longitud) {  
                  isValid = false;       
                  mainStore.triggerAlert({message: "Longitud falta",
                    color: "warning",icon: "warning",});
                  return isValid;    
              }
            return isValid;
    }
    onMounted(() => {
        
        //Carga mapa1
      map.value = L.map(mapContainer.value).setView([lat.value, lng.value],13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 19,
        attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map.value);

      map.value.on('dblclick',createMarker);
      getLocation(1); 
      
      if (dato.value.longitud === undefined){ console.log()}
      else{
        marker.value = L.marker([dato.value.latitud, dato.value.longitud],{draggable:true}).addTo(map.value).on("dragend", (event) => 
           {dato.coordenadas = event.target._latlng.lat + ' '+event.target._latlng.lng;
            dato.value.latitud = event.target._latlng.lat;
            dato.value.longitud = event.target._latlng.lng;
           });
        marker.value.on("dblclick", () => {map.value.removeLayer(marker.value)});
      
        getLocation(5); 
      }

    });

    

    return {
      getLocation,
      dato,
      mapContainer,
      gradoEscolaridadOptions,
      estadoEscolaridadOptions,
      sexoOptions,
      edoCivilOptions,
      fetchFilteredCP,
      municipioList,
      estadoList,
      tipoAsentamientoList,
      asentamientoList,
      setData,
      lat,lng,parienteList,handleUpdate,handleSave,handleDelete,
      columns, rowsReferencias,verReferencias
      ,solicitud,handleCleanReference
    };
  },
};
</script>