<template>
	<!-- 数据来源 -->

	<div class="echarts" id="reportRef"></div>
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
let echartData = [
	{
		name: "1月",
		value1: 432,
		value2: 335,
		value3: 188
	},
	{
		name: "2月",
		value1: 652,
		value2: 247,
		value3: 123
	},
	{
		name: "3月",
		value1: 389,
		value2: 622,
		value3: 156
	},
	{
		name: "4月",
		value1: 555,
		value2: 236,
		value3: 256
	},
	{
		name: "5月",
		value1: 278,
		value2: 651,
		value3: 239
	},
	{
		name: "6月",
		value1: 782,
		value2: 233,
		value3: 307
	},
	{
		name: "7月",
		value1: 432,
		value2: 335,
		value3: 188
	},
	{
		name: "8月",
		value1: 652,
		value2: 247,
		value3: 123
	},
	{
		name: "9月",
		value1: 389,
		value2: 622,
		value3: 156
	},
	{
		name: "10月",
		value1: 555,
		value2: 236,
		value3: 256
	},
	{
		name: "11月",
		value1: 365,
		value2: 236,
		value3: 126
	},
	{
		name: "12月",
		value1: 455,
		value2: 236,
		value3: 156
	}
];

let xAxisData = echartData.map(v => v.name);
// ["1", "2", "3", "4", "5", "6", "7", "8"]
// let yAxisData1 = echartData.map(v => v.value1);
// let yAxisData2 = echartData.map(v => v.value2);
// let yAxisData3 = echartData.map(v => v.value3);
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
	const echartsBox = document.getElementById("reportRef") as HTMLElement;
	const echarts: ECharts = init(echartsBox);

	const option = {
		// backgroundColor: "black",
		color: color,
		data: ["医生", "用户"],
		// legend: {
		//  top: 380,
		//  left: 250,
		//  textStyle: {
		//    color: "#9FACBC"
		//  }
		// },
		tooltip: {
			backgroundColor: "rgba(255,255,255,0.8)",
			trigger: "axis",
			formatter: function (params: any[]) {
				let html = "";
				params.forEach(v => {
					// console.log(v);
					html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
									color[v.componentIndex]
								};"></span>
                ${v.seriesName}
                <span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                `;
				});

				return html;
			},
			extraCssText: "background: rgba(255,255,255,0.8); border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;",
			axisPointer: {
				type: "shadow",
				shadowStyle: {
					color: "rgba(255,255,255,0.8)",
					shadowColor: "rgba(255,255,255,0.8)",
					shadowBlur: 2
				}
			}
		},
		grid: {
			// top: 100,
			left: "20",
			right: "20",
			containLabel: true
		},
		xAxis: [
			{
				type: "category",
				// name: "数量",
				// boundaryGap: true,
				axisTick: {
					show: false // 隐藏x轴的分割点
				},
				axisLabel: {
					// formatter: "{value}年",
					interval: 0,
					textStyle: {
						color: "#9FACBC"
					}
				},
				axisLine: {
					lineStyle: {
						color: "#D9D9D9"
					}
				},
				data: xAxisData
			}
		],
		yAxis: [
			{
				// min: 0,
				// max: 1000,
				// interval: 200,
				type: "value",
				name: "数量",
				axisLabel: {
					textStyle: {
						color: "#9FACBC"
					}
				},
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
				name: "报告数量",
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
				data: data
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
	height: 5rem;
}
</style>
