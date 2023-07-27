<template>
	<div class="grid-content">
		<div class="top-title">
			<div class="lft">
				<div class="icon"></div>
				<span>报告列表</span>
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
						v-model="searchData.mobile"
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
				ref="table"
				@select-all="selectAll"
				@select="select"
				height="575"
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
				<el-table-column prop="name" label="使用者姓名" show-overflow-tooltip width="120" />
				<el-table-column prop="mobile" show-overflow-tooltip label="手机号" width="180" />
				<el-table-column prop="duration" show-overflow-tooltip label="采集时长(h)" width="120"> </el-table-column>
				<el-table-column prop="handleTime" show-overflow-tooltip label="报告提交时间" width="180" />
				<el-table-column prop="time" show-overflow-tooltip label="报告耗时(h)" sortable width="180"> </el-table-column>
				<el-table-column prop="zhenduanDocName" show-overflow-tooltip label="诊断医生" width="120" />
				<el-table-column prop="fuheDocName" show-overflow-tooltip label="复核医生" />
				<!-- <el-table-column prop="userTimes" sortable label="使用频率" width="120" /> -->
				<el-table-column fixed="right" label="操作" width="180">
					<template #default="scope">
						<!-- <el-button style="color: #207bba" link size="small" @click="loadReport(scope.row)"> 报告预览 </el-button> -->
						<el-button style="color: #207bba" link size="small" @click="loadReport(scope.row)">
							<a :href="`${href}`" target="_blank" rel="noopener noreferrer" style="color: #207bba; text-decoration: none"
								>报告预览</a
							>
						</el-button>
						<el-button style="color: #207bba" link size="small" @click="download(scope.row)">数据下载</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pages">
			<el-button class="btn" type="goon" style="width: 70px" @click="downloads">导出</el-button>
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
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { getTableData, dataExc, reportExc } from "@/api/modules/report";
import { ElMessage } from "element-plus";

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
		mobile: "",
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
const downloads = async () => {
	if (excel.data.length > 0) {
		console.log("多行数据打印", excel.data);

		const data: any = await dataExc(excel.data);
		console.log("打印返回结果", data);
		let url = window.URL.createObjectURL(new Blob([data]));
		let link = document.createElement("a");
		link.style.display = "none";
		link.href = url;
		link.setAttribute("download", `报告列表.xlsx`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		table.value.clearSelection();
		excel.data = [];
	} else {
		ElMessage.warning("没有选中的数据");
	}
};
const searchData = reactive({
	names: "",
	mobile: ""
});
const href = ref();
const loadReport = async (row: any) => {
	console.log("加载报告的数据", row.report_id);
	//api.alphaecg.cn/bu/${report_id}
	href.value = `https://api.alphaecg.cn/bu/${row.report_id}`;
};
const search = async () => {
	state.pageable.name = searchData.names;
	state.pageable.mobile = searchData.mobile;
	console.log("state", state.pageable);

	const res: any = await getTableData(state.pageable);
	state.tableData = res.data.arr1;
	state.pageable.total = res.data.arr2[0].total;
	state.tableKey = Math.random();
	console.log("查询方法调用", res);
};
const download = async (scope: any) => {
	// console.log("scope都没有吗", scope);
	console.log("报告下载", scope.report_id);
	const res: any = await reportExc(scope.report_id);
	console.log("打印报告res", res);
	let url = window.URL.createObjectURL(new Blob([res], { type: "application/pdf" }));
	let link = document.createElement("a");
	link.style.display = "none";
	link.href = url;
	link.setAttribute("download", `${scope.name}报告.pdf`);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
const select = (selection: any, row: any) => {
	console.log("row", row);
	excel.data = selection;
	console.log("excel.data", excel.data);
};
// 全选按钮
const selectAll = (selection: any) => {
	console.log("sel", selection);
	excel.data = selection;
	// console.log("row", row);
	console.log("excel.data", excel.data);
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
// const { tableData, searchParam } = useTable(getUserHistory, initParam);
// 导出用户列表
const handleSizeChange = (val: any) => {
	console.log("每页的条数", val);
};
const handleCurrentChange = (val: number) => {
	state.pageable.pageNum = val;
	getTableList();
};

const getTableList = async () => {
	const res: any = await getTableData(state.pageable);
	console.log("res", res);

	state.tableData = res.data.arr1;
	state.pageable.total = res.data.arr2[0].total;
	state.tableKey = Math.random();
};
onMounted(() => {
	getTableList();
});
watch([() => searchData.names, () => searchData.mobile], () => {
	if (searchData.names === "" && searchData.mobile === "") {
		// 没有查询参数的情况下
		state.pageable.name = "";
		state.pageable.mobile = "";
		getTableList();
	}
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
