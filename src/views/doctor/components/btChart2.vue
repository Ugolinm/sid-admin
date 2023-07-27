<template>
	<!-- 医生板块下二图 -->
	<div class="echarts" id="btChart2" style="height: 100%; min-height: 8rem"></div>
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";
// import * as echarts from "echarts";

const initChart = (datas: any): ECharts => {
	const yData = datas.map((item: any) => item.name);

	let data = datas.map((item: any) => item.num);
	const bigMax = Math.max.apply(null, data);
	let max = [bigMax, bigMax, bigMax, bigMax, bigMax, bigMax, bigMax, bigMax, bigMax, bigMax];
	const echartsBox = document.getElementById("btChart2") as HTMLElement;
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
				return params[0].name + " : " + params[0].value + "单";
			}
		},
		xAxis: {
			show: false,
			type: "value"
		},
		grid: {
			// right: "55%",
			// right: "0%",
			left: "30%",
			top: 10,
			bottom: 40
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
					formatter: (params: { value: any }) => {
						// console.log("oa", params);
						return `${params.value}单`;
					}
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
								color: "#06CEBA" //  0%  处的颜色
							},
							{
								offset: 1,
								color: "#33E4E5" //  100%  处的颜色
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
	height: 100%;
}
</style>
