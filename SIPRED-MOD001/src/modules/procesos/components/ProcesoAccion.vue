<template>
    
    <div class="Card">
        <div class=" row flex">
            <h2 class="col-sm-3">Acciones</h2><p class="col-sm-4 align-items-center ">Ejm: Agregar, Editar, Borrar</p>
        </div>
    
        <div class="row flex">
            <div class="col-sm-2">
                <MaterialInput label="Acción" id="nacc" v-model="nuevaClave" placeholder="Acción"/>
            </div>

            <MaterialButton class="col-sm-1 align-items-center" variant="outline"  @click.prevent="agregarPar">
                Agregar
                <i class="material-icons-round ">arrow_forward</i>
            </MaterialButton>
            <div class="card col-sm-6">
                <ul >
                    <li v-for="(valor, clave) in datos" :key="clave">
                        <input type="Checkbox" v-model="datos[clave]"/>
                        <strong>{{ clave }}</strong>
                        
                        <button class="btn-x" aria-label="Cerrar" @click.prevent="eliminarPar(clave)">
                            x
                        </button>
                    </li>
                </ul>
            </div>

            datos{{ datos }} acciones
            {{ proceso.acciones }}
        </div>
    </div>
        
</template>

<script>
import MaterialInput from "@/components/common/MaterialInput.vue";
import MaterialButton from "@/components/common/MaterialButton.vue";
import {ref, onMounted} from "vue";
import { useProcesoStore } from "@mod1/modules/procesos/store/useProcesoStore";
import { storeToRefs } from "pinia";

export default {
  name: "ProcesoAccion",
  components: {
    MaterialInput,MaterialButton
  },     

  setup() {  
    const procesoStore = useProcesoStore();
    const { selectedProceso : proceso} = storeToRefs(procesoStore);
    const datos = ref({}) 
    const nuevaClave = ref('')
    
    onMounted(()=>{
        
        if(!Array.isArray(proceso.value.acciones)){
            if ((typeof proceso.value.acciones) == 'string'){
                let x = proceso.value.acciones.replace('[','')
                x =  x.replace(']','')                
                datos.value = JSON.parse(x)
            }
        }
        else {
            datos.value = Array.isArray(proceso.value.acciones)? proceso.value.acciones.map((permiso) => ({...permiso,})): []        
        }

        if (datos.value == null || datos.value == '')
            datos.value = {};
        
    }) 
    const agregarPar = ()=> {
            
            if (!nuevaClave.value) {
                alert('Ingrese una clave');
                return;
            }

            if (nuevaClave.value in datos.value) {
                alert('La clave ya existe');
                return;
            }

            datos.value[nuevaClave.value] = 'false';
            console.log('Se agrega '+datos.value+'  '+nuevaClave.value)
            proceso.value.acciones = JSON.stringify(datos.value);
            
            nuevaClave.value = '';
            
        };

    const    eliminarPar= (clave)=> {
            delete datos.value[clave];
            proceso.value.acciones = JSON.stringify(datos.value);
        };
    return {
            datos,nuevaClave,proceso,eliminarPar,agregarPar
        };

   },

}
</script>

<style scoped>
        
        ul {
            padding: 0;
            list-style: none;
        }

        li {
            display: inline;
            
            list-style: flex-start;
            align-items: center;
            gap: 10px;
            margin-bottom: 2px;
            padding: 2px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        textarea {
            width: 100%;
            height: 180px;
            margin-top: 20px;
            font-family: Consolas, monospace;
            border-radius: 15px;
        }

        .form-agregar {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
        }

        input,
        select,
        button {
            padding: 6px;
        }
.btn-x {
    background: transparent;   /* Sin fondo */
    border: none;              /* Sin borde */
    font-size: 24px;            /* Tamaño de la X */
    font-weight: bold;
    color: #333;                /* Color de la X */
    cursor: pointer;
    line-height: 1;
    padding: 4px 8px;
    transition: color 0.2s ease;
    border-radius: 5px;
}

/* Efecto hover */
.btn-x{ color:#f00a0a; border-radius: 5px;}
.btn-x:hover {
    color: blue; /* Cambia de color al pasar el mouse */
}

/* Accesibilidad: quitar outline solo si se reemplaza con otro estilo */
.btn-x:focus {
    outline: 2px solid #f00a0a;
    outline-offset: 2px;    
}
    </style>



