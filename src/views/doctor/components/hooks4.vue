<!-- hooks -->
<template>
	<!-- 全部数据 -->
	<div class="table-content">
		<el-table
			height="575"
			:key="state.tableKey"
			:cell-style="cellStyle"
			style="width: 100%"
			:data="state.tableData"
			:header-cell-style="{
				height: '10px',
				background: '#f2f3f8',
				color: '#999999',

				fontSize: '0.22rem',
				fontFamily: 'Microsoft YaHei',
				fontWeight: '400'
			}"
		>
			<el-table-column fixed type="index" label="序号" width="100" />
			<el-table-column prop="docName" label="医生姓名" width="120" />
			<el-table-column prop="checkStatus" sortable label="审核状态" width="150">
				<template #default="scope">
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
			<el-table-column prop="mobile" label="手机号" sortable width="150"> </el-table-column>
			<el-table-column prop="cityName" label="区域" width="120" />
			<el-table-column prop="hospitalName" show-overflow-tooltip sortable label="医院" width="120" />
			<el-table-column prop="title" label="职称" width="120" />
			<el-table-column prop="partName" label="科室" width="120" />
			<el-table-column prop="getTime" sortable label="加入时间" width="120" />
			<!-- <el-table-column prop="createTime" label="最近一次心电数据上传时间" width="200" />
						<el-table-column prop="address" show-overflow-tooltip label="地址" width="150" /> -->
			<el-table-column fixed="right" label="操作" width="250">
				<template #default="scope">
					<el-button
						style="color: #22cce2"
						link
						size="small"
						v-if="scope.row.checkStatus == '冻结'"
						@click="deleteAccount(scope.row)"
						>解冻</el-button
					>
					<el-button style="color: #207bba" link size="small" @click="gotoInfo(scope.row)">详情</el-button>
					<el-button style="color: #207bba" link size="small" @click="showDetail(scope.row)">诊断记录</el-button>
					<el-button
						style="color: #207bba"
						link
						size="small"
						@click="
							handleEditTimeline(scope.$index, scope.row);
							dialogFormVisible1 = true;
						"
						>审核记录</el-button
					>
					<el-button style="color: #0081ff" link size="small" v-if="scope.row.checkStatus == '待审核'">审核</el-button>
					<!-- <el-button style="color: #22cce2" link size="small" v-if="scope.row.checkStatus == '冻结'">解冻</el-button> -->
				</template>
			</el-table-column>
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
	<!-- 审核记录dialog -->
	<div class="dialog">
		<el-dialog v-model="dialogFormVisible1" title="审核记录" width="30%" custom-class="pub_dialog">
			<!-- v-for的每一个小卡片加在这里 -->
			<el-timeline>
				<el-timeline-item v-for="item in timeLine" :key="item" :timestamp="item.historyTime" placement="top">
					<div class="desc">
						<div class="top">
							<el-tag
								:type="
									item.historyStatus == '待审核'
										? 'warning'
										: item.historyStatus == '已通过'
										? ''
										: item.historyStatus == '未通过'
										? 'danger'
										: item.historyStatus == '冻结'
										? 'info'
										: ''
								"
								class="tag"
								>{{ item.historyStatus }}</el-tag
							>
							<span class="title">审核人:</span>
							<span class="name">{{ item.historyPerson }}</span>
						</div>

						<div class="bot">
							<span v-if="item.historyDesc !== undefined">备注:{{ item.historyDesc }}</span>
						</div>
					</div>
				</el-timeline-item>
			</el-timeline>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useHandleData } from "@/hooks/useHandleData";
import // getUserList,
// addUser,
// BatchAddUser,
// editUser,
// deleteUser
// changeUserStatus,
// resetUserPassWord,
// exportUserInfo
"@/api/modules/user";
import { onMounted, reactive, ref, watch } from "vue";
import { getdoctorTableTol, deleteUser } from "@/api/modules/doctor";
const router = useRouter();
// const initParam = reactive({
// 	type: 1
// });
const dialogFormVisible1 = ref(false);
const props: any = defineProps<{
	data: any;
	index: number;
}>();
let state = reactive<any>({
	tableKey: 1,
	tab: "冻结中",
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
		status: 4
	},
	// 查询参数(只包括查询)
	searchParam: {},
	// 初始化默认的查询参数
	searchInitParam: {},
	// 总参数(包含分页和查询参数)
	totalParam: {},
	historyData: [] //回显到表格的数据
});
const cellStyle = ({ columnIndex }: any) => {
	if (columnIndex === 0) {
		return {
			color: " #999999",
			fontSize: "0.225rem"
		};
	} else
		return {
			color: "#333333",
			fontSize: "0.225rem",
			height: "0.825rem"
		};
};
// 流程图的数据
const timeLine = [
	{
		historyStatus: "未通过",
		historyTime: "1996-06-30 19:53:47",
		historyPerson: "崔军",
		historyDesc: "医师执业证书照片与身份证证件照片不一致"
	},
	{
		historyStatus: "冻结",
		historyTime: "1984-07-15 10:33:23",
		historyPerson: "魏秀英",
		historyDesc: "您因长期进行违规操作"
	},
	{
		historyStatus: "未通过",
		historyTime: "2002-06-30 19:53:47",
		historyPerson: "崔军",
		historyDesc: "医师执业证书照片与身份证证件照片不一致"
	},
	{
		historyStatus: "已通过",
		historyTime: "2021-10-30 19:53:47",
		historyPerson: "崔军"
		// historyDesc: "医师执业证书照片与身份证证件照片不一致"
	}
];
const handleSizeChange = (val: any) => {
	console.log("每页的条数", val);
};
const handleCurrentChange = (val: number) => {
	state.pageable.pageNum = val;
	getTableList();
};
const handleEditTimeline: any = (index: any, row: any) => {
	console.log(index, row);
	const history = row.checkHistory;

	// const items = history.map(item => {
	// 	const { historyStatus, historyPerson } = item;
	// 	return { historyStatus, historyPerson };
	// });
	console.log("能否读取", history);
	// timeLine.checkPerson = items.historyPerson;
	// imeLine.status = row.checkHistory;
	// timeLine.checkTime = row.checkHistory.historyTime;
};
const showDetail = (e: any) => {
	console.log("e", e);
	router.push({
		name: "doctorHistory",
		query: {
			id: e.id,

			name: e.username
			// age: e.age
		}
	});
};
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

// 解冻用户信息
const deleteAccount = async (params: any) => {
	await useHandleData(deleteUser, params.id, ` ${params.docName} `);
	getTableList();
};
const getTableList = async () => {
	let res: any = await getdoctorTableTol(state.pageable);

	// state.value.tableData = res;
	state.tableData = res.data.arr1;
	console.log("result", res);

	state.pageable.total = res.data.arr2[0].total;
	// console.log("restable", state.tableKey);
	state.tableKey = Math.random();
};
const reset = () => {
	(props.data.names = ""), (props.data.phone = "");
	console.log("重置列表", props.index, state.pageable);
};
onMounted(() => {
	reset();
	getTableList();
	// let res: any = await getdoctorTableTol(state.pageable);

	// // state.value.tableData = res;
	// state.tableData = res.data.arr1;
	// state.pageable.total = res.data.arr2[0].total;
	// console.log("restable", res.data.arr2[0].total);
});
watch(
	[() => props.data.names, () => props.data.phone],
	() => {
		if (props.data.names == "" && props.data.phone == "") {
			state.pageable.name = "";
			state.pageable.phone = "";
			// state.pageable.status = props.index;
			getTableList();

			console.log("刷新列表", props.index, state.pageable);

			// 没有查询参数的情况下
		} else if (props.data.names || props.data.phone) {
			// 有一个或两个参数的情况下
			state.pageable.name = props.data.names;
			state.pageable.phone = props.data.phone;
			// state.pageable.status = props.index;
			console.log("查询", state.pageable);
			getTableList();
			// if (props.data.names || props.data.phone) {
			// 	searchDatas(props.data);
			// }
		}
	},
	{ deep: true }
);
</script>
<style lang="scss" scoped>
@import "../doctorHandle/index.scss";
</style>
