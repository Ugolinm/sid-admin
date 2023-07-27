<template>
	<div class="backBtn">
		<span @click="backLast">←</span>
		<span @click="backLast" class="back">返回</span>
	</div>

	<div class="grid-content">
		<div class="firstLine" v-for="item in state.tableData" :key="item">
			<div class="notice" v-if="item.checkStatus == '冻结'">
				<div class="bar">冻结原因：{{ form.reason }}</div>
			</div>
			<div class="notice" v-if="item.checkStatus == '未通过'">
				<div class="bar">未通过原因：{{ form.reason }}</div>
			</div>
			<span>基本信息</span>
			<img src="@/assets/images/doctor1.png" v-if="item.checkStatus == '已通过'" class="titleImg" />
			<img src="@/assets/images/doctor2.png" v-if="item.checkStatus == '未通过'" class="titleImg" />
			<img src="@/assets/images/doctor3.png" v-if="item.checkStatus == '待审核'" class="titleImg" />
			<img src="@/assets/images/doctor4.png" v-if="item.checkStatus == '冻结'" class="titleImg" />
			<div class="info1">
				<!-- <div></div> -->

				<div class="leftInfo">
					<img :src="decodeURIComponent(`${item.avatar}`)" class="img" />
					<div class="userInfo">
						<div class="username">{{ item.docName }}</div>
						<img src="@/assets/images/doctor-woman.png" v-if="item.gender == '女'" class="icon" />
						<img src="@/assets/images/doctor-man.png" v-if="item.gender == '男'" class="icon" />
					</div>
					<div class="phone">{{ item.mobile }}</div>
				</div>
				<div class="rightInfo">
					<div class="top">
						<span class="title">身份证号:</span>
						<span class="name">{{ item.idcard }}</span>
					</div>
					<div class="bot">
						<span>身份图片</span>
						<img :src="id_front || defaultImage" :onerror="defaultImgSet" />

						<img :src="id_back || defaultImage" :onerror="defaultImgSet" />
						<!-- <img src="@/assets/images/avatar.gif" /> -->
					</div>
				</div>
			</div>
		</div>
		<div class="secondLine" v-for="item in state.tableData" :key="item">
			<span>工作信息</span>
			<div class="info1">
				<div class="leftInfo">
					<div class="list">
						<span class="title">所属医院:</span>
						<span class="name">{{ item.hospitalName }}</span>
					</div>
					<div class="list">
						<span class="title">职称:</span>
						<span class="name">{{ item.title }}</span>
					</div>
					<div class="list">
						<span class="title">科室:</span>
						<span class="name">{{ item.partName }}</span>
					</div>
					<div class="list">
						<span class="title">地区:</span>
						<span class="name">{{ item.cityName }}</span>
					</div>
					<div class="list">
						<span class="title">详细地址:</span>
						<span class="name">{{ item.address }}</span>
					</div>
					<!-- img -->
				</div>
				<div class="rightInfo">
					<div class="part">
						<span>医师执业证</span>
						<img :src="rqc || defaultImage" :onerror="defaultImgSet" />
					</div>
					<div class="part">
						<span>职称等级证</span>
						<img :src="trc || defaultImage" :onerror="defaultImgSet" />
						<!-- <img src="@/assets/images/avatar.gif" /> -->
					</div>
				</div>
			</div>
		</div>
		<div class="thirdLine" v-for="item in state.tableData" :key="item">
			<span>医生签名</span>
			<div class="info1">
				<img :src="sign || defaultImage" :onerror="defaultImgSet" />
				<!-- <img src="@/assets/images/avatar.gif" /> -->
			</div>
		</div>
		<el-divider></el-divider>
		<div class="lastLine" v-for="item in state.tableData" :key="item">
			<el-button
				class="btn"
				type="goon"
				style="width: 80px"
				v-if="item.checkStatus == '待审核'"
				@click="
					handleEdit(item);
					dialogFormVisible = true;
				"
				>审核</el-button
			>
			<el-button class="btn" type="goon" style="width: 80px" v-if="item.checkStatus == '冻结'" @click="deleteAccount(item)"
				>解冻</el-button
			>
			<el-button
				class="btn"
				type="goons"
				style="width: 80px"
				v-if="item.checkStatus == '已通过'"
				@click="
					handleEdit3(item);
					dialogFormVisible3 = true;
				"
				>冻结</el-button
			>
		</div>

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
					<el-input v-model="form.dialogForm.desc" type="textarea" />
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

		<!-- 冻结dialog -->
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
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import defaultImage from "@/assets/images/image_error.png";
import { ts } from "@/views/doctor/components/utils";
import { useHandleData } from "@/hooks/useHandleData";
import {
	loadExactData,
	getdoctorDialogForm,
	deleteUser,
	setAllData,
	freezeUser,
	getCheckData,
	getImages
} from "@/api/modules/doctor";
import { ElForm, ElMessage } from "element-plus";
const dialogFormVisible3 = ref(false);
type FormInstance = InstanceType<typeof ElForm>;
// const dialogFormRefs = ref<FormInstance>();
const dialogFormRef = ref<FormInstance>();
const submitRules = reactive({
	// name:[{required:true,message:"请输入名字"}]
	resource: [{ required: true, message: "请选择", trigger: "change" }],
	desc: [{ required: true, message: "请填写备注", trigger: "change" }]
});
const freezeRoleRules = reactive({
	// name:[{required:true,message:"请输入名字"}]
	// resource: [{ required: true, message: "请选择" }],
	// desc: [{ required: true, message: "请填写备注" }],
	desc: [{ required: true, message: "请填写冻结理由", trigger: "change" }]
});
const disabled = ref(false);
const router = useRouter();
const route = useRoute();
const loading = ref<boolean>(false);
const freezeFormRef = ref<FormInstance>();
// console.log("传递过来的id", data);
const backLast = () => {
	router.go(-1);
};
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
const formLabelWidth = "100px";

const dialogFormVisible = ref(false);
const id: any = route.query.id;
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
			// getTableList();
			load();
			dialogFormVisible3.value = false;
			// 登记信息
			const res1: any = await setAllData(form.freeze);
			if (res1 == "登记成功") {
				// ElMessage.warning("登记信息成功");
				console.log("登记信息成功", form.freeze);
				loadReadson();
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
// 提交审核表单
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
				// getTableList();
				load();

				dialogFormVisible.value = false;
				// 登记信息
				const res1: any = await setAllData(form.dialogForm);
				if (res1 == "登记成功") {
					// ElMessage.warning("登记成功");
					console.log("登记信息成功", form.dialogForm);
					loadReadson();
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
const defaultImgSet = (e: any) => {
	let img = e.srcElement;
	img.src = defaultImage;
	img.onerror = null;
};
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
//根据id查询接口返回详情页面数据
const handleEdit: any = (item: any) => {
	// console.log(index, row);
	// form.name = userName;
	(form.dialogForm.desc = ""), (form.dialogForm.resource = ""), (form.dialogForm.rights = []);
	form.dialogForm.name = item.docName;
	form.dialogForm.id = item.id;
};
//冻结
const handleEdit3: any = (item: any) => {
	console.log("item", item);

	// resetForm(formEl);
	// console.log(index, row);
	form.freeze.desc = "";
	form.freeze.name = item.docName;
	form.freeze.id = item.id;
};
// const { getTableList } = useTable(getUserList2, initParam);
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
	reason: "",

	region: "",
	date1: "",
	date2: "",
	delivery: false,
	type: [],
	resource: "",
	desc: "",
	title: "\u3000\u3000",
	title1: "--\u0020\u3000\u3000\u3000"
});
// 照片请求地址
const id_front = ref();
const id_back = ref();
const rqc = ref();
const trc = ref();
const sign = ref();
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
	load();
};
const load = async () => {
	console.log("uuid", id);
	const res: any = await loadExactData(id);
	state.tableData = res;
	console.log("详情列表展示数据", res[0]?.front);
	if (res.length > 0) {
		if (res[0]?.front) {
			id_front.value = await getImages(res[0]?.front);
		}
		if (res[0]?.back) {
			id_back.value = await getImages(res[0]?.back);
		}
		if (res[0]?.trc) {
			trc.value = await getImages(res[0]?.trc);
		}
		if (res[0]?.rqc) {
			rqc.value = await getImages(res[0]?.rqc);
		}
		if (res[0]?.sign) {
			sign.value = await getImages(res[0]?.sign);
		}
	}
};
const loadReadson = async () => {
	const res: any = await getCheckData(id);
	if (res.data.length > 0) {
		console.log("获取审核记录信息成功", res?.data);
		// form.timeline = res?.data;
		form.reason = res?.data[0].description;
	} else {
		console.log("获取审核记录信息失败", res);
	}
};
onMounted(() => {
	load();
	// 顶部信息
	loadReadson();
});
</script>
<style lang="scss" scoped>
@import "./doctorInfo.scss";
</style>
