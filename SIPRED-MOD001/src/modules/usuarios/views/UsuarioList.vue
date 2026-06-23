<template>
  <div class="container-fluid ">
    <div class="text-uppercase h3 mt-4 text-center font-weight-bolder text-dark"
      style="letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
      Gestión de Usuarios del Sistema
    </div>

    <div class="d-sm-flex justify-content-end ">
      <div class="me-4">
        <material-button v-permiso="'Usuarios.Agregar'" color="primary" variant="gradient" @click="navigateToCreate"
          class="d-flex align-items-center">
          <i class="material-icons-round me-2">person_add</i>
          Nuevo Usuario
        </material-button>
      </div>
    </div>

    <DataTable title="Listado de Usuarios" description="Administre las cuentas y accesos de usuarios"
      table-id="employee-table" :columns="columns" :rows="rowUsers" :searchable="true"
      :loadingProgress="loadingProgress">
      <!-- Custom Row Actions -->
      <template #row-actions="{ row }">
        <material-button color="info" variant="gradient" size="sm" @click="handleUpdate(row)" class="me-2 d-inline-flex align-items-center"
          v-permiso="'Usuarios.Editar'">
          <i class="material-icons-round me-1" style="font-size: 1.1rem;">edit</i>
          Actualizar
        </material-button>
        
        <!-- BOTON DE ELIMINAR SIN FUNCIONALIDAD
        <material-button color="danger" variant="outline" size="sm" @click="handleDelete(row)" class="d-inline-flex align-items-center"
          v-permiso="'Usuarios.Eliminar'">
          <i class="material-icons-round me-1" style="font-size: 1.1rem;">delete</i>
          Eliminar
        </material-button>
      -->
        
      </template>
    </DataTable>
  </div>
</template>

<script>

import MaterialButton from "@/components/common/MaterialButton.vue";
import { useUsuarioStore } from "@mod1/modules/usuarios/store/useUsuarioStore";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import DataTable from "@/components/widgets/DataTable.vue";
import { useRouter } from "vue-router";


export default {
  name: "UsuarioList",
  components: {
    DataTable,
    MaterialButton,
  },
  setup() {


    const usuarioStore = useUsuarioStore();
    const { rowUsers, columns, loadingProgress } = storeToRefs(usuarioStore);
    const router = useRouter();

    const navigateToCreate = () => {
      usuarioStore.resetSelected();
      router.push({ name: "UsuarioCreate" });
    };

    onBeforeMount(async () => {
      await usuarioStore.fetchUsers();
    });

    const handleUpdate = (row) => {
      usuarioStore.selecteduser = { ...row };
      usuarioStore.getUserById(row.id);

      router.push({ name: "UsuarioCreate" });
    };

 


    return {
      rowUsers,
      columns,
      loadingProgress,
      navigateToCreate,
      handleUpdate,

    };
  },
};
</script>