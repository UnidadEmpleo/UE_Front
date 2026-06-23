<template>
  <div class="py-4 container-fluid">
    <div class="d-flex mb-4">
      <material-button color="dark" variant="gradient" @click="navigateToList" class="d-flex align-items-center">
        <i class="material-icons-round me-2">arrow_back</i>
        Cancelar y Volver
      </material-button>
    </div>

    <div class="row">
      <div class="col-lg-8 col-md-10 col-12 m-auto">
        <div class="card">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
              <h4 class="text-white text-center text-uppercase font-weight-bolder mb-0">
                <i class="material-icons-round align-middle me-2">edit</i>
                Editar Rol del Sistema
              </h4>
            </div>
          </div>
          <div class="card-body mt-4">
            <form role="form" @submit.prevent="updateRol">
              <div class="mb-4">
                <material-input v-model="grupo.name" label="Nombre del Rol" variant="outline" placeholder="Ej: Administrador" />
              </div>
              <div class="text-center">
                <material-button type="submit" color="success" variant="gradient" class="px-5 shadow-info">
                  <i class="material-icons-round me-2">update</i>
                  Actualizar Información
                </material-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { useRolesStore } from "@mod1/modules/roles/store/useRolesStore";
  import { ref, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import MaterialInput from "@/components/common/MaterialInput.vue";
  import MaterialButton from "@/components/common/MaterialButton.vue";
  
  export default {
    name: "RolesEdit",
    components: { MaterialInput, MaterialButton },
    setup() {
      const rolesStore = useRolesStore();
      const grupo = ref({ name: "" });
      const router = useRouter();
      const route = useRoute();
  
      onMounted(() => {
        const grupoId = route.params.id;
        const existingRol = rolesStore.grupos.find((g) => g.id === grupoId);
        if (existingRol) {
          grupo.value = { ...existingRol };
        }
      });
  
      const updateGrupo = async () => {
        await rolesStore.updateGrupo(grupo.value);
        router.push({ name: "RolesList" });
      };

      const navigateToList = () => {
        router.push({ name: "RolesList" });
      };
  
      return { grupo, updateRol: updateGrupo, navigateToList };
    },
  };
  </script>