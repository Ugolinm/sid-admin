<template>
	<!-- 医生板块下一图 -->
	<div class="echarts" id="averagelistRef"></div>
</template>
<script setup lang="ts" name="cure">
// import { number } from "@intlify/core-base";
import { ECharts, init } from "echarts";
// import * as echarts from "echarts";

const initChart = (data: any): ECharts => {
	let yData = data?.map((item: any) => {
		const { name } = item;
		return name;
	});
	// let _max = 30; // minutes
	let xData = data?.map((item: any) => {
		const { aver } = item;
		// if (aver * 60 > max_item) max_item = aver * 60;

		return aver; // minutes
	});
	const handleData = xData;

	// let max = Math.max(xData);
	const _max = Math.max.apply(null, handleData?.map(Number));
	// const _max = Math.ceil(max_item);
	// console.log("_max", num);

	let max = [_max, _max, _max, _max, _max, _max, _max, _max, _max, _max];
	const echartsBox = document.getElementById("averagelistRef") as HTMLElement;
	const echarts: ECharts = init(echartsBox);
	const option = {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "none"
			},
			formatter: function (params: any) {
				return params[0].name + " : " + params[0].value + "h";
			}
		},
		xAxis: {
			show: false,
			type: "value"
		},
		grid: {
			// right: "55%",
			left: "30%",
			right: "15%",
			top: "0",
			bottom: "0"
		},
		yAxis: [
			{
				type: "category",
				inverse: true,
				offset: 150,
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
			},
			{
				type: "category",
				inverse: true,
				offset: 0,
				axisTick: "none",
				axisLine: "none",
				show: true,
				axisLabel: {
					textStyle: {
						color: "#666666",
						fontSize: "14"
					},
					formatter: function (value: string) {
						console.log(value);
						const val = parseFloat(value);
						// if(val)
						return val.toFixed(3) + "h";
					}
				},
				data: xData
			}
		],
		series: [
			{
				name: "值",
				type: "bar", // 图表类型
				zlevel: 1,
				data: xData, // 数据
				barWidth: 20, // 柱的宽度
				// barGap: 36,

				// 柱上面的数值配置
				// label: {
				// 	show: true, // 显示值
				// 	position: "left", // 显示位置
				// 	offset: [480, 0],
				// 	color: "#666666",
				// 	formatter: (params: { value: any }) => (params.value ? `${params.value}h` : "")
				// },
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

				// },
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
