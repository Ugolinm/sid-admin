<template>
	<!-- 数据来源 -->

	<div class="echarts" id="zchart3"></div>
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
	const echartsBox = document.getElementById("zchart3") as HTMLElement;
	const echarts: ECharts = init(echartsBox);
	let xAxisData = data.map((v: { mon: any }) => v.mon);
	// 	console.log("横轴", xAxisData);

	let yAxisData1 = data.map((v: { xindian_data: any }) => v.xindian_data);
	const option = {
		// backgroundColor: "black",
		color: color,
		data: ["心电数据"],
		// legend: {
		//  top: 380,
		//  left: 250,
		//  textStyle: {
		//    color: "#9FACBC"
		//  }
		// },
		// tooltip: {
		// 	backgroundColor: "rgba(255,255,255,0.8)",
		// 	trigger: "axis",
		// 	formatter: function (params: any[]) {
		// 		let html = "";
		// 		params.forEach(v => {
		// 			console.log(v);
		// 			html += `<div style="color: #666;font-size: 14px;line-height: 24px">
		//             <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
		// 							color[v.componentIndex]
		// 						};"></span>
		//             ${v.seriesName}
		//             <span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
		//             `;
		// 		});

		// 		return html;
		// 	},
		// 	extraCssText: "background: rgba(255,255,255,0.8); border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;",
		// 	axisPointer: {
		// 		type: "shadow",
		// 		shadowStyle: {
		// 			color: "rgba(255,255,255,0.8)",
		// 			shadowColor: "rgba(255,255,255,0.8)",
		// 			shadowBlur: 2
		// 		}
		// 	}
		// },
		tooltip: {
			backgroundColor: "rgba(255,255,255,0.8)",
			trigger: "axis",

			axisPointer: {
				type: "cross"
			}
		},
		grid: {
			// top: 100,
			containLabel: true
		},
		xAxis: [
			{
				type: "category",
				// name: "数量",
				boundaryGap: true,
				axisTick: {
					show: false // 隐藏x轴的分割点
				},
				axisLabel: {
					// formatter: "{value}年",
					interval: 0, //使x轴横坐标全部显示
					rotate: 30,
					// interval: 1,
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
				name: "设备数量",
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
	height: 350px;
}
</style>
