<template>
  <div class="container-fluid">
    
    <div class="text-uppercase h3 mt-4 text-center font-weight-bolder text-dark" style="letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
      Gestión de Roles del Sistema
    </div>

    <div class="d-sm-flex justify-content-end">
      <div class="me-4">
        <material-button v-permiso="'Roles.Agregar'" color="primary" variant="gradient" @click="navigateToCreate" class="d-flex align-items-center">
          <i class="material-icons-round me-2">add_task</i>
          Nuevo Rol
        </material-button>
      </div>
    </div>

    <!-- DataTable Component -->
    <DataTable title="Listado de Roles" description="Administre los permisos y tipos de roles" table-id="employee-table" :columns="columns" :rows="rowsRoles"
      :searchable="true" :loadingProgress="loadingProgress">
      <!-- Custom Row Actions -->
      <template #row-actions="{ row }">

        <material-button color="info" variant="gradient" size="sm" @click="handleUpdate(row)" class="me-2 d-inline-flex align-items-center"
          v-permiso="'Roles.Editar'">
          <i class="material-icons-round me-1" style="font-size: 1.1rem;">edit</i>
          Actualizar
        </material-button>
        
        <!-- BOTON DE ELIMINAR SIN FUNCIONALIDAD
        <material-button color="danger" variant="outline" size="sm" @click="handleDelete(row)" class="d-inline-flex align-items-center"
          v-permiso="'Roles.Eliminar'">
          <i class="material-icons-round me-1" style="font-size: 1.1rem;">delete</i>
          Eliminar
        </material-button>
      -->
      </template>
    </DataTable>

  </div>
</template>

<script>
import DataTable from "@/components/widgets/DataTable.vue";
import MaterialButton from "@/components/common/MaterialButton.vue";
import { useRolesStore } from "@mod1/modules/roles/store/useRolesStore";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "RolesList",
  components: {
    DataTable,
    MaterialButton,
  },
  setup() {
    const rolesStore = useRolesStore();
    const { rowsRoles, columns, loadingProgress } = storeToRefs(rolesStore);
    const router = useRouter();

    const navigateToCreate = () => {
      rolesStore.resetSelectedRol();
      router.push({ name: "RolesCreate" });
    };

    const handleUpdate = async (row) => {
      rolesStore.rol = { ...row };
      await rolesStore.fetchRolByID();

      router.push({ name: "RolesCreate" });
    };

    const handleDelete = (row) => {
      if (confirm(`¿Estás seguro de que deseas eliminar el role "${row.nombre}"?`)) {
        rolesStore.deleteRol(row.id);
      }
    };

    onBeforeMount(async () => {
      await rolesStore.fetchRoles();
    });

    return {
      rowsRoles,
      columns,
      loadingProgress,
      navigateToCreate,
      handleUpdate,
      handleDelete,
    };
  },
};
</script>