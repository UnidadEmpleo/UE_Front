<template>
  <div  class="multisteps-form__panel border-radius-xl bg-white" data-animation="FadeIn"  >
    <div class="mb-3">
      <h5 class="font-weight-bolder mb-0">Datos de solicitud</h5>
      <p class="mb-0 text-sm">Información General</p>
    </div>
    <div class="multisteps-form__content">

      <form>
        <div class="card">
          <div class="mb-3">
            <label class="form-label font-weight-bolder">T E L É F O N O</label>
          </div>
          <div class="row justify-content-start">
          <div class="col-sm-3 mb-2">
            <MaterialInput id="mobilePhone" type="phone" label="Teléfono de Casa" v-model="sol.telefonoCasa"
            @input="sol.telefonoCasa = sol.telefonoCasa.replace(/[^0-9]/g, '')" />
          </div>
          <div class="col-sm-3 mb-2">
            <MaterialInput id="mobilePhone" type="phone" label="Teléfono para Recados" v-model="sol.telefonoRecado"
            @input="sol.telefonoRecado = sol.telefonoRecado.replace(/[^0-9]/g, '')" />
          </div>
          </div>
        </div>

        <div class="mb-3">
          <div class="card">
            <label for="entera" class="form-label font-weight-bolder">¿CÓMO SE ENTERÓ DEL EMPLEO?</label>
            <div class="row justify-content-start">
              <div class="col-sm-2">
                <input class="form-check-input" type="radio" id="1" value="1" v-model="sol.enteraEmpleo" />
                <label for="one">Reingreso</label>
              </div>
              <div class="col-sm-2">
                <input class="form-check-input"  type="radio" id="2" value="2" v-model="sol.enteraEmpleo" />
                <label for="two">Volante</label>
              </div>
              <div class="col-sm-2">
                <input class="form-check-input"  type="radio" id="3" value="3" v-model="sol.enteraEmpleo" />
                <label for="two">Reclutador</label>
              </div>
              <div class="col-sm-2">
                <input class="form-check-input"  type="radio" id="4" value="4" v-model="sol.enteraEmpleo" />
                <label for="two">Empresa o Particular</label>
              </div>
              <div class="col-sm-3">
                <input class="form-check-input"  type="radio" id="5" value="5" v-model="sol.enteraEmpleo" />
                <label for="two">Centro de Reclutamiento</label>
              </div>
              <div class="col-sm-2">
                <input class="form-check-input"  type="radio" id="6" value="6" v-model="sol.enteraEmpleo" />
                <label for="two">Iniciativa Propia</label>
              </div>
              <div class="col-sm-2">
                <input class="form-check-input"  type="radio" id="7" value="7" v-model="sol.enteraEmpleo" />
                <label for="two">Feria de Empleo</label>
              </div>
              <div class="col-sm-2">
                <input class="form-check-input"  type="radio" id="8" value="8" v-model="sol.enteraEmpleo" />
                <label for="two">Bolsa de Trabajo</label>
              </div>
              <div class="col-sm-4">
                <input class="form-check-input"  type="radio" id="9" value="9" v-model="sol.enteraEmpleo" />
                <label for="two">Conocido de un Familiar de la Corporacion</label>
              </div>
              
            </div>
          </div>
        </div>

        <div class="mb-3">
          <div class="card">
            <label for="empleo" class="form-label font-weight-bolder">Ú L T I M O  -  E M P L E O</label>
            <div class="row container-fluid mt-3">
              <div class="row col-sm-5 justify-content-start">
                <material-switch clase="col-sm-2" id="de" name="ult-emp" label="Gobierno" @click="privadaOgobierno(1)" v-model:checked="sol.gobierno" />
                <material-switch clase="col-sm-2" id="de" name="ult-emp" label="Iniciativa Privda" @click="privadaOgobierno(2)" v-model:checked="sol.privada" />
              </div>
              <div class="col-sm-7 mb-2">
                <MaterialInput id="nombreEmpresa" type="text" label="Nombre de la dependencia o empresa" v-model="sol.nombreEmpresa" />
              </div>
              <div class="col-sm-5 mb-2">
                <MaterialInput id="descEmpresa" type="text" label="Descripción de la dependencia o empresa" v-model="sol.descripcionEmpresa"/>
              </div>
              <div class="col-sm-4 mb-2">
                <MaterialInput id="motivoBaja" type="text" label="Motivo de Baja" v-model="sol.motivoBaja"/>
              </div>
              <div class="col-sm-3 mb-2">
                <MaterialInput id="puesto" type="text" label="Puesto" v-model="sol.puesto"/>
              </div>
              <div class="col-sm-3 mb-2">
                <MaterialInput id="jefeInm" type="text" label="Jefe Imediato" v-model="sol.jefeInmediato"/>
              </div>
              <div class="col-sm-3 mb-2">
                <MaterialInput id="telEmpresa" type="phone" label="Teléfono" v-model="sol.telefonoEmpleo"
                @input="sol.telefonoEmpleo = sol.telefonoEmpleo.replace(/[^0-9]/g, '')" />
              </div>
              <div class="col-sm-3 mb-2">
                <MaterialInput id="f_inico" type="date" label="Fecha de Inicio" v-model="sol.fechaInicio"/>
              </div>
              <div class="col-sm-3 mb-2">
                <MaterialInput id="f_termino" type="date" label="Fecha de termino" v-model="sol.fechaFinal"/>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <div class="card">
            <label for="empleo" class="form-label font-weight-bolder">¿HA SIDO?</label>
            <div class="row container-fluid mt-2">
              <div class="col-sm-2">
                <MaterialLabel label="Policia" />
                <div class="mt-3">
                  <material-switch id="policia" name="police" label="Policía" @click="habilitaPolicia" v-model:checked="sol.policia" />
                </div>
              </div>
              <div class="col-sm-3">
                <MaterialInput id="gradoIniciaPolicia" type="text" label="Grado de inicio" v-model="sol.gradoInicioPolicia"/>
                <MaterialInput class="mt-2" id="gradoIniciaPolicia" type="text" label="Grado de termino" v-model="sol.gradoFinalPolicia"/>
              </div>
           
              <div class="col-sm-2">
                <MaterialLabel label="Militar"/>
                <div class="mt-3">
                  <material-switch id="militar" name="army" label="Militar" v-model:checked="sol.militar" />
                </div>
              </div>
              <div class="col-sm-3">
                <MaterialInput id="gradoIniciaMilitar" type="text" label="Grado de inicio" v-model="sol.gradoInicioMilitar" />
                <MaterialInput class="mt-2" id="gradoIniciaMilitar" type="text" label="Grado de termino" v-model="sol.gradoFinalMilitar"/>
              </div>
            </div>
          </div>
        </div>

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
                        <material-switch id="tarjEnvio" v-model:checked="sol.tarjetaEnvio" />
                      </div>
                      <select class="col-sm-1 mb-1 mt-1" name="example" v-model="sol.notarjetaEnvio">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
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
              <MaterialComboBox class="col-sm-2" id="status" label="Estatus" v-model="sol.status" :options="optStatusSolicitud"/>
          </div>
          
          <div class="mb-3 col-sm-8">
              <MaterialInput class="col-sm-2" id="obs" type="text" label="Observaciones" v-model="sol.observaciones"/>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>

import { useSolicitudStore } from "../store/solicitudStore";
import {getStatusSolicitud, } from "@ue/services/catalogosDbService"
import { storeToRefs } from "pinia";
import MaterialInput from "@/components/common/MaterialInput.vue";
import MaterialLabel from "@/components/common/MaterialLabel.vue";
import MaterialSwitch from "@/components/common/MaterialSwitch.vue";
import MaterialComboBox from "@/components/common/MaterialComboBox.vue";

export default {
  components: {    
    MaterialInput,
    MaterialLabel,
    MaterialSwitch,
    MaterialComboBox,
  },
  name: "SolicitudDatosBasicos",
  setup() {
    const store = useSolicitudStore();
    const { solicitud: sol } = storeToRefs(store);
    const optStatusSolicitud = getStatusSolicitud();
    
    const noCopias = () =>{
      return [{ id: 1, name: '1' },
            { id: 2, name: '2' },
            { id: 3, name: '3' },];
      }

    const privadaOgobierno = (op) =>{
      console.log('opcion privada gob '+ op)
      if (op == 1){
        sol.value.gobierno = true;
        sol.value.privada = false;
      }else{
        sol.value.gobierno = false;
        sol.value.privada = true;
      }

    }

    const habilitaPolicia = () =>{

    }

    const optionsEmpleo = () =>{
       [
          { name: 'Reingreso', value: '1' },
          { name: 'Volante', value: '2' },
          { name: 'Reclutador', value: '3' },
          { name: 'Empresa o Particular', value: '4' },
          { name: 'Centro de Reclutamiento', value: '5' },
          { name: 'Iniciativa Propia', value: '6' },
          { name: 'Feria de Empleo', value: '7' },
          { name: 'Bolsa de Trabajo', value: '8' },
          { name: 'Conocido de un Familiar de la Corporacion', value: '9' },
        ]}
    
    return { privadaOgobierno, optionsEmpleo, sol, optStatusSolicitud, noCopias, habilitaPolicia};
  },
};
</script>