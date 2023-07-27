<!-- 权益码记录详情 -->
<template>
	<div class="backBtn">
		<span @click="backLast">←</span>
		<span @click="backLast" class="back">返回</span>
	</div>
	<div class="grid-content">
		<div class="top-title">
			<div class="lft">
				<div class="icon"></div>
				<span>详情</span>
			</div>
		</div>
		<el-divider></el-divider>
		<div class="table-content">
			<el-table
				ref="table"
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
				<el-table-column prop="list_no" width="60" label="序号" />
				<el-table-column prop="code" show-overflow-tooltip label="权益码" width="300" />
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
				<el-table-column prop="export_user" label="领用人" width="110" sortable show-overflow-tooltip>
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
		<!-- 插入分页组件 -->
		<div class="bot-part">
			<!-- <el-button class="btn" type="goon" style="width: 70px" @click="downloads">导出</el-button> -->
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
import { getExactInfo, changeRedeem } from "@/api/modules/code";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref, watch } from "vue";
import { dataExcSin, dataExc } from "@/api/modules/users";
import { ElMessage } from "element-plus";
// import { ElMessage } from "element-plus";
const route = useRoute();
const router = useRouter();
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
		export_id: ""
	},
	// 查询参数(只包括查询)
	searchParam: {},
	// 初始化默认的查询参数
	searchInitParam: {},
	// 总参数(包含分页和查询参数)
	totalParam: {},
	historyData: [] //回显到表格的数据
});
state.pageable.export_id = route.query.uuid;
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
const getTableList = async () => {
	const res: any = await getExactInfo(state.pageable);
	console.log("列表总数据", res);
	// 更新兑换状态
	const ret: any = await changeRedeem(res.arr1);
	console.log("更新兑换状态后的数据", ret);
	state.tableData = ret;
	state.pageable.total = res.arr2[0].total;
	state.tableKey = Math.random();
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
</script>
<style lang="scss" scoped>
@import "./codeInfo.scss";
</style>
