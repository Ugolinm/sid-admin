<!-- 使用者列表 -->
<template>
	<div class="grid-content">
		<div class="top-title">
			<div class="lft">
				<div class="icon"></div>
				<span>使用者列表</span>
			</div>

			<div class="rgt">
				<div class="input1">
					<div class="search-name">使用者姓名</div>
					<el-input
						v-model="searchData.names"
						class="w-50 m-2"
						size="small"
						placeholder="请输入"
						style="width: 120px; height: 25px"
					/>
				</div>
				<div class="input2">
					<div class="search-name">手机号</div>

					<el-input
						v-model="searchData.phone"
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
		<div class="table-content">
			<el-table
				:key="state.tableKey"
				:data="state.tableData"
				:cell-style="cellStyle"
				height="575"
				style="width: 100%"
				:header-cell-style="{
					height: '10px',
					background: '#f2f3f8',
					color: '#999999'
				}"
			>
				<el-table-column fixed type="index" label="序号" width="80" />
				<el-table-column prop="name" show-overflow-tooltip label="使用者姓名" width="100" />
				<el-table-column prop="mobile" show-overflow-tooltip sortable label="手机号" width="120" />
				<el-table-column prop="gender" show-overflow-tooltip label="性别" width="80"> </el-table-column>
				<el-table-column prop="age" show-overflow-tooltip label="年龄" width="80"> </el-table-column>
				<el-table-column prop="height" show-overflow-tooltip label="身高(cm)" width="100">
					<template #default="scope">
						{{ scope.row.height == "0" ? "--" : scope.row.height }}
					</template>
				</el-table-column>
				<el-table-column prop="weight" show-overflow-tooltip label="体重(kg)" width="100">
					<template #default="scope">
						{{ scope.row.weight == "0" ? "--" : scope.row.weight }}
					</template>
				</el-table-column>
				<!-- <el-table-column prop="userTimes" sortable label="使用频率" width="120" /> -->
				<el-table-column prop="time" show-overflow-tooltip label="最近就诊时间" width="120">
					<template #default="scope">
						{{ scope.row.time == "0" ? "--" : scope.row.time }}
					</template>
				</el-table-column>
				<el-table-column prop="city" show-overflow-tooltip label="所在地区" width="120">
					<template #default="scope">
						{{ scope.row.city == "0" ? "--" : scope.row.city }}
					</template>
				</el-table-column>
				<el-table-column prop="num" sortable label="就诊量(次)" />
				<el-table-column fixed="right" label="操作" width="100">
					<template #default="scope">
						<el-button style="color: #207bba" link size="small" @click="showDetail(scope.row)">就诊记录</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 插入分页组件 -->
		<div class="page">
			<el-pagination
				background
				style="margin-right: 0.325rem; margin-bottom: 0.37rem"
				v-model:currentPage="state.pageable.pageNum"
				v-model:page-size="state.pageable.pageSize"
				layout=" total,prev, pager, next, jumper"
				:total="state.pageable.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
// import { useTable } from "@/hooks/useTable";
import { useRouter } from "vue-router";
import { getTableData } from "@/api/modules/users";
// import { getUserList1 } from "@/api/modules/user";
import { onMounted, reactive, watch } from "vue";
// import { ref } from "vue";

// const route = useRoute();
const router = useRouter();

const searchData = reactive({
	phone: "",
	names: ""
});
let state = reactive<any>({
	tableKey: 1,
	tableData: [],
	// 分页数据
	pageable: {
		// 当前页数
		pageNum: 1,
		// 每页显示条数
		pageSize: 10,
		// 总条数
		total: 0,
		name: "",
		phone: "",
		status: 0
	},
	// 查询参数(只包括查询)
	searchParam: {},
	// 初始化默认的查询参数
	searchInitParam: {},
	// 总参数(包含分页和查询参数)
	totalParam: {},
	historyData: [] //回显到表格的数据
});
const showDetail = (e: any) => {
	console.log("e", e);
	router.push({
		name: "userHistory",
		query: {
			id: e.id,

			name: e.name
		}
	});
};

// 表格 hooks
// const { tableData, pageable, handleSizeChange, handleCurrentChange } = useTable(getUserList1, initParam);
// console.log("列表", tableData);
const handleSizeChange = (val: any) => {
	console.log("每页的条数", val);
};
const handleCurrentChange = (val: number) => {
	state.pageable.pageNum = val;
	getTableList();
};
const getTableList = async () => {
	let res: any = await getTableData(state.pageable);

	// state.value.tableData = res;
	state.tableData = res.data.arr1;
	console.log("result", res);

	state.pageable.total = res.data.arr2[0].total;
	// console.log("restable", state.tableKey);
	state.tableKey = Math.random();
};
const search = async () => {
	state.pageable.name = searchData.names;
	state.pageable.phone = searchData.phone;
	console.log("page", state.pageable);
	const res: any = await getTableData(state.pageable);
	state.tableData = res.data.arr1;
	state.pageable.total = res.data.arr2[0].total;
	state.tableKey = Math.random();
	console.log("查询方法调用", res);
};
const cellStyle = ({ columnIndex }: any) => {
	if (columnIndex === 0) {
		return {
			color: " #999999"
		};
	} else
		return {
			color: "#333333"
		};
};
onMounted(() => {
	getTableList();
});
watch([() => searchData.names, () => searchData.phone], () => {
	if (searchData.names === "" && searchData.phone === "") {
		// 没有查询参数的情况下
		state.pageable.name = "";
		state.pageable.phone = "";
		getTableList();
	}
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
