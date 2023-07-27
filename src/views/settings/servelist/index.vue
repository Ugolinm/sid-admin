<!--服务套餐  -->
<template>
	<div class="grid-content">
		<div class="top-title">
			<div class="lft">
				<div class="icon"></div>
				<!-- 无数据 -->
				<span v-if="flag == 0">套餐列表</span>
				<!-- 有数据 -->
				<span v-if="flag == 1">已有套餐列表</span>
				<span class="notice">注：最多可设置12个套餐</span>
			</div>
			<div class="rgt">
				<el-button type="goon" style="width: 80px" @click="opendialog()">+ 新增套餐</el-button>
			</div>
		</div>
		<el-divider></el-divider>
		<div class="table-content" v-if="flag == 1">
			<el-table
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
				<el-table-column fixed type="index" label="序号" width="100" />
				<!-- <el-table-column fixed type="selection" /> -->
				<el-table-column prop="quantity" label="套餐次数" />
				<el-table-column prop="amount" label="实付价格" />
				<el-table-column prop="old_amt" label="原价格" />
				<el-table-column prop="create_tm" label="生效时间" />
				<el-table-column fixed="right" label="操作" width="200">
					<template #default="scope">
						<el-button style="color: #207bba" link size="small" @click="editInfo(scope)">编辑</el-button>
						<el-button style="color: #ff3b3b" link size="small" @click="delInfo(scope)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="table-contents" v-if="flag == 0">
			<img src="@/assets/images/empty_error.png" />
			<span>您还未添加任何套餐哦~</span>
		</div>
		<div class="pages" v-if="flag == 1">
			<!-- <el-button class="btn" type="goon" style="width: 70px" @click="downloads">导出</el-button> -->
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
		<!-- 新建对话框 -->
		<div class="dialog">
			<el-dialog v-model="dialogFormVisible" title="新建套餐" center width="22%">
				<el-form :model="form" label-position="top" ref="calculateRef" :rules="submitRules" :hide-required-asterisk="true">
					<el-form-item label="套餐次数:" prop="list_num">
						<el-input
							v-model="form.list_num"
							placeholder="请输入"
							oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
							maxlength="10"
						/>
					</el-form-item>
					<el-form-item label="实付价格:" prop="exactPrice">
						<el-input v-model="form.exactPrice" placeholder="请输入" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" />
					</el-form-item>
					<el-form-item label="原价格:" prop="initPrice">
						<el-input v-model="form.initPrice" placeholder="请输入" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" />
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button type="goon" style="width: 80px" @click="sumbit(calculateRef)"> 立即生效 </el-button>
					</span>
				</template>
			</el-dialog>
			<!-- 编辑对话框 -->
		</div>
		<!-- 编辑对话框 -->
		<div class="dialog">
			<el-dialog v-model="dialogFormVisible1" title="编辑套餐" center width="22%">
				<el-form :model="form1" label-position="top" ref="calculateRef1" :rules="submitRules1" :hide-required-asterisk="true">
					<el-form-item label="套餐次数:" prop="list_num">
						<el-input v-model="form1.list_num" placeholder="请输入" disabled />
					</el-form-item>
					<el-form-item label="实付价格:" prop="exactPrice">
						<el-input v-model="form1.exactPrice" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" placeholder="请输入" />
					</el-form-item>
					<el-form-item label="原价格:" prop="initPrice">
						<el-input v-model="form1.initPrice" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" placeholder="请输入" />
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button type="goon" style="width: 80px" @click="sumbit1(calculateRef1)"> 立即生效 </el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElForm, ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { addPkg, getTableData, changePkg, delPkg } from "@/api/modules/serve";
import { deleData } from "@/hooks/useHandleData";
const dialogFormVisible = ref(false);
const dialogFormVisible1 = ref(false);
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
const form = reactive<any>({
	initPrice: "",
	exactPrice: "",
	list_num: ""
});
const form1 = reactive<any>({
	quantity: "",
	initPrice: "",
	exactPrice: "",
	list_num: ""
});
type FormInstance = InstanceType<typeof ElForm>;
const calculateRef = ref<FormInstance>();
const calculateRef1 = ref<FormInstance>();
const submitRules = reactive({
	// name:[{required:true,message:"请输入名字"}]
	list_num: [{ required: true, message: "请填写套餐次数(不能超过八位)", trigger: "change", min: 1, max: 8 }],
	initPrice: [{ required: true, message: "请填写原价格(不能超过十位)", trigger: "change", min: 1, max: 10 }],
	exactPrice: [{ required: true, message: "请填写实付价格(不能超过十位)", trigger: "change", min: 1, max: 10 }]
});
const submitRules1 = reactive({
	// name:[{required:true,message:"请输入名字"}]
	initPrice: [{ required: true, message: "请填写原价格(不能超过十位)", trigger: "change" }],
	exactPrice: [{ required: true, message: "请填写实付价格(不能超过十位)", trigger: "change" }]
});
const opendialog = () => {
	if (state.pageable.total >= 12) {
		ElMessage.warning("最多可设置12个套餐!");
	} else {
		form.initPrice = "";
		form.exactPrice = "";
		form.list_num = "";
		dialogFormVisible.value = true;
	}
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
const flag = ref(0);
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
	if (res?.arr1.length > 0) {
		state.tableData = res.arr1;
		state.pageable.total = res.arr2[0].total;
		state.tableKey = Math.random();
		flag.value = 1;
	} else {
		flag.value = 0;
	}
};
// 提交表单
const sumbit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) {
			dialogFormVisible.value = true;
			ElMessage.warning("请完整填写表单！");
			return;
		} else {
			// 前台传给后台id，套餐次数，实付价格以及原价格
			console.log("提交表单", form);
			const res: any = await addPkg(form);
			console.log("res", res);

			if (res && !res?.error) {
				ElMessage.success("增加套餐成功！");
				dialogFormVisible.value = false;
				getTableList();
			} else {
				ElMessage.error("新增套餐次数重复,添加失败！");
				dialogFormVisible.value = false;
				getTableList();
			}
		}
	});
};
// 编辑表单提交
const sumbit1 = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) {
			dialogFormVisible1.value = true;
			ElMessage.warning("请完整填写表单！");
			return;
		} else {
			// 前台传给后台id，套餐次数，实付价格以及原价格
			console.log("提交表单", form1);
			const res: any = await changePkg(form1);
			console.log("res", res);

			if (res && !res?.error) {
				ElMessage.success("更改套餐成功！");
				dialogFormVisible1.value = false;
				getTableList();
			} else {
				ElMessage.error("更改套餐失败！");
				dialogFormVisible1.value = false;
				getTableList();
			}
		}
	});
};
// 编辑
const editInfo = (info: any) => {
	console.log("编辑信息", info);
	form1.list_num = info.row.quantity;
	form1.exactPrice = info.row.amount.replace(/,/g, "");
	form1.initPrice = info.row.old_amt.replace(/,/g, "");
	dialogFormVisible1.value = true;
};
// 删除
const delInfo = async (info: any) => {
	console.log("删除信息", info.row.quantity);
	form1.quantity = info.row.quantity;
	await deleData(delPkg, form1.quantity);
	getTableList();
};
onMounted(() => {
	getTableList();
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
