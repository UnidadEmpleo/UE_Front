<template>
  <div class="col pt-4 container-fluid">
    <div class="d-flex mb-4 pb-3">
      <material-button color="dark" variant="gradient" @click="navigateToList" class="d-flex align-items-center ">
        <i class="material-icons-round me-2">arrow_back</i>
        Regresar al Listado
      </material-button>
    </div>

    <div class="row">
      <div class="col-lg-9 col-md-11 col-12 m-auto">
        <div class="pt-4 ps-2 pe-2" style="height: 76vh; overflow-y: auto;">
          <div class="card">
            <div class="card-header p-0 position-relative mt-n4 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3"> <!-- Color del card header -->
                <div class="text-center mb-2">
                  <i class="material-icons-round text-white" style="font-size: 2.5rem">admin_panel_settings</i>
                </div>
                <h4 class="text-white text-center text-uppercase font-weight-bolder mb-0">
                  {{ rol.id ? "Configuración de Rol" : "Registro de Nuevo Rol" }}
                </h4>
                <p class="text-white text-center opacity-8 mb-3 text-sm">
                  {{
                    rol.id
                      ? "Modifique los permisos y datos del rol seleccionado"
                      : "Complete la información para dar de alta un rol en el sistema"
                  }}
                </p>
                <div class="multisteps-form__progress">
                  <button class="multisteps-form__progress-btn" type="button"
                    :class="activeStep >= 0 ? activeClass : ''" @click="setActiveStep(0)">
                    <span>Información de Rol</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form class="multisteps-form__form mt-3">
                <RolInfo :class="activeStep === 0 ? activeClass : ''" />

                <hr class="horizontal dark my-4" />

                <div class="d-flex justify-content-evenly align-items-center">
                  <div class="d-flex justify-content-start">
                    <!-- Boton de cancelar-->
                    <material-button color="danger" variant="outline" @click="navigateToList"
                      class="d-flex align-items-center px-5">
                      <i class="material-icons-round me-2">arrow_back</i>
                      Cancelar y Volver
                    </material-button>
                  </div>
                  <div class="d-flex justify-content-end">
                    <!-- Boton de guardar -->
                    <MaterialButton id="save-role-button" color="success" variant="gradient"
                      class="d-flex align-items-center px-5 shadow-success" @click.prevent="handleSave">
                      <i class="material-icons-round me-2">save</i>
                      {{ rol.id ? "Actualizar Datos" : "Guardar Registro" }}
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
import RolInfo from "@mod1/modules/roles/components/RolInfo.vue";
import MaterialButton from "@/components/common/MaterialButton.vue";
import { useRolesStore } from "@mod1/modules/roles/store/useRolesStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMainStore } from "@/store/useMainStore";

export default {
  name: "RolesCreate",
  components: {
    RolInfo,
    MaterialButton,
  },
  setup() {
    const rolesStore = useRolesStore();
    const { rol, activeStep, activeClass } = storeToRefs(rolesStore); // Use storeToRefs for reactivity
    const router = useRouter();
    const mainStore = useMainStore();

    const navigateToList = () => {
      rolesStore.resetSelectedRol();
      router.push({ name: "RolesList" });
    };

    const handleSave = async () => {
      if (rol.value.procesos == null || rol.value.procesos.length == 0) {
        mainStore.triggerAlert({
          message: "Es necesario capturar un proceso.",
          color: "warning",
          icon: "warning",
        });
        return;
      }
      let result;
      if (rol.value.id) {
        result = await rolesStore.updateRol();
      } else {
        result = await rolesStore.createRol();
      }

      if (result) {
        router.push({ name: "RolesList" });
      }
    };

    return {
      rol,
      activeStep,
      activeClass,
      handleSave,
      setActiveStep: rolesStore.setActiveStep,
      navigateToList,
    };
  },
};
</script>