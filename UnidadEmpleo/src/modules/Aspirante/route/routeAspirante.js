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


const routeAspirante = [
  {
    path: "/aspirantes",
    name: "AspirantesList",
    component: () => import("@ue/modules/Aspirante/views/AspiranteList.vue"),
      beforeEnter: requireAuth,
  },
  {
  path: "/aspirantes/create",
  name: "AspiranteForm",
  component: () => import("@ue/modules/Aspirante/views/AspiranteForm.vue"),
     beforeEnter: requireAuth,
  },
  {
    path: "/aspirantes/edit/:id",
    name: "AspirantesEdit",
    component: () => import("@ue/modules/Aspirante/views/AspiranteEdit.vue"),
      beforeEnter: requireAuth,
    props: true,
  },
  {
  path: "/aspirantes/detalle",
  name: "ConsultaAspirante",
  component: () => import("@ue/modules/Aspirante/views/AspiranteDetalle.vue"),
     beforeEnter: requireAuth,
  },
];

export default routeAspirante;