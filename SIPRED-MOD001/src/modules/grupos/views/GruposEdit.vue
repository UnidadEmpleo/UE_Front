<template>
  <div class="py-4 container-fluid">
    <div class="d-sm-flex justify-content-between">
      <div>
        <material-button color="dark" variant="gradient" @click="navigateToList" class="d-flex align-items-center">
          <i class="material-icons-round me-2">arrow_back</i>
          Regresar al Listado
        </material-button>
      </div>
    </div>
    <div class="row min-vh-80">
      <div class="col-lg-8 col-md-10 col-12 m-auto">
        <h3 class="mt-3 mb-0 text-center">Edición de Grupo Existente</h3>
        <p class="lead font-weight-normal opacity-8 mb-7 text-center">
          Actualice los parámetros y detalles del grupo seleccionado.
        </p>
        <div class="card">
          <div class="card-header p-0 position-relative mt-n5 mx-3 z-index-2">
            <div class="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
              <div class="text-center text-white">
                <h5 class="text-white mb-0">Formulario de Edición</h5>
              </div>
            </div>
          </div>
          <div class="card-body">
            <form class="multisteps-form__form">
              <!-- Reutilizamos el componente de información -->
              <grupo-info />
              
              <div class="mt-4 d-flex justify-content-end">
                <MaterialButton
                  color="info"
                  variant="gradient"
                  @click.prevent="updateGrupo"
                  class="d-flex align-items-center"
                >
                  <i class="material-icons-round me-2">sync</i>
                  Guardar Cambios
                </MaterialButton>
              </div>
            </form>
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
  import { onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { storeToRefs } from "pinia";
  
  export default {
    name: "GruposEdit",
    components: { GrupoInfo, MaterialButton },
    setup() {
      const gruposStore = useGruposStore();
      const { grupo } = storeToRefs(gruposStore);
      const router = useRouter();
      const route = useRoute();
  
      onMounted(() => {
        const grupoId = route.params.id;
        const existingGrupo = gruposStore.grupos.find((g) => g.id === grupoId);
        if (existingGrupo) {
          gruposStore.grupo = { ...existingGrupo };
        }
      });
  
      const updateGrupo = async () => {
        const success = await gruposStore.updateGrupo();
        if (success) router.push({ name: "GruposList" });
      };

      const navigateToList = () => {
        gruposStore.resetSelectedGrupo();
        router.push({ name: "GruposList" });
      };

      return { grupo, updateGrupo, navigateToList };
    },
  };
  </script>