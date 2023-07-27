<!-- 心电列表 -->
<template>
	<div class="grid-content">
		<div class="top-title">
			<div class="lft">
				<div class="icon"></div>
				<span>心电数据列表</span>
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
				<!-- <input type="text" class="input" placeholder="请输入姓名或手机号查询" /> -->
				<el-button class="btn" type="goon" style="width: 60px" @click="search">查询</el-button>
			</div>
		</div>
		<el-divider></el-divider>
		<div class="table-content">
			<el-table
				ref="table"
				@select-all="selectAll"
				@select="select"
				height="500"
				:data="state.tableData"
				:cell-style="cellStyle"
				style="width: 100%"
				:header-cell-style="{
					height: '10px',
					background: '#f2f3f8',
					color: '#999999'
				}"
			>
				<!-- <el-table-column fixed type="index" label="序号" width="100" /> -->
				<el-table-column fixed type="selection" />
				<el-table-column prop="name" label="使用者姓名" show-overflow-tooltip width="100" />
				<el-table-column prop="start" show-overflow-tooltip label="采集开始时间" width="200" />
				<el-table-column prop="end" label="采集结束时间" show-overflow-tooltip width="200"> </el-table-column>
				<el-table-column prop="time" show-overflow-tooltip label="采集时长(h)" width="100"> </el-table-column>
				<el-table-column prop="city" show-overflow-tooltip label="所在地区" width="120">
					<template #default="scope">
						{{ scope.row.city == "0" ? "--" : scope.row.city }}
					</template>
				</el-table-column>
				<el-table-column prop="device" show-overflow-tooltip label="设备名称" width="120">
					<template #default="scope">
						{{ scope.row.device == "0" ? "--" : scope.row.device }}
					</template>
				</el-table-column>
				<!-- <el-table-column prop="userTimes" sortable label="使用频率" width="120" /> -->
				<el-table-column prop="status" show-overflow-tooltip label="状态">
					<template #default="scope">
						<el-tag class="mx-1" :type="scope.row.status == '已处理' ? '' : 'warning'" disable-transitions>{{
							scope.row.status
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="120">
					<template #default="scope">
						<!-- <el-button style="color: #207bba" link size="small" @click="loadReport(scope.row)"> 报告预览 </el-button> -->

						<el-button style="color: #207bba" link size="small" @click="download(scope.row)">数据下载</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 插入分页组件 -->

		<div class="page">
			<el-button class="btn" type="goon" style="width: 70px" @click="downloadFile">导出</el-button>
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
import { onMounted, reactive, ref, watch } from "vue";
import { getTableData, dataExc, xindianExc } from "@/api/modules/xindian";
import { ElMessage } from "element-plus";
const searchData = reactive({
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
let excel = reactive<any>({
	data: []
});
const table = ref();
const handleSizeChange = (val: any) => {
	console.log("每页的条数", val);
};
const handleCurrentChange = (val: number) => {
	state.pageable.pageNum = val;
	getTableList();
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
const search = async () => {
	state.pageable.name = searchData.names;
	const res: any = await getTableData(state.pageable);
	state.tableData = res.data.arr1;
	state.pageable.total = res.data.arr2[0].total;
	state.tableKey = Math.random();
	console.log("查询方法调用", res);
};
const select = (selection: any, row: any) => {
	console.log("sel", selection);
	console.log("row", row);
	excel.data = selection;
};
// 全选按钮
const selectAll = (selection: any) => {
	console.log("sel", selection);
	excel.data = selection;
	// console.log("row", row);
};
// const { tableData, searchParam } = useTable(getUserHistory, initParam);
// 导出用户列表
const downloadFile = async () => {
	// useDownload(exportUserInfo, "用户列表", searchParam.value);
	// const data: any = await download();
	if (excel.data.length > 0) {
		const data: any = await dataExc(excel.data);
		console.log("excel", excel.data);

		console.log("打印返回结果", data);
		let url = window.URL.createObjectURL(new Blob([data]));
		let link = document.createElement("a");
		link.style.display = "none";
		link.href = url;
		link.setAttribute("download", `心电数据.xlsx`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		table.value.clearSelection();
		excel.data = [];
	} else {
		ElMessage.warning("没有选中的数据");
	}
};
const getTableList = async () => {
	const res: any = await getTableData(state.pageable);

	state.tableData = res.data.arr1;
	state.pageable.total = res.data.arr2[0].total;
	state.tableKey = Math.random();
};
const download = async (info: any) => {
	console.log("id", info.userID);

	console.log("data", info.dataID);
	const res: any = await xindianExc(info.userID, info.dataID);
	console.log("下载心电数据res", res);
	let url = window.URL.createObjectURL(new Blob([res]));
	let link = document.createElement("a");
	link.style.display = "none";
	link.href = url;
	link.setAttribute("download", `心电信息.zip`);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
onMounted(() => {
	getTableList();
});
watch([() => searchData.names], () => {
	if (searchData.names === "") {
		// 没有查询参数的情况下
		state.pageable.name = "";
		getTableList();
	}
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
