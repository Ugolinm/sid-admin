<template>
	<div
		class="menu"
		style="width: 220px"
		v-loading="loading"
		element-loading-text="Loading..."
		:element-loading-spinner="loadingSvg"
		element-loading-svg-view-box="-10, -10, 50, 50"
		element-loading-background="rgba(122, 122, 122, 0.01)"
	>
		<div class="logo"><img src="@/assets/images/logo@2x.png" alt="logo" /></div>
		<!-- <el-scrollbar> -->
		<el-menu
			:default-active="activeMenu"
			:router="true"
			:collapse-transition="false"
			:unique-opened="true"
			background-color="rgb(36 51 77 / 100%)"
			text-color="#bdbdc0"
			active-text-color="#fff"
		>
			<SubItem :menuList="menuList" />
		</el-menu>
		<!-- </el-scrollbar> -->
	</div>
</template>

<script setup lang="ts">
import { loadingSvg } from "@/utils/svg";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MenuStore } from "@/store/modules/menu";
import { AuthStore } from "@/store/modules/auth";
import { getMenuList } from "@/api/modules/login";
import { handleRouter } from "@/utils/util";
// import { loadingSvg } from "@/utils/svg";
// import Logo from "./components/Logo.vue";
import SubItem from "./components/SubItem.vue";

const route = useRoute();
const menuStore = MenuStore();
const authStore = AuthStore();

// 菜单加载 loading
const loading = ref(false);

onMounted(async () => {
	// 获取菜单列表
	loading.value = true;
	try {
		const res = await getMenuList();
		if (!res.data) return;
		// 把路由菜单处理成一维数组（存储到 pinia 中）
		const dynamicRouter = handleRouter(res.data);
		authStore.setAuthRouter(dynamicRouter);
		menuStore.setMenuList(res.data);
	} finally {
		loading.value = false;
	}
});

const activeMenu = computed((): string => route.path);

const menuList = computed((): Menu.MenuOptions[] => menuStore.menuList);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
