import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/css/nucleo-variables.css";
import "./assets/css/monitor-events.css";
import VueSweetalert2 from "vue-sweetalert2";
import MaterialDashboard from "./material-dashboard";
import { initializeMsal } from "./authConfig";
import permisoDirective from './directives/access';
import uppercase from './directives/uppercase';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const appInstance = createApp(App);
const pinia = createPinia();

// Inicializa MSAL antes de montar la aplicación
initializeMsal()
  .then(() => {
    console.log("MSAL initialized successfully.");
  })
  .catch(() => {
    console.warn("MSAL initialization failed. Proceeding without authentication.");
  })
  .finally(() => {
    // Utilities and Spanish defaults: formatters and messages
    const spanishUtils = {
      // Accepts Date, timestamp, or ISO string. Returns 'dd/MM/yyyy'
      formatDate(value) {
        if (!value) return '';
        const d = (value instanceof Date) ? value : new Date(value);
        if (Number.isNaN(d.getTime())) return '';
        return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
      },
      // Returns 'dd/MM/yyyy HH:mm'
      formatDateTime(value) {
        if (!value) return '';
        const d = (value instanceof Date) ? value : new Date(value);
        if (Number.isNaN(d.getTime())) return '';
        const date = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
        const time = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }).format(d);
        return `${date} ${time}`;
      },
      // Parse an ISO-like date (YYYY-MM-DD or ISO) and return Date object or null
      parseIso(value) {
        if (!value) return null;
        try {
          const d = new Date(value);
          return Number.isNaN(d.getTime()) ? null : d;
        } catch (e) {
          return null;
        }
      }
    };

    const spanishMessages = {
      ok: 'Aceptar',
      cancel: 'Cancelar',
      required: 'Este campo es obligatorio.',
      invalid_email: 'Correo electrónico inválido.',
      invalid_curp: 'CURP inválida.',
      invalid_rfc: 'RFC inválido.'
    };

    // Register globals for easy use in components: $fmt and $msg
    appInstance.config.globalProperties.$fmt = spanishUtils;
    appInstance.config.globalProperties.$msg = spanishMessages;

    appInstance.use(pinia);
    appInstance.use(router);
    // Provide Spanish defaults to SweetAlert2
    appInstance.use(VueSweetalert2, { confirmButtonText: spanishMessages.ok, cancelButtonText: spanishMessages.cancel });
    appInstance.use(MaterialDashboard);
    appInstance.directive("permiso",permisoDirective);
    appInstance.directive('uppercase', uppercase);
    appInstance.mount("#app");
  });