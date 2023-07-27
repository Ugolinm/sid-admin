<!--首页  -->
<template>
	<!-- 第一块第一行 -->
	<el-row :gutter="20" v-for="item in todayData" :key="item">
		<el-col :span="8"
			><div class="grid-content">
				<img src="../../assets/images/xindian.png" />
				<div class="bar-content">
					<span class="title">昨日总心电数据</span>
					<div class="num">
						<span class="number">{{ item.xinddian_ys }}</span>
						<span class="unit">条</span>
					</div>
				</div>
			</div></el-col
		>
		<el-col :span="8"
			><div class="grid-content">
				<img src="../../assets/images/report.png" />
				<div class="bar-content">
					<span class="title">昨日总报告数据</span>
					<div class="num">
						<span class="number">{{ item.report_ys }}</span>
						<span class="unit">条</span>
					</div>
				</div>
			</div></el-col
		>
		<el-col :span="8"
			><div class="grid-content">
				<img src="../../assets/images/jinxing.png" />
				<div class="bar-content">
					<span class="title">进行中数据</span>
					<div class="num">
						<span class="number">{{ item.ing_ys }}</span>
						<span class="unit">条</span>
					</div>
				</div>
			</div></el-col
		>
	</el-row>

	<!-- 第一块第二行 -->
	<el-row>
		<el-col :span="24"
			><div class="grid-content1">
				<div class="select-bar">
					<span>时间筛选：</span>

					<el-radio-group v-model="radio3" fill="#E8F1F8" @change="onChange">
						<el-radio-button label="全部" /> <el-radio-button label="近半年" /> <el-radio-button label="近三个月" />
						<el-radio-button label="近一周" />
					</el-radio-group>
					<!-- <el-button class="el-btn":autofocus="true" type="goon">全部</el-button>
						<el-button class="el-btn" type="goon">近三个月</el-button>
						<el-button class="el-btn" type="goon">近一个月</el-button>
						<el-button class="el-btn" type="goon">近7天</el-button> -->
				</div>
			</div></el-col
		>
	</el-row>

	<!-- 第一块第三行 -->
	<el-row :gutter="20">
		<el-col :span="16"
			><div class="grid-content10">
				<div class="map">
					<div class="bt-title">
						<div class="icon"></div>
						<span class="name">区域统计</span>
					</div>
					<el-divider></el-divider>
					<div class="bt-chart">
						<Map ref="mapRef"></Map>
					</div>
				</div></div
		></el-col>
		<el-col :span="8"
			><div class="grid-content10">
				<div class="table">
					<div class="right-1-title">
						<div class="rightBar">
							<div class="icon"></div>
							<span class="title-name">区域排名Top10</span>
						</div>

						<div class="btnBar">
							<el-radio-group v-model="radio2" fill="#E8F1F8">
								<el-radio-button label="医师数量" id="0" @click="changePage(0)" />
								<el-radio-button label="使用者数量" id="1" @click="changePage(1)" />
							</el-radio-group>
							<!-- <el-button class="btn1":autofocus="true" type="goon" id="0" @click="changePage(0)">医师数量</el-button>
							<el-button class="btn1" type="goon" id="1" @click="changePage(1)">使用者数量</el-button> -->
						</div>
					</div>
					<!-- <div><el-divider></el-divider></div> -->
					<el-divider></el-divider>
					<div class="right-table" v-show="0 === number">
						<div class="displaylist">
							<el-table
								:data="doctor"
								:cell-style="cellStyle1"
								:header-cell-style="{
									height: '10px',
									background: '#f2f3f8',
									color: '#999999',

									fontSize: '0.22rem',
									fontFamily: 'Microsoft YaHei'
									// fontWeight: '400'
								}"
							>
								<el-table-column type="index" prop="sort" label="排名" width="80" />
								<el-table-column prop="doctorNumber" label="医师数量" />
								<el-table-column prop="name" label="地区" />
								<el-table-column prop="value" label="接诊量" />
							</el-table>
						</div>
					</div>
					<div class="right-table" v-show="1 === number">
						<div class="displaylist">
							<el-table
								:data="users"
								:cell-style="cellStyle1"
								:header-cell-style="{
									height: '10px',
									background: '#f2f3f8',
									color: '#999999',

									fontSize: '0.22rem',
									fontFamily: 'Microsoft YaHei'
									// fontWeight: '400'
								}"
							>
								<el-table-column type="index" prop="sort" label="排名" width="80" />
								<el-table-column prop="userNumber" label="使用者数量" />
								<el-table-column prop="name" label="地区" />
								<el-table-column prop="value" label="报告数量" />
							</el-table>
						</div>
					</div>
				</div></div
		></el-col>
	</el-row>

	<!-- 第二行 -->
	<el-row :gutter="20">
		<el-col :span="12"
			><div class="grid-content2 ep-bg-purple">
				<div class="left-2">
					<div class="left-2-title">
						<div class="lft">
							<div class="icon"></div>
							<span>医师统计</span>
						</div>
						<div class="rgt">查看更多 ></div>
					</div>
					<el-divider></el-divider>
					<div class="left-content">
						<div class="content-bar">
							<div class="bar">
								<span class="tot">总人数</span>
								<span class="num">{{ total }}</span>
								<span class="tot unit">人</span>
							</div>
							<div class="bar">
								<span class="tot">新增人数</span>
								<span class="num">{{ total }}</span>
								<span class="tot unit">人</span>
							</div>
						</div>
						<div class="echart">
							<Pie1 ref="pie1Ref"></Pie1>
						</div>
						<div class="echart">
							<Pie2 ref="pie2Ref"></Pie2>
						</div>
					</div>
				</div></div
		></el-col>
		<el-col :span="12"
			><div class="grid-content3">
				<div class="right-2">
					<div class="right-2-top">
						<div class="top-title">
							<div class="lft">
								<div class="icon"></div>
								<span>使用者统计</span>
							</div>
							<span class="rgt">查看更多 ></span>
						</div>
						<el-divider></el-divider>
						<div class="top-content">
							<div class="content-bar">
								<div class="bar">
									<span class="tot">总人数</span>
									<span class="num">{{ usrsData?.total }}</span>
									<span class="tot unit">人</span>
								</div>
							</div>
							<div class="echart">
								<BarChart1 ref="barchart1Ref"></BarChart1>
							</div>
						</div>
					</div>
					<div class="right-2-bottom">
						<div class="bot-title">
							<div class="lft">
								<div class="icon"></div>
								<span>用户分析</span>
							</div>
						</div>
						<el-divider></el-divider>
						<div class="bot-content">
							<ZChart1 ref="zchart1Ref"></ZChart1>
						</div>
					</div>
				</div></div
		></el-col>
	</el-row>
	<!-- 第三行 -->
	<el-row>
		<el-col :span="24"
			><div class="grid-content4">
				<div class="top-title">
					<div class="lft">
						<div class="icon"></div>
						<span>心电设备概况分析</span>
					</div>
					<span class="rgt">查看更多 ></span>
				</div>
				<el-divider></el-divider>
				<div class="displaybar">
					<div class="bar">
						<img src="../../assets/images/bar1.png" />
						<div class="bar-content">
							<span class="title">总数</span>
							<div class="num">
								<span class="number">{{ dev_data?.total_num }}</span>
								<span class="unit">台</span>
							</div>
						</div>
					</div>
					<div class="bar">
						<img src="../../assets/images/bar2.png" />
						<div class="bar-content">
							<span class="title">正常</span>
							<div class="num">
								<span class="number">1234567</span>
								<span class="unit">台</span>
							</div>
						</div>
					</div>
					<div class="bar">
						<img src="../../assets/images/bar3.png" />
						<div class="bar-content">
							<span class="title">新增</span>
							<div class="num">
								<span class="number">1234567</span>
								<span class="unit">台</span>
							</div>
						</div>
					</div>
					<div class="bar">
						<img src="../../assets/images/bar4.png" />
						<div class="bar-content">
							<span class="title">失联</span>
							<div class="num">
								<span class="number">1234567</span>
								<span class="unit">台</span>
							</div>
						</div>
					</div>
				</div>
				<el-divider border-style="dashed" />
				<div class="content">
					<div class="chartTitle">
						<div class="name">设备增长趋势图</div>
					</div>
					<div class="chart">
						<ZChart2 ref="zchart2Ref"></ZChart2>
					</div>
				</div></div
		></el-col>
	</el-row>
	<!-- 第四行 -->
	<el-row :gutter="20">
		<el-col :span="12"
			><div class="grid-content5">
				<div class="top-title">
					<div class="lft">
						<div class="icon"></div>
						<span>心电数据分析</span>
					</div>
					<span class="rgt">查看更多 ></span>
				</div>
				<el-divider></el-divider>

				<div class="echart">
					<ZChart3 ref="zchart3Ref"></ZChart3>
				</div></div
		></el-col>
		<el-col :span="12"
			><div class="grid-content5">
				<div class="top-title">
					<div class="lft">
						<div class="icon"></div>
						<span>报告数据分析</span>
					</div>
					<span class="rgt">查看更多 ></span>
				</div>
				<el-divider></el-divider>

				<div class="echart">
					<ZChart4 ref="zchart4Ref"></ZChart4>
				</div></div
		></el-col>
	</el-row>
	<!-- 最后一行 -->
	<el-row>
		<el-col :span="24"
			><div class="grid-content6">
				<div class="top-title">
					<div class="lft">
						<div class="icon"></div>
						<span>反馈分值排行榜</span>
					</div>
					<span class="rgt">查看更多 ></span>
				</div>
				<el-divider></el-divider>
				<div class="choose">
					<el-radio-group v-model="radio1" fill="#E8F1F8">
						<el-radio-button label="前10名" id="0" @click="changeStatus(0)" />
						<el-radio-button label="后10名" id="1" @click="changeStatus(1)" />
					</el-radio-group>
				</div>
				<div class="table" v-show="0 === status">
					<el-table
						:data="xindianData1"
						height="250"
						style="width: 100%"
						:row-style="{ height: '47px' }"
						:cell-style="cellStyle2"
						:header-cell-style="{
							height: '10px',
							background: '#f2f3f8',
							color: '#999999',

							fontSize: '0.225rem',
							fontFamily: 'Microsoft YaHei'
							// fontWeight: '400'
						}"
					>
						<el-table-column type="index" prop="sort" label="排名" width="180" />
						<el-table-column prop="content" label="心电报告反馈内容" />
						<el-table-column prop="value" label="心电报告分值" />
						<el-table-column prop="name" label="医护人员" />
					</el-table>
				</div>
				<div class="table" v-show="1 === status">
					<el-table
						height="250"
						style="width: 100%"
						:row-style="{ height: '47px' }"
						:data="xindianData2"
						:cell-style="cellStyle2"
						:header-cell-style="{
							height: '10px',
							background: '#f2f3f8',
							color: '#999999',

							fontSize: '0.225rem',
							fontFamily: 'Microsoft YaHei'
							// fontWeight: '400'
						}"
					>
						<el-table-column type="index" prop="sort" label="排名" width="180" />
						<el-table-column prop="content" label="心电报告反馈内容" />
						<el-table-column prop="value" label="心电报告分值" />
						<el-table-column prop="name" label="医护人员" />
					</el-table>
				</div></div
		></el-col>
	</el-row>
</template>

<script setup lang="ts">
// import Map from "./components/map.vue";
import { ECharts } from "echarts";
import { doctorData, userData, xindianData1, xindianData2 } from "@/assets/map/data";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import Pie1 from "./components/pie1.vue";
import Pie2 from "./components/pie2.vue";
import BarChart1 from "./components/barChart1.vue";
import ZChart1 from "./components/z-chart1.vue";
import ZChart2 from "./components/z-chart2.vue";
import ZChart3 from "./components/z-chart3.vue";
import ZChart4 from "./components/z-chart4.vue";
import Map from "./components/map.vue";
import { ElRow, ElCol, ElRadioGroup, ElRadioButton, ElDivider, ElTable, ElTableColumn } from "element-plus";
import { gethomeList1, gethomeList2 } from "@/api/modules/home";

// import { chinaMap } from "@/assets/map/china";
// import * as echarts from "echarts";
// import echarts from "echarts/types/dist/echarts";
//  第一个表格
const radio1 = ref("前10名");
const radio3 = ref("全部");
const radio2 = ref("医师数量");
let number: any = ref(0);
let status: any = ref(0);
// console.log("全局", res);
let usrsData = ref();
let todayData = ref();
let acctData = ref();
let docData1 = ref();
let docData2 = ref();
// 医生统计的总人数和新增人数
let total = ref();
let xindian_data = ref();
let report_data = ref();
// 心电概况分析
let dev_data = ref();
// console.log("doc", toRaw(total));

// let USERData = reactive(res?.usrs);

// const stat: Ref<any> = ref("1");
const onChange = async (e: any) => {
	console.log(e);
	const res_new: any = await gethomeList2(e);
	// 请求全部的接口函数 更改echatrs数据
	console.log("更新的接口数据", res_new.usrs);
	usrsData.value = res_new.usrs;
	console.log("usersData", usrsData);
	acctData.value = res_new.acct;
	docData1.value = res_new.doct1;
	docData2.value = res_new.doct2;
	xindian_data.value = res_new.xd_data;
	report_data.value = res_new.rept_data;
	dev_data.value = res_new.devs;
	// TODO: fetch data from server
	// const data = await fetchData(e);
	// stat.value = data;

	initCharts();
};

// const value = ref("");
const doctor = ref(doctorData);
// const value = ref("");
const users = ref(userData);
// table元素
// const tableRef = ref(null);
// table高度
// const tableHeight = "9rem";
// const tableHeight = "500";

const cellStyle1 = ({ columnIndex, rowIndex }: any) => {
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
			color: "#666666",
			fontSize: "0.25rem"
		};
	}
	return {
		color: "#333333",
		fontSize: "0.22rem"
	};
};
const cellStyle2 = ({ columnIndex, rowIndex }: any) => {
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
			color: "#666666",
			fontSize: "0.25rem"
		};
	}
	return {
		color: "#333333",
		fontSize: "0.22rem"
	};
};
const changePage = (index: any) => {
	number.value = index; //切换列表
};
const changeStatus = (index: any) => {
	status.value = index; //切换列表
};
// 切换tab
// const changeTab = (date: string) => {
// 	console.log(date);
// };

/* 声明echarts实例 */
interface ChartProps {
	[key: string]: ECharts | null;
}
/* 获取子组件的ref */
interface ChartExpose {
	initChart: (params?: any) => ECharts;
}
const mapRef = ref<ChartExpose>();
const pie1Ref = ref<ChartExpose>();
const pie2Ref = ref<ChartExpose>();

const barchart1Ref = ref<ChartExpose>();
const zchart1Ref = ref<ChartExpose>();
const zchart2Ref = ref<ChartExpose>();
const zchart3Ref = ref<ChartExpose>();
const zchart4Ref = ref<ChartExpose>();

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
	dataScreen.chart1 = mapRef.value?.initChart() as ECharts;
	dataScreen.chart2 = pie1Ref.value?.initChart(docData2.value) as ECharts;
	dataScreen.chart3 = pie2Ref.value?.initChart(docData1.value) as ECharts;
	// console.log(usrsData.value);
	dataScreen.chart4 = barchart1Ref.value?.initChart(usrsData.value) as ECharts;
	// acctData.value
	console.log("1", acctData.value);

	dataScreen.chart5 = zchart1Ref.value?.initChart(acctData.value) as ECharts;
	dataScreen.chart6 = zchart2Ref.value?.initChart(dev_data.value) as ECharts;
	dataScreen.chart7 = zchart3Ref.value?.initChart(xindian_data.value) as ECharts;
	dataScreen.chart8 = zchart4Ref.value?.initChart(report_data.value) as ECharts;
};

onMounted(async () => {
	/* 初始化echarts */

	const res: any = await gethomeList1();

	usrsData.value = res?.usrs;
	todayData.value = res?.today;
	// console.log("头部数据", todayData.value);
	acctData.value = res?.acct;
	// console.log("用户分析数据", res?.acct);
	docData1.value = res?.doct1;
	docData2.value = res?.doct2;
	total.value = res?.doct1.total_num;
	// console.log("医生统计数据", res?.doct1.total_num);
	xindian_data.value = res?.xd_data;
	report_data.value = res?.rept_data;
	dev_data.value = res?.devs;
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
// const btchart1Ref = ref<ChartExpose>();
// const btchart2Ref = ref<ChartExpose>();
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
