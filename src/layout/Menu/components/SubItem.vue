<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<!-- 二级 -->
		<el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
			<template #title>
				<SvgIcon class="svg" :name="subItem.icon" />

				<span>{{ subItem.title }}</span>
			</template>

			<div class="menulist">
				<SubItem :menuList="subItem.children" />
			</div>
		</el-sub-menu>

		<!-- 一级 -->
		<el-menu-item v-else :index="subItem.path">
			<SvgIcon class="svg" :name="subItem.icon" />

			<template v-if="!subItem.isLink" #title>
				<span style="font-size: 13px" class="title">{{ subItem.title }}</span>
			</template>
			<template v-else #title>
				<a class="menu-href" :href="subItem.isLink" target="_blank">{{ subItem.title }}</a>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";
defineProps<{ menuList: Menu.MenuOptions[] }>();
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
