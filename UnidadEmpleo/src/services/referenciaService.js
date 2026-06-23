import { apiRequest } from '@/services/apiService' 
import { useReferenciaStore } from '../modules/Referencia/useReferenceStore';
import { useMainStore } from '@/store/useMainStore'

const endpoint = '/Referencia';

export async function getItemsBySolicitud(idsolicitud) {
  
  const mainStore = useMainStore();
  const result = await apiRequest({ url: `${endpoint}/solicitud/${idsolicitud}` });
  
  if (!Array.isArray(result.data) || result.data.length === 0) {
    mainStore.triggerAlert({message: "No se encontraron registros.",color: "warning",icon: "warning",});
    return [];
  }
  return result.data;
}

export async function getCodigoPostal(cp) {  
    const result = await apiRequest({ url: `/CodigoPostal/${cp}` });    
    return result.data; 
}

export async function createReference(){
  const store = useReferenciaStore();

  const ref1 = store.referencia

  const itemRequest = [
    {
      "id": 0, "idSoliciud": ref1.solicitudId,"parentesco": ref1.parentesco,"telefonoLocal": ref1.telefono,
      "nombre": ref1.Nombre,"apellido_Paterno": ref1.Apellido_Paterno,"apellido_Materno": ref1.Apellido_Materno,
      "calle": ref1.Calle,"numero": ref1.numero+"","numeroInterior":ref1.numeroInterior+"",
      "entreCalles": ref1.EntreCalles,"latitud": ref1.latitud.toString(),"longitud": ref1.longitud.toString(),
      "pais": 'México',"codigoPostal": ref1.CodigoPostal,"estado": ref1.Estado,
      "municipio": ref1.Municipio,"colonia": ref1.Colonia,"tipoAsentamiento": ref1.TipoAsentamiento,
    }
  ]
  
  
  const result = await apiRequest({
    url: `${endpoint}`,
    method: "POST",
    data: JSON.stringify(itemRequest),
    showSuccess: true,
    successMessage: "Registro guardado exitosamente."
  });

  return result.success;
}

export async function deleteReference(id){
  
  const result = await apiRequest({
    url: `${endpoint}/${id}`,
    method: "DELETE",
    showSuccess: true,
    successMessage: "Registro ELIMINADO correctamente."
  });

  return result.success;
}


export async function updateReference(id){
  const store = useReferenciaStore();

  const ref1 = store.referencia

  const itemRequest = 
    {
      "id": ref1.id, "idSoliciud": ref1.solicitudId,"parentesco": ref1.parentesco,"telefonoLocal": ref1.telefono,
      "nombre": ref1.Nombre,"apellido_Paterno": ref1.Apellido_Paterno,"apellido_Materno": ref1.Apellido_Materno,
      "calle": ref1.Calle,"numero": ref1.numero,"numeroInterior":ref1.numeroInterior,
      "entreCalles": ref1.EntreCalles,"latitud": ref1.latitud.toString(),"longitud": ref1.longitud.toString(),
      "pais": 'México',"codigoPostal": ref1.CodigoPostal,"estado": ref1.Estado,
      "municipio": ref1.Municipio,"colonia": ref1.Colonia,"tipoAsentamiento": ref1.TipoAsentamiento,
    }
  
  
  const result = await apiRequest({
    url: `${endpoint}/${id}`,
    method: "PUT",
    data: JSON.stringify(itemRequest),
    showSuccess: true,
    successMessage: "Registro se actualizó exitosamente."
  });

  return result.success;
}