<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal-card">
      <div class="modal-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Revisión de Expediente</h5>
        <button class="btn-close" @click="$emit('close')">×</button>
      </div>
      <div class="modal-body">
    
       <div class="mb-3">
          
          <div class="card">
            <label for="empleo" class="form-label font-weight-bolder ">DOCUMENTOS ENTREGADOS</label>
            <div class="row container-fluid mt-2">
              <div class="card col-sm-6" >
                
                <div class="row d-flex justify-content-around">
                  <label for="empleo" class="form-label font-weight-bolder col-sm-1">No.</label>
                  <label for="empleo" class="form-label font-weight-bolder col-sm-3">Documento</label>
                  <p class="mb-0 text-sm col-sm-1">Original</p>
                  <p class="mb-0 text-sm col-sm-1">Copias</p>
                </div>
                
                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mt-1">1</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">Tarjeta de envío</p>
                      <div class=" col-sm-1 mt-1">
                        <material-switch id="tarjEnvio" label="" v-model:checked="sol.tarjetaEnvio"  />
                      </div>
                      <select class="col-sm-1 mb-1 mt-1" name="example" v-model="sol.notarjetaEnvio">
                          <option value="0">0</option>
                          <option value="1">1</option>
                      </select>
                      
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mt-1">2</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">Presolicitud</p>
                      <div class=" col-sm-1 mt-1">
                        <material-switch id="pre"  label="" v-model:checked="sol.presolicitud" />
                      </div>
                      <label for="empleo" class="form-label  col-sm-1 mt-auto mb-auto">0</label>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mb-auto mt-auto">3</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">6 fotografías tamaño infantil blanco y negro, vestido de civil y con nombre en la parte de atras. Hombres:Cabello corto, sin barba ni bigote. Mujeres:Cabello recogico, sin maquillane ni aretes</p>
                      <div class=" col-sm-1 mb-auto mt-auto">
                        <material-switch id="foto"  label="" v-model:checked="sol.fotografias" />
                      </div>
                      <label for="empleo" class="form-label  col-sm-1 mt-auto mb-auto">0</label>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mb-auto mt-auto">4</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">Croquis de ubicación de domicilio</p>
                      <div class=" col-sm-1 mb-auto mt-auto">
                        <material-switch id="croquis"  label="" v-model:checked="sol.croquis" />
                      </div>
                      <label for="empleo" class="form-label  col-sm-1 mt-auto mb-auto">0</label>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mb-auto mt-auto">5</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">3 referencias con domicilio completo. 1 familiar directo, 1 familiar indirecto y 1 amigo, vecino o conocido</p>
                      <div class=" col-sm-1 mb-auto mt-auto">
                        <material-switch id="ref" v-model:checked="sol.referenciasDomicilio" />
                      </div>
                      <label for="empleo" class="form-label  col-sm-1 mt-auto mb-auto">0</label>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mb-auto mt-auto">6</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">Dependientes económicos</p>
                      <div class=" col-sm-1 mb-auto mt-auto">
                        <material-switch id="dep" label="" v-model:checked="sol.dependienteEconomico" />
                      </div>
                      <label for="empleo" class="form-label  col-sm-1 mt-auto mb-auto">0</label>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mb-auto mt-auto">7</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">Precartilla, recibo o cartilla liberada</p>
                      <div class=" col-sm-1 mb-auto mt-auto">
                        <material-switch id="preca" v-model:checked="sol.pre_cartillaLiberada" />
                      </div>
                      <select class="col-sm-1 mb-auto mt-auto" v-model="sol.nopre_cartillaLiberada">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </select>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mb-auto mt-auto">8</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">Certificado de estudios (mínimo secundaria, las copias deberán ser por ambos lados)</p>
                      <div class=" col-sm-1 mb-auto mt-auto">
                        <material-switch id="cert" v-model:checked="sol.certificadoEstudios" />
                      </div>
                      <select class="col-sm-1 mb-auto mt-auto" v-model="sol.nocertificadoEstudios">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </select>
                    </div>
                </div>

              </div>

              <div class="card col-sm-6" >

                <div class="row d-flex justify-content-around">
                  <label for="empleo" class="form-label font-weight-bolder col-sm-1">No.</label>
                  <label for="empleo" class="form-label font-weight-bolder col-sm-3">Documento</label>
                  <p class="mb-0 text-sm col-sm-1">Original</p>
                  <p class="mb-0 text-sm col-sm-1">Copias</p>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mt-1">9</label>
                      <p class="mb-0 text-sm col-sm-3 mt-auto mb-auto">Acta de nacimiento</p>
                      <div class=" col-sm-1 mt-auto mb-auto">
                        <material-switch id="acta" v-model:checked="sol.actaNacimiento" />
                      </div>
                      <select class="col-sm-1 mt-auto mb-auto" v-model="sol.noactaNacimiento">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </select>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mt-1">10</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">Certificado de antecedentes no penales</p>
                      <div class=" col-sm-1 mt-auto mb-auto">
                        <material-switch id="antecedentes" v-model:checked="sol.noAntecedentesPenales" />
                      </div>
                      <select class="col-sm-1 mt-auto mb-auto" v-model="sol.nonoAntecedentesPenales">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </select>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mt-1">11</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">Comprobante de domicilio actual: recibo telefónico, estado de cuenta bancario, TV de paga o constancia domiciliaria emitida por el municipio (NO predio, izzi, agua o luz)</p>
                      <div class=" col-sm-1 mt-auto mb-auto">
                        <material-switch id="domi" v-model:checked="sol.comprobanteDomicilio" />
                      </div>
                      <select class="col-sm-1 mt-auto mb-auto" v-model="sol.nocomprobanteDomicilio">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </select>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mt-1">12</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">2 Cartas de recomendación actuales personales con domicilio completo, firma y teléfono (NO familiares)</p>
                      <div class=" col-sm-1 mt-auto mb-auto">
                        <material-switch id="reco" v-model:checked="sol.cartasRecomendacion" />
                      </div>
                      <label for="empleo" class="form-label  col-sm-1 mt-auto mb-auto">0</label>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mt-1">13</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">CURP actualizado</p>
                      <div class=" col-sm-1 mt-auto mb-auto">
                        <material-switch id="copiacurp" v-model:checked="sol.curpActualizado" />
                      </div>
                      <select class="col-sm-1 mt-auto mb-auto" v-model="sol.nocurpActualizado">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </select>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mt-1">14</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">INE</p>
                      <div class=" col-sm-1 mt-auto mb-auto">
                        <material-switch id="ine" v-model:checked="sol.ine" />
                      </div>
                      <select class="col-sm-1 mt-auto mb-auto" name="example" v-model="sol.noine">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </select>
                    </div>
                </div>

                <div class="card">    
                    <div class="row d-flex justify-content-around">
                      <label for="empleo" class="form-label font-weight-bolder col-sm-1 mt-1">15</label>
                      <p class="mb-0 text-sm col-sm-3 mt-1">Registro Federal de Contribuyentes con homoclave (RFC) actual</p>
                      <div class="col-sm-1 mt-auto mb-auto">
                        <material-switch id="rfc" v-model:checked="sol.rfcHomoclave" />
                      </div>
                      <select class="col-sm-1 mt-auto mb-auto" v-model="sol.norfcHomoclave">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </select>
                    </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="row col-sm-2 justify-content-start">
              <material-switch  id="statusExpediente" name="estatusExp" :disabled="true" label="Expediente completo" v-model:checked="sol.statusExp" />              
          </div>
          <div class="mb-3 col-sm-2">
              <MaterialComboBox class="col-sm-2" id="status" label="Estatus" v-model="sol.status" :options="optStatusSolicitud" :disabled="true"/>
          </div>
          
          <div class="mb-3 col-sm-8">
              <MaterialInput class="col-sm-2" id="obs" type="text" label="Observaciones" v-model="sol.observaciones"/>
          </div>
        </div>

        <div class="d-flex justify-content-between mt-3">
          <button class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
          <div class="d-flex gap-2">
            <button class="btn btn-gold" :disabled="loading" @click.prevent="onPrevSave">Terminar</button>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import {  ref, watch } from 'vue';
import { useSolicitudStore } from "@ue/modules/Solicitud/store/solicitudStore";
import {getStatusSolicitud, } from "@ue/services/catalogosDbService"
import { storeToRefs } from "pinia";
import MaterialInput from "@/components/common/MaterialInput.vue";
import MaterialSwitch from "@/components/common/MaterialSwitch.vue";
import MaterialComboBox from "@/components/common/MaterialComboBox.vue";

export default {
  name: 'ExpedienteCompleto',
  components: {    
    MaterialInput,
    MaterialSwitch,
    MaterialComboBox,
  },
  props: {
    visible: { type: Boolean, default: false },
    completo:{ type: Boolean, default: false },
    //previewHandler: { type: Function, required: true },
  },
  emits: ['close', 'update:completo'],
  setup(props, { emit }) {
    const store = useSolicitudStore();
    const { solicitud: sol } = storeToRefs(store);
    const optStatusSolicitud = getStatusSolicitud();

    const loading = ref(false)

    watch(() => props.visible, (v) => {
      if (v) {
        //AQUI PUEDO AGREGAR UNA FUNCIÓN DE VALORES INICIALES
        console.log('whatching ExpedienteCompleto '+v)
      }
    }, { immediate: true })

    function syncFilters() {
      const resultadoout = sol.statusExp
      emit('update:completo', resultadoout)
      return resultadoout
    }
    
    async function onPrevSave() {
      if (sol.value.tarjetaEnvio == true &&           sol.value.presolicitud == true &&           sol.value.fotografias == true &&         sol.value.croquis == true &&
          sol.value.referenciasDomicilio == true &&   sol.value.dependienteEconomico == true &&   sol.value.pre_cartillaLiberada == true &&
          sol.value.certificadoEstudios == true &&    sol.value.actaNacimiento == true &&         sol.value.noAntecedentesPenales == true &&
          sol.value.comprobanteDomicilio == true &&   sol.value.cartasRecomendacion == true &&    sol.value.curpActualizado == true &&
          sol.value.ine == true &&        sol.value.rfcHomoclave == true 
          ){ 
            console.log('Eval sol.value.statusExp = true')
            sol.value.statusExp = true  
          }          
        else{ 
          console.log('Eval sol.value.statusExp = false')
          sol.value.statusExp = false
        }
      //actualiza 
      
      syncFilters()
    }
    
    return { sol, optStatusSolicitud, loading, onPrevSave};
  },
};
</script>

<style scoped>
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1050; }
  .modal-card { background: #fff; border-radius: 8px; width: min(1100px, 98vw); max-height: 90vh; overflow: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.modal-header { padding: 0.75rem 1rem; border-bottom: 1px solid #eee; }
.modal-body { padding: 1rem; }
.btn-close { background: transparent; border: none; font-size: 1.25rem; line-height: 1; }
.btn-gold { background-color: #C9A227; border-color: #C9A227; color: #111827; }
.btn-gold:hover { background-color: #B8931F; border-color: #B8931F; color: #111827; }
.btn-gray { background-color: #6B7280; border-color: #6B7280; color: #ffffff; }
.btn-gray:hover { background-color: #4B5563; border-color: #4B5563; }
.section-title { font-weight: 700; font-size: .9rem; color: #374151; text-transform: uppercase; margin-bottom: .5rem; }
</style>