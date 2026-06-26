import { apiRequest } from '@/services/apiService' 
import { useAspiranteStore } from '../modules/Aspirante/store/useAspiranteStore'
import { useMainStore } from '@/store/useMainStore'

export async function getAspirantes(options) {
  const store = useAspiranteStore();
  const mainStore = useMainStore();
  
  var opt = { 
    "cuerpoId":options.cuerpoId,
    "regionId":options.regionId+"",
    "perfilId":options.perfilId+"",
    "situacion":options.situacion+""
  }

  store.loadingProgress = 0
  const result = await apiRequest({ url: `/Aspirante/perfil` , method: "POST", data:JSON.stringify(opt)});
  store.loadingProgress = 20;
  if (!Array.isArray(result.data) || result.data.length === 0) {
    mainStore.triggerAlert({
    message: "No se encontraron registros.",
    color: "warning",
    icon: "warning",
    });
    store.loadingProgress = 100;
    return [];
  }
  return result.data;
}

export async function getCodigoPostal(cp) {  
    const store = useAspiranteStore();
    store.loadingProgress = 0
    store.loadingProgress = 20
    const result = await apiRequest({ url: `/CodigoPostal/${cp}` });    
    return result.data; 
}

export async function fetchAspiranteByID(curp, perfil, cuerpo, region) {  
    const store = useAspiranteStore();
    store.loadingProgress = 0
    store.loadingProgress = 20
    
    const result = await apiRequest({ url: `/Aspirante/${curp}/${region}/${perfil}/${cuerpo}/` });    
    return result; 
}

export async function createAspirante() {
  const store = useAspiranteStore();
  const asp = store.aspirante
  const aspi = {
      "curp": asp.Curp, 
      "rfc": asp.Rfc,
      "nombre": asp.Nombre, 
      "apellido_Paterno": asp.Apellido_Paterno, //Apellido_Paterno: '',
      "apellido_Materno": asp.Apellido_Materno, //Apellido_Materno: '',
      "fecha_Nacimiento": asp.Fecha_Nacimiento,
      "sexo": parseInt(asp.Sexo),
      "telefonoCelular": asp.TelefonoCelular,
      "foto": asp.Foto,
      "estado_Civil": parseInt(asp.Estado_Civil),
      "grado_Escolaridad": parseInt(asp.Grado_Escolaridad),
      "escolaridadConcluidaTrunca": parseInt(asp.EscolaridadConcluidaTrunca),
      "documentoAcreditaEscolaridad": asp.DocumentoAcreditaEscolaridad,
      "pensionaodISSEMYM": asp.PensionaodISSEMYM,
      "calle": asp.Calle,
      "entreCalles": asp.EntreCalles,
      "numero": asp.numero+'',
      "numeroInterior":asp.numeroInterior+'',
      "latitud":asp.latitud,
      "longitud":asp.longitud,
      "coordenadas": asp.coordenadas,
      "pais": asp.Pais,
      "codigoPostal": asp.CodigoPostal,
      "estado": asp.Estado,
      "municipio": asp.Municipio,
      "colonia": asp.Colonia,
      "TipoColonia":asp.TipoAsentamiento,
      "IdCuerpoCaptura": asp.IdCuerpoCaptura,
      "IdRegionCaptura":asp.IdRegionCaptura,
      "Situacion":asp.Situacion,
  }
  
  const result = await apiRequest({
    url: `/Aspirante`,
    method: "POST",
    data: JSON.stringify(aspi),
    showSuccess: true,
    successMessage: "Registro guardado exitosamente."
    });

  return result.success;

}

export async function setAspirante(aspiranteData) {
  const result = await apiRequest({
        url: `/Aspirante`,
        method: "POST",
        data: JSON.stringify(aspiranteData),
        showSuccess: true,
        successMessage: "Registro guardado exitosamente."
        });
  return result.success;
}

export async function updateAspirante() {
    const store = useAspiranteStore();
    const asp = store.aspirante;

    const aspi = {
      "curpRequest":'',
      "curp": asp.Curp, 
      "rfc": asp.Rfc,
      "nombre": asp.Nombre, 
      "apellido_Paterno": asp.Apellido_Paterno, //Apellido_Paterno: '',
      "apellido_Materno": asp.Apellido_Materno, //Apellido_Materno: '',
      "fecha_Nacimiento": asp.Fecha_Nacimiento,
      "sexo": parseInt(asp.Sexo),
      "telefonoCelular": asp.TelefonoCelular,
      "foto": asp.Foto,
      "estado_Civil": parseInt(asp.Estado_Civil),
      "grado_Escolaridad": parseInt(asp.Grado_Escolaridad),
      "escolaridadConcluidaTrunca": parseInt(asp.EscolaridadConcluidaTrunca),
      "documentoAcreditaEscolaridad": asp.DocumentoAcreditaEscolaridad,
      "pensionaodISSEMYM": asp.PensionaodISSEMYM,
      "calle": asp.Calle,
      "entreCalles": asp.EntreCalles,
      "numero": asp.numero,
      "numeroInterior":asp.numeroInterior,
      "latitud":asp.latitud,
      "longitud":asp.longitud,
      "coordenadas": asp.coordenadas,
      "pais": asp.Pais,
      "codigoPostal": asp.CodigoPostal,
      "estado": asp.Estado,
      "municipio": asp.Municipio,
      "colonia": asp.Colonia,
      "TipoColonia":asp.TipoAsentamiento,
      "IdCuerpoCaptura": asp.IdCuerpoCaptura,
      "IdRegionCaptura":asp.IdRegionCaptura,
      "Situacion":asp.Situacion,
    }

    const result = await apiRequest({
            url: `/Aspirante/${aspi.curp}`,
            method: "PUT",
            data: JSON.stringify(aspi),
            showSuccess: true,
            successMessage: "Registro guardado exitosamente."
            });
            
    return result.success;
}

export async function deleteAspiranteByID() {  
    const store = useAspiranteStore();
    const result = await apiRequest({
            url: `/Aspirante/${store.candidate.Curp}`,
            method: "DELETE",
            showSuccess: true,
            successMessage: "Registro guardado exitosamente."
            });
    return result.success; 
}