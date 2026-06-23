import { apiRequest } from '@/services/apiService'
import { useMainStore } from '@/store/useMainStore';



/**
 * Obtiene todos los catalogos desde el backend.
 */
export async function fetchCatalog(api,catalogName) {
  const store = useMainStore();
  

    const storageKey = `catalogos:${api}:${catalogName}`;
    // If a cached copy exists, return it immediately (prefer local cache)
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      // ignore localStorage read errors and continue to fetch
    }

    // Try to fetch from backend; on success save to localStorage.
    try {
      const result = await apiRequest({ url: `/${api}/${catalogName}`, useCorporacionHeader: true });

      if (!Array.isArray(result.data) || result.data.length === 0) {
        store.triggerAlert({
          message: "No se encontraron el catalogo " + catalogName,
          color: "warning",
          icon: "warning",
        });

        // If we have a cached copy, return it as a fallback
        try {
          const cached = localStorage.getItem(storageKey);
          if (cached) return JSON.parse(cached);
        } catch { /* ignore localStorage errors */ }

        return [];
      }

      // Save a copy in localStorage for faster subsequent loads / offline
      try {
        localStorage.setItem(storageKey, JSON.stringify(result.data));
      } catch (e) {
        // ignore storage errors (quota, private mode, etc.)
        console.warn('Could not save catalog to localStorage', e);
      }

      return result.data;
    } catch (err) {
      // On network error, try to return cached data if available
      try {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch { /* ignore */ }

      // Otherwise rethrow or notify
      console.error('Error fetching catalog', api, catalogName, err);
      store.triggerAlert({
        message: `Error cargando catálogo ${catalogName}`,
        color: 'danger',
        icon: 'error'
      });
      return [];
    }

}