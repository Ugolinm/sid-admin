<template>
	<div class="backBtn">
		<span @click="backLast">←</span>
		<span @click="backLast" class="back">返回</span>
	</div>
	<div class="grid-content">
		<div class="top-title">
			<div class="lft">
				<div class="icon"></div>
				<span>{{ doctorName }}医师诊断记录</span>
			</div>
			<div class="rgt">
				<!-- <input type="text" class="input" placeholder="请输入姓名或手机号查询" /> -->
				<!-- <el-button class="btn" type="goon" style="width: 80px">查询</el-button> -->
				<div class="input1">
					<div class="search-name">使用者姓名</div>
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
						maxlength="18"
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
		<div class="table-content">
			<el-table
				height="575"
				ref="table"
				@select-all="selectAll"
				@select="select"
				:cell-style="cellStyle"
				style="width: 100%"
				:data="state.tableData"
				:header-cell-style="{
					background: '#f2f3f8',
					color: '#999999'
				}"
			>
				<el-table-column fixed type="selection" />
				<!-- <el-table-column type="index" label="序号" width="120" /> -->
				<el-table-column prop="userName" label="使用者姓名" />
				<el-table-column prop="phone" sortable label="手机号" />
				<el-table-column prop="status" label="状态">
					<template #default="scope">
						<el-tag class="mx-1" :type="scope.row.status == '完成' ? '' : 'info'" disable-transitions>{{
							scope.row.status
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="jiezhen_time" sortable label="接诊时间" show-overflow-tooltip />
				<el-table-column prop="report_time" sortable label="上传报告时间" show-overflow-tooltip />

				<el-table-column fixed="right" label="操作" width="180">
					<template #default="scope">
						<!-- <el-button style="color: #207bba" link size="small" @click="loadReport(scope.row)"> 报告预览 </el-button> -->
						<el-button style="color: #207bba" link size="small" @click="loadReport(scope.row)">
							<a :href="`${href}`" target="_blank" rel="noopener noreferrer" style="color: #207bba; text-decoration: none"
								>报告预览</a
							>
						</el-button>
						<el-button style="color: #207bba" link size="small" @click="download(scope.row)">数据导出</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 插入分页组件 -->
		<div class="page">
			<div class="lft">
				<el-button class="btn" type="goon" style="width: 70px" @click="downloads">导出</el-button>
				<el-button class="btn" type="goon" style="width: 70px; margin-left: 50px" @click="restInfo(), (dialogFormVisible = true)"
					>结算</el-button
				>
			</div>
			<div class="rgt">
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
		<div class="dialog">
			<el-dialog v-model="dialogFormVisible" title="结算" center width="25%">
				<el-form :model="form" label-position="top" ref="calculateRef" :rules="submitRules" :hide-required-asterisk="true">
					<el-form-item label="导出数据时间范围选择:" prop="day_scope">
						<el-date-picker
							v-model="form.day_scope"
							type="daterange"
							range-separator="-"
							format="YYYY/MM/DD"
							value-format="x"
							start-placeholder="开始时间"
							end-placeholder="截止时间"
							size="default"
						/>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button
							@click="
								dialogFormVisible = false;
								restInfo();
							"
							>取消</el-button
						>
						<el-button type="goon" @click="exportData(calculateRef)"> 导出 </el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { loadDiagnosedData, dataExc, dataExcSin, calcuData, expData } from "@/api/modules/doctor";
import { onMounted, reactive, ref, watch } from "vue";
// import { FormInstance } from "element-plus";
import { ElForm, ElMessage } from "element-plus";
type FormInstance = InstanceType<typeof ElForm>;
const route = useRoute();
const router = useRouter();
const dialogFormVisible = ref(false);
const calculateRef = ref<FormInstance>();
// const formLabelWidth = "100px";
// 传递过来的参数接收
const id = route.query.id;
const doctorName = route.query.name;
const href = ref();
const table = ref();
const form: any = reactive({
	day_scope: "",
	queryID: ""
});
// const day_scope = ref();
let excel = reactive<any>({
	data: []
});
let state = reactive<any>({
	checkRep_id: "",
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
const searchData = reactive({
	phone: "",
	names: ""
});
// console.log("传递过来的id", data);
const backLast = () => {
	router.go(-1);
};
// 导出用户列表
// const downloadFile = async () => {};
const search = async () => {
	state.pageable.name = searchData.names;
	state.pageable.phone = searchData.phone;
	console.log("page", state.pageable);
	const res: any = await loadDiagnosedData(id, state.pageable);
	state.tableData = res.data.arr1;
	state.pageable.total = res.data.arr2[0].total;
	state.tableKey = Math.random();
	console.log("查询方法调用", res);
};
// 清除信息
const restInfo = () => {
	// console.log(form.day_scope);
	form.day_scope = "";
};
const submitRules = reactive({
	// name:[{required:true,message:"请输入名字"}]
	day_scope: [{ required: true, message: "请选择时间范围", trigger: "change" }]
});
const exportData = (formEl: FormInstance | undefined) => {
	if (!formEl) return;

	formEl.validate(async valid => {
		// console.log("导出的时间", form.day_scope)
		if (!valid) {
			dialogFormVisible.value = true;
			ElMessage.warning("请选择时间范围！");
			return;
		} else {
			// 1 将所筛选的时间和id传给后台
			form.queryID = id;
			console.log(form.queryID, form.day_scope);
			const res: any = await calcuData(form);
			console.log("res", res.result);
			if (res.result.length > 0) {
				const data: any = await expData(res.result);
				console.log("bolob", data);
				let url = window.URL.createObjectURL(new Blob([data]));
				let link = document.createElement("a");
				link.style.display = "none";
				link.href = url;
				link.setAttribute("download", `${doctorName}医师诊断记录.xlsx`);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				dialogFormVisible.value = false;
			} else {
				ElMessage.warning("当前所选时间段没有数据");
				dialogFormVisible.value = false;
			}
		}
	});
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
const load = async () => {
	const res: any = await loadDiagnosedData(id, state.pageable);
	console.log("load医生诊断数据", res.data.arr1);
	state.tableData = res.data.arr1;
	state.pageable.total = res.data.arr2[0].total;
	state.tableKey = Math.random();
};
const handleSizeChange = (val: any) => {
	console.log("每页的条数", val);
};
const handleCurrentChange = (val: number) => {
	state.pageable.pageNum = val;
	load();
};
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
	link.setAttribute("download", `${doctorName}医师诊断记录.xlsx`);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
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
		link.setAttribute("download", `${doctorName}医师诊断记录.xlsx`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		table.value.clearSelection();
		excel.data = [];
	} else {
		ElMessage.warning("没有选中的数据");
	}
};
const loadReport = async (row: any) => {
	console.log("加载报告的数据", row.report_id);
	//api.alphaecg.cn/bu/${report_id}
	href.value = `https://api.alphaecg.cn/bu/${row.report_id}`;
};
onMounted(() => {
	load();
});
watch([() => searchData.names, () => searchData.phone], () => {
	if (searchData.names === "" && searchData.phone === "") {
		// 没有查询参数的情况下
		state.pageable.name = "";
		state.pageable.phone = "";
		load();
	}
});
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
@import "./doctorhistory.scss";
</style>
