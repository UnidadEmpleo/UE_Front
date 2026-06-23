<template>
  <div class="container-fluid">

    <div class="text-uppercase h3 mt-4 text-center font-weight-bolder text-dark"
      style="letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
      Administración de Procesos del Sistema
    </div>

    <div class="d-sm-flex justify-content-end">
      <div class="me-4">
        <material-button v-permiso="'Proceso.Agregar'" color="primary" variant="gradient" @click="navigateToCreate"
          class="d-flex align-items-center">
          <i class="material-icons-round me-2">manage_accounts</i>
          Nuevo proceso
        </material-button>
      </div>
    </div>



    <!-- DataTable Component -->
    <DataTable title="Listado de Procesos" description="Gestione los procesos y subprocesos del sistema" table-id="employee-table" :columns="columns"
      :rows="rowsProceso" :searchable="true" :loadingProgress="loadingProgress">
      <!-- Custom Row Actions -->
      <template #row-actions="{ row }">
        <div>

        </div>
        <material-button color="info" variant="gradient" size="sm" @click="handleUpdate(row)" class="me-2 d-inline-flex align-items-center"
          v-permiso="'Proceso.Editar'">
          <i class="material-icons-round me-1" style="font-size: 1.1rem;">edit</i>
          Actualizar
        </material-button>
        <!-- BOTON DE ELIMINAR SIN FUNCIONALIDAD
        <material-button color="danger" variant="outline" size="sm" @click="handleDelete(row)" class="d-inline-flex align-items-center"
          v-permiso="'Proceso.Eliminar'">
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
import { useProcesoStore } from "@mod1/modules/procesos/store/useProcesoStore";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";



export default {
  name: "ProcesoList",
  components: {
    DataTable,
    MaterialButton,
  },
  setup() {
    const procesoStore = useProcesoStore();
    const { rowsProceso, columns, loadingProgress, proceso } = storeToRefs(procesoStore);
    const router = useRouter();

    const navigateToCreate = () => {
      procesoStore.resetSelected();
      router.push({ name: "ProcesoCreate" });
    };

    const handleUpdate = (row) => {

      const subprocesos = Array.isArray(proceso.value)
        ? proceso.value.find((g) => g.id === row.id)?.subprocesos || []
        : [];

      procesoStore.selectedProceso = {

        id: row.id,
        nombre: row.nombre,
        tipo: row.tipo,
        icono: row.icono,
        activo: row.activo,
        ruta: row.ruta,
        procesoPadreId: row.procesoPadreId,
        subprocesos: subprocesos,
        sistemaId: row.sistemaId
      };
      procesoStore.proceso = { ...row };

      router.push({ name: "ProcesoCreate" });
    };



    onBeforeMount(async () => {
       await procesoStore.fetchProceso();
    });

    return {
      rowsProceso,
      columns,
      loadingProgress,
      navigateToCreate,
      handleUpdate,
      proceso

    };
  },
};
</script>