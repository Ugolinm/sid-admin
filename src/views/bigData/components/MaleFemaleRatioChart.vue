<template>
	<!-- 用户分析 -->

	<div class="echarts" id="MaleFemaleRatioChart"></div>
</template>

<script setup lang="ts">
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import { ECharts, init } from "echarts";
import * as echarts from "echarts";
interface ChartProp {
	man: number;
	woman: number;
}

let color = ["#4DD1FF", "#F7B500", "#FFC005", "#FF515A", "#8B5CFF", "#00CA69"];
let echartData = [
	{
		name: "2017",
		value1: 432,
		value2: 335,
		value3: 188
	},
	{
		name: "2018",
		value1: 652,
		value2: 247,
		value3: 123
	},
	{
		name: "2019",
		value1: 389,
		value2: 622,
		value3: 156
	},
	{
		name: "2020",
		value1: 555,
		value2: 236,
		value3: 256
	},
	{
		name: "2021",
		value1: 278,
		value2: 651,
		value3: 239
	},
	{
		name: "2022",
		value1: 782,
		value2: 233,
		value3: 307
	}
];

let xAxisData = echartData.map(v => v.name);
// ["1", "2", "3", "4", "5", "6", "7", "8"]
let yAxisData1 = echartData.map(v => v.value1);
let yAxisData2 = echartData.map(v => v.value2);
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initChart = (data: ChartProp): ECharts => {
	/* 获取容器 */
	const charEle = document.getElementById("MaleFemaleRatioChart") as HTMLElement;
	/* 生成echarts */
	const charEch: ECharts = init(charEle);
	const option = {
		// backgroundColor: "black",
		color: color,
		// 设置图例
		legend: {
			data: ["医生", "用户"],
			itemWidth: 8,
			itemHeight: 8,
			top: 10,
			right: 30,
			textStyle: {
				color: "#9FACBC"
			}
		},
		// 设置展示框
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
                ${v.name}年.${v.seriesName}
                <span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                `;
				});

				return html;
			},
			extraCssText: "background: rgba(255,255,255,0.8); border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;",
			axisPointer: {
				type: "cross",
				crossStyle: {
					color: "#fff"
				}
			}
		},
		// 在画布里设置图形大小
		grid: {
			top: "20%",
			left: "7%",
			right: "6%",
			bottom: "10%",

			containLabel: true
		},
		xAxis: [
			{
				type: "category",
				boundaryGap: true,
				axisTick: {
					show: false // 隐藏x轴的分割点
				},
				axisPointer: {
					type: "shadow"
				},
				axisLabel: {
					formatter: "{value}年",
					textStyle: {
						color: "#979797"
					}
				},
				// 坐标轴x轴的颜色
				// axisLine: {
				// 	lineStyle: {
				// 		color: "#D9D9D9"
				// 	}
				// },
				data: xAxisData
			}
		],
		yAxis: [
			{
				min: 0,
				max: 1000,
				interval: 200,
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
						color: "rgba(255,255,255,0.11)"
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
					normal: {
						color: new echarts.graphic.LinearGradient(
							0,
							0,
							0,
							1,
							[
								{
									offset: 0,
									color: hexToRgba(color[0], 0.2)
								},
								{
									offset: 1,
									color: hexToRgba(color[0], 0)
								}
							],
							false
						),
						shadowColor: hexToRgba(color[0], 0.1),
						shadowBlur: 10
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
					normal: {
						color: new echarts.graphic.LinearGradient(
							0,
							0,
							0,
							1,
							[
								{
									offset: 0,
									color: hexToRgba(color[1], 0.2)
								},
								{
									offset: 1,
									color: hexToRgba(color[1], 0)
								}
							],
							false
						),
						shadowColor: hexToRgba(color[1], 0.1),
						shadowBlur: 10
					}
				},
				data: yAxisData2
			}
		]
	};
	charEch.setOption(option);
	return charEch;
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
</style>
