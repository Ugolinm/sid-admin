<template>
	<!-- 数据来源 -->

	<div class="echarts" id="zchart1"></div>
	<!-- <div class="right-bar"></div> -->
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";

// import mapJson from "../assets/china.json";
// import echarts from "@/utils/echarts";
// import * as echarts from "echarts";

// echarts.registerMap("china", chinaMap as any);
/* echarts sysmbol */
let color = ["#0075FF", "#8146FF", "#FFC005", "#FF515A", "#8B5CFF", "#00CA69"];

const hexToRgba = (hex: string, opacity: number) => {
	let rgbaColor = "";
	let reg = /^#[\da-f]{6}$/i;
	if (reg.test(hex)) {
		rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt("0x" + hex.slice(3, 5))},${parseInt(
			"0x" + hex.slice(5, 7)
		)},${opacity})`;
	}
	return rgbaColor;
};

const initChart = (data: any): ECharts => {
	// ["1", "2", "3", "4", "5", "6", "7", "8"]
	let xAxisData = data.map((v: { mon: any }) => v.mon);
	console.log("横轴", xAxisData);

	let yAxisData1 = data.map((v: { doc: any }) => v.doc);
	let yAxisData2 = data.map((v: { user: any }) => v.user);
	const echartsBox = document.getElementById("zchart1") as HTMLElement;
	const echarts: ECharts = init(echartsBox);

	const option = {
		// backgroundColor: "black",
		color: color,
		data: ["医生", "用户"],
		legend: {
			top: 310,
			left: 250,
			textStyle: {
				color: "#9FACBC"
			}
		},
		tooltip: {
			backgroundColor: "rgba(255,255,255,0.8)",
			trigger: "axis",

			axisPointer: {
				type: "cross"
			}
		},
		grid: {
			left: 20,
			right: 20,
			// left: "10%",
			// bottom: "5%",
			containLabel: true
		},
		xAxis: [
			{
				type: "category",
				data: xAxisData,
				axisLabel: {
					interval: 0, //使x轴横坐标全部显示
					rotate: 30,
					dataZoom: [
						{
							show: true,
							start: 0,
							end: 50
						}
					],
					textStyle: {
						fontSize: 12,

						color: "#999999"
					}
				},

				splitLine: {
					lineStyle: {
						type: "dashed",
						color: "rgba(255,255,255,0.11)"
						// type: "dotted" // 坐标线使用点线
					}
				},
				axisTick: {
					show: false // 隐藏x轴的分割点
				}
			}
		],
		yAxis: [
			{
				// min: 0,
				// max: 100,
				// interval: 20,
				type: "value",
				name: "数量",
				// axisLabel: {
				// 	textStyle: {
				// 		color: "#9FACBC"
				// 	}
				// },
				nameTextStyle: {
					color: "#9198A3",
					fontSize: 12,
					align: "right",
					lineHeight: 46
				},
				splitLine: {
					lineStyle: {
						type: "dashed",
						color: "#D9D9D9"
					}
				},
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				}
			}
		],
		series: [
			{
				name: "医生",
				type: "line",
				smooth: true,
				// showSymbol: false,/
				symbolSize: 8,
				zlevel: 3,
				lineStyle: {
					normal: {
						color: color[0],

						shadowBlur: 3,
						shadowColor: hexToRgba(color[0], 0.5),
						shadowOffsetY: 8,
						width: 5
					}
				},
				areaStyle: {
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "rgba(58,132,255, 0.5)" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "rgba(58,132,255, 0)" // 100% 处的颜色
							}
						],
						global: false // 缺省为 false
					}
				},

				data: yAxisData1
			},
			{
				name: "用户",
				type: "line",
				smooth: true,
				// showSymbol: false,
				symbolSize: 8,
				zlevel: 3,
				lineStyle: {
					normal: {
						color: color[1],
						shadowBlur: 3,
						shadowColor: hexToRgba(color[1], 0.5),
						shadowOffsetY: 8,
						width: 5
					}
				},
				areaStyle: {
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "rgba(58,132,255, 0.5)" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "rgba(58,132,255, 0)" // 100% 处的颜色
							}
						],
						global: false // 缺省为 false
					}
				},

				data: yAxisData2
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
	// right: 20%;
	// left: 10%;
	// top: 40%;
	width: 100%;
	height: 370px;
}
</style>
