import { msalInstance } from "@/authConfig";
import localStorageService from "@/utils/localStorageService";

const requireAuth = (to, from, next) => {

  const isSystemUser = localStorageService.get("isSystemUser");
  const externalUser = localStorageService.get("externalUser");

  if(isSystemUser === true)
  {
      if (externalUser && externalUser.token) 
        next();
      else
        next({ name: "2FactorQR" }); // Redirige a la página de autenticación de dos factores
      
      return;
  }
  else
  {
      const account = msalInstance.getActiveAccount();
      if (!account) {
        msalInstance.loginRedirect({
          scopes: ["User.Read"], // Cambia los scopes según tus necesidades
          redirectUri: "/pages/users/user-info",
        });
      } else 
        next();
  }
};


const routeSolicitud = [
  {
    path: "/solicitud",
    name: "SolicitudList",
    component: () => import("@ue/modules/Solicitud/views/SolicitudList.vue"),
      beforeEnter: requireAuth,
  },
  
  {
    path: "/solicitud/create",
    name: "SolicitudForm",
    component: () => import("@ue/modules/Solicitud/views/PresolicitudForm.vue"),
    beforeEnter: requireAuth,
  },

];


export default routeSolicitud;