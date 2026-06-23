import { apiRequest } from '@/services/apiService'
import { useMainStore } from '@/store/useMainStore';


export async function getCuerpos() {

    const mainStore = useMainStore();

    const result = await apiRequest({ url: `/Cuerpo` });

    if (!Array.isArray(result.data) || result.data.length === 0) {
      mainStore.triggerAlert({
        message: "No se encontraron registros.",
        color: "warning",
        icon: "warning",
      });

      return [];
    }
  return  result.data;
}

export async function getRegiones() {

    const mainStore = useMainStore();

    const result = await apiRequest({ url: `/Region` });

    if (!Array.isArray(result.data) || result.data.length === 0) {
      mainStore.triggerAlert({
        message: "No se encontraron registros.",
        color: "warning",
        icon: "warning",
      });

      return [];
    }
  return  result.data;
}