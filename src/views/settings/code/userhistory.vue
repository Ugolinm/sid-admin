<!-- 权益码详情 -->
<template>
	<div class="backBtn">
		<span @click="backLast">←</span>
		<span @click="backLast" class="back">返回</span>
	</div>
	<div class="grid-content">
		<div class="top-title">
			<div class="lft">
				<div class="icon"></div>
				<span>{{ userName }}就诊记录</span>
			</div>
			<div class="rgt">
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
				<el-button class="btn" type="goon" style="width: 60px" @click="search">查询</el-button>
			</div>
		</div>
		<el-divider></el-divider>
		<div class="table-content">
			<el-table
				ref="table"
				@select-all="selectAll"
				@select="select"
				height="575"
				:cell-style="cellStyle"
				style="width: 100%"
				:data="state.tableData"
				:header-cell-style="{
					height: '10px',
					background: '#f2f3f8',
					color: '#999999'
				}"
			>
				<el-table-column fixed type="selection" />
				<!-- <el-table-column type="index" label="序号" width="120" /> -->
				<el-table-column prop="duration" label="采集时长(h)" width="100" />
				<el-table-column prop="time" sortable label="就诊时间" />

				<el-table-column prop="reportStatus" label="报告状态">
					<template #default="scope">
						<el-tag class="mx-1" :type="scope.row.reportStatus ? '' : 'warning'" disable-transitions>{{
							scope.row.reportStatus ? "已出" : "未出"
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="doc1" label="诊断医生 " />
				<el-table-column prop="doc2" label="复核医生" />
				<el-table-column prop="history" label="病史" show-overflow-tooltip width="120">
					<template #default="scope">
						{{ scope.row.history == "0" ? "--" : scope.row.history }}
					</template>
				</el-table-column>
				<el-table-column prop="conclusion" label="心电结论" show-overflow-tooltip width="200">
					<template #default="scope">
						{{ scope.row.conclusion == "0" ? "--" : scope.row.history }}
					</template>
				</el-table-column>

				<el-table-column fixed="right" label="操作" width="180">
					<template #default="scope">
						<!-- <el-button style="color: #207bba" link size="small" @click="loadReport(scope.row)"> 报告预览 </el-button> -->
						<el-button style="color: #207bba" link size="small" @click="loadReport(scope.row)">
							<a :href="`${href}`" target="_blank" rel="noopener noreferrer" style="color: #207bba; text-decoration: none">{{
								scope.row.reportStatus ? "报告预览" : title
							}}</a>
						</el-button>

						<el-button style="color: #207bba" link size="small" @click="download(scope.row)">数据导出</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 插入分页组件 -->
		<div class="bot-part">
			<el-button class="btn" type="goon" style="width: 70px" @click="downloads">导出</el-button>
			<div class="page">
				<el-pagination
					v-model:currentPage="state.pageable.pageNum"
					v-model:page-size="state.pageable.pageSize"
					background
					style="margin-right: 0.325rem; margin-bottom: 0.37rem"
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
// import { onMounted } from "vue";
import { getTableHistory } from "@/api/modules/users";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref, watch } from "vue";
import { dataExcSin, dataExc } from "@/api/modules/users";
import { ElMessage } from "element-plus";
// import { ElMessage } from "element-plus";
const route = useRoute();
const router = useRouter();
const Id = route.query.id;
const userName = route.query.name;
const href = ref();
const title = "--\u0020\u3000\u3000\u3000";
const table = ref();
let state = reactive<any>({
	tableKey: 1,
	tableData: [],
	// 分页数据
	pageable: {
		id: "",
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
const searchData = reactive({
	names: ""
});
// console.log("传递过来的id", data);
const backLast = () => {
	router.go(-1);
};
const handleSizeChange = (val: any) => {
	console.log("每页的条数", val);
};
const handleCurrentChange = (val: number) => {
	state.pageable.pageNum = val;
	getTableList();
};
const search = async () => {
	state.pageable.name = searchData.names;

	console.log("page", state.pageable);
	const res: any = await getTableHistory(Id, state.pageable);
	state.tableData = res.data.arr1;
	state.pageable.total = res.data.arr2[0].total;
	state.tableKey = Math.random();
	console.log("查询方法调用", res);
};
// 导出用户列表
const getTableList = async () => {
	state.pageable.id = Id;
	console.log("说她te", state.pageable);

	const res: any = await getTableHistory(Id, state.pageable);
	console.log("load医生诊断数据", res?.data);
	state.tableData = res.data.arr1;
	state.pageable.total = res.data.arr2[0].total;
	state.tableKey = Math.random();
};
const loadReport = async (row: any) => {
	console.log("加载报告的数据", row.report);
	href.value = `https://api.alphaecg.cn/bu/${row.report}`;
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
const downloads = async () => {
	if (excel.data.length > 0) {
		console.log("多行数据打印");
		const data: any = await dataExc(excel.data);
		console.log("打印返回结果", data);
		let url = window.URL.createObjectURL(new Blob([data]));
		let link = document.createElement("a");
		link.style.display = "none";
		link.href = url;
		link.setAttribute("download", `${userName}的就诊记录.xlsx`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		table.value.clearSelection();
		excel.data = [];
	} else {
		ElMessage.warning("没有选中的数据");
	}
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
let excel = reactive<any>({
	data: []
});
const download = async (scope: any) => {
	// console.log("scope都没有吗", scope);
	console.log("单行数据打印", scope);
	excel.data = scope;
	const data: any = await dataExcSin(excel.data);
	console.log("打印返回结果", data);
	let url = window.URL.createObjectURL(new Blob([data]));
	let link = document.createElement("a");
	link.style.display = "none";
	link.href = url;
	console.log("使用者名字", userName);

	link.setAttribute("download", `${userName}的就诊记录.xlsx`);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
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
</script>
<style lang="scss" scoped>
@import "./userhistory.scss";
</style>
