<template>
	<!-- 数据来源 -->
	<!-- <div class="title">-5% ↓</div> -->

	<div class="echarts" id="minichart"></div>
	<!-- <div class="right-bar"></div> -->
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";
let dataC1 = [2, 30, 15, 40, 20, 10];
let xData = ["00:00", "04:00", "08:00", "12:00", "16:00", "18:00"];

// let fontColor = "#30eee9";

const initChart = (): ECharts => {
	const echartsBox = document.getElementById("minichart") as HTMLElement;
	const echarts: ECharts = init(echartsBox);

	const option = {
		backgroundColor: "transparent",
		grid: {
			bottom: "30",
			top: "65",
			left: "1",
			right: "30"
		},
		xAxis: {
			type: "category",
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false
			},
			data: xData
		},
		yAxis: {
			type: "value",
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false
			},
			boundaryGap: ["20%", "20%"]
		},
		series: [
			{
				name: "",
				type: "line",
				stack: "总量",
				smooth: true,
				symbol: "none",
				showSymbol: false,
				symbolSize: 8,
				itemStyle: {
					normal: {
						// color: '#71bd27',
						lineStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: "#00E2C4" // 0% 处的颜色
									},

									{
										offset: 1,
										color: "#00C0FD" // 100% 处的颜色
									}
								],
								global: false // 缺省为 false
							},
							width: 3
						},
						areaStyle: {
							opacity: 0
						}
					}
				},
				data: dataC1
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
	height: 100%;
}
.title {
	position: absolute;
	top: 25%;
	right: 30%;
	height: 0.2625rem;
	font-family: Arial;
	font-size: 0.225rem;
	font-weight: 400;
	line-height: 0.2625rem;
	color: #ff7272;
}
</style>
