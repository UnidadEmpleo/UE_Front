<template>
  <div
    class="multisteps-form__panel border-radius-xl bg-white"
    data-animation="FadeIn"
  >
    <h5 class="font-weight-bolder mb-0">Configuración</h5>
    <p class="mb-0 text-sm">Configuración del Usuario</p>
    <div class="multisteps-form__content">
      <form class="multisteps-form__form" @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="accountEnabled" class="form-label">Usuario AD</label>
          <material-switch
            id="accountEnabled"
            name="accountEnabled"
            v-model:checked="user.esUsuarioAD"
          />
        </div>

        <div class="mb-3">
          <material-input
            id="mailNickname"
            type="text"
            label="Usuario"
            name="mailNickname"
            :isRequired="true"
            placeholder="Ingrese el nombre del usuario"
            v-model="user.userName"
            :disabled="user.id != null"
            @input="
              user.userName = user.userName
                .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
                .toUpperCase()
            "
          />
        </div>
        <div class="mb-3">
          <label
            :hidden="user.id == null ? true : false"
            for="labelpasswordReset"
            class="form-label"
            >Cambiar Contraseña</label
          >
          <div :hidden="user.id == null ? true : false">
            <material-switch
              id="passwordReset"
              name="passwordReset"
              label="Restablecer Password"
              v-model:checked="passwordReset"
            />
          </div>
          <material-input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            name="password"
            :isRequired="true"
            placeholder="Ingrese la contraseña"
            v-model="user.password"
            :disabled="user.id && !passwordReset"
          />

          <button
            type="button"
            class="btn btn-sm btn-outline-secondary mt-2"
            @click="togglePasswordVisibility"
          >
            {{ showPassword ? "Ocultar" : "Mostrar" }} Contraseña
          </button>
          <p v-if="passwordError" class="text-danger mt-1">
            {{ passwordError }}
          </p>
        </div>

        <div class="mb-3">
          <label for="accountEnabled" class="form-label">Activo</label>
          <material-switch
            id="accountEnabled"
            name="accountEnabled"
            permiso="Usuarios.Inactivar"
            v-model:checked="user.activo"
          />
        </div>
        <div class="mb-3">
          <label for="grupoId" class="form-label">*Grupo</label>
          <select
            id="grupoId"
            class="form-control"
            placeholder="Ingresa el Grupo"
            v-model="user.grupoId"
            v-permiso="'Usuarios.SeleccionarGrupo'"
          >
            <option v-for="row in this.groups" :key="row.id" :value="row.id">
              {{ row.nombre }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="rolId" class="form-label">*Rol</label>
          <select
            id="rolId"
            class="form-control"
            placeholder="Ingresa el Rol"
            v-model="user.rolId"
            v-permiso="'Usuarios.SeleccionarRol'"
          >
            <option v-for="role in this.roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <MaterialTags
            id="corporaciones"
            :options="corporaciones || []"
            v-model="selectedCorporaciones"
            label="*Corporaciones"
          />
        </div>
        <div class="mb-3">
          <material-input
            id="inactiveTime"
            type="number"
            label="Tiempo Inactivo"
            name="inactiveTime"
            v-model="user.tiempoInactividad"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useUsuarioStore } from "@mod1/modules/usuarios/store/useUsuarioStore";
import { storeToRefs } from "pinia";
import MaterialInput from "@/components/common/MaterialInput.vue";
import { ref, onMounted, computed, watch } from "vue";
import MaterialTags from "@/components/common/MaterialTags.vue";
import MaterialSwitch from "@/components/common/MaterialSwitch.vue";

export default {
  components: {
    MaterialInput,
    MaterialTags,
    MaterialSwitch,
  },
  name: "UsuarioInfo",
  setup() {
    const usuarioStore = useUsuarioStore();
    const {
      selecteduser: user,
      roles,
      groups,
      corporaciones,
    } = storeToRefs(usuarioStore);

    const passwordError = ref("");
    const showPassword = ref(false);
    const passwordReset = ref(false);

    // ...existing code...
    const validatePassword = (password) => {
      // Al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      return regex.test(password);
    };

    watch(
      () => user.value.password,
      (newVal) => {
        if (!validatePassword(newVal)) {
          passwordError.value =
            "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
        } else {
          passwordError.value = "";
        }
      }
    );

    const handleSubmit = () => {
      if (!validatePassword(user.value.password)) {
        passwordError.value =
          "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
        return;
      }
      // ...resto de tu lógica de guardado...
    };

    storeToRefs(usuarioStore);

    const selectedCorporaciones = computed({
      get() {
        return Array.isArray(user.value.corporacionesSeleccinados)
          ? user.value.corporacionesSeleccinados.map((val) => ({
              name: val,
            }))
          : [];
      },
      set(newValue) {
        user.value.corporacionesSeleccinados = Array.isArray(newValue)
          ? newValue.map((x) => x.name)
          : [];
      },
    });

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    onMounted(() => {
      if (!user.value) {
        user.value = []; // Initialize users if undefined
      }

      if (!user.corporacionesSeleccinados) {
        user.corporacionesSeleccinados = []; // Initialize users if undefined
      }

      if (!corporaciones.value) {
        corporaciones.value = []; // Inicializa corporaciones como un array vacío
      }

      if (!user.value.length) {
        usuarioStore.getAllGroups();
        usuarioStore.getAllRol();
        usuarioStore.getAllCorporations();
      }
    });

    return {
      user,
      roles,
      groups,
      corporaciones,
      handleSubmit,
      passwordError,
      showPassword,
      togglePasswordVisibility,
      selectedCorporaciones,
      passwordReset,
    };
  },
};
</script>

<style scoped>
.form-control {
  border: 4px solid #ccc !important;
  border-radius: 4px;
  background: #fff;
}
</style>