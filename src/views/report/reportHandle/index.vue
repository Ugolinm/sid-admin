<!-- 医生管理 -->
<template>
	<el-row :gutter="20">
		<el-col :span="16"
			><div class="grid-content">
				<!-- left-part部分 -->
				<div class="top">
					<div class="lft">
						<div class="lft-1">
							<span class="title">报告总量</span>
							<div class="info">
								<span class="num">{{ top?.total }}</span>
								<span class="unit">份</span>
							</div>
						</div>
						<div class="lft-2">
							<!-- <span class="title">异常报告</span> -->
							<div class="info">
								<!-- <span class="num">516</span> -->
								<!-- <span class="unit">条</span> -->
							</div>
						</div>
						<div class="lft-3">
							<!-- <el-progress color="#FF7272" type="circle" :width="100" :stroke-width="15" :percentage="80"> -->
							<!-- <template #default="{ percentage }"> -->
							<!-- <span class="percentage-label">异常率</span> -->
							<!-- <span class="percentage-value">{{ percentage }}%</span> -->
							<!-- <span class="percentage-label">Progressing</span> -->
							<!-- </template> -->
							<!-- </el-progress> -->
						</div>
					</div>
					<div class="rgt">
						<div class="rgt-1">
							<span class="title">今日新增报告</span>
							<div class="info">
								<span class="num">{{ top?.j_num }}</span>
								<span class="unit">条</span>
							</div>
						</div>
						<div class="rgt-2">
							<Minichart ref="minichartRef"></Minichart>
						</div>
					</div>
				</div>
				<div class="bot">
					<div class="top-title">
						<div class="lft">
							<div class="icon"></div>
							<span>报告增长趋势</span>
						</div>
						<div class="rgt">
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

					<div class="echart">
						<Reportrend ref="reportRef"></Reportrend>
					</div>
				</div></div
		></el-col>
		<el-col :span="8"
			><div class="grid-content">
				<div class="right-part">
					<div class="top-title">
						<div class="lft">
							<div class="icon"></div>
							<span>报告查看情况</span>
							<span class="time">({{ time_range }}年)</span>
						</div>
					</div>
					<el-divider></el-divider>

					<div class="echart">
						<ReportLook ref="reportLookRef"></ReportLook>
						<!-- <Reportrend ref="reportRef"></Reportrend> -->
					</div>
				</div>
			</div></el-col
		>
	</el-row>
	<!-- 第二排数 -->
	<el-row :gutter="20">
		<el-col :span="16"
			><div class="grid-content1">
				<div class="top-title">
					<div class="lft">
						<div class="icon"></div>
						<span>报告诊断耗时排名Top10</span>
						<span class="time">({{ time_range }}年)</span>
					</div>
				</div>
				<el-divider></el-divider>

				<div class="echart">
					<Averagelist ref="averageRef"></Averagelist>
					<!-- <Reportrend ref="reportRef"></Reportrend> -->
				</div>
			</div></el-col
		>
		<el-col :span="8"
			><div class="grid-content1">
				<div class="top-title">
					<div class="lft">
						<div class="icon"></div>
						<span>报告诊断平均耗时</span>
						<span class="time">({{ time_range }}年)</span>
					</div>
				</div>
				<el-divider></el-divider>

				<div class="echart">
					<div class="progress">
						<Dashboard ref="dashboardRef"></Dashboard>
						<!-- 仪表盘 -->
					</div>
					<div class="listbar">
						<div class="bar1">
							<img src="@/assets/images/report-fast.png" />
							<div class="lft-info">
								<span class="info-title">最快用时</span>
								<div class="infos">
									<span class="info-num">{{ bottom2_2 }}</span>
									<!-- <span class="info-unit">h</span> -->
								</div>
							</div>
						</div>
						<div class="bar2">
							<img src="@/assets/images/report-slow.png" />
							<div class="lft-info">
								<span class="info-title">最慢用时</span>
								<div class="infos">
									<span class="info-num">{{ bottom2_3 }}</span>
									<!-- <span class="info-unit">h</span> -->
								</div>
							</div>
						</div>
					</div>
					<!-- <Reportrend ref="reportRef"></Reportrend> -->
				</div>
			</div></el-col
		>
	</el-row>
</template>

<script setup lang="ts">
import { handleTime } from "@/utils/util/time";
import { ECharts } from "echarts";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import Minichart from "../components/minichart.vue";
import Reportrend from "../components/reportrend.vue";
import Averagelist from "../components/averagelist.vue";
import Dashboard from "../components/dashboard.vue";
import ReportLook from "../components/reportLook.vue";
import { getReportData, getReportNewData } from "@/api/modules/report";
let time = new Date();
let time_range = time.getFullYear();
const value3 = ref(time_range);
const top = ref();
const center = ref();
const bottom1 = ref();
const bottom2_1 = ref();
const bottom2_2 = ref();
const bottom2_3 = ref();
const right = ref();
const changeDate = async (val: any) => {
	console.log("时间", val);
	if (val < new Date().getFullYear() - 10) value3.value = new Date().getFullYear() - 10;
	if (val > new Date().getFullYear()) value3.value = new Date().getFullYear();
	const data_new: any = await getReportNewData(value3.value);
	console.log("new", data_new.trend);
	center.value = data_new.trend;
	initCharts();
};
const disabledDateFun = (time: Record<string, any>): boolean => {
	if (time.getFullYear() < new Date().getFullYear() - 10) {
		return true;
	} else if (time.getFullYear() > new Date().getFullYear()) {
		return true;
	} else {
		return false;
	}
};
interface ChartProps {
	[key: string]: ECharts | null;
}
/* 获取子组件的ref */
interface ChartExpose {
	initChart: (params?: any) => ECharts;
}

const minichartRef = ref<ChartExpose>();
const reportRef = ref<ChartExpose>();
const averageRef = ref<ChartExpose>();
const dashboardRef = ref<ChartExpose>();
const reportLookRef = ref<ChartExpose>();
// const xindianRef = ref<ChartExpose>();
const dataScreen: ChartProps = reactive({
	chart1: null,
	chart2: null,
	chart3: null,
	chart4: null,
	chart5: null
});

/* 初始化 echarts */
const initCharts = (): void => {
	dataScreen.chart1 = minichartRef.value?.initChart() as ECharts;
	dataScreen.chart2 = reportRef.value?.initChart(center.value) as ECharts;
	dataScreen.chart3 = averageRef.value?.initChart(bottom1.value) as ECharts;
	dataScreen.chart4 = dashboardRef.value?.initChart(bottom2_1.value) as ECharts;
	dataScreen.chart5 = reportLookRef.value?.initChart(right.value) as ECharts;
};

onMounted(() => {
	/* 初始化echarts */
	initCharts();
	// 为浏览器绑定事件
	window.addEventListener("resize", resize, false);
	// 设置表格初始高度为innerHeight-offsetTop-表格底部与浏览器底部距离85
});

/* 浏览器监听 resize 事件 */
const resize = () => {
	Object.values(dataScreen).forEach(chart => {
		chart && chart.resize();
	});
};

onMounted(async () => {
	const res: any = await getReportData(); /* 初始化echarts */
	top.value = res?.top[0];
	console.log("all", res);
	center.value = res?.center;
	bottom1.value = res?.bottom1_1;
	right.value = res?.right;
	if (res?.bottom2_1[0][0]?.total_duration == "0") {
		bottom2_1.value = 0;
		//暂无数据的意思
	} else {
		bottom2_1.value = res?.bottom2_1[0][0]?.total_duration;
	}
	bottom2_2.value = handleTime(res?.bottom2_1[1][0]?.duration);
	bottom2_3.value = handleTime(res?.bottom2_1[1][1]?.duration);
	console.log("测试", res?.bottom2_1[1][0]?.duration);
	/* 初始化echarts */
	initCharts();
	// 为浏览器绑定事件
	window.addEventListener("resize", resize, false);
	// 设置表格初始高度为innerHeight-offsetTop-表格底部与浏览器底部距离85
});
/* 销毁时触发 */
onBeforeUnmount(() => {
	window.removeEventListener("resize", resize);
	Object.values(dataScreen).forEach(val => val?.dispose());
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
