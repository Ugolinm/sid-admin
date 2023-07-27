<template>
	<!-- 数据来源 -->

	<div class="echarts" id="dashboardRef"></div>
	<!-- <div class="right-bar"></div> -->
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";

// import mapJson from "../assets/china.json";
// import echarts from "@/utils/echarts";
// import * as echarts from "echarts";

// echarts.registerMap("china", chinaMap as any);
/* echarts sysmbol */

// let xAxisData = echartData.map(v => v.name);
// ["1", "2", "3", "4", "5", "6", "7", "8"]
// let yAxisData1 = echartData.map(v => v.value1);
// let yAxisData2 = echartData.map(v => v.value2);
// let yAxisData3 = echartData.map(v => v.value3);

const initChart = (data?: any): ECharts => {
	const echartsBox = document.getElementById("dashboardRef") as HTMLElement;
	const echarts: ECharts = init(echartsBox);
	// let datas = data[0].total_duration;
	// const dataa = 1.27;
	console.log("1", data);

	const option = {
		series: [
			{
				type: "gauge",
				min: 0, //最小刻度
				max: 5, //最大刻度
				progress: {
					show: true,
					width: 15
				},
				pointer: {
					show: false
				},
				axisLine: {
					shwo: false,
					lineStyle: {
						width: 15
					}
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false,
					length: 5,
					lineStyle: {
						width: 2,
						color: "#0D8EF9"
					}
				},
				axisLabel: {
					show: false,
					distance: 15,
					color: "#0D8EF9",
					fontSize: 20
				},
				anchor: {
					show: false,
					showAbove: true,
					size: 5,
					itemStyle: {
						borderWidth: 10
					}
				},
				title: {
					show: true,
					offsetCenter: [0, "-16%"],
					textStyle: {
						fontSize: 16, //字体大小
						color: "#666666" //字体颜色
					}
				},

				detail: {
					show: true,
					pointer: {
						show: false
					},
					color: "#0D8EF9",
					valueAnimation: true,
					fontSize: 20,
					offsetCenter: [0, "30%"],
					formatter: "{value}h"
				},
				itemStyle: {
					color: "#0D8EF9"
				},
				data: [
					{
						value: data,
						name: "总平均用时"
					}
				]
			}
		]
	};

	echarts.setOption(option);
	return echarts;
};
defineExpose({
	initChart
});
</script>
<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: 6rem;
}
</style>
