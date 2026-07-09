

export function verificaPermiso(json, modulo, atributo) {
    
    const item = json.find(x => x.modulo === modulo);

    if (!item || !item.accion || item.accion.length === 0) {
        return undefined;
    }

    return item.accion[0][atributo];
}


