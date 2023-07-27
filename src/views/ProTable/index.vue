<!--表格医生页面  -->
<template>
	<div class="table-content">
		<el-table
			style="width: 100%"
			:key="state.tableKey"
			:cell-style="cellStyle"
			height="600"
			:data="state.tableData"
			:header-cell-style="{
				background: '#f2f3f8',
				color: '#999999'
			}"
		>
			<el-table-column fixed type="index" label="序号" width="60" />
			<template v-for="item in state.columnConfig" :key="item">
				<el-table-column
					v-if="item.flag == 'common'"
					:sortable="item.sort"
					:prop="item.prop"
					:label="item.label"
					:width="item.width || 'auto'"
					:show-overflow-tooltip="item.toolip"
				></el-table-column>
				<el-table-column v-if="item.flag == 'el-tag'" :prop="item.prop" :label="item.label" :width="item.width || 'auto'">
					<template #default="scope">
						<!-- {{ scope.row }} -->
						<el-tag
							class="mx-1"
							:type="
								scope.row.checkStatus == '待审核'
									? 'warning'
									: scope.row.checkStatus == '已通过'
									? ''
									: scope.row.checkStatus == '未通过'
									? 'danger'
									: scope.row.checkStatus == '冻结'
									? 'info'
									: ''
							"
							disable-transitions
							>{{ scope.row.checkStatus }}</el-tag
						>
					</template>
				</el-table-column>
				<el-table-column v-if="item.flag == 'el-tag'" fixed="right" label="操作" width="300">
					<template #default="scope">
						<el-button
							style="color: #0081ff"
							link
							size="small"
							v-if="scope.row.checkStatus == '待审核'"
							@click="
								handleEdit(scope.$index, scope.row);
								dialogFormVisible = true;
							"
							>审核</el-button
						>
						<el-button
							style="color: red"
							@click="
								handleEdit3(scope.$index, scope.row);
								dialogFormVisible3 = true;
							"
							link
							size="small"
							v-if="scope.row.checkStatus == '已通过'"
							>冻结</el-button
						>
						<!-- 设置空按钮 -->
						<el-button style="color: #0081ff" link size="small" v-if="scope.row.checkStatus == '未通过'"
							>{{ form.title }}
						</el-button>

						<el-button
							style="color: #22cce2"
							@click="deleteAccount(scope.row)"
							link
							size="small"
							v-if="scope.row.checkStatus == '冻结'"
							>解冻</el-button
						>
						<el-button style="color: #207bba" link size="small" @click="gotoInfo(scope.row)">详情</el-button>
						<el-button
							style="color: #207bba"
							link
							size="small"
							v-if="scope.row.checkStatus == '已通过' || scope.row.checkStatus == '冻结'"
							@click="showDetail(scope.row)"
							>诊断记录</el-button
						>
						<!-- 设置诊断记录的空按钮 -->
						<el-button
							style="color: #0081ff"
							link
							size="small"
							v-if="scope.row.checkStatus == '未通过' || scope.row.checkStatus == '待审核'"
							>{{ form.title1 }}
						</el-button>
						<el-button
							style="color: #207bba"
							link
							size="small"
							v-if="scope.row.checkStatus !== '待审核'"
							@click="
								handleEditTimeline(scope.$index, scope.row);
								dialogFormVisible1 = true;
							"
							>审核记录</el-button
						>
						<el-button
							style="color: #207bba"
							link
							size="small"
							v-if="scope.row.checkStatus == '已通过'"
							@click="
								changeRole(scope.$index, scope.row);
								dialogFormVisible2 = true;
							"
							>权限</el-button
						>
						<!-- 待审核的诊断记录空按钮 -->
						<el-button style="color: #0081ff" link size="small" v-if="scope.row.checkStatus == '待审核'"
							>{{ form.title1 }}
						</el-button>
						<el-button style="color: #0081ff" link size="small" v-if="scope.row.checkStatus !== '已通过'"
							>{{ form.title1 }}
						</el-button>
					</template>
				</el-table-column>
			</template>

			<!-- <el-table-column fixed type="index" label="序号" width="100" /> -->
		</el-table>
	</div>
	<!-- 插入分页组件 -->
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

	<div class="dialog">
		<!-- 审核dialog -->
		<el-dialog v-model="dialogFormVisible" title="审核" width="25%" @close="closed(dialogFormRef)">
			<el-form
				:model="form.dialogForm"
				:hide-required-asterisk="true"
				label-position="left"
				ref="dialogFormRef"
				:rules="submitRules"
			>
				<el-form-item label="姓名:" :label-width="formLabelWidth" prop="name">
					<!-- <el-input v-model="form.dialogForm.name" autocomplete="off" disabled /> -->
					<!-- 升级版 -->
					{{ form.dialogForm.name }}
				</el-form-item>
				<!-- 审核按钮单选 -->
				<el-form-item label="审核:" :label-width="formLabelWidth" prop="resource">
					<el-radio-group v-model="form.dialogForm.resource" @change="optionSingle">
						<el-radio label="通过" />
						<el-radio label="不通过" />
					</el-radio-group>
				</el-form-item>
				<el-form-item label="权限:" :label-width="formLabelWidth" prop="rights">
					<el-checkbox-group v-model="form.dialogForm.rights">
						<!-- <el-checkbox label="接诊" />
						<el-checkbox label="复核" /> -->
						<el-checkbox @change="change1" label="接诊" :disabled="disabled" />
						<el-checkbox @change="change2" label="复核" :disabled="disabled" />
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="备注:" :label-width="formLabelWidth" prop="desc">
					<el-input style="width: 200px" v-model="form.dialogForm.desc" type="textarea" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<!-- <el-button @click="dialogFormVisible = false">取消</el-button> -->
					<el-button style="margin-right: 2.1rem" type="primary" :loading="loading" @click="submitForm(dialogFormRef)"
						>确定</el-button
					>
				</span>
			</template>
		</el-dialog>
		<!-- 权限dialog2 -->
		<el-dialog v-model="dialogFormVisible2" title="审核" width="25%">
			<el-form :model="form.role" :hide-required-asterisk="true" label-position="left" ref="roleFormRef">
				<el-form-item label="权限:" :label-width="formLabelWidth" prop="right">
					<el-checkbox-group v-model="form.role.right">
						<!-- <el-checkbox label="接诊" />
						<el-checkbox label="复核" /> -->
						<el-checkbox label="接诊" />
						<el-checkbox label="复核" />
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<!-- <el-button @click="dialogFormVisible = false">取消</el-button> -->
					<el-button style="margin-right: 2.1rem" type="primary" :loading="loading" @click="submitForm2()">确定</el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog v-model="dialogFormVisible3" title="冻结" width="25%" @close="closed(freezeFormRef)">
			<el-form
				:model="form.freeze"
				:hide-required-asterisk="true"
				label-position="left"
				ref="freezeFormRef"
				:rules="freezeRoleRules"
			>
				<el-form-item :label="`您确定冻结 ${form.freeze.name} 医师的账户吗？`" label-width="250px" prop="name"> </el-form-item>

				<el-form-item label="冻结原因:" :label-width="formLabelWidth" prop="desc">
					<el-input v-model="form.freeze.desc" type="textarea" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<!-- <el-button @click="dialogFormVisible = false">取消</el-button> -->
					<el-button style="margin-right: 2.1rem" type="primary" :loading="loading" @click="submitForm3(freezeFormRef)"
						>确定</el-button
					>
				</span>
			</template>
		</el-dialog>
	</div>
	<!-- 审核记录dialog -->
	<div class="dialog">
		<el-dialog v-model="dialogFormVisible1" width="25%" title="审核记录" custom-class="pub_dialog">
			<!-- <el-timeline ">暂无数据</el-timeline> -->
			<!-- v-for的每一个小卡片加在这里 -->
			<div
				style="display: flex; flex-direction: row; align-items: center; justify-content: center"
				v-if="form.timeline.length == 0"
			>
				暂无数据
			</div>
			<el-timeline v-if="form.timeline.length > 0">
				<el-timeline-item v-for="item in form.timeline" :key="item" :timestamp="item.time" placement="top">
					<div class="desc">
						<div class="top">
							<el-tag
								:type="
									item.status == '待审核'
										? 'warning'
										: item.status == '通过'
										? ''
										: item.status == '不通过'
										? 'danger'
										: item.status == '冻结'
										? 'info'
										: 'success'
								"
								class="tag"
								>{{ item.status == "通过" ? "已通过" : item.status == "不通过" ? "未通过" : item.status }}</el-tag
							>
							<span class="title">审核人:</span>
							<span class="name">管理员</span>
						</div>

						<div class="bot" v-show="item.description.length > 0">
							<span>备注:{{ item.description }}</span>
						</div>
					</div>
				</el-timeline-item>
			</el-timeline>
			<!-- <div class="noData" v-if="(form.timeline.length = 0)">暂无数据</div> -->
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import {
	getdoctorTableTol,
	getRight,
	getdoctorDialogForm,
	deleteUser,
	freezeUser,
	changeRight,
	setAllData,
	getCheckData
} from "@/api/modules/doctor";
//getdoctorDialogForm,
import { useHandleData } from "@/hooks/useHandleData";
import { useRouter } from "vue-router";
import { ts } from "@/views/doctor/components/utils";
import { onMounted, reactive, ref, watch } from "vue";
import { ElForm, ElMessage } from "element-plus";
type FormInstance = InstanceType<typeof ElForm>;
const dialogFormRef = ref<FormInstance>();
const roleFormRef = ref<FormInstance>();
const freezeFormRef = ref<FormInstance>();
const formLabelWidth = "80px";
const loading = ref<boolean>(false);
const submitRules = reactive({
	resource: [{ required: true, message: "请选择", trigger: "change" }],
	desc: [{ required: false, message: "请填写备注(最多50字)", trigger: "change", min: 1, max: 50 }]
});
const freezeRoleRules = reactive({
	desc: [{ required: true, message: "请填写冻结理由(最多50字)", min: 1, max: 50, trigger: "change" }]
});

const props: any = defineProps<{
	initNum: any;
	data: any;
	// index: number;
}>();
const router = useRouter();
const disabled = ref(false);
const dialogFormVisible = ref(false);
const dialogFormVisible1 = ref(false);
const dialogFormVisible2 = ref(false);
const dialogFormVisible3 = ref(false);
// 跳转到详情页面
const gotoInfo = (i: any) => {
	console.log("i", i);
	router.push({
		name: "doctorInfo",
		query: {
			id: i.id
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
			// fontSize: "0.225rem",
			// height: "0.825rem"
		};
};
let state = reactive<any>({
	tableKey: 1,
	tableData: [],
	// 分页数6
	pageable: {
		// 当前页
		pageNum: 1,
		// 每页显示条数
		pageSize: 10,
		// 总条数
		total: 0,
		name: "",
		phone: "",
		status: "全部"
	},
	// 查询参数(只包括查询)
	searchParam: {},
	// 初始化默认的查询参数
	searchInitParam: {},
	// 总参数(包含分页和查询参数)
	totalParam: {},
	historyData: [], //回显到表格的数据,
	columnConfig: [
		{
			label: "医生姓名",
			prop: "docName",
			flag: "common",
			sort: false,
			width: "100",
			toolip: true
		},
		{
			label: "审核状态",
			prop: "checkStatus",
			flag: "el-tag",
			sort: false,
			width: "80",
			toolip: true
		},
		{
			label: "手机号",
			prop: "mobile",
			flag: "common",
			sort: true,
			width: "100",
			toolip: true
		},
		{
			label: "区域",
			prop: "cityName",
			flag: "common",
			sort: true,
			width: "100",
			toolip: true
		},
		{
			label: "医院",
			prop: "hospitalName",
			flag: "common",
			sort: true,
			width: "100",
			toolip: true
		},
		{
			label: "职称",
			prop: "title",
			flag: "common",
			sort: false,
			width: "100",
			toolip: true
		},
		{
			label: "科室",
			prop: "partName",
			flag: "common",
			sort: false,
			width: "100",
			toolip: true
		},
		{
			label: "加入时间",
			prop: "getTime",
			flag: "common",
			// sort: true,
			// width: "120",
			toolip: true
		}
	]
});
const optionSingle = (label: any) => {
	console.log("optionsingle", label);
	if (label == "不通过") {
		disabled.value = true;
		form.dialogForm.rights = [];
	} else {
		disabled.value = false;
		// form.dialogForm.resource = form.dialogForm.resource_list;
		form.dialogForm.rights = form.dialogForm.checkbox_list;
	}
};
// const checked = (s: any) => {
// 	console.log("box", s);
// };
const change2 = (s: any) => {
	console.log("改变的值2", s);
	if (s == true) {
		form.dialogForm.rights = form.dialogForm.checkbox_list;
		console.log("change时间里的rights", form.dialogForm.rights);
	} else {
		form.dialogForm.rights = [];
		console.log("change时间里的rights2", form.dialogForm.rights);
	}
};
const change1 = (e: any) => {
	console.log("改变的值1", e);
	if (e == true) {
		form.dialogForm.rights = form.dialogForm.checkbox_list;
	} else {
		form.dialogForm.rights = [];
	}
};
const submitForm2 = async () => {
	const res: any = await changeRight(form.role);
	console.log("res", res);
	if (!res.error) {
		ElMessage.success("修改权限成功！");
		console.log("成功", form.role);
		loading.value = false;
		getTableList();
		dialogFormVisible2.value = false;
	} else {
		ElMessage.error("修改权限失败！");
		loading.value = false;
		console.log("失败", form.dialogForm);
		dialogFormVisible2.value = false;
	}
	// resetFormRole();
};

// const resetFormRole = () => {
// 	// 重新获取接口回显权限值
// 	setTimeout(() => {
// 		form.role.right = [];
// 	}, 10000);
// };
const submitForm = (formEl: FormInstance | undefined) => {
	// loading.value = true;
	// resetForm(formEl);
	if (!formEl) return;
	console.log("form1", form.dialogForm.rights);
	formEl.validate(async valid => {
		console.log("开始表单验证");
		if (!valid) {
			ElMessage.warning("表单填写有误或者不完整！");
			console.log("form2", form.dialogForm);
			dialogFormVisible.value = true;
			return;
		} else if (disabled.value == false && form.dialogForm.rights.length == 0) {
			ElMessage.warning("表单填写不完整！");
			dialogFormVisible.value = true;
			return;
		} else {
			form.dialogForm.situation = "审核";
			form.dialogForm.time = ts();
			loading.value = true;
			// const res1 = "表单数据获取成功";
			console.log(form.dialogForm, form.role);

			const res: any = await getdoctorDialogForm(form.dialogForm);
			if (res == "审核成功") {
				ElMessage.success("审核成功！");
				console.log("成功", res);
				loading.value = false;
				getTableList();
				dialogFormVisible.value = false;
				// 登记信息
				const res1: any = await setAllData(form.dialogForm);
				if (res1 == "登记成功") {
					// ElMessage.warning("登记成功");
					console.log("登记信息成功", form.dialogForm);
				} else {
					// ElMessage.warning("登记失败");
					console.log("登记信息失败", form.dialogForm);
					ElMessage.warning("登记信息失败");
				}
			} else {
				ElMessage.error("审核失败!", res);
				loading.value = false;
				console.log("失败", form.dialogForm);
				dialogFormVisible.value = false;
				// resetForm(formEl);
			}
		}
	});
};
//冻结
const submitForm3 = (formEl: FormInstance | undefined) => {
	// loading.value = true;
	// resetForm(formEl);
	if (!formEl) return;
	console.log("form1", form.freeze);
	formEl.validate(async valid => {
		console.log("开始表单验证");
		if (!valid) {
			console.log("form2", form.freeze);

			ElMessage.warning("表单填写有误或者不完整！");
			dialogFormVisible3.value = true;
			return;
		}
		form.freeze.situation = "冻结";
		form.freeze.time = ts();
		loading.value = true;
		// const res = "表单数据获取成功";
		console.log(form.freeze);

		const res: any = await freezeUser(form.freeze);
		if (res == "冻结成功") {
			ElMessage.success("冻结成功！");
			// console.log("", ts());

			console.log("成功", res);
			loading.value = false;
			getTableList();
			dialogFormVisible3.value = false;
			// 登记信息
			const res1: any = await setAllData(form.freeze);
			if (res1 == "登记成功") {
				// ElMessage.warning("登记信息成功");
				console.log("登记信息成功", form.freeze);
			} else {
				// ElMessage.warning("登记信息失败");
				console.log("登记信息失败", form.freeze);
				ElMessage.warning("登记信息失败");
			}
			// resetForm(formEl);
		} else {
			ElMessage.error("冻结失败！");
			loading.value = false;
			console.log("失败", form.freeze);
			dialogFormVisible3.value = false;
			// resetForm(formEl);
		}
	});
};
const closed = (formEl: FormInstance | undefined) => {
	// formEl.clearValidate();
	if (!formEl) {
		return;
	}
	// formEl.resetFields();
	formEl.clearValidate();
};
onMounted(() => {
	// reset();
	reset();
	getTableList();
});
const getTableList = async () => {
	let res: any = await getdoctorTableTol(state.pageable);
	console.log("state数据", res);
	if (res.error) {
		ElMessage.error("获取表格数据错误！");
	} else {
		state.tableData = res.arr1;
		state.pageable.total = res.arr2[0].total;
		state.tableKey = Math.random();
	}
};
const handleEdit: any = (index: any, row: any) => {
	// resetForm(formEl);
	console.log(index, row);
	(form.dialogForm.desc = ""), (form.dialogForm.resource = ""), (form.dialogForm.rights = []);
	form.dialogForm.name = row.docName;
	form.dialogForm.id = row.id;
};
const handleEdit3: any = (index: any, row: any) => {
	// resetForm(formEl);
	console.log(index, row);
	form.freeze.desc = "";
	form.freeze.name = row.docName;
	form.freeze.id = row.id;
};
const form: any = reactive({
	freeze: {
		id: "",
		name: "",
		desc: "",
		time: "",
		situation: ""
	},
	resolve: {
		id: "",
		name: "",
		time: "",
		situation: ""
	},
	dialogForm: {
		id: "",
		name: "",
		resource: "",
		// resource_list: ["通过", "不通过"],
		desc: "",
		rights: [],
		checkbox_list: ["接诊", "复核"],
		time: "",
		situation: ""
	},
	role: {
		id: "",
		right: []
	},
	check_id: "",
	region: "",
	date1: "",
	date2: "",
	delivery: false,
	type: [],
	resource: "",
	desc: "",
	title: "\u3000\u3000",
	title1: "--\u0020\u3000\u3000\u3000",
	timeline: []
});
//解冻
const deleteAccount = async (params: any) => {
	(form.resolve.id = params.id), (form.resolve.name = params.docName), (form.resolve.time = ts());
	const res = await useHandleData(deleteUser, form.resolve, ` ${params.docName} `);
	if (res) {
		form.resolve.situation = "解冻";
		const res1 = await setAllData(form.resolve);
		if (res1 == "登记成功") {
			console.log("登记所有信息成功", form.resolve, res1);
		} else {
			ElMessage.warning("登记信息失败");
		}
	} else {
		console.log("解冻失败", form.resolve);
	}
	getTableList();
};
const changeRole: any = async (index: any, row: any) => {
	console.log(index, row);
	form.role.id = row.id;
	const res: any = await getRight(form.role.id);
	console.log("res", res);

	// const history = row.checkHistory;
	let rightArr = [];
	for (let i in res) {
		rightArr.push(res[i]);
	}
	if (rightArr[0][0].rights.includes("D") && !rightArr[0][0].rights.includes("R")) {
		form.role.right = ["接诊"];
	} else if (rightArr[0][0].rights.includes("R") && !rightArr[0][0].rights.includes("D")) {
		form.role.right = ["复核"];
	} else if (rightArr[0][0].rights.includes("D") && rightArr[0][0].rights.includes("R")) {
		form.role.right = ["接诊", "复核"];
	}
	console.log("查看回显数据id", form.role.right);
};
const showDetail = (e: any) => {
	console.log("e", e);
	router.push({
		name: "doctorHistory",
		query: {
			id: e.id,
			name: e.docName
			// age: e.age
		}
	});
};
const handleSizeChange = (val: any) => {
	console.log("每页的条数", val);
};
const handleCurrentChange = (val: number) => {
	state.pageable.pageNum = val;
	getTableList();
};
const reset = () => {
	(props.data.names = ""), (props.data.phone = "");
	console.log("重置列表", state.pageable);
};
// 监听table参数的变化
watch(
	[() => props.data.names, () => props.data.phone, () => props.initNum],

	() => {
		state.pageable.status = props.initNum;
		state.pageable.pageNum = 1;
		// getTableList();
		if (props.data.names == "" && props.data.phone == "") {
			state.pageable.name = "";
			state.pageable.phone = "";
			// state.pageable.status = props.index;
			getTableList();
			console.log("传参改变1", state.pageable);
			// console.log("刷新列表", props.index, state.pageable);

			// 没有查询参数的情况下
		} else if (props.data.names || props.data.phone) {
			// 有一个或两个参数的情况下
			state.pageable.name = props.data.names;
			state.pageable.phone = props.data.phone;
			// state.pageable.status = props.index;
			console.log("传参改变2", state.pageable);
			getTableList();
		}
	}
);
const handleEditTimeline: any = async (index: any, row: any) => {
	//审核信息get
	console.log("checkid", row);
	form.timeline = "";
	form.check_id = row.id;
	const res: any = await getCheckData(form.check_id);
	if (res.data.length > 0) {
		console.log("获取审核记录信息成功", res?.data);
		form.timeline = res?.data;
	} else {
		console.log("获取审核记录信息失败", res);
	}
};
</script>
<style lang="scss" scoped>
.table-content {
	display: flex;

	// flex: 1;
	flex-direction: column;
	width: 95%;
	height: calc(100% - 4.8rem);
	margin: 0 auto;
}

.page {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	height: 1.7rem;

	// background-color: red;
	::v-deep .el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
		background-color: #207bba;
	}
	::v-deep .el-pager li:hover {
		color: #207bba;
	}
	.el-pagination {
		display: flex;
		margin-top: 0.9rem;
	}
}
.el-dialog {
	.desc {
		display: flex;
		flex-direction: column;
		justify-content: center;

		// background-color: red;
		min-width: 2.5rem;
		background: #f7f8fd;
		.top {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 100%;
			margin-top: 0.2rem;
			margin-bottom: 0.15rem;
			margin-left: 0.25rem;

			// background-color: red;
			.tag {
				display: flex;

				// margin-left: 0.375rem;
			}
			.title {
				height: 0.3rem;
				margin-left: 0.25rem;
				font-family: "Microsoft YaHei";
				font-size: 16px;
				font-weight: 400;
				line-height: 0.3rem;
				color: #666666;
			}
			.name {
				height: 0.3rem;
				margin-left: 0.08rem;
				font-size: 14px;
				font-weight: 400;
				line-height: 0.3rem;
				color: #333333;
			}
		}
		.bot {
			display: flex;
			flex-direction: row;
			margin-top: 0.1rem;
			margin-right: 0.25rem;
			margin-left: 0.25rem;

			// background-color: red;
			span {
				margin-bottom: 0.2rem;
				font-size: 14px;
				font-weight: 400;
				line-height: 0.3rem;
				color: #666666;

				// background-color: skyblue;
			}
		}
	}
}
</style>
