<template>
  <div
    class="multisteps-form__panel border-radius-xl bg-white"
    data-animation="FadeIn"
  >
    <h5 class="font-weight-bolder mb-0">Permisos</h5>
    <p class="mb-0 text-sm">Configuración de los Permisos</p>
    <div>ok {{}}</div>
    <div class="multisteps-form__content">
      <form class="multisteps-form__form" @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="form-group">
            <label for="permisoid" class="form-label">Area de trabajo</label>
            <select
              id="CuerpoId"
              class="form-control"
              placeholder="Selecciona el cuerpo"
              v-model="user.cuerpoId"
              @click="availableRegiones"
            >
              <option v-for="row in rowsCuerpo" :key="row.id" :value="row.id">
                {{ row.alias }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="permisoid" class="form-label">Gerencia o Región</label>
            <select
              id="AreaId"
              class="form-control"
              placeholder="Selecciona el cuerpo"
              v-model="user.regionId"
            >
              <option
                v-for="row in regionesLista"
                :key="row.id"
                :value="row.id"
              >
                {{ row.region }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-grid">
          <!-- Campo Proceso -->
          <div class="form-group">
            <label for="permisoid" class="form-label">Proceso</label>
            <select
              id="permisoid"
              class="form-control"
              placeholder="Ingresa el acceso"
              v-model="selectedProcess"
            >
              <option
                v-for="row in availableProcesses"
                :key="row.id"
                :value="row.id"
              >
                {{ row.descr }}
              </option>
            </select>
          </div>
        </div>

        <!-- Botón Agregar -->
        <div class="form-group button-group">
          <MaterialButton
            id="add-process"
            color="success"
            variant="gradient"
            class="mt-4"
            @click="addPermission"
            v-permiso="'Usuarios.Agregar permisos'"
          >
            Agregar
          </MaterialButton>
        </div>

        <div class="mb-1">
          <DataTable
            title="Permisos"
            description="Lista de Permisos Agregados"
            table-id="permisos-table"
            :columns="columns"
            :rows="formattedPermisos"
            :searchable="true"
            :loadingProgress="loadingProgress"
          >
            <template #row-actions="{ row, index }">
              <div
                class="form-check form-check-inline"
                v-for="(valor, clave) in row.Permiso[0]"
                :key="clave"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="row.Permiso[0][clave]"
                  :id="`chk-${index}-${clave}`"
                />
                <label class="form-check-label" :for="`chk-${row}-${clave}`">{{
                  clave
                }}</label>
              </div>
              <div class="form-check form-check-inline">
                <material-button
                  color="danger"
                  variant="gradient"
                  size="sm"
                  @click="handleDelete(row)"
                >
                  Eliminar
                </material-button>
              </div>
            </template>
          </DataTable>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useUsuarioStore } from "@mod1/modules/usuarios/store/useUsuarioStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, computed, watch } from "vue";
import MaterialButton from "@/components/common/MaterialButton.vue";
import DataTable from "@/components/widgets/DataTable.vue";
import { useMainStore } from "@/store/useMainStore";
import { useCuerpoStore } from "@ue/modules/Cuerpo/useCuerpoStore";

export default {
  components: {
    MaterialButton,
    DataTable,
  },
  name: "UsuarioInfo",
  props: {
    columns: {
      type: Array,
      default: () => ["Proceso"],
    },
  },
  methods: {
    handleSubmit() {
      console.log("Form submitted!");
    },
  },
  setup() {
    const usuarioStore = useUsuarioStore();
    const cuerpoStore = useCuerpoStore();
    const { selecteduser: user, process } = storeToRefs(usuarioStore);
    const { rowsCuerpo } = storeToRefs(cuerpoStore);
    const mainStore = useMainStore();
    const selectedPermissionType = ref("");
    const selectedProcess = ref("");
    const cuperoSeleccionado = ref("");
    const regionSeleccionado = ref("");
    let regionesLista = ref([]); //rowsCuerpo.value[0].Regiones;
    const addPermission = () => {
      if (!selectedProcess.value) {
        mainStore.triggerAlert({
          message: "Por favor, selecciona un tipo de permiso y un proceso.",
          color: "warning",
          icon: "warning",
        });
        return;
      }

      const processName = process.value.find(
        (p) => p.id === selectedProcess.value
      )?.descr;

      if (
        Array.isArray(user.value.usuarioPermisos) &&
        user.value.usuarioPermisos.find(
          (permiso) => permiso.Proceso === processName
        )
      ) {
        mainStore.triggerAlert({
          message: "El Permiso ya ha sido agregado.",
          color: "warning",
          icon: "warning",
        });
        return;
      }

      // Asegura que usuarioPermisos sea un arreglo
      if (!Array.isArray(user.value.usuarioPermisos)) {
        user.value.usuarioPermisos = [];
      }

      let roleByUserSelected = usuarioStore.getRolByUserSelected(
        user.value.rolId
      );

      console.log(
        "Procesos desde localStorageService:",
        user.value.usuarioPermisos
      );
      console.log("userRol:", roleByUserSelected);

      if (user.value.usuarioPermisos == null) {
        user.value.usuarioPermisos = [];
      }

      console.log("Antes de agregar, usuarioPermisos:", processName);
      // Safely resolve acciones from the selected role; fall back to defaults
      const accionesRaw =
        roleByUserSelected?.procesos?.find((x) => x.descr === processName)
          ?.acciones ?? '[{"Agregar":true,"Editar":true,"Borrar":false}]';
      let permisoParsed = [];
      try {
        permisoParsed = JSON.parse(accionesRaw);
      } catch (e) {
        permisoParsed = [{ Agregar: true, Editar: true, Borrar: false }];
      }

      user.value.usuarioPermisos.push({
        Permiso: permisoParsed,
        Proceso: processName || "Desconocido",
      });

      selectedPermissionType.value = "";
      selectedProcess.value = "";
    };

    const handleDelete = (row) => {
      const index = user.value.usuarioPermisos.findIndex(
        (permiso) =>
          permiso.Permiso === row.Permiso && permiso.Proceso === row.Proceso
      );
      user.value.usuarioPermisos.splice(index, 1);
    };

    const formattedPermisos = computed(() =>
      Array.isArray(user.value.usuarioPermisos)
        ? user.value.usuarioPermisos.map((permiso) => ({
            ...permiso,
          }))
        : []
    );

    const availableProcesses = computed(() => {
      return process.value.filter(
        (p) =>
          !formattedPermisos.value.some(
            (permiso) => permiso.Proceso === p.descr
          ) &&
          p.tipo == "P" &&
          p.activo == true
      );
    });

    watch(
      () => user.rolId,
      (newRolId) => {
        if (newRolId) {
          usuarioStore.getProcessByRol();
        }
      },
      { immediate: true }
    );
    /*
    const availableRegiones = computed(() => {
      return cuerpos[0].Regiones;
    })*/

    const availableRegiones = () => {
      for (var i = 0; i < rowsCuerpo.value.length; i++) {
        if (rowsCuerpo.value[i].id === user.value.cuerpoId) {
          // cuperoSeleccionado.value){
          regionesLista.value = [];
          regionesLista.value = rowsCuerpo.value[i].regiones;
          console.log("cuerpoId " + rowsCuerpo.value[i].regiones.length);
        }
      }
    };

    onMounted(() => {
      usuarioStore.getProcessByRol();
      cuerpoStore.fetchCuerpo();
      availableRegiones();
    });

    return {
      user,
      process,
      selectedPermissionType,
      selectedProcess,
      addPermission,
      formattedPermisos,
      handleDelete,
      availableProcesses,
      availableRegiones,
      rowsCuerpo,
      cuperoSeleccionado,
      regionSeleccionado,
      regionesLista,
    };
  },
};
</script>

<style scoped>
/* Grid layout for the form */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.button-group {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-control {
  padding: 0.5rem;
  border-radius: 5px;
  border: 4px solid #ccc !important;
}
</style>
 

