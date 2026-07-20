<template>
  <div v-if="user != null" class="container-fluid">
    <div class="page-header min-height-300 border-radius-xl mt-4 "
      :style="{ backgroundImage: `url(${require('@/assets/img/logos.png')})`, opacity: 0.7 }">
    </div>

    <div class="card card-body mx-4 mx-md-1 mt-n2">
      <div class="row">
        <div class="col ">
          <profile-info-card title="Información del Usuario" description="" :info="{
            fullNamessss: user.nombreCompleto || 'N/A',
            mobile: user.telefono || 'No disponible',
            email: user.email || 'No disponible',
            location: user.cuerpoId || 'No disponible',
            rol: (userRol != null && userRol.name != null) ? userRol.name : 'No disponible',
          }" :action="{
              route: 'javascript:;',
              tooltip: '',
            }" />
        </div>
       
          <div class="text-end">
            <material-button color="primary" variant="gradient" size="sm" @click.prevent="openCambioPassword" >Cambiar contraseña</material-button>            
          </div>  
        
      </div>
    </div>
    <CambioContra 
      :visible="cambioContraVisible"      
      @update:completo="v => closeCambioPassword(v)"
      @close="cambioContraVisible = false"
    />
  </div>
  <div v-else>Cargando Información...</div>


</template>

<script>
import ProfileInfoCard from "./ProfileInfoCard.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import { useMainStore } from "@/store/useMainStore";
import { useUsuarioStore } from "../../../../../SIPRED-MOD001/src/modules/usuarios/store/useUsuarioStore.js";
import { storeToRefs } from "pinia";
import { onBeforeMount,ref } from "vue";
import CambioContra from "../../../../../SIPRED-MOD001/src/modules/usuarios/components/CambioContra.vue";
import MaterialButton from "../../../../components/common/MaterialButton.vue";
export default {
  name: "ProfileOverview",
  components: {
    ProfileInfoCard,CambioContra,MaterialButton
  },
  setup() {
    const store = useMainStore();
    const usuarioStore = useUsuarioStore();
    const { userdata: user, userRol, coporacionSelected } = storeToRefs(store);
    const cambioContraVisible = ref(false)
    onBeforeMount(async () => {
      await store.getUserInfo();
    });

    function openCambioPassword(){
      cambioContraVisible.value = true
    }
    
    function closeCambioPassword(v){      
      let username = store.externalUser.username;      
      usuarioStore.setNewPassword(v.value.password,v.value.password1,v.value.password2,username)
      cambioContraVisible.value = false  

    }

    return { store, user, userRol, onBeforeMount, coporacionSelected,cambioContraVisible,openCambioPassword,closeCambioPassword };
  },
 
  data() {
    return {
      showMenu: false,
    };
  },
   methods:{
    
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "mainStore",
        storage: localStorage, // Use localStorage to persist state
        paths: ["user", "userRol"], // Specify which parts of the state to persist
      },
    ],
  },
  mounted() {
    setNavPills();
    setTooltip(this.store.bootstrap);
  },
};
</script>