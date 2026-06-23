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


const routeEvaluacion = [
  {
    path: "/evaluaciones",
    name: "EvaluacionList",
    component: () => import("@ue/modules/Evaluacion/views/EvaluacionList.vue"),
      beforeEnter: requireAuth,
  },
  {
    path: "/evaluacion",
    name: "EvaluacionForm",
    component: () => import("@ue/modules/Evaluacion/views/EvaluacionForm.vue"),
      beforeEnter: requireAuth,
  },
  
  
];

export default routeEvaluacion;