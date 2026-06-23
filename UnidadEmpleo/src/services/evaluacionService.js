import { apiRequest } from '@/services/apiService' 
import { useMainStore } from '@/store/useMainStore'

const endpoint = '/Evaluacion';

export async function getEvaluaciones(idsolicitud) {
  
  const mainStore = useMainStore();
  const result = await apiRequest({ url: `${endpoint}/solicitud/${idsolicitud}` });
  
  if (!Array.isArray(result.data) || result.data.length === 0) {
    mainStore.triggerAlert({message: "No se encontraron registros.",color: "warning",icon: "warning",});
    return [];
  }
  return result.data;
}

export async function getEvaluacion(id) {
  console.log('Service getting Evaluation')
  const mainStore = useMainStore();
  const result = await apiRequest({ url: `${endpoint}/${id}` });
  console.log('result ********   '+Array.isArray(result.data))
  if (!result.success) {
    mainStore.triggerAlert({message: "No se encontraron registros.",color: "warning",icon: "warning",});
    return [];
  }
  return result.data;
}

export async function createEvaluation(dato,userName, password){
  
  const itemRequest = {
        "id": dato.id,
        "ingreso": dato.ingreso,
        "salida": dato.salida,
        "resultado": dato.resultado,
        "observaciones": dato.observaciones,
        "revalorable": dato.revalorable,
        "idSoliciud": dato.idSoliciud,
        "tipoEvaluacion": dato.tipoEvaluacion,  
        "usuarioEvaluo":"",
        "nombreUsuarioEvaluo":"",
        "userName":userName,
        "password":password,
        "usuarioSalida":"",
        "usuarioIngreso":""
    }

  console.log("itemRequest "+itemRequest.idSolicitud)

  const result = await apiRequest({
    url: `${endpoint}`,
    method: "POST",
    data: JSON.stringify(itemRequest),
    showSuccess: true,
    successMessage: "Registro guardado exitosamente."
  });

  return result;
}

export async function updateEvaluation(dato, userName, password,termino){
 
  const itemRequest = 
    {
        "id": dato.id,
        "ingreso": dato.ingreso,
        "salida": dato.salida,
        "resultado": dato.resultado === "true",
        "observaciones": dato.observaciones,
        "revalorable": dato.revalorable,
        "idSoliciud": dato.idSoliciud,
        "tipoEvaluacion": dato.tipoEvaluacion,  
        "usuarioEvaluo":dato.usuarioEvaluo,
        "nombreUsuarioEvaluo":dato.nombreUsuarioEvaluo,
        "userName":userName,
        "password":password,
        "usuarioSalida": dato.usuarioSalida,
        "usuarioIngreso": dato.usuarioIngreso
    }
  if (termino){
    const result = await apiRequest({
      url: `${endpoint}/${dato.id}`,
      method: "PUT",
      data: JSON.stringify(itemRequest),
      showSuccess: true,
      successMessage: "Registro se actualizó exitosamente."
    });
    return result.success
  }
  else if (!termino){
    const result = await apiRequest({
      url: `${endpoint}/evaluo/${dato.id}`,
      method: "PUT",
      data: JSON.stringify(itemRequest),
      showSuccess: true,
      successMessage: "Registro se actualizó exitosamente."
    });

    return result.success;
  }
  return false
}


