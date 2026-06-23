<template>
    <div class="col pt-4 container-fluid ">
    <div class="d-flex mb-4 pb-3">
        <material-button color="dark" variant="gradient" @click="navigateToList" class="d-flex align-items-center">
          <i class="material-icons-round me-2">arrow_back</i>
          Regresar al Listado
        </material-button>
    </div>

    <div class="row">
      <div class="col-lg-9 col-md-11 col-12 m-auto">
        <div class="pt-4 ps-2 pe-2" style="height: 76vh; overflow-y: auto;">
        <div class="card">
          <div class="card-header p-0 position-relative mt-n4 z-index-2">
            <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <div class="text-center mb-2">
                <i class="material-icons-round text-white" style="font-size: 2.5rem">admin_panel_settings</i>
              </div>
              <h4 class="text-white text-center text-uppercase font-weight-bolder mb-0">
                {{
                  selectedProceso.id
                    ? "Configuración de un Proceso"
                    : "Registro de Nuevo Proceso"
                }}
              </h4>
              <p class="text-white text-center opacity-8 mb-3 text-sm">
                {{
                  selectedProceso.id
                    ? "Modifique los datos del proceso seleccionado"
                    : "Complete la información para dar de alta un proceso en el sistema"
                }}
              </p>

              <div class="multisteps-form__progress">
                <button class="multisteps-form__progress-btn" type="button" title="User Info"
                  :class="activeStep >= 0 ? activeClass : ''" @click="activeStep = 0">
                  <span>Informacion de Proceso</span>
                </button>
              </div>
            </div>
          </div>

          <div class="card-body">
            <form class="multisteps-form__form">
              <proceso-info :class="activeStep === 0 ? activeClass : ''" />
              <div class="mt-4 d-flex justify-content-between">

                <div class="d-flex justify-content-start">
                  <!-- Boton de cancelar-->
                  <material-button color="danger" variant="outline" @click="navigateToList"
                    class="d-flex align-items-center px-5">
                    <i class="material-icons-round me-2">arrow_back</i>
                    Cancelar y Volver
                  </material-button>
                </div>
                <!-- Boton de guardar -->
                <div class="d-flex justify-content-end">
                  <MaterialButton id="next-step-button" color="success" variant="gradient"
                    @click.prevent="handleSubmit">
                    {{ selectedProceso.id != null ? "Modificar" : "Guardar" }}
                  </MaterialButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProcesoInfo from "@mod1/modules/procesos/components/ProcesoInfo.vue";
import MaterialButton from "@/components/common/MaterialButton.vue";
import { useProcesoStore } from "@mod1/modules/procesos/store/useProcesoStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default {
  name: "ProcesoCreate",
  components: {
    ProcesoInfo,
    MaterialButton,
  },
  setup() {
    const procesoStore = useProcesoStore();
    const { activeStep, activeClass, selectedProceso } =
      storeToRefs(procesoStore);
    const router = useRouter();

    const navigateToList = () => {
      procesoStore.reset();
      router.push({ name: "ProcesoList" });
    };

    const handleSubmit = () => {
      if (procesoStore.selectedProceso.id == null) {
        procesoStore.createProcess();
      } else {
        procesoStore.updateProcess();
      }

      navigateToList();
    };

    return {
      activeStep,
      activeClass,
      selectedProceso,
      procesoStore,
      navigateToList,
      handleSubmit,
    };
  },
};
</script>