<template>

  <aside id="sidenav-main" class="overflow-hidden sticky-top sidenav navbar navbar-vertical navbar-expand-xs" :class="`${store.isRTL ? 'rotate-caret fixed-end' : 'fixed-start'
    } ${store.sidebarType}`">

    <div class="sidenav-header">
      <i id="iconSidenav"
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true">
      </i>

      <router-link class="navbar-brand h-100 w-100" to="/pages/users/user-info">
        <img :src="store.sidebarType === 'bg-white' ||
            (store.sidebarType === 'bg-transparent' && !store.isDarkMode)
            ? logoDark
            : logo
          " class="navbar-brand-img h-100" style="max-height: 3rem; height: 3rem;" alt="main_logo" />
        <span class="ms-4 font-weight-bold text-white">CUSAEM</span>
      </router-link>
    </div>

    <hr class="horizontal light mt-0 mb-2" />
    <sidenav-list />
  </aside>

</template>

<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct.svg";
import logoDark from "@/assets/img/logo-ct-dark.svg";
import { useMainStore } from "@/store/useMainStore";

export default {
  name: "Index",
  components: {
    SidenavList,
  },
  setup() {
    const store = useMainStore();
    return { store };
  },
  data() {
    return {
      logo,
      logoDark,
    };
  },
};
</script>