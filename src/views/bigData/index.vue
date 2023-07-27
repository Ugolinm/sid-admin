<!-- 大屏显示 -->
<template>
	<div class="dataScreen-container">
		<div class="dataScreen" ref="dataScreenRef">
			<div class="dataScreen-header">
				<div class="header-title">数创医疗管理平台</div>
				<div class="showtime">{{ time }}</div>
				<div class="backHome" @click="handleTo">返回平台</div>
			</div>
			<div class="dataScreen-main">
				<div class="dataScreen-lf">
					<div class="dataScreen-top">
						<div class="dataScreen-main-title">使用者概况</div>
						<!-- chart区域 -->
						<div class="dataScreen-main-chart">
							<RealTimeAccessChart ref="RealTimeAccessRef" />
						</div>
						<div class="panel-footer"></div>
					</div>
					<div class="dataScreen-center">
						<div class="dataScreen-main-title">用户分析</div>
						<!-- chart区域 -->
						<div class="dataScreen-main-chart">
							<MaleFemaleRatioChart ref="MaleFemaleRatioRef" />
						</div>
						<div class="panel-footer"></div>
					</div>
					<div class="dataScreen-bottom">
						<div class="dataScreen-main-title">数据分析</div>
						<!-- chart区域 -->
						<div class="dataScreen-main-chart">
							<AgeRatioChart ref="AgeRatioRef" />
						</div>
						<div class="panel-footer"></div>
					</div>
				</div>
				<div class="dataScreen-ct">
					<div class="dataScreen-top">
						<div class="top-left">
							<img class="icon" src="@/assets/images/bigscreen-center1.png" />
							<div class="content">
								<div class="name1"><i class="number">42345</i> <span class="unit">条</span></div>

								<div class="name2">昨日心电总数据</div>
							</div>
						</div>
						<div class="top-center">
							<img class="icon" src="@/assets/images/bigscreen-center2.png" />
							<div class="content">
								<div class="name1"><i class="number">42345</i> <span class="unit">条</span></div>

								<div class="name2">昨日报告总数据</div>
							</div>
						</div>
						<div class="top-right">
							<img class="icon" src="@/assets/images/bigscreen-center3.png" />
							<div class="content">
								<div class="name1"><i class="number">42345</i> <span class="unit">条</span></div>

								<div class="name2">进行中总数据</div>
							</div>
						</div>
					</div>
					<div class="dataScreen-center">
						<div class="dataScreen-main-title">地图分布</div>
						<div class="title-bar"></div>
						<div class="dataScreen-main-chart">
							<mapChart ref="MapchartRef" />
						</div>
						<div class="panel-footer"></div>
					</div>
					<div class="dataScreen-bottom">
						<div class="paihang1">
							<div class="dataScreen-main-title">医师区域排名TOP10</div>
							<!-- chart区域 -->
							<div class="dataScreen-main-chart">
								<DoctorList></DoctorList>
								<!-- <HotPlateChart ref="HotPlateRef" /> -->
							</div>
							<div class="panel-footer"></div>
						</div>
						<div class="paihang2">
							<div class="dataScreen-main-title">使用者区域排名TOP10</div>
							<!-- chart区域 -->
							<div class="dataScreen-main-chart">
								<UserList></UserList>
								<!-- <HotPlateChart ref="HotPlateRef" /> -->
							</div>
							<div class="panel-footer"></div>
						</div>
					</div>
				</div>
				<div class="dataScreen-rg">
					<div class="dataScreen-top">
						<div class="dataScreen-main-title">医生概况</div>
						<!-- chart区域 -->
						<div class="dataScreen-main-chart">
							<HotPlateChart ref="HotPlateRef" />
						</div>
						<div class="panel-footer"></div>
					</div>
					<div class="dataScreen-bottom">
						<div class="dataScreen-main-title">心电设备概况分析</div>
						<!-- chart区域 -->
						<div class="dataScreen-main-chart">
							<AnnualUseChart ref="AnnualUseRef" />
							<!-- <MaleFemaleRatioChart ref="MaleFemaleRatioRef" /> -->
						</div>
						<div class="panel-footer"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTime } from "@/hooks/useTime";
import { onBeforeUnmount, onMounted, reactive, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { ECharts } from "echarts";
import RealTimeAccessChart from "./components/RealTimeAccessChart.vue";
import MaleFemaleRatioChart from "./components/MaleFemaleRatioChart.vue";
import AgeRatioChart from "./components/AgeRatioChart.vue";
import HotPlateChart from "./components/HotPlateChart.vue";
import AnnualUseChart from "./components/AnnualUseChart.vue";
import mapChart from "./components/chinaMapChart.vue";
import DoctorList from "./components/doctorList.vue";
import UserList from "./components/userList.vue";

// import UserList from "./components/UserList.vue";
/* 获取最外层盒子 */
const dataScreenRef = ref<HTMLElement | null>(null);

onMounted(() => {
	// 初始化时为外层盒子加上缩放属性，防止刷新界面时就已经缩放
	if (dataScreenRef.value) {
		dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
		dataScreenRef.value.style.width = `1920px`;
		dataScreenRef.value.style.height = `1080px`;
	}
	/* 初始化echarts */
	initCharts();
	// 为浏览器绑定事件
	window.addEventListener("resize", resize);
});

/* 获取当前时间 */
const { nowTime } = useTime();
let timer: any = null;
let time: Ref<string> = ref(nowTime.value);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
timer = setInterval(() => {
	time.value = useTime().nowTime.value;
}, 1000); /* 声明echarts实例 */
interface ChartProps {
	[key: string]: ECharts | null;
}
const dataScreen: ChartProps = reactive({
	chart1: null,
	chart2: null,
	chart3: null,
	chart4: null,
	chart5: null,
	chart6: null,
	chart7: null,
	mapChart: null
});
/* 获取子组件的ref */
interface ChartExpose {
	initChart: () => ECharts;
}
const RealTimeAccessRef = ref<ChartExpose>();
const MaleFemaleRatioRef = ref<ChartExpose>();
const AgeRatioRef = ref<ChartExpose>();
const HotPlateRef = ref<ChartExpose>();
const AnnualUseRef = ref<ChartExpose>();
const MapchartRef = ref<ChartExpose>();
/* 跳转home */
const router = useRouter();
const handleTo = (): void => {
	router.push("/home/index");
};

/* 初始化 echarts */
const initCharts = (): void => {
	dataScreen.chart1 = RealTimeAccessRef.value?.initChart() as ECharts;
	dataScreen.chart2 = AgeRatioRef.value?.initChart() as ECharts;
	dataScreen.chart3 = AnnualUseRef.value?.initChart() as ECharts;
	dataScreen.chart4 = HotPlateRef.value?.initChart() as ECharts;
	dataScreen.chart5 = MaleFemaleRatioRef.value?.initChart() as ECharts;
	dataScreen.mapChart = MapchartRef.value?.initChart() as ECharts;
};

/* 根据浏览器大小推断缩放比例 */
const getScale = (width = 1920, height = 1080) => {
	let ww = window.innerWidth / width;
	let wh = window.innerHeight / height;
	return ww < wh ? ww : wh;
};

/* 浏览器监听 resize 事件 */
const resize = () => {
	if (dataScreenRef.value) {
		dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
	}
	// 使用了 scale 的echarts其实不需要需要重新计算缩放比例
	Object.values(dataScreen).forEach(chart => {
		chart && chart.resize();
	});
};

/* 销毁时触发 */
onBeforeUnmount(() => {
	window.removeEventListener("resize", resize);
	clearInterval(timer);
	// 每次离开页面时，清空echarts实例，不然会出现无法显示的问题
	Object.values(dataScreen).forEach(val => {
		val?.dispose();
	});
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
