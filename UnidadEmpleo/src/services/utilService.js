export function yyyymmddFecha(fecha) {
    var formato = 'yyyy-mm-dd'
    var mapa = {
      dd: fecha.getDate().toString().padStart(2, '0'),
      mm: (fecha.getMonth() + 1).toString().padStart(2, '0'),
      yyyy: fecha.getFullYear(),
    };
    return formato.replace(/dd|mm|yyyy/gi, (coincidencia) => mapa[coincidencia]);
}

export function getTimeOffset(date){
    var offsetDate = new Date(date)
    offsetDate.setMinutes( offsetDate.getMinutes() + offsetDate.getTimezoneOffset())
    return offsetDate.toDateString();
}


export function downloadBlob(blob, fileName) {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }
    


export function decimalARomano(num) {
    // Validación de tipo y rango
        if (typeof num !== 'number' || !Number.isInteger(num)) {
            return 'Error: Debe ingresar un número entero.';        
        }
        if (num == 0) 
          return 'G';

        if (num < 1 ) {
            return 'S';
        }

        if ( num > 101) {
            return 'Error: El número debe estar entre 1 y 100.';
        }

        // Tabla de equivalencias
        const valores = [
            { valor: 100, simbolo: 'C' },
            { valor: 90, simbolo: 'XC' },
            { valor: 50, simbolo: 'L' },
            { valor: 40, simbolo: 'XL' },
            { valor: 10, simbolo: 'X' },
            { valor: 9, simbolo: 'IX' },
            { valor: 5, simbolo: 'V' },
            { valor: 4, simbolo: 'IV' },
            { valor: 1, simbolo: 'I' }
        ];

        let resultado = '';
        let restante = num;

        // Construcción del número romano
        for (const item of valores) {
            while (restante >= item.valor) {
                resultado += item.simbolo;
                restante -= item.valor;
            }
        }

        return resultado + ' Rn';
    }