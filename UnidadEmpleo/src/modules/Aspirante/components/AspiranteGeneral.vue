<template>
  <div
    class="multisteps-form__panel border-radius-xl bg-white"
    data-animation="FadeIn">
    <form >
      
      <div class="mb-3">
        <h5 class="font-weight-bolder mb-0">General</h5>
        
      </div>
      <div class="multisteps-form__content">
    

      <div class="card mb-3">
        <label for="empleo" class="form-label font-weight-bolder">INFORMACIÓN DEL ASPIRANTE</label>       
        <div class="row container-fluid mt-3">        
        <div class="col-sm-3 ">
          <div class="avatar avatar-xl position-relative">
            <img :src="placeholder" alt="profile_image" class="shadow-sm avatar-img"  :class="{ 'is-disabled': true }" />
              <!-- Modal -->
              <PhotoPickerModal
              v-model:visible="showPicker"
              v-model:modelValue="foto"
              title="Seleccionar fotografía"
              output="both"
              :showGrid="true"
              facingMode="environment"
              @select="onFoto"
              @error="(e)=>console.error(e)"
              />
              
          </div>
          <div class="avatar avatar-xl position-relative">
            <img :src="qrholder" alt="profile_image" class="shadow-sm avatar-img"  :class="{ 'is-disabled': true }" @click="openQrView()"/>
            
          </div>
        </div>
        <div class=" col-sm-3 ">        
          <MaterialInput id="Apellido_Paterno" type="text" label="Apellido Paterno" name="Apellido_Paterno" 
                                placeholder="Ingrese el apellido paterno" 
                                :isRequired="true"
                                v-model="dato.Apellido_Paterno"
                                @input="dato.Apellido_Paterno = dato.Apellido_Paterno.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').toUpperCase()"
                              />
        </div>
        <div class=" col-sm-3 mb-2">        
          <MaterialInput id="Apellido_Materno" type="text" label="Apellido Materno" name="Apellido_Materno" placeholder="Ingrese el apellido materno"
            v-model="dato.Apellido_Materno" @input="dato.Apellido_Materno = dato.Apellido_Materno.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').toUpperCase()"/>
        </div>
            
        <div class="col-sm-3 mb-2">
                <MaterialInput id="givenName" type="text" label="Nombre" name="givenName"                       
                                v-model="dato.Nombre" :isRequired="true" placeholder="Ingrese el nombre"
                                @input="dato.Nombre = dato.Nombre.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').toUpperCase()"
                   />
        </div>
      </div>
      <div class="row container-fluid">
        <div class="col-sm-3 mb-2">
          <MaterialComboBox id="givenSex" label="Sexo" v-model="dato.Sexo" :options="sexoOptions" seleccionaPlaceholder="Selecciona el Sexo"/>
        </div>
        
        <div class="col-sm-3 mb-2">
          <MaterialInput 
            id="givenfechaNacimiento" 
            v-model="dato.Fecha_Nacimiento" 
            label="Fecha de Nacimiento" 
            :isRequired="true" 
            @blur="formatStartDate" 
            placeholder="Ingrese una fecha [1982-03-05]"/>
        </div>
            
        <div class="col-sm-3 mb-2">
          <MaterialInput id="givenCurp" type="text" label="CURP" name="givenCurp"                       
             v-model="dato.Curp" :isRequired="true" placeholder="Ingrese el CURP"/>
        </div>
        <div class="col-sm-3 mb-2">
            <MaterialInput id="givenRfc" type="text" label="Rfc" name="givenRfc"                       
              v-model="dato.Rfc" :isRequired="true" placeholder="Ingrese el Rfc"/>
        </div>
        
      </div>
      <div class="row container-fluid">
        <div class="col-sm-3 mb-3">
          <MaterialComboBox id="givenEdoCivil" label="Estado Civil" v-model="dato.Estado_Civil" :options="edoCivilOptions" seleccionaPlaceholder="Selecciona el Estado Civil"/>
        </div>
        <div class="col-sm-3 mb-1">
            <label for="accountEnabled" class="form-label">Pensionado ISSEMYM</label>
            <material-switch id="accountEnabled" name="accountEnabled" v-model:checked="dato.PensionaodISSEMYM"/>
        </div>
          <div class="col-sm-4 mb-1">
        <MaterialInput id="mobilePhone" type="phone" label="Celular" v-model="dato.TelefonoCelular" @input="dato.TelefonoCelular = dato.TelefonoCelular.replace(/[^0-9]/g, '')"/>
      </div>
      </div>
      </div>
      
      
      <div  >
        <div class="card">
          <label for="Escolaridad" class="form-label font-weight-bolder" >ESCOLARIDAD</label>
          <div class="row container-fluid">
              <div class="col-sm-4 mb-">
                <MaterialComboBox id="givenGradoEscolaridad" label="Grado de Escolaridad" v-model="dato.Grado_Escolaridad" :options="gradoEscolaridadOptions" seleccionaPlaceholder="Selecciona el Grado de Escolaridad"/>
              </div>
              <div class="col-sm-4 mb-3">
                <MaterialComboBox id="givenGradoEscolaridadConcluida" label="Concluida o trunca" v-model="dato.EscolaridadConcluidaTrunca" :options="estadoEscolaridadOptions" seleccionaPlaceholder="Indica si concluyó" />
              </div>
              <div class="mb-3">
                <MaterialInput id="givenDocumentoAcreditaEscolaridad" type="text" label="Documento que acredite" name="givenCurp"                       
                              v-model="dato.DocumentoAcreditaEscolaridad" :isRequired="true" placeholder="Documento con el que acredite la escolaridad"
                              @input="dato.DocumentoAcreditaEscolaridad = dato.DocumentoAcreditaEscolaridad.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').toUpperCase()"/>
              </div>
              
          </div>
      
        </div>
      </div>
    
    </div>
  </form>
   
            <QrCURP
              :visible="qrVisible"
              @update:completo="v => closeQrView()"
              @close="qrVisible = false"
            />
            
</div>
 
</template>

<script>
import { ref, computed} from "vue";
import { useAspiranteStore } from "@ue/modules/Aspirante/store/useAspiranteStore";
import {getGradoescolaridad, getEstadoEscolaridad, getSexo, getEdoCivil } from "@ue/services/catalogosDbService"
import { storeToRefs } from "pinia";
import MaterialInput from "@/components/common/MaterialInput.vue";
import MaterialComboBox from '@/components/common/MaterialComboBox.vue';
import PhotoPickerModal from "@/components/PhotoPickerModal.vue";
import fotoDefault from "@/assets/img/user.png";
import qrDefault from "@/assets/img/cusaem_qr.png";
import QrCURP from "./QrCURP.vue";


import MaterialSwitch from "@/components/common/MaterialSwitch.vue";

export default {
  components: {    
    MaterialInput,PhotoPickerModal,
    MaterialComboBox,MaterialSwitch,
    QrCURP
  },
  name: "AspiranteInfo",
  setup() {
    
    const store = useAspiranteStore();
    const { aspirante: dato } = storeToRefs(store);
    const gradoEscolaridadOptions = getGradoescolaridad();
    const estadoEscolaridadOptions = getEstadoEscolaridad();
    const sexoOptions = getSexo();
    const edoCivilOptions = getEdoCivil();
    const placeholder = fotoDefault;
    const qrholder = qrDefault;
    const foto = ref(null);
    const qrVisible = ref(false)
    const canEditPhoto = computed(() => {
          return !!(dato.value && dato.value.id != null);
        });
    const showPicker = ref(false);
    
    function openQrView() {
      qrVisible.value = true
      //alert('qr clicked '+qrVisible.value)
    }
    function closeQrView() {      
      qrVisible.value = false      
    }

    function onFoto(payload) {         
      if (payload && payload.dataUrl) {
        store.dato.anexos = {
          archivoBlob: payload.dataUrl,
          tipoLink: 1,
          tipoAnexo: 1, 
          tipoArchivo: 1,
          nombreArchivo: payload.file.name || "foto_perfil",
          extension: payload.file.type,
        }; // guardar la URL de datos en el modelo
        store.createAnexo();
      } else {
        store.dato.value.anexos = {}; // o limpiar si no hay foto
      }
    }

    function openPhotoPicker() {
          if (!canEditPhoto.value) return; // disabled when no patient id
          showPicker.value = true;
        }

    return { onFoto, foto, openPhotoPicker, canEditPhoto, dato, gradoEscolaridadOptions, estadoEscolaridadOptions,sexoOptions,edoCivilOptions, 
      placeholder,qrholder,openQrView,closeQrView,qrVisible};
  },
};
</script>