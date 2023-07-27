<template>
	<!-- 医生板块下一图 -->
	<div class="echarts" id="usertop10"></div>
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";
// import * as echarts from "echarts";

const initChart = (): ECharts => {
	let yData = ["xxx", "xxx", "xxx", "xxx", "xxx", "xxx", "xxx", "xxx", "xxx", "xxx"];
	let data: any = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
	data.sort((a: any, b: any) => b - a);
	let max = [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000];
	const echartsBox = document.getElementById("usertop10") as HTMLElement;
	const echarts: ECharts = init(echartsBox);
	const option = {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "none"
			},
			formatter: function (
				params: {
					name: string;
					value: string;
				}[]
			) {
				return params[0].name + " : " + params[0].value + "人";
			}
		},
		xAxis: {
			show: false,
			type: "value"
		},
		grid: {
			// right: "55%",
			left: "30%",
			top: "0",
			bottom: "0"
		},
		yAxis: [
			{
				type: "category",
				inverse: true,
				offset: 80,
				axisLabel: {
					show: true,
					align: "left",

					textStyle: {
						color: "#333333",
						fontSize: "14"
					},
					formatter: function (value: string, index: any) {
						let num = "";
						let str = "";
						num = index + 1;
						if (index === 0) {
							str = "{no1|" + "} {num1|" + num + "} {title1| " + value + "}";
						} else if (index === 1) {
							str = "{no2|" + "} {num2|" + num + "} {title2| " + value + "}";
						} else if (index === 2) {
							str = "{no3|" + "} {num3|" + num + "} {title3| " + value + "}";
						} else {
							str = " {num|" + num + "} {title| " + value + "}";
						}
						return str;
					},
					rich: {
						num: {
							color: "#666666",
							// backgroundColor: "#112b67",
							width: 10,
							height: 10,
							fontSize: 14,
							padding: [3, 5, 3, 5],
							align: "center",
							shadowColor: "#3374ba"
							// borderColor: "#3374ba",
							// borderWidth: 1
						},
						num1: {
							color: "#FE5252",
							// backgroundColor: "#112b67",
							width: 10,
							height: 10,
							fontSize: 14,
							padding: [3, 5, 3, 5],
							align: "center",
							shadowColor: "#4db2ff"
							// borderColor: "#4db2ff",
							// borderWidth: 1
						},
						num2: {
							color: "#579AFF",
							// backgroundColor: "#112b67",
							width: 10,
							height: 10,
							fontSize: 14,
							padding: [3, 5, 3, 5],
							align: "center",
							shadowColor: "#4db2ff"
							// borderColor: "#4db2ff",
							// borderWidth: 1
						},
						num3: {
							color: "#EBBB49",
							// backgroundColor: "#112b67",
							width: 10,
							height: 10,
							fontSize: 14,
							padding: [3, 5, 3, 5],
							align: "center",
							shadowColor: "#4db2ff"
							// borderColor: "#4db2ff",
							// borderWidth: 1
						}
					}
				},
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				data: yData
			}
			// {
			// 	type: "category",
			// 	inverse: true,
			// 	offset: 0,
			// 	axisTick: "none",
			// 	axisLine: "none",
			// 	show: true,
			// 	axisLabel: {
			// 		textStyle: {
			// 			color: "#fff",
			// 			fontSize: "14"
			// 		}
			// 	},
			// 	data: data
			// }
		],
		series: [
			{
				name: "值",
				type: "bar", // 图表类型
				zlevel: 1,
				data: data, // 数据
				barWidth: 20, // 柱的宽度
				// barGap: 36,

				// 柱上面的数值配置
				label: {
					show: true, // 显示值
					position: "insideRight", // 显示位置

					color: "white",
					formatter: (params: { value: any }) => (params.value ? `${params.value}人` : "")
				},
				// 每一个条目的样式配置
				itemStyle: {
					barBorderRadius: [0, 34, 34, 0], // 圆角

					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 1,
						y2: 0,
						colorStops: [
							{
								offset: 0,
								color: "#0F87FA" //  0%  处的颜色
							},
							{
								offset: 1,
								color: "#00C0FE" //  100%  处的颜色
							}
						],
						global: false //  缺省为  false
					}
				}
			},
			{
				name: "背景",
				type: "bar",
				barWidth: 20,
				barGap: "-100%",
				data: max,
				itemStyle: {
					color: "#E5F0FC",
					borderWidth: 1,
					barBorderRadius: [30, 30, 30, 30]
				}
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
	height: 7rem;
}
</style>
