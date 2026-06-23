<template>
  <div class="pt-4 container-fluid">
    <div class="d-flex mb-4">
      <material-button color="dark" variant="outline" @click="navigateToList" class="d-flex align-items-center">
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
                Editar Usuario del Sistema
              </h4>
            </div>
          </div>
          <div class="card-body mt-4">
            <form role="form" @submit.prevent="handleUpdate">
              <div class="mb-4">
                <material-input v-model="selecteduser.nombre" label="Nombre del Usuario" variant="outline" />
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
  import { useUsuarioStore } from "@mod1/modules/usuarios/store/useUsuarioStore";
  import { ref, onMounted } from "vue";
  import {  useRoute } from "vue-router";
  
  export default {
    name: "UsuarioEdit",
    setup() {
      const usuarioStore = useUsuarioStore();
      const usuario = ref({ name: "" });
     
      const route = useRoute();
  
      onMounted(() => {
        const userid = route.params.id;
        const existingUsuario = usuarioStore.usuarios.find((g) => g.id === userid);
        if (existingUsuario) {
          usuario.value = { ...existingUsuario };
        }
      });
  
     
  
      return { usuario  };
    },
  };
  </script>