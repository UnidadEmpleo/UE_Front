
import { apiRequest } from '@/services/apiService'
import { useMainStore } from '@/store/useMainStore';


export async function getSistemas() {

    const mainStore = useMainStore();

    const result = await apiRequest({ url: `/Sistemas` });

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


export async function getSistemaName(id) {
  
    const result = await apiRequest({ url: `/Sistemas/${id}` });    
    return result.data;
}
