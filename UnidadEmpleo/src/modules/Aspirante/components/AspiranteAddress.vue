<template>
  <div
    class="multisteps-form__panel border-radius-xl bg-white"
    data-animation="FadeIn"
  >
    <div class="mb-3">
      <h5 class="font-weight-bolder mb-0">Dirección</h5>
      <p class="mb-0 text-sm">Información General del Usuario</p>
    </div>
    <div class="multisteps-form__content">
      <form>
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
            <MaterialInput
              id="givenEntreCalles"
              type="text"
              label="Entre Calles"
              name="givenEntreCalles"
              v-model="dato.EntreCalles"
              :isRequired="true"
              placeholder="Escribe Entre Calles se encuentra"
              @input="
                dato.EntreCalles = dato.EntreCalles.replace(
                  /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                  ''
                ).toUpperCase()
              "
            />
          </div>

          <div class="col-sm-3 mb-3">
            <MaterialInput
              id="givenPais"
              type="text"
              label="Pais"
              name="givenPais"
              v-model="dato.Pais"
              :isRequired="true"
              placeholder="Escribe el Pais"
            />
          </div>

          <div class="col-sm-3 mb-3">
            <MaterialInput
              id="givenCodigoPostal"
              type="text"
              label="Codigo Postal"
              name="givenCodigoPostal"
              v-model="dato.CodigoPostal"
              :isRequired="true"
              placeholder="Escribe el Codigo Postal"
              @input="
                dato.CodigoPostal = dato.CodigoPostal.replace(/[^0-9]/g, '')
              "
            />
          </div>
          <div class="col-sm-3 mb-3">
            <MaterialButton @click="fetchFilteredCP(dato.CodigoPostal)">
              Buscar CP {{ dato.CodigoPostal }}
            </MaterialButton>
          </div>
        </div>
        <div class="row container-fluid mt-3">
          <div class="form-group col-sm-4">
            <label for="asentamiento" class="form-label">Asentamiento</label>
            <select id="asentamiento" @change="setData()" class="form-control" placeholder="Selecciona el Asentamiento"
              v-model="dato.Colonia">
              <option v-for="row in asentamiento" :key="row.id" :value="row.id" >
                {{ row.desc }}
              </option>
            </select>
          </div>

          <div class="mt-4 mb-3 col-sm-6">
            <MaterialInput id="asentamientoi"  type="text" label="Asentamiento"
              name="asentamientoi" v-model="dato.Colonia"
              :isRequired="true" placeholder="Colonia" @input="dato.Colonia = dato.Colonia.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,'').toUpperCase()"
            />
          </div>

          <div class="form-group col-sm-4">
            <label for="tipo" class="form-label">Tipo Asentamiento</label>
            <select id="tipo" class="form-control" placeholder="Selecciona el tipo de asentamiento"
              v-model="dato.TipoAsentamiento">
              <option v-for="row in tipoAsentamiento" :key="row.id" :value="row.id">
                {{ row.desc }}
              </option>
            </select>
          </div>
          <div class="mt-4 mb-3 col-sm-6">
            <MaterialInput id="tipoasentamiento" type="text" label="Tipo Asentamiento" name="tipoasentamiento"
              v-model="dato.TipoAsentamiento" :isRequired="true" placeholder="Colonia"
              @input="dato.TipoAsentamiento = dato.TipoAsentamiento.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,'').toUpperCase()"/>
          </div>
          <div class="form-group col-sm-4">
            <label for="municipio" class="form-label">Municipio</label>
            <select
              id="municipio"
              class="form-control"
              placeholder="Selecciona el municipio"
              v-model="dato.Municipio"
            >
              <option v-for="row in municipio" :key="row.id" :value="row.id">
                {{ row.desc }}
              </option>
            </select>
          </div>
          <div class="mt-4 mb-3 col-sm-6">
            <MaterialInput
              id="givenMunicipio"
              type="text"
              label="Municipio"
              name="givenMunicipio"
              v-model="dato.Municipio"
              :isRequired="true"
              disabled="true"
              @input="
                dato.Municipio = dato.Municipio.replace(
                  /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                  ''
                ).toUpperCase()
              "
            />
          </div>

          <div class="form-group col-sm-4">
            <label for="estado" class="form-label">Estado</label>
            <select
              id="estado"
              class="form-control"
              placeholder="Selecciona el Estado"
              v-model="dato.Estado"
            >
              <option v-for="row in estado" :key="row.id" :value="row.id">
                {{ row.desc }}
              </option>
            </select>
          </div>

          <div class="mt-4 mb-3 col-sm-6">
            <MaterialInput
              id="givenEstado"
              type="text"
              label="Estado"
              name="givenEstado"
              v-model="dato.Estado"
              :isRequired="true"
              disabled="true"
              @input="
                dato.Estado = dato.Estado.replace(
                  /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                  ''
                ).toUpperCase()
              "
            />
          </div>
        </div>
        
        <div class="row container-fluid mt-3">
          <div class="col-sm-4 mb-3">
            <MaterialInput
              id="givenlatitud" type="text" label="Latitud" name="givenlatitud" v-model="dato.latitud"
              :isRequired="true"  disabled="true"
            />
          </div>
          <div class="col-sm-4 mb-3">
            <MaterialInput
              id="givenlongitud" type="text" label="Longitud" name="givenlongitud" v-model="dato.longitud"
              :isRequired="true" disabled="true"
            />
          </div>
          <div class="col-sm-4 mb-3">
            <MaterialButton @click="getLocation(5)">
                  Ubicar Codigo Postal
            </MaterialButton>
          </div>
        </div>

        <div ref="mapContainer" style="width: 400px; height: 400px; align-content: center;"></div>

        
      </form>
    </div>
  </div>
</template>


<script>
import { useAspiranteStore } from "@ue/modules/Aspirante/store/useAspiranteStore";
import {  getGradoescolaridad,  getEstadoEscolaridad,  getSexo,  getEdoCivil,} from "@ue/services/catalogosDbService";
import { storeToRefs } from "pinia";
import MaterialInput from "@/components/common/MaterialInput.vue";
import { onMounted, ref } from "vue";
import L from "leaflet";

export default {
  components: {
    MaterialInput,
  },
  name: "AspiranteInfo",
  setup() {
    const store = useAspiranteStore();
    const {
      aspirante: dato,      municipio,
      estado,      tipoAsentamiento,      asentamiento,
    } = storeToRefs(store);

    const gradoEscolaridadOptions = getGradoescolaridad();
    const estadoEscolaridadOptions = getEstadoEscolaridad();
    const sexoOptions = getSexo();
    const edoCivilOptions = getEdoCivil();
    const lat = ref(19.528243303790916);
    const lng = ref(-99.21203763207524);
    const map = ref();
    const mapContainer = ref();
    const marker = ref();
    
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
      if (cp != 0) await store.fetchCP(cp);  
      getLocation(5);
    };


    const setData = () => {
      store.setData();
      
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

    onMounted(() => {
      map.value = L.map(mapContainer.value).setView([lat.value, lng.value],13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map.value);

      map.value.on('dblclick',createMarker);
      console.log('latitud '+dato.value + ' Longitud '+dato.value.longitud)
      
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
      municipio,
      estado,
      tipoAsentamiento,
      asentamiento,
      setData,
      lat,lng
    };
  },
};
</script>