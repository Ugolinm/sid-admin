<!-- 医生管理 -->
<template>
	<div class="grid-content">
		<div class="top-title">
			<div class="lft">
				<div class="icon"></div>
				<span>医生列表</span>
				<div class="tab">
					<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="handleClick">
						<el-tab-pane label="全部" name="全部"></el-tab-pane>
						<el-tab-pane label="待审核" name="待审核"></el-tab-pane>
						<el-tab-pane label="已通过" name="已通过"></el-tab-pane>
						<el-tab-pane label="未通过" name="未通过"></el-tab-pane>
						<el-tab-pane label="冻结" name="冻结"></el-tab-pane>
					</el-tabs>
				</div>
			</div>
			<div class="rgt">
				<div class="input1">
					<div class="search-name">医生姓名</div>
					<el-input
						v-model="searchData.names"
						maxlength="10"
						class="w-50 m-2"
						size="small"
						type="text"
						placeholder="请输入"
						style="width: 120px; height: 25px"
					/>
				</div>
				<div class="input2">
					<div class="search-name">手机号</div>
					<el-input
						maxlength="16"
						v-model="searchData.phone"
						type="number"
						class="w-50 m-2"
						size="small"
						placeholder="请输入"
						style="width: 120px; height: 25px"
					/>
					<el-button class="btn" type="goon" @click="search">查询</el-button>
				</div>
			</div>
		</div>
		<el-divider></el-divider>
		<protable :initNum="init" :data="datas"></protable>
	</div>
</template>

<script setup lang="ts">
import protable from "@/views/ProTable/index.vue";
import { reactive, ref, watch } from "vue";
const number: any = ref(0);
const activeName = ref("全部");
const init = ref("全部");
// const globalstore = GlobalStore();
const searchData = reactive({
	phone: "",
	names: ""
});
let datas = reactive({
	phone: "",
	names: "",
	status: ""
});
const search = () => {
	datas.names = searchData.names;
	datas.phone = searchData.phone;
	datas.status = number.value;
	console.log("查询方法调用", datas);
};
watch([() => searchData.names, () => searchData.phone], () => {
	if (searchData.names === "" && searchData.phone === "") {
		search();
	}
});
const handleClick = (pane: any) => {
	console.log("gtab", pane);
	if (pane === "全部") {
		return (init.value = "全部");
	} else if (pane === "待审核") {
		return (init.value = "待审核");
	} else if (pane === "已通过") {
		return (init.value = "已通过");
	} else if (pane === "未通过") {
		return (init.value = "未通过");
	} else {
		return (init.value = "冻结");
	}
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
