<template>
	<div class="header">
		<div class="header-lf flx-center">
			<!-- <CollapseIcon id="collapseIcon" /> -->
			<Breadcrumb id="breadcrumb" v-if="themeConfig.breadcrumb" />
		</div>
		<div class="header-ri flx-center">
			<div class="header-icon">
				<SearchMenu id="searchMenu" />
				<Fullscreen id="fullscreen" />
			</div>
			<!-- User name -->
			<span class="username">您好，管理员</span>

			<!-- Avatar -->
			<Avatar />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
// import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import SearchMenu from "./components/SearchMenu.vue";
import Fullscreen from "./components/Fullscreen.vue";
// import Language from "./components/Language.vue";

// import Theme from "./components/Theme.vue";
import Avatar from "./components/Avatar.vue";
import { GlobalStore } from "@/store";
// import SwitchFull from "./components/switchFull.vue";
// import { emit } from "process";1

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
