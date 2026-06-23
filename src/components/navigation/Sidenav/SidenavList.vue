<template>
  <div class="  " style="height: 90%; width: 95%;">

    <div class="row " style="height: 90%;">
      <div id="sidenav-collapse-main" class="col collapse navbar-collapse">

        <div class="row">
          <ul class="navbar-nav">
            <li v-for="(item, index) in navItems" :key="index" class="nav-item" :class="isActive(item) ? 'active' : ''">
              <sidenav-collapse :collapse-ref="item.title" :nav-text="item.title"
                :class="isActive(item) ? 'active' : ''">
                <template #icon>
                  <i class="material-icons-round opacity-10">{{ item.icon }}</i>
                </template>
                <template #list>
                  <ul class="nav pe-0">
                    <sidenav-item v-for="(child, childIndex) in item.children" :key="childIndex"
                      :to="{ name: child.name }" :mini-icon="child.miniIcon" :text="child.text"
                      :class="{ active: currentRoute === child.name }" />
                  </ul>
                </template>
              </sidenav-collapse>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <div class="ps-2 w-100 d-flex justify-content-center" style="height:10%;">
        <MaterialButton id="logout-button" color="info" variant="gradient" @click="logout" class=" d-flex justify-content-center" style="height: 38px; width: 100%;">
          <i class="material-icons-round" style="font-size: 1.5rem;">logout</i>
          <span class="nav-link-text ms-2">Salir</span>
        </MaterialButton>
      </div>

  </div>
</template>

<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import MaterialButton from "@/components/common/MaterialButton.vue";
import { useMainStore } from "@/store/useMainStore";
import { useRoute } from "vue-router";
import { watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default {
  name: "SidenavList",
  components: {
    SidenavItem,
    SidenavCollapse,
    MaterialButton,
  },
  setup() {
    const store = useMainStore();
    const {
      navbarMinimize,
      currentRoute,
      navItems,
      userdata,
      usercorporations,
      coporacionSelected,
      isPinned,
    } = storeToRefs(store);
    const route = useRoute();
    const router = useRouter();

    // User Information (tolerant to null/async)
    const user = computed(() => ({
      name:
        userdata.value?.nombreCompleto ||
        userdata.value?.displayName ||
        "Usuario",
      email: userdata.value?.email || userdata.value?.mail || "",
      avatar: "https://via.placeholder.com/60",
    }));

    const comboOptions = Array.isArray(usercorporations.value)
      ? usercorporations.value.map((x) => ({ label: x }))
      : [];

    watch(
      () => route.name,
      (newRoute) => {
        store.setCurrentRoute(newRoute);
      },
      { immediate: true }
    );

    const isActive = (item) => {
      return item.children.some((child) => child.name === currentRoute.value);
    };

    const logout = () => {
      store.logout();
    };

    const openUserInfo = () => {
      router.push({ name: "UserInfo" });
    };

    return {
      navbarMinimize,
      currentRoute,
      navItems,
      isActive,
      logout,
      user,
      comboOptions,
      selectedOption: null,
      userdata,
      coporacionSelected,
      openUserInfo,
      isPinned,
    };
  },
};
</script>
<style scoped></style>