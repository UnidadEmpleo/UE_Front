<template>
  <div class="container-fluid">
    <div class="text-uppercase h3 mt-4 text-center font-weight-bolder text-dark"
      style="letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
      Administración de Grupos de Trabajo
    </div>

    <div class="d-sm-flex justify-content-end">
      <div class="me-4">
        <material-button v-permiso="'Grupos.Agregar'" color="primary" variant="gradient" @click="navigateToCreate"
          class="d-flex align-items-center">
          <i class="material-icons-round me-2">group_add</i>
          Nuevo Grupo
        </material-button>
      </div>
    </div>

    <!-- DataTable Component -->
    <DataTable title="Listado de Grupos" description="Gestione los grupos y sus configuraciones"
      table-id="employee-table" :columns="columns" :rows="rowsGrupos" :searchable="true"
      :loadingProgress="loadingProgress">
      <!-- Custom Row Actions -->
      <template #row-actions="{ row }">
        <div>

        </div>
                <material-button color="info" variant="gradient" size="sm" @click="handleUpdate(row)" class="me-2 d-inline-flex align-items-center"
          v-permiso="'Grupos.Editar'">
          <i class="material-icons-round me-1" style="font-size: 1.1rem;">edit</i>
          Actualizar
        </material-button>

        <!-- BOTON DE ELIMINAR SIN FUNCIONALIDAD
        <material-button color="danger" variant="outline" size="sm" @click="handleDelete(row)" class="d-inline-flex align-items-center"
          v-permiso="'Grupos.Eliminar'">
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
import { useGruposStore } from "@mod1/modules/grupos/store/useGruposStore";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "GruposList",
  components: {
    DataTable,
    MaterialButton,
  },
  setup() {
    const gruposStore = useGruposStore();
    const { rowsGrupos, columns, loadingProgress } = storeToRefs(gruposStore);
    const router = useRouter();

    const navigateToCreate = () => {
      gruposStore.resetSelectedGrupo();
      router.push({ name: "GruposCreate" });
    };

    const handleUpdate = async (row) => {
      gruposStore.grupo = { ...row };
      await gruposStore.fetchGrupoByID();
      router.push({ name: "GruposCreate" });
    };

    const handleDelete = (row) => {
      if (confirm(`¿Estás seguro de que deseas eliminar el grupo "${row.nombre}"?`)) {
        gruposStore.deleteGrupo(row.id);
      }
    };

    onBeforeMount(async () => {

      await gruposStore.fetchGrupos();
    });

    return {
      rowsGrupos,
      columns,
      loadingProgress,
      navigateToCreate,
      handleUpdate,
      handleDelete,
    };
  },
};
</script>