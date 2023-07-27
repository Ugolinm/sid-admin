<!--权益码  -->
<template>
	<div class="grid-box">
		<div class="search-content" v-if="init == '全部'">
			<div class="lft-box">
				<div class="first-row">
					<div class="bar">
						<span>领用状态:</span>
						<el-select
							v-model="search_form.export_status"
							placeholder="请选择"
							style="width: 130px; margin-left: 8px"
							size="small"
						>
							<el-option v-for="item in search_export" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</div>
					<div class="bar">
						<span>领用时间:</span>
						<el-date-picker
							style="width: 170px; margin-left: 8px"
							format="YYYY-MM-DD"
							value-format="YYYY-MM-DD"
							v-model="search_form.export_tm"
							type="date"
							placeholder="请选择"
							size="small"
						/>
					</div>
					<div class="bar">
						<span>领用人:</span>
						<el-input
							v-model="search_form.export_user"
							placeholder="请输入"
							style="width: 170px; margin-left: 8px"
							size="small"
						></el-input>
					</div>
				</div>
				<div class="second-row">
					<div class="bar">
						<span>兑换状态:</span>
						<el-select
							v-model="search_form.redeem_status"
							placeholder="请选择"
							style="width: 130px; margin-left: 8px"
							size="small"
						>
							<el-option v-for="item in search_redeem" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</div>
					<div class="bar">
						<span>兑换时间:</span>
						<el-date-picker
							style="width: 170px; margin-left: 8px"
							format="YYYY-MM-DD"
							value-format="YYYY-MM-DD"
							v-model="search_form.redeem_tm"
							type="date"
							placeholder="请选择"
							size="small"
						/>
					</div>
				</div>
			</div>
			<div class="rgt-box">
				<el-button type="goon" style="width: 70px" @click="searchTol"
					><el-icon style="margin-right: 5px"><Search /></el-icon>查询</el-button
				>
				<el-button type="goons" style="width: 70px" @click="reset"
					><el-icon style="margin-right: 5px"><RefreshRight /></el-icon>重置</el-button
				>
			</div>
		</div>
		<div class="search-list" v-if="init == '领用记录'">
			<div class="lft-box">
				<div class="bar">
					<span>领用人:</span>
					<el-input
						v-model="search_bar.export_user"
						placeholder="请输入"
						style="width: 170px; margin-left: 8px"
						size="small"
					></el-input>
				</div>
				<div class="bar">
					<span>领用时间:</span>
					<el-date-picker
						style="width: 170px; margin-left: 8px"
						format="YYYY-MM-DD"
						value-format="YYYY-MM-DD"
						v-model="search_bar.export_tm"
						type="date"
						placeholder="请选择"
						size="small"
					/>
				</div>
			</div>
			<div class="rgt-box">
				<el-button type="goon" style="width: 70px; margin-right: 20px" @click="searchList"
					><el-icon style="margin-right: 5px"><Search /></el-icon>查询</el-button
				>
				<el-button type="goons" style="width: 70px" @click="resetList"
					><el-icon style="margin-right: 5px"><RefreshRight /></el-icon>重置</el-button
				>
			</div>
		</div>
		<div class="main-content">
			<div class="top-title">
				<div class="lft">
					<div class="icon"></div>
					<!-- 无数据 -->
					<span>权益码管理</span>
					<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change="handleClick">
						<el-tab-pane label="新增" name="新增"></el-tab-pane>
						<el-tab-pane label="领用记录" name="领用记录"></el-tab-pane>
						<el-tab-pane label="全部" name="全部"></el-tab-pane>
					</el-tabs>
					<!-- 有数据 -->
				</div>

				<div class="rgt" v-if="init == '新增'">
					<!-- <el-button type="goon" style="width: 90px" @click="addCode()" :disabled="disable">全部导出</el-button> -->
					<el-button type="goon" style="width: 100px" @click="addCode()">+ 新增权益码</el-button>
					<el-button type="goons" style="width: 100px" @click="downloadsAll"
						><el-icon class="el-icon--right" style="margin-right: 5px"><Upload /></el-icon>一键领用</el-button
					>

					<el-button type="goons" style="width: 65px" @click="downloads"
						><el-icon class="el-icon--right" style="margin-right: 10px"><Upload /></el-icon> 领用</el-button
					>
				</div>
				<div class="rgt" v-if="init == '未领用'">
					<el-button type="goons" style="width: 65px" @click="downloads"
						><el-icon class="el-icon--right" style="margin-right: 5px"><Upload /></el-icon> 领用</el-button
					>
				</div>
			</div>
			<el-divider></el-divider>
			<!-- 领用记录表 -->
			<div class="table-content" v-if="flag == 1 && init == '领用记录'">
				<el-table
					:key="Math.random()"
					ref="table"
					@select-all="selectAll"
					@select="select"
					height="575"
					:row-key="getRowKeys"
					:data="state.tableData"
					:cell-style="cellStyle"
					style="width: 100%"
					:header-cell-style="{
						height: '10px',
						background: '#f2f3f8',
						color: '#999999'
					}"
				>
					<el-table-column type="index" label="序号" width="150" />
					<!-- <el-table-column fixed type="selection" :selectable="selectable" :reserve-selection="true" /> -->
					<el-table-column prop="export_user" show-overflow-tooltip label="领用人" width="220" />
					<el-table-column prop="export_tm" :formatter="formatTime" label="领用时间" width="300" sortable> </el-table-column>
					<el-table-column prop="export_qty" label="领用数量" width="200" sortable> </el-table-column>
					<el-table-column fixed="right" label="领用详情" width="auto">
						<template #default="scope">
							<el-button style="color: #207bba" link size="small" @click="checkInfo(scope)">查看详情</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 权益码展示表 -->
			<div class="table-content" v-if="flag == 1 && (init == '新增' || init == '全部')">
				<el-table
					:key="Math.random()"
					ref="table"
					@select-all="selectAll"
					@select="select"
					height="575"
					:row-key="getRowKeys"
					:data="state.tableData"
					:cell-style="cellStyle"
					style="width: 100%"
					:header-cell-style="{
						height: '10px',
						background: '#f2f3f8',
						color: '#999999'
					}"
				>
					<el-table-column v-if="init == '新增'" width="40" type="selection" :selectable="selectable" :reserve-selection="true" />
					<el-table-column prop="list_no" label="序号" width="60" />

					<el-table-column prop="code" show-overflow-tooltip label="权益码" width="290" />
					<el-table-column prop="redeem_tm" label="兑换状态" width="110" sortable>
						<template #default="scope">
							{{ scope.row.redeem_tm == null || scope.row.redeem_tm == "null" ? "未兑换" : "已兑换" }}
						</template>
					</el-table-column>
					<el-table-column prop="export_tm" label="领用状态" width="110" sortable>
						<template #default="scope">
							{{ scope.row.export_tm == null || scope.row.export_tm == "null" ? "未领用" : "已领用" }}
						</template>
					</el-table-column>
					<el-table-column prop="export_user" label="领用人" width="100" sortable show-overflow-tooltip>
						<template #default="scope">
							{{ scope.row.export_user == null ? "--" : scope.row.export_user }}
						</template>
					</el-table-column>
					<el-table-column prop="create_tm" :formatter="formatTime" label="创建时间" width="120" sortable show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="export_tm" label="领用时间" :formatter="formatTime" width="120" sortable show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="redeem_tm" label="兑换时间" :formatter="formatTime" width="120" sortable show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="expire_dt" label="有效期" show-overflow-tooltip>
						<template #default="scope">
							{{ scope.row.expire_dt == null ? "--" : scope.row.expire_dt }}
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="table-contents" v-if="flag == 0">
				<img src="@/assets/images/empty_error2.png" />
				<span>暂无任何信息哦~</span>
			</div>
			<div class="pages" v-if="flag == 1">
				<!-- <el-button class="btn" type="goon" style="width: 70px" @click="downloads">导出</el-button> -->
				<el-pagination
					background
					v-model:currentPage="state.pageable.pageNum"
					v-model:page-size="state.pageable.pageSize"
					layout=" total,prev, pager, next, jumper"
					:total="state.pageable.total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
			<!-- 新建对话框 -->
			<div class="dialog">
				<el-dialog v-model="dialogFormVisible" title="新建权益码" center width="22%">
					<el-form :model="form" label-position="top" ref="calculateRef" :rules="submitRules" :hide-required-asterisk="true">
						<el-form-item label="新增权益个数:" prop="num">
							<el-input v-model="form.num" placeholder="请输入(不超过5000)" type="number" :precision="0" maxlength="10" />
						</el-form-item>
						<el-form-item label="有效期:" prop="expired_tm">
							<el-select v-model="form.expired_tm" placeholder="请选择" style="width: 100%">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button type="goon" style="width: 80px" @click="sumbit(calculateRef)"> 确认 </el-button>
						</span>
					</template>
				</el-dialog>
				<!-- 编辑对话框 -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElForm, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref, watch } from "vue";
import { addcodes, getTable, dataExc, changeRedeem, dataExcAll, getAllData, insertHist } from "@/api/modules/code";
import { v4 as uuidv4 } from "uuid";

type FormInstance = InstanceType<typeof ElForm>;
const router = useRouter();
const flag_index = ref();
const activeName = ref("全部");
const init = ref("全部");
// const disable = ref();
const calculateRef = ref<FormInstance>();
const flag = ref(0);
const options = [
	{
		value: "三个月",
		label: "三个月"
	},
	{
		value: "六个月",
		label: "六个月"
	}
];
const search_export = [
	{
		value: "已领用",
		label: "已领用"
	},
	{
		value: "未领用",
		label: "未领用"
	}
];
const search_redeem = [
	{
		value: "已兑换",
		label: "已兑换"
	},
	{
		value: "未兑换",
		label: "未兑换"
	}
];

const search_form = reactive({
	export_status: "",
	export_tm: "",
	export_user: "",
	redeem_status: "",
	redeem_tm: ""
});
const search_bar = reactive({
	export_user: "",
	export_tm: ""
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
		mobile: "",
		status: "全部"
	},
	// 查询参数(只包括查询)
	searchParam: {},
	// 初始化默认的查询参数
	searchInitParam: {},
	// 总参数(包含分页和查询参数)
	totalParam: {},
	historyData: [] //回显到表格的数据
});
const getRowKeys = (row: any) => {
	// id 是后台传递的每行信息唯一标识
	return row.id;
};

const formatTime = (row: any, column: any) => {
	let data = row[column.property];
	// console.log("data", typeof data === "string");
	if (data == null || data == "null") {
		return "--";
	} else {
		let dtime = new Date(parseInt(data));
		// console.log("dattime", dtime);
		const year = dtime.getFullYear();
		let month: any = dtime.getMonth() + 1;
		if (month < 10) {
			month = "0" + month;
		}
		let day: any = dtime.getDate();
		if (day < 10) {
			day = "0" + day;
		}
		let hour: any = dtime.getHours();
		if (hour < 10) {
			hour = "0" + hour;
		}
		let minute: any = dtime.getMinutes();
		if (minute < 10) {
			minute = "0" + minute;
		}
		let second: any = dtime.getSeconds();
		if (second < 10) {
			second = "0" + second;
		}
		return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	}
};

const selectable = (row: any, index: any) => {
	// 领用时间存在就已经领用不能导出不能勾选
	if (row.export_tm == null) {
		return true;
	} else return false;
};
const checkNum = (rule: any, value: any, callback: any) => {
	if (!value || value.length == 0) {
		// 自定义验证条件，返回错误提示文字
		callback(new Error("不能为空"));
	} else if (value < 0) {
		callback(new Error("不能输入负数"));
	} else if (value > 5000) {
		callback(new Error("不能大于5000个"));
	} else if (String(value).indexOf(".") > -1) {
		callback(new Error("不能输入小数"));
	} else {
		callback();
	}
};
// const table=ref()
const table = ref<any>(null);
// 当前登录用户id获取
const userId: any = localStorage.getItem("user");
const downloads = async () => {
	if (excel.data.length > 0) {
		console.log("多行数据打印", userId);
		uuid.value = uuidv4();
		const data: any = await dataExc(excel.data, userId);
		const list: any = await insertHist(excel.data.length, userId, uuid.value);
		if (!list.error && list) {
			console.log("打印返回结果", excel.data);
			let url = window.URL.createObjectURL(new Blob([data]));
			let link = document.createElement("a");
			link.style.display = "none";
			link.href = url;
			link.setAttribute("download", `权益码列表.xlsx`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			table.value.clearSelection();
			getTableList();
			excel.data = [];
		} else {
			ElMessage.warning("写入领用记录有误");
		}
	} else {
		ElMessage.warning("没有选中的数据");
	}
};
const uuid = ref("");
const downloadsAll = async () => {
	console.log("全部打印");
	const res: any = await getAllData();
	console.log("res", res);

	if (Object.keys(res).length == 0) {
		ElMessage.warning("暂无数据导出");
	} else {
		// 写入记录+打印
		uuid.value = uuidv4();
		const data: any = await dataExcAll(res, userId, uuid.value);
		const list: any = await insertHist(Object.keys(res).length, userId, uuid.value);
		if (!list.error) {
			let url = window.URL.createObjectURL(new Blob([data]));
			let link = document.createElement("a");
			link.style.display = "none";
			link.href = url;
			link.setAttribute("download", `权益码列表.xlsx`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			table.value.clearSelection();
			getTableList();
		} else {
			ElMessage.warning("写入领用记录有误");
		}
	}
};
const submitRules = reactive({
	// name:[{required:true,message:"请输入名字"}]
	num: [{ trigger: "change", validator: checkNum }]
});
const form = reactive<any>({
	num: "",
	expired_tm: ""
});
let excel = reactive<any>({
	data: []
});
const dialogFormVisible = ref(false);
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

const addCode = () => {
	form.num = "";
	dialogFormVisible.value = true;
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
const handleSizeChange = (val: any) => {
	console.log("每页的条数", val);
};
const handleCurrentChange = (val: number) => {
	state.pageable.pageNum = val;
	getTableList();
};
// //获取表格序号
// const getIndex = (index: number) => {
// 	return (state.pageable.pageNum - 1) * state.pageable.pageSize + index + 1;
// };
const getTableList = async () => {
	const res: any = await getTable(state.pageable);
	console.log("flage", init.value);
	console.log("gettab", flag_index.value);

	if (res?.arr1.length > 0) {
		// 请求更改列表兑换状态的数据后再赋值
		console.log("arr1", res.arr1);

		const ret: any = await changeRedeem(res.arr1);
		console.log("ret", ret);

		state.tableData = ret;
		state.pageable.total = res.arr2[0].total;
		state.tableKey = Math.random();
		flag.value = 1;
	} else {
		console.log("数据为空");
		flag.value = 0;
	}
};
// 表单提交
const sumbit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) {
			dialogFormVisible.value = true;
			ElMessage.warning("请完整填写表单！");
			return;
		} else {
			console.log("提交表单", form);
			const res: any = await addcodes(form);
			console.log("res", res);
			if (res && !res?.error) {
				ElMessage.success("新增权益码成功！");
				dialogFormVisible.value = false;
				getTableList();
			} else {
				ElMessage.error("新增权益码失败！");
				dialogFormVisible.value = false;
				getTableList();
			}
		}
	});
};
const handleClick = (pane: any) => {
	console.log("gtab", pane);
	if (pane == "新增") {
		return (init.value = "新增");
	} else if (pane == "领用记录") {
		return (init.value = "领用记录");
	} else {
		return (init.value = "全部");
	}
};
const searchTol = () => {
	console.log("查询表单", uuidv4());
};
const searchList = () => {
	console.log("查询表单", search_form);
};
const resetList = () => {
	console.log("重置表单");
	search_bar.export_tm = "";
	search_bar.export_user = "";
};
const reset = () => {
	console.log("重置表单");
	search_form.export_status = "";
	search_form.export_tm = "";
	search_form.export_user = "";
	search_form.redeem_status = "";
	search_form.redeem_tm = "";
};
const checkInfo = (scope: any) => {
	console.log("跳转详情", scope.row);
	router.push({
		name: "codeInfo",
		query: {
			uuid: scope.row.uuid
			// name: e.name
		}
	});
};
watch(
	() => init.value,
	() => {
		state.pageable.status = init.value;
		state.pageable.pageNum = 1;
		getTableList();
	}
);
onMounted(() => {
	getTableList();
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
