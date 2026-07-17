
import { apiRequest } from '@/services/apiService' 

const endpoint = '/Indicador';

export async function selectIndicadores(filters) {
    
    try {
        var opt = { 
            "corporacionId":filters.corporacionId,
            "regionId":filters.regionId+"",        
            "fechaInicio":filters.fechaDesde || filters.fechaInicio,
            "fechaTermino":filters.fechaHasta || filters.fechaFin,
        }
        
        const result = await apiRequest({ url: `${endpoint}`, method: "POST", data:JSON.stringify(opt)});    
        
        if (!Array.isArray(result.data) || result.data.length === 0) 
            return [];
        return result.data;
    } catch (err) {
        console.warn('Error obteniendo indicadores desde dashboard', err);
        return [
            { key: 0, label:"Evaluando",value: 0,amount: null,suffix: 'sufijo',mainIsCurrency: false, meta: null,},
            { key: 1, label:"Aptos",value: 0,amount: null,suffix: 'sufijo',mainIsCurrency: false,},
            { key: 2, label:"No Aptos",value: 0,amount: null,suffix: 'sufijo',mainIsCurrency: false,},
            { key: 2, label:"Captura",value: 0,amount: null,suffix: 'sufijo',mainIsCurrency: false,},
        ];
    }

    
}
