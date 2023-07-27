<!-- 医生概况 -->

<template>
	<el-row class="row-bg" justify="space-between">
		<el-col :span="25">
			<div class="grid-content">
				<img src="@/assets/images/doctor-1.png" />
				<div class="content">
					<span class="content-top">今日新增医生</span>
					<div class="content-bot">
						<span class="btr">{{ top_data?.total_num }}</span>
						<span class="btl">人</span>
					</div>
				</div>
			</div></el-col
		>
		<el-col :span="25">
			<div class="grid-content">
				<img src="@/assets/images/doctor-2.png" />
				<div class="content">
					<span class="content-top">今日待审核医生</span>
					<div class="content-bot">
						<span class="btr">{{ top_data?.sh_num }}</span>
						<span class="btl">人</span>
					</div>
				</div>
			</div></el-col
		>
		<el-col :span="25">
			<div class="grid-content">
				<img src="@/assets/images/doctor-3.png" />
				<div class="content">
					<span class="content-top">今日已通过医生</span>
					<div class="content-bot">
						<span class="btr">{{ top_data?.yt_num }}</span>
						<span class="btl">人</span>
					</div>
				</div>
			</div></el-col
		>
		<el-col :span="25">
			<div class="grid-content">
				<img src="@/assets/images/doctor-4.png" />
				<div class="content">
					<span class="content-top">今日未通过医生</span>
					<div class="content-bot">
						<span class="btr">{{ top_data?.wt_num }}</span>
						<span class="btl">人</span>
					</div>
				</div>
			</div></el-col
		>
		<el-col :span="25">
			<div class="grid-content">
				<img src="@/assets/images/doctor-5.png" />
				<div class="content">
					<span class="content-top">今日冻结</span>
					<div class="content-bot">
						<span class="btr">{{ top_data?.dj_num }}</span>
						<span class="btl">人</span>
					</div>
				</div>
			</div></el-col
		>
	</el-row>
	<!-- 顶部完结 -->

	<!-- 中间部分 -->
	<el-row>
		<el-col :span="24"
			><div class="grid-content-1 ep-bg-purple-dark">
				<div class="top-title">
					<div class="title">
						<div class="l-icon"></div>
						<span class="name">数据分析图</span>
					</div>

					<div class="select">
						<el-date-picker
							size="small"
							v-model="value3"
							type="year"
							:placeholder="value3"
							@change="changeDate"
							:disabled-date="disabledDateFun"
							value-format="YYYY"
						/>
					</div>
				</div>
				<el-divider></el-divider>
				<div class="top-content">
					<LineChart ref="linechartRef"></LineChart>
				</div></div
		></el-col>
	</el-row>

	<!-- 底部三块 -->
	<el-row class="row-bg" :gutter="20">
		<el-col :span="8"
			><div class="grid-content-2 ep-bg-purple-dark">
				<div class="top-title">
					<div class="title">
						<div class="l-icon"></div>
						<span class="name">医生区域数量排名Top10</span>
						<span class="time-line">({{ time_range }}年)</span>
					</div>
				</div>
				<el-divider></el-divider>
				<div class="top-content">
					<!-- <LineChart ref="linechartRef"></LineChart> -->
					<BtChart1 ref="btchart1Ref"></BtChart1>
				</div></div
		></el-col>
		<el-col :span="8"
			><div class="grid-content-2 ep-bg-purple-dark">
				<div class="top-title">
					<div class="title">
						<div class="l-icon"></div>
						<span class="name">医生诊断完成量排名Top10</span>
						<span class="time-line">({{ time_range }}年)</span>
					</div>
				</div>
				<el-divider></el-divider>
				<div class="top-content">
					<!-- <LineChart ref="linechartRef"></LineChart> -->
					<BtChart2 ref="btchart2Ref"></BtChart2>
				</div></div
		></el-col>
		<el-col :span="8"
			><div class="grid-content-2 ep-bg-purple-dark">
				<div class="top-title">
					<div class="title">
						<div class="l-icon"></div>
						<span class="name">接诊医生好评排名Top10</span>
						<span class="time-line">({{ time_range }}年)</span>
					</div>
				</div>
				<el-divider></el-divider>
				<div class="top-content1">
					<div class="displaylist">
						<el-table
							height="100%"
							:data="doctor"
							:cell-style="cellStyle"
							:header-cell-style="{
								background: '#f2f3f8',

								height: '10px'
							}"
						>
							<el-table-column type="index" prop="sort" label="排名" width="100" />
							<el-table-column prop="doctorName" label="医师姓名" />
							<!-- <el-table-column prop="name" label="地区" /> -->
							<el-table-column prop="value" label="得分" width="200">
								<template #default="scope">
									<el-progress
										:format="format(scope.row, scope.column)"
										type="line"
										:text-inside="false"
										:percentage="(scope.row.value / 5) * 100"
										color="#FFBF29"
									></el-progress>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<!-- <LineChart ref="linechartRef"></LineChart> -->
					<!-- <BtChart1 ref="btchart1Ref"></BtChart1> -->
				</div>
			</div></el-col
		>
	</el-row>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import LineChart from "../components/lineChart.vue";
import { ECharts } from "echarts";
import BtChart1 from "../components/btChart1.vue";
import BtChart2 from "../components/btChart2.vue";
import { getdoctorList1, getdoctorList2, getdoctorListTop } from "@/api/modules/doctor";

let time = new Date();
let time_range = time.getFullYear();
const value3: any = ref(time_range);
const top_data = ref();
let center_data = ref();
let data_new = ref();
let bottom_data2 = ref();
let bottom_data1 = ref();
/* 声明echarts实例 */
interface ChartProps {
	[key: string]: ECharts | null;
}
/* 获取子组件的ref */
interface ChartExpose {
	initChart: (params?: any) => ECharts;
}
const linechartRef = ref<ChartExpose>();
const btchart1Ref = ref<ChartExpose>();
const btchart2Ref = ref<ChartExpose>();
const disabledDateFun = (time: Record<string, any>): boolean => {
	if (time.getFullYear() < new Date().getFullYear() - 10) {
		return true;
	} else if (time.getFullYear() > new Date().getFullYear()) {
		return true;
	} else {
		return false;
	}
};
const changeDate = async (val: any) => {
	if (val < new Date().getFullYear() - 10) value3.value = new Date().getFullYear() - 10;
	if (val > new Date().getFullYear()) value3.value = new Date().getFullYear();
	console.log("时间", value3.value);
	data_new.value = await getdoctorList2(value3.value);
	console.log("new", data_new.value);
	center_data.value = data_new.value;
	initCharts();
};

const format = (
	row: {
		[x: string]: any;
		num: string;
	},
	column: { label: string }
) => {
	return () => {
		if (column.label === "得分") {
			//这里加上单位
			return row.value + "";
		}
	};
};

const dataScreen: ChartProps = reactive({
	chart1: null,
	chart2: null,
	chart3: null,
	chart4: null
});
const doctor = [
	{
		sort: 1,
		doctorName: "xxx",
		value: "",
		progress: 50
	},
	{
		sort: 2,
		doctorName: "xxx",
		value: "",
		progress: 50
	},
	{
		sort: 3,
		doctorName: "xxx",
		value: ""
	},
	{
		sort: 4,
		doctorName: "xxx",
		value: ""
	},
	{
		sort: 5,
		doctorName: "xxx",
		value: ""
	},
	{
		sort: 6,
		doctorName: "xxx",
		value: ""
	},
	{
		sort: 7,
		doctorName: "xxx",
		value: ""
	},
	{
		sort: 8,
		doctorName: "xxx",
		value: ""
	},
	{
		sort: 9,
		doctorName: "xxx",
		value: ""
	},
	{
		sort: 10,
		doctorName: "xxx",
		value: ""
	}
];
const cellStyle = ({ columnIndex, rowIndex }: any) => {
	if (columnIndex === 0 && rowIndex === 0) {
		return {
			color: "#fe5252"
		};
	} else if (columnIndex === 0 && rowIndex === 1) {
		return { color: "#579aff" };
	} else if (columnIndex === 0 && rowIndex === 2) {
		return { color: "#ebbb49" };
	} else if (columnIndex === 0) {
		return {
			color: "#666666"
		};
	}
	return {
		color: "#333333",
		height: "auto"
	};
};
/* 初始化 echarts */
const initCharts = (): void => {
	dataScreen.chart1 = linechartRef.value?.initChart(center_data.value) as ECharts;
	dataScreen.chart2 = btchart1Ref.value?.initChart(bottom_data1.value) as ECharts;
	dataScreen.chart3 = btchart2Ref.value?.initChart(bottom_data2.value) as ECharts;
};

onMounted(async () => {
	/* 初始化echarts */
	const res: any = await getdoctorList1();
	const res1: any = await getdoctorListTop();
	console.log("表格数据获取1", res);
	console.log("表格数据获取2", res1);
	//  = ;
	// const arr = [];
	top_data.value = res1[0];
	// top_data.value = arr;
	console.log("data", top_data.value);

	center_data.value = res?.center;
	bottom_data2.value = res?.task;
	bottom_data1.value = res?.area;
	initCharts();
	// 为浏览器绑定事件
	window.addEventListener("resize", resize, false);
});

/* 浏览器监听 resize 事件 */
const resize = () => {
	Object.values(dataScreen).forEach(chart => {
		chart && chart.resize();
	});
};

/* 销毁时触发 */
onBeforeUnmount(() => {
	window.removeEventListener("resize", resize);
	Object.values(dataScreen).forEach(val => val?.dispose());
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
