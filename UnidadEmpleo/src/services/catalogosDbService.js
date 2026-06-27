
export const gradoescolaridad= Object.freeze({
    Primaria : 0,
    Secundaria : 1,
    Bachillerato : 2,
    Licenciatura : 3,
    Postgrado : 4,
    Maestría : 5,
    Doctorado : 6
});

export const EstadoEscolaridad = Object.freeze({
  Concluido: 0,
  Trunco: 1  
});

export const sexo = Object.freeze({
  Femenino: 0,
  Masculino: 1  
});

export const edocivil = Object.freeze({
    Soltero:0,
    Casado:1,
    Divorciado:2,
    Viudo:3,
    Unión_Libre:4,
});

export const SituacionAspirante = Object.freeze({
    Todos:-1,  
    Captura:0, //Cuando se esta capturando en la region o gerencia
    Revision:1,//Cuando se revisa en gerencia
    Apto:2,    //Paso sus examenes
    No_Apto:3, //No paso examenes
    Dato_Transferido:4, //Se mandan datos a nomina
});


export const StatusExpediente = Object.freeze(
{
    Faltante : 1,
    Completo : 2,
});

export const StatusSolicitud  = Object.freeze(
{
    Captura : 1,
    Evaluando : 2,
    No_apto : 3,
    Apto : 4,
});

export const Parentescos = Object.freeze
(   {Padre:1,
    Madre:2,
    Esposa:3,
    Hermano:4,
    Tio:5,
    Primo:6,
    Sobrino:7,
    Cuñado:8,
    Abuelo:9,
    Suegro:10,
    Amigo:11,
    Vecino:12,
    Conocido:13 }
);

export const TipoEvaluacion = Object.freeze(
{
    Registro:1,
    Medico:2,
    Psicologico:3,
    Toxicologico:4,
    PIE:5
});

export function getTipoEvaluacion() {
  return [
    { id: TipoEvaluacion.Medico, name: 'Medico' },
    { id: TipoEvaluacion.Psicologico, name: 'Psicológico' },
    { id: TipoEvaluacion.Toxicologico, name: 'Toxicológico' },
    { id: TipoEvaluacion.PIE, name: 'PIE' },
  ];
}

export const Parentesco = Object.freeze
([{name:"Padre", id:1, ref:1},
    {name:"Madre", id:2, ref:1},
    {name:"Esposa", id:3, ref:1},
    {name:"Hermano", id:4, ref:1},
    {name:"Tio", id:5, ref:2},
    {name:"Primo", id:6, ref:2},
    {name:"Sobrino", id:7, ref:2},
    {name:"Cuñado", id:8, ref:2},
    {name:"Abuelo", id:9, ref:2},
    {name:"Suegro", id:10, ref:2},
    {name:"Amigo", id:11, ref:3},
    {name:"Vecino", id:12, ref:3},
    {name:"Conocido", id:13, ref:3},
]);

export function getParentescoName(id) {
  const map = {
    [ Parentescos.Padre] : 'Padre' ,
    [ Parentescos.Madre] : 'Madre',
    [ Parentescos.Esposa] : 'Esposa' ,
    [ Parentescos.Hermano] : 'Hermano',
    [ Parentescos.Tio] : 'Tio' ,
    [ Parentescos.Primo] : 'Primo',
    [ Parentescos.Sobrino] : 'Sobrino' ,
    [ Parentescos.Cuñado] : 'Cuñado',
    [ Parentescos.Abuelo] : 'Abuelo' ,
    [ Parentescos.Suegro] : 'Suegro',
    [ Parentescos.Amigo] : 'Amigo' ,
    [ Parentescos.Vecino] : 'Vecino',
    [ Parentescos.Conocido] : 'Conocido',
  };
  return map[Number(id)] || '';
}

export function getGradoescolaridad() {
  return [
    { id: gradoescolaridad.Primaria, name: 'Primaria' },
    { id: gradoescolaridad.Secundaria, name: 'Secundaria' },
    { id: gradoescolaridad.Bachillerato, name: 'Bachillerato' },
    { id: gradoescolaridad.Licenciatura, name: 'Licenciatura' },
    { id: gradoescolaridad.Postgrado, name: 'Postgrado' },
    { id: gradoescolaridad.Maestría, name: 'Maestría' },
    { id: gradoescolaridad.Doctorado, name: 'Doctorado' }
  ];
}


export function getGradoEscolaridadName(id) {
  const map = {
    [ gradoescolaridad.Primaria] : 'Primaria' ,
    [ gradoescolaridad.Secundaria] : 'Secundaria',
    [ gradoescolaridad.Bachillerato] : 'Bachillerato',
    [ gradoescolaridad.Licenciatura] : 'Licenciatura',
    [ gradoescolaridad.Postgrado] : 'Postgrado',
    [ gradoescolaridad.Maestría] : 'Maestría',
    [ gradoescolaridad.Doctorado] : 'Doctorado',
  };
  return map[Number(id)] || '';
}



export function getEstadoEscolaridad() {
  return [
    { id: EstadoEscolaridad.Concluido, name: 'Concluido' },
    { id: EstadoEscolaridad.Trunco, name: 'Trunco' },
  ];
}


export function getEstadoEscolaridadName(id) {
  const map = {
    [EstadoEscolaridad.Concluido]: 'Concluido',
    [EstadoEscolaridad.Trunco]: 'Trunco',
  };
  return map[Number(id)] || '';
}



export function getSexo() {
  return [
    { id: sexo.Femenino, name: 'Femenino' },
    { id: sexo.Masculino, name: 'Masculino' },
  ];
}


export function getSexoName(id) {
  const map = {
    [sexo.Femenino]: 'Femenino',
    [sexo.Masculino]: 'Masculino',
  };
  return map[Number(id)] || '';
}

export function getEdoCivil() {
  return [
    { id: edocivil.Soltero, name: 'Soltero' },
    { id: edocivil.Casado, name: 'Casado' },
    { id: edocivil.Divorciado, name: 'Divorciado' },
    { id: edocivil.Viudo, name: 'Vido' },
    { id: edocivil.Unión_Libre, name: 'Union Libre' },
  ];
}

export function getEdoCivilName(id) {
  const map = {
    [edocivil.Soltero]: 'Soltero',
    [edocivil.Casado]: 'Casado',
    [edocivil.Divorciado]: 'Divorciado',
    [edocivil.Viudo]: 'Viudo',
    [edocivil.Unión_Libre]: 'Union Libre',
  };
  return map[Number(id)] || '';
}

export function getSituacionAspirante() {
  return [
    { id: SituacionAspirante.Todos, name: 'Todos' },
    { id: SituacionAspirante.Captura, name: 'Captura' },
    { id: SituacionAspirante.Revision, name: 'Revision' },
    { id: SituacionAspirante.Apto, name: 'Apto' },
    { id: SituacionAspirante.No_Apto, name: 'No Apto' },
    { id: SituacionAspirante.Dato_Transferido, name: 'Dato Transferido' },
  ];
}


export function getStatusExpediente()
{return[
    {id: StatusExpediente.Faltante, name : 'Faltante'},
    {id: StatusExpediente.Completo, name : 'Completo'}];
}

export function getStatusSolicitud()
{return[
    {id:StatusSolicitud.Captura, name : 'Captura'},
    {id:StatusSolicitud.Evaluando, name :'Evaluando'},
    {id:StatusSolicitud.No_apto, name : 'No Apto'},
    {id:StatusSolicitud.Apto, name : 'Apto'}];
}
export function getSexoById(id) {
  const map = {
    [sexo.Femenino] : 'Femenino',
    [sexo.Masculino] : 'Masculino'}

  return map[Number(id)] || '';
}
export function getStatusExpedienteById(id) {
  const map = {
    [StatusExpediente.Faltante] : 'Faltante',
    [StatusExpediente.Completo] : 'Completo'}
  return map[Number(id)] || '';
}

export function getStatusSolicitudById(id) {
  const map = {
    [StatusSolicitud.Captura] : 'Captura',
    [StatusSolicitud.Evaluando] :'Evaluando',
    [StatusSolicitud.No_apto] : 'No Apto',
    [StatusSolicitud.Apto] : 'Apto'}
  return map[Number(id)] || '';
}

export function getTipoEvaluacionById(id) {
  const map = {
    [TipoEvaluacion.Medico] : 'Medico' ,
    [TipoEvaluacion.Psicologico] : 'Psicológico' ,
    [TipoEvaluacion.Toxicologico] : 'Toxicológico' ,
    [TipoEvaluacion.PIE] : 'PIE' ,
  };
  return map[Number(id)] || '';
}

export function getSexoByName(name){
  const map = {
    'MUJER':[sexo.Femenino],
    'FEMENINO':[sexo.Femenino],
    'MASCULINO':[sexo.Masculino],
    'HOMBRE':[sexo.Masculino] }
    
  return map[String(name.toUpperCase())] || '---';
}

export function getEnteraEmpleoId(id) {
  const map = {
    1: 'Reingreso' ,
    2: 'Volante' ,
    3: 'Reclutador' ,
    4: 'Empresa o Particular' ,
    5: 'Centro de Reclutamiento' ,
    6: 'Iniciativa Propia' ,
    7: 'Feria de Empleo' ,
    8: 'Bolsa de Trabajo' ,
    9: 'Conocido de un Familiar de la Corporacion' ,
    
  };
  return map[Number(id)] || '';
}

export function calculaEdad (Fecha_Nacimiento) {
  const fecha = new Date();
      const nacimiento = (Fecha_Nacimiento instanceof Date) 
            ? Fecha_Nacimiento 
            : new Date(Fecha_Nacimiento);
      
      if (isNaN(nacimiento.getTime())) {
            return "Fecha inválida. Usa formato 'YYYY-MM-DD' o un objeto Date. "+Fecha_Nacimiento;
        }

      let años = fecha.getFullYear() - nacimiento.getFullYear();
      const m = fecha.getMonth() - nacimiento.getMonth();

      if (m < 0 || (m === 0 && fecha.getDate() < nacimiento.getDate())) {
        años--;
      }
      return años
    }