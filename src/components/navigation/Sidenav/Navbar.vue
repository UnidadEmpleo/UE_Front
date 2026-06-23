<template>
  <div class="container-fluid ">

    <div class="row sticky-top" style="height: 5rem; background-color: #42424a;">
      <div class="position-absolute top-50 start-50 translate-middle align-items-center d-flex ">

        <div class="col-2 d-flex justify-content-center align-items-center">
          <img :src="cuerpo
          " class="navbar-brand-img h-100" style="max-height: 6rem; height: 5rem;" alt="Corporación" />
        </div>
        <div class="rounded-circle bg-secondary justify-content-center align-items-center d-flex h5 fw-medium"
            style=" aspect-ratio:1/1; height: 60px; margin-left: 0px; font-size: 1rem; text-shadow: 10px 5px 1px rgba(0,0,0,0.3);" >
            {{ user.region }}
          </div>

        <div class="col-6 d-flex justify-content-center align-items-center text-center">
          <h2 class="text-white fw-bold mb-0 text-uppercase tracking-wider" style="font-size: 1.4rem; letter-spacing: 1px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            Cuerpos de Seguridad Auxiliares <br>
            <small class="opacity-8 fw-light" style="font-size: 0.9rem;">del Estado de México</small>
          </h2>
        </div>

        <div class="col-3 d-flex justify-content-end align-items-center ">
          <div class="ps-3 pe-3 pb-2">
            
          </div>
          <div class="rounded-circle bg-secondary justify-content-center align-items-center d-flex h5 fw-medium"
            style=" aspect-ratio:1/1; height: 40px; margin-left: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);" >
            {{ user.initial }}
          </div>
          <div class="ps-3 pe-3 pb-2">
            <span class="text-white fw-medium" style="font-size: 1rem; letter-spacing: 1px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
              {{ user.name }}
            </span>
          </div>
        </div>

      </div>
      <nav id="navbarBlur" class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl" v-bind="$attrs"
        data-scroll="true" :class="[
          store.isNavFixed
            ? 'position-sticky blur shadow-blur top-1 z-index-sticky'
            : '',
          store.isAbsolute ? 'mt-4' : 'mt-4',
        ]">
        <div class="px-5 pb-4 container-fluid">

          <div id="navbar" class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0"
            :class="store.isRTL ? 'px-0' : 'me-sm-4'">
            <a href="#" class="p-0 nav-link text-body" @click.prevent="minNav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line" :class="color ? 'bg-black' : 'bg-white'"></i>
                <i class="sidenav-toggler-line" :class="color ? 'bg-black' : 'bg-white'"></i>
                <i class="sidenav-toggler-line" :class="color ? 'bg-black' : 'bg-white'"></i>
              </div>
            </a>
          </div>

          <div id="navbar" class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
            :class="store.isRTL ? 'px-0' : 'me-sm-4'">
            <div class="pe-md-3 d-flex align-items-center" :class="store.isRTL ? 'me-md-auto' : 'ms-md-auto'"></div>
            <ul class="navbar-nav justify-content-end"></ul>
          </div>
        </div>

      </nav>

    </div>

  </div>

</template>

<script>
import { useMainStore } from "@/store/useMainStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import auxiliar from "@/assets/img/auxiliar.png";
import cuautitlan from "@/assets/img/cuautitlan.png";
import lerma from "@/assets/img/lerma.png";


export default {
  name: "Navbar",
  components: {},
  props: {
    minNav: {
      type: Function,
      default: () => {
      },
    },
    color: {
      type: String,
      default: "text-body",
    },
  },
  setup() {
    const store = useMainStore();
    const { userdata } = storeToRefs(store);
    
    const user = computed(() => {
      const name = userdata.value?.nombreCompleto || userdata.value?.displayName || "Usuario";
      return {
        name: name,
        initial: name.charAt(0).toUpperCase(),
        region: decimalARomano(userdata.value?.regionId),
      };
    });

    
    

    function decimalARomano(num) {
    // Validación de tipo y rango
        if (typeof num !== 'number' || !Number.isInteger(num)) {
            return 'Error: Debe ingresar un número entero.';
        
        }
        if (num == 0) 
          return 'G';

        if (num < 1 || num > 101) {
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


    const cuerpo = computed(() =>{
        if (userdata.value?.cuerpoId=='CGSIBCVCT')
          return cuautitlan;
        else if (userdata.value?.cuerpoId=='CVAUEM')
          return auxiliar;
        else
          return lerma;
    })


    return { store, userdata, user, cuerpo };
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.store.navbarMinimize();
    },
  },
};
</script>