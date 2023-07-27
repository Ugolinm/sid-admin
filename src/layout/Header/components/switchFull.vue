<template>
	<el-button size="default" class="switch" @click="switchTo">切换至大屏</el-button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const switchTo = () => {
	router.push("/bigData");
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
ß
