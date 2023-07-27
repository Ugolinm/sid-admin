<!-- 使用者概况 -->
<template>
	<el-row :gutter="20">
		<el-col :span="16"
			><div class="grid-content">
				<div class="one-left">
					<div class="top-content">
						<div class="one-box">
							<div class="info">
								<span class="top-info">总人数</span>
								<div class="bot-info">
									<span class="num">{{ top?.total_num }}</span>
									<span class="unit">人</span>
								</div>
							</div>
							<div class="echart">
								<Minichart1 ref="minichart1Ref"></Minichart1>
							</div>
						</div>
						<div class="two-box">
							<div class="info">
								<span class="top-info">今日新增使用者人数</span>
								<div class="bot-info">
									<span class="num">{{ top?.today_num }}</span>
									<span class="unit">人</span>
								</div>
							</div>
							<div class="echart">
								<Minichart2 ref="minichart2Ref"></Minichart2>
							</div>
						</div>
					</div>
					<div class="bot-content">
						<div class="top-title">
							<div class="lft">
								<div class="icon"></div>
								<span>使用者增长趋势</span>
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
							<UserTrend ref="usertrendRef"></UserTrend>
							<!-- <ZChart3 ref="zchart3Ref"></ZChart3> -->
						</div>
					</div>
				</div>
			</div>
		</el-col>
		<el-col :span="8"
			><div class="grid-content">
				<div class="one-right">
					<div class="top-title">
						<div class="lft">
							<div class="icon"></div>
							<span>使用者区域数量排名Top10</span>
							<span class="time">({{ time_range }}年)</span>
						</div>
					</div>
					<el-divider></el-divider>

					<div class="echart">
						<Usertop10 ref="usertop10Ref"></Usertop10>
					</div>
				</div></div
		></el-col>
	</el-row>

	<!-- 最后一行 -->
	<el-row :gutter="20" style="margin-bottom: 0.475rem">
		<el-col :span="12"
			><div class="grid-content1">
				<div class="lft-part">
					<div class="top-title">
						<div class="lft">
							<div class="icon"></div>
							<span>使用者复诊率</span>
							<span class="time">({{ time_range }}年)</span>
						</div>
					</div>
					<el-divider></el-divider>

					<div class="echart">
						<div class="top">
							<div class="lft">
								<div class="title">
									<img src="@/assets/images/user-1.png" />
									<span>初诊总人数</span>
								</div>
								<span class="num">{{ bottom1?.chuzhen_num }}</span>
								<div class="progress">
									<el-progress
										color="#579AFF"
										type="circle"
										:stroke-width="15"
										:percentage="bottom1 == 0 ? '0' : ((bottom1?.chuzhen_num / bottom1?.total_num) * 100).toFixed(2)"
									>
										<template #default="{ percentage }">
											<span class="percentage-label">占比</span>
											<span class="percentage-value">{{ percentage }}%</span>
											<!-- <span class="percentage-label">Progressing</span> -->
										</template>
									</el-progress>
								</div>
							</div>
							<div class="rgt">
								<div class="title">
									<img src="@/assets/images/user-2.png" />
									<span>复诊总人数</span>
								</div>
								<span class="num">{{ bottom1?.fuzhen_num }}</span>
								<div class="progress">
									<el-progress
										color="#3ACBE9"
										type="circle"
										:stroke-width="15"
										:percentage="bottom1 == 0 ? '0' : ((bottom1?.fuzhen_num / bottom1?.total_num) * 100).toFixed(2)"
									>
										<template #default="{ percentage }">
											<span class="percentage-label">占比</span>
											<span class="percentage-value">{{ percentage }}%</span>
											<!-- <span class="percentage-label">Progressing</span> -->
										</template>
									</el-progress>
								</div>
							</div>
						</div>
						<div class="bottom">
							<div class="bar">
								<div class="bar-lft">
									<span class="user">用户{{ bottom1 == 0 ? "暂无" : bottom1?.userName }}</span>
									<span class="times">复诊次数最高{{ bottom1 == 0 ? "x" : bottom1?.num }}次</span>
								</div>
								<!-- <div class="bar-rgt">查看详情 ></div> -->
							</div>
						</div>

						<!-- <UserTrend ref="usertrendRef"></UserTrend> -->
						<!-- <ZChart3 ref="zchart3Ref"></ZChart3> -->
					</div>
				</div>
			</div></el-col
		>
		<el-col :span="12"
			><div class="grid-content1">
				<div class="rgt-part">
					<div class="lft-part">
						<div class="top-title">
							<div class="lft">
								<div class="icon"></div>
								<span>用户画像</span>
								<span class="time">({{ time_range }}年)</span>
							</div>
						</div>
						<el-divider></el-divider>

						<div class="echart1">
							<UserPie ref="userPieRef"></UserPie>
						</div>
						<!-- 男女比例 -->
						<div class="echart2">
							<RatioBar ref="ratioRef"></RatioBar>
						</div>
					</div>
				</div></div
		></el-col>
	</el-row>
</template>

<script setup lang="ts">
import { ECharts } from "echarts";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import Minichart1 from "../components/minichart1.vue";
import Minichart2 from "../components/minichart2.vue";
import UserTrend from "../components/userTrend.vue";
import Usertop10 from "../components/usertop10.vue";
import UserPie from "../components/userPie.vue";
import RatioBar from "../components/ratioBar.vue";
import { getUserData, getUserNewData } from "@/api/modules/users";
let time = new Date();
let time_range = time.getFullYear();
const value3: any = ref(time_range);
// const value3 = ref("2022");

const top = ref();
const center = ref();
const bottom1 = ref();
const bottom2_1 = ref();
const bottom2_2 = ref();

const changeDate = async (val: any) => {
	console.log("时间", val);
	if (val < new Date().getFullYear() - 10) value3.value = new Date().getFullYear() - 10;
	if (val > new Date().getFullYear()) value3.value = new Date().getFullYear();
	console.log("时间", value3.value);
	const data_new: any = await getUserNewData(value3.value);
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
interface ChartProps {
	[key: string]: ECharts | null;
}
/* 获取子组件的ref */
interface ChartExpose {
	initChart: (params?: any, params1?: any) => ECharts;
}

const minichart1Ref = ref<ChartExpose>();
const minichart2Ref = ref<ChartExpose>();
const usertrendRef = ref<ChartExpose>();
const usertop10Ref = ref<ChartExpose>();
const userPieRef = ref<ChartExpose>();
const ratioRef = ref<ChartExpose>();

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
	dataScreen.chart1 = minichart1Ref.value?.initChart() as ECharts;
	dataScreen.chart2 = minichart2Ref.value?.initChart() as ECharts;
	dataScreen.chart3 = usertrendRef.value?.initChart(center.value) as ECharts;
	dataScreen.chart4 = usertop10Ref.value?.initChart() as ECharts;
	dataScreen.chart5 = userPieRef.value?.initChart(bottom2_1.value) as ECharts;
	dataScreen.chart6 = ratioRef.value?.initChart(bottom2_2.value) as ECharts;
};

onMounted(async () => {
	const res: any = await getUserData(); /* 初始化echarts */
	top.value = res?.top[0];
	console.log("top.value", top.value);
	center.value = res?.center;
	if (res?.bottom1.length > 0) {
		bottom1.value = res?.bottom1[0];
	} else {
		bottom1.value = 0;
	}

	console.log("bottom1", res);

	bottom2_1.value = res?.bottom2_2;
	bottom2_2.value = res?.bottom2_1;
	// bottom2_2.value = res?.bottom2_1.length > 0 ? res?.bottom2_1 : 0;

	// console.log("me", initNum.value);

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
