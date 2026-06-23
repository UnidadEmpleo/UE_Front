import { apiRequest } from '@/services/apiService' 
import { useSolicitudStore } from '../modules/Solicitud/store/solicitudStore';
import { useMainStore } from '@/store/useMainStore'

const endpoint = '/Solicitud';

export async function getItems() {
  const store = useSolicitudStore();
  const mainStore = useMainStore();
  
  store.loadingProgress = 0
  const result = await apiRequest({ url: `${endpoint}/` });
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

export async function getSolicitudes() {
  const store = useSolicitudStore();
  const mainStore = useMainStore();
  
  store.loadingProgress = 0
  const result = await apiRequest({ url: `${endpoint}/` });
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

export async function getSolicitudById(id) {  
    const store = useSolicitudStore();
    store.loadingProgress = 0
    store.loadingProgress = 20
    const result = await apiRequest({ url: `${endpoint}/${id}` });    
    return result; 
}

export async function getItemsByAspirante(curp) {  
    const store = useSolicitudStore();
    store.loadingProgress = 0
    store.loadingProgress = 20
    const result = await apiRequest({ url: `${endpoint}/ListSolicitudesPorAspirante/${curp}` });    
    return result.data; 
}

export async function getItemsByOptions(options){
    const store = useSolicitudStore();
    const mainStore = useMainStore();
      
    var opt = { 
        "cuerpoId":options.cuerpoId,
        "regionId":options.regionId+"",
        "perfilId":options.perfilId+"",
        "statusSolicitud":options.situacion+"",
        "fechaInicio":options.fechaInicio+"",
        "fechaTermino":options.fechaFinal+""
      }
    
    store.loadingProgress = 0
    const result = await apiRequest({ url: `${endpoint}/list`, method: "POST", data:JSON.stringify(opt)});    
      
    store.loadingProgress = 20;
    if (!Array.isArray(result.data) || result.data.length === 0) {
        mainStore.triggerAlert({message: "No se encontraron registros.",color: "warning",icon: "warning",});
        store.loadingProgress = 100;
        return [];
    }
    return result.data;
}

export async function createItem() {
 
  const store = useSolicitudStore();

  const itemStore = store.solicitud
  console.log('DATA preloading')
  console.log(itemStore)
  const itemRequest = {
        "id": itemStore.id,
        "coordenadasVivienda" : itemStore.coordenadasVivienda,
        
        "corporacionId": itemStore.corporacionId,
        "regionId": itemStore.regionId,
        "curp": itemStore.curp,
        "telefonoCasa": itemStore.telefonoCasa,
        "telefonoRecado": itemStore.telefonoRecado,

        "fot": parseInt(itemStore.fot),
        "fechaSolicitud": itemStore.fechaSolicitud,
        "statusExp": itemStore.statusExp,
        
        "enteraEmpleo":  parseInt(itemStore.enteraEmpleo), 
        "gobierno": itemStore.gobierno,
        "privada": itemStore.privada,
        "nombreEmpresa": itemStore.nombreEmpresa,
        "descripcionEmpresa": itemStore.descripcionEmpresa,

        "puesto": itemStore.puesto,
        "jefeInmediato": itemStore.jefeInmediato,
        "telefonoEmpleo": itemStore.telefonoEmpleo,
        "fechaInicio": itemStore.fechaInicio,
        "fechaFinal": itemStore.fechaFinal,
        "motivoBaja": itemStore.motivoBaja,

        "policia": itemStore.policia,
        "gradoInicioPolicia": itemStore.gradoInicioPolicia,
        "gradoFinalPolicia": itemStore.gradoFinalPolicia,

        "militar": itemStore.militar,
        "gradoInicioMilitar": itemStore.gradoInicioMilitar,
        "gradoFinalMilitar": itemStore.gradoFinalMilitar,
    
        "tarjetaEnvio":itemStore.tarjetaEnvio,
        "presolicitud":itemStore.presolicitud,
        "fotografias":itemStore.fotografias,
        "croquis": itemStore.croquis, 
        "referenciasDomicilio":itemStore.referenciasDomicilio,

        "dependienteEconomico": itemStore.dependienteEconomico,
        "cartillaLiberada": itemStore.pre_cartillaLiberada,
        "certificadoEstudios": itemStore.certificadoEstudios,
        "actaNacimiento": itemStore.actaNacimiento,
        "noAntecedentesPenales": itemStore.noAntecedentesPenales,
        "comprobanteDomicilio": itemStore.comprobanteDomicilio,
        "cartasRecomendacion": itemStore.cartasRecomendacion,
        "curpActualizado": itemStore.curpActualizado,
        "ine": itemStore.ine,
        "rfcHomoclave": itemStore.rfcHomoclave,

        //copias esperadas
        "notarjetaEnvio":itemStore.notarjetaEnvio,
        "nopre_cartillaLiberada": itemStore.nopre_cartillaLiberada,
        "nocertificadoEstudios": itemStore.nocertificadoEstudios,
        "noactaNacimiento": itemStore.noactaNacimiento,
        "nonoAntecedentesPenales": itemStore.nonoAntecedentesPenales,
        "nocomprobanteDomicilio": itemStore.nocomprobanteDomicilio,
        "nocurpActualizado": itemStore.nocurpActualizado,
        "noine": itemStore.noine,
        "norfcHomoclave": itemStore.norfcHomoclave,

        // valores se llenan al finalizar la evaluación
        "revalorable": itemStore.revalorable,  
        "status": itemStore.status,
        "observaciones": itemStore.observaciones,
        
  }
  
  const result = await apiRequest({
    url: `${endpoint}`,
    method: "POST",
    data: JSON.stringify(itemRequest),
    showSuccess: true,
    successMessage: "Registro guardado exitosamente."
  });

  return result;

}

export async function updateItem() {
    const store = useSolicitudStore();
    const itemStore = store.solicitud;

    const itemRequest = {
        "IdRequest":itemStore.id,
        "id": itemStore.id,

        "fechaSolicitud": itemStore.fechaSolicitud,
        "statusExp": itemStore.statusExp,
        "status": parseInt(itemStore.status),
        // valores se llenan al finalizar la evaluación
        "revalorable": itemStore.revalorable,  
        "observaciones": itemStore.observaciones,
        "corporacionId": itemStore.corporacionId,
        "regionId": itemStore.regionId,
        "curp": itemStore.curp,

        "telefonoCasa": itemStore.telefonoCasa,
        "telefonoRecado": itemStore.telefonoRecado,
        "enteraEmpleo": parseInt(itemStore.enteraEmpleo), // nuevo
        "gobierno": itemStore.gobierno,
        "privada": itemStore.privada,
        "nombreEmpresa": itemStore.nombreEmpresa,
        "descripcionEmpresa": itemStore.descripcionEmpresa,
        "puesto": itemStore.puesto,
        "jefeInmediato": itemStore.jefeInmediato,
        "telefonoEmpleo": itemStore.telefonoEmpleo,
        "fechaInicio": itemStore.fechaInicio,
        "fechaFinal": itemStore.fechaFinal,
        "motivoBaja": itemStore.motivoBaja,

        "policia": itemStore.policia,
        "gradoInicioPolicia": itemStore.gradoInicioPolicia,
        "gradoFinalPolicia": itemStore.gradoFinalPolicia,

        "militar": itemStore.militar,
        "gradoInicioMilitar": itemStore.gradoInicioMilitar,
        "gradoFinalMilitar": itemStore.gradoFinalMilitar,
    

        "coordenadasVivienda" : itemStore.coordenadasVivienda,
        "croquis": itemStore.croquis, 
        "dependienteEconomico": itemStore.dependienteEconomico,
        "cartillaLiberada": itemStore.pre_cartillaLiberada,
        "certificadoEstudios": itemStore.certificadoEstudios,
        "actaNacimiento": itemStore.actaNacimiento,
        "noAntecedentesPenales": itemStore.noAntecedentesPenales,
        "comprobanteDomicilio": itemStore.comprobanteDomicilio,
        "cartasRecomendacion": itemStore.cartasRecomendacion,
        "curpActualizado": itemStore.curpActualizado,
        "ine": itemStore.ine,
        "rfcHomoclave": itemStore.rfcHomoclave,

        "tarjetaEnvio":itemStore.tarjetaEnvio,
        "presolicitud":itemStore.presolicitud,
        "fotografias":itemStore.fotografias,
        "referenciasDomicilio":itemStore.referenciasDomicilio,


        //copias esperadas
        "notarjetaEnvio":itemStore.notarjetaEnvio,
        "nopre_cartillaLiberada": itemStore.nopre_cartillaLiberada,
        "nocertificadoEstudios": itemStore.nocertificadoEstudios,
        "noactaNacimiento": itemStore.noactaNacimiento,
        "nonoAntecedentesPenales": itemStore.nonoAntecedentesPenales,
        "nocomprobanteDomicilio": itemStore.nocomprobanteDomicilio,
        "nocurpActualizado": itemStore.nocurpActualizado,
        "noine": itemStore.noine,
        "norfcHomoclave": itemStore.norfcHomoclave,

        "fotos": parseInt(itemStore.fotos),
        
    }

    const result = await apiRequest({
            url: `${endpoint}/${itemRequest.id}`,
            method: "PUT",
            data: JSON.stringify(itemRequest),
            showSuccess: true,
            successMessage: "Registro guardado exitosamente."
            });
            
    return result.success;
}

export async function deleteItem(id) {  
    const store = useSolicitudStore();
    if (store.solicitud.id == id)
    {
        const result = await apiRequest({
            url: `${endpoint}/${store.solicitud.id}`,
            method: "DELETE",
            showSuccess: true,
            successMessage: "Registro guardado exitosamente."
            });
        return result.success; 
    }

    return false; 
}
