<!-- 心电概况 -->
<template>
	<el-row :gutter="20">
		<el-col :span="12"
			><div class="grid-content1">
				<div class="lft">
					<span>心电数据总量</span>
					<div class="info">
						<span class="num">{{ top?.total_num }}</span>
						<span class="unit">条</span>
					</div>
				</div>
				<div class="cent">
					<span>待处理数据</span>
					<div class="info">
						<span class="num">{{ top?.daichuli_num }}</span>
						<span class="unit">条</span>
					</div>
				</div>
				<div class="rgt">
					<el-progress
						color="#579AFF"
						type="circle"
						:stroke-width="15"
						:percentage="
							isNaN((top?.wanchen_num / top?.total_num) * 100) == true
								? '0'
								: ((top?.wanchen_num / top?.total_num) * 100).toFixed(2)
						"
					>
						<template #default="{ percentage }">
							<span class="percentage-label">完成率</span>
							<span class="percentage-value">{{ percentage }}%</span>
							<!-- <span class="percentage-label">Progressing</span> -->
						</template>
					</el-progress>
				</div>
			</div></el-col
		>
		<el-col :span="12"
			><div class="grid-content1">
				<div class="lft1">
					<div class="lft">
						<span>今日新增心电数据</span>
						<div class="info">
							<span class="num">{{ top?.xinzeng_num }}</span>
							<span class="unit">条</span>
						</div>
					</div>
					<div class="rgts">
						<Minichart ref="minichartRef"></Minichart>
					</div>
				</div>
				<div class="cent1"></div>
				<div class="rgt1">
					<div class="lft">
						<span>已处理</span>
						<div class="info">
							<span class="num">{{ top?.j_yichuli_num }}</span>
							<span class="unit">条</span>
						</div>
					</div>
					<div class="rgtss">
						<span>待处理</span>
						<div class="info">
							<span class="num">{{ top?.j_daichuli_num }}</span>
							<span class="unit">条</span>
						</div>
					</div>
				</div>
			</div></el-col
		>
	</el-row>

	<!-- 第二行 -->
	<el-row :gutter="20">
		<el-col :span="14"
			><div class="grid-content2">
				<div class="bot-content">
					<div class="top-title">
						<div class="lft">
							<div class="icon"></div>
							<span>心电数据趋势图</span>
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
						<XindianTrend ref="xindianRef"></XindianTrend>
						<!-- <UserTrend ref="usertrendRef"></UserTrend> -->
						<!-- <ZChart3 ref="zchart3Ref"></ZChart3> -->
					</div>
				</div>
			</div></el-col
		>
		<el-col :span="10"
			><div class="grid-content2">
				<div class="bot-content">
					<div class="top-title">
						<div class="lft">
							<div class="icon"></div>
							<span>心电数据采集时长统计</span>
							<span class="time">({{ time_range }}年)</span>
						</div>
					</div>
					<el-divider></el-divider>

					<div class="echart">
						<!-- 饼状图位置 -->
						<!-- <XindianTrend ref="xindianRef"></XindianTrend> -->
						<XindianData ref="xindianDataRef"></XindianData>
					</div>
				</div></div
		></el-col>
	</el-row>
</template>

<script setup lang="ts">
import { ECharts } from "echarts";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import Minichart from "../components/minichart.vue";
import XindianTrend from "../components/xindianTrend.vue";
import XindianData from "../components/xindianData.vue";
import { getXindianData, getXindianNewData } from "@/api/modules/xindian";

const top = ref();
const center = ref();
const bottom1 = ref();
const bottom2 = ref();
const changeDate = async (val: any) => {
	console.log("时间", val);
	if (val < new Date().getFullYear() - 10) value3.value = new Date().getFullYear() - 10;
	if (val > new Date().getFullYear()) value3.value = new Date().getFullYear();
	const data_new: any = await getXindianNewData(value3.value);
	console.log("时间", value3.value);
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
/* 声明echarts实例 */
let time = new Date();
let time_range = time.getFullYear();
const value3: any = ref(time_range);
interface ChartProps {
	[key: string]: ECharts | null;
}
/* 获取子组件的ref */
interface ChartExpose {
	initChart: (params?: any, params1?: any) => ECharts;
}

const minichartRef = ref<ChartExpose>();
const xindianRef = ref<ChartExpose>();
const xindianDataRef = ref<ChartExpose>();
const dataScreen: ChartProps = reactive({
	chart1: null,
	chart2: null,
	chart3: null,
	chart4: null,
	chart5: null,
	chart6: null,
	chart7: null,
	chart8: null
});
/* 初始化 echarts */
const initCharts = (): void => {
	dataScreen.chart1 = minichartRef.value?.initChart() as ECharts;
	dataScreen.chart2 = xindianRef.value?.initChart(center.value) as ECharts;
	dataScreen.chart3 = xindianDataRef.value?.initChart(bottom1.value, bottom2.value) as ECharts;
};

onMounted(async () => {
	const res: any = await getXindianData(); /* 初始化echarts */
	top.value = res?.top[0];
	console.log("top.value", top.value);
	center.value = res?.center;
	bottom1.value = res?.bottom1_1;
	bottom2.value = res?.bottom1_2;
	console.log("测试", top.value);
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

/* 销毁时触发 */
onBeforeUnmount(() => {
	window.removeEventListener("resize", resize);
	Object.values(dataScreen).forEach(val => val?.dispose());
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
