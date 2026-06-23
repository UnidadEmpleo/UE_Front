<template>
  <div class="col pt-4 container-fluid">
    <div class="d-flex mb-4 pb-3">
      <div>
        <material-button color="dark" variant="gradient" @click="navigateToList" class="d-flex align-items-center">
          <i class="material-icons-round me-2">arrow_back</i>
          Volver a la Lista
        </material-button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-9 col-md-11 col-12 m-auto">
        <div class="pt-5 ps-2 pe-2" style="height: 76vh; overflow-y: auto;">
          <div class="card">
            <div class="card-header p-0 position-relative mt-n5 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <div class="text-center mb-2">
                  <i class="material-icons-round text-white" style="font-size: 2.5rem">admin_panel_settings</i>
                </div>
                <h4 class="text-white text-center text-uppercase font-weight-bolder mb-0">
                  {{ grupo.id ? "Configuración de Grupo" : "Registro de Nuevo Grupo" }}
                </h4>
                <p class="text-white text-center opacity-8 mb-3 text-sm">
                  {{ grupo.id 
                  ? "Edite los campos necesarios para actualizar la información del grupo." 
                  : "Complete el formulario para dar de alta un nuevo grupo en el sistema." }}
                </p>
                <div class="multisteps-form__progress">
                  <button class="multisteps-form__progress-btn" type="button" title="User Info"
                    :class="activeStep >= 0 ? activeClass : ''" @click="activeStep = 0">
                    <span>Información de Grupo</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form class="multisteps-form__form">

                <grupo-info :class="activeStep === 0 ? activeClass : ''" />
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

                  <MaterialButton id="save-grupo-button" color="success" variant="gradient" @click.prevent="handleSave"
                    class="d-flex align-items-center">
                    <i class="material-icons-round me-2">save</i>
                    {{ grupo.id ? "Actualizar Información" : "Registrar Grupo" }}
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
import GrupoInfo from "@mod1/modules/grupos/components/GrupoInfo.vue";
import MaterialButton from "@/components/common/MaterialButton.vue";
import { useGruposStore } from "@mod1/modules/grupos/store/useGruposStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default {
  name: "GruposCreate",
  components: {
    GrupoInfo,
    MaterialButton,
  },
  setup() {
    const gruposStore = useGruposStore();
    const { grupo } = storeToRefs(gruposStore); // Use storeToRefs for reactivity
    const router = useRouter();

    const navigateToList = () => {
      gruposStore.resetSelectedGrupo();
      router.push({ name: "GruposList" });
    };

    const handleSave = async () => {
      let result;
      if (grupo.value.id)
        result = await gruposStore.updateGrupo();
      else
        result = await gruposStore.createGrupo();

      if (result) {
        router.push({ name: "GruposList" });
      }
    };

    return {
      grupo,

      handleSave,
      gruposStore,
      navigateToList,
    };
  },
};
</script>