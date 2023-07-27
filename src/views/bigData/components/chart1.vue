<!--男女分布饼状图  -->
<template>
	<div>
		<div ref="main" style="width: 100%; height: 250px"></div>
	</div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

// import { map } from "@/assets/chart";

const main = ref();
// let xData = ["40岁以下", "40-50岁", "50-60岁", "60-70岁", "70-80岁", "80岁以上"];
// 男
// let yData1 = [600, 500, 634, 348, 470];
// 女
// let yData2 = [500, 420, 534, 448, 270];
// 男占比率
// let lineData1 = [38, 28, 50, 37, 63];
// 女占比率
// let lineData2 = [62, 57, 79, 62, 95];

// const data = ref(map);
onMounted(() => {
	// 这里是由于图表渲染快于父元素导致图表比例溢出，做的一个延缓操作
	init();
});

const init = async () => {
	// 1通过dom初始化echarts 2ref虚拟化dom
	let mychart = echarts.init(main.value);
	// 数据源
	let option = {
		tooltip: {
			backgroundColor: "rgba(255,255,255,0.8)",
			trigger: "axis",
			axisPointer: {
				type: "cross",
				crossStyle: {
					color: "red"
				}
			}
		},
		toolbox: {
			feature: {
				// dataView: { show: true, readOnly: false },
				// magicType: { show: true, type: ["line", "bar"] },
				// restore: { show: true },
				// saveAsImage: { show: true }
			}
		},
		legend: {
			data: ["男", "女", "男占比率", "女占比率"],
			itemWidth: 8,
			itemHeight: 8,
			left: "33%"
		},
		xAxis: [
			{
				type: "category",
				data: ["40岁以下", "40-50岁", "50-60岁", "60-70岁", "70-80岁", "80岁以上"],
				axisLabel: {
					margin: 15,
					color: "#979797",
					textStyle: {
						fontSize: 10
					}
				},
				axisPointer: {
					type: "shadow"
				},
				axisTick: {
					show: false // 隐藏x轴的分割点
				}
			}
		],
		yAxis: [
			{
				type: "value",
				name: "人数",
				nameTextStyle: {
					color: "#9198A3",
					fontSize: 12,
					align: "right",
					lineHeight: 46
				},
				min: 0,
				max: 1000,
				interval: 200,
				axisLabel: {
					formatter: "{value}"
				},
				axisLine: {},
				axisTick: {
					show: false
				},
				splitLine: {
					lineStyle: {
						color: "#cedbe9"
						// type: "dotted" // 坐标线使用点线
					}
				}
			},
			{
				type: "value",
				name: "",
				min: 0,
				max: 100,
				interval: 20,
				axisLabel: {
					formatter: (value: any) => {
						// console.log(value);
						return `${value}%`;
					}
				}
			}
		],
		series: [
			{
				name: "男",
				type: "bar",
				data: [602, 350, 500, 448, 270, 520],
				barWidth: "10%",
				// barCategoryGap: "20%"
				// barGap: "20"
				// 调整柱状图每根柱子之间的间距
				itemStyle: {
					normal: {
						// 颜色上下渐变
						color: "#2F72FF"
					}
				}
			},
			{
				name: "女",
				type: "bar",
				data: [670, 500, 634, 348, 470, 442],
				barWidth: "20%",
				barGap: "0",
				itemStyle: {
					normal: {
						// 颜色上下渐变
						color: "#FF7272"
					}
				}
			},
			{
				name: "男占比率",
				type: "line",
				yAxisIndex: 1,
				data: [55, 62, 60, 61, 20, 80],
				smooth: true,
				// 数值点默认为空心点
				// symbol: 'circle', //数值点设定为实心点
				// symbol:'rect', // 数值点设定为正方形
				symbolSize: 10, // 折线的点的大小
				itemStyle: {
					normal: {
						color: "#2F72FF", //点的颜色
						lineStyle: {
							color: "#2F72FF", //线的颜色
							width: 5 // 折线图线条粗细设置
						}
					}
				}
			},
			{
				name: "女占比率",
				type: "line",
				yAxisIndex: 1,
				data: [79, 78, 80, 81, 70, 62],
				// smooth: true,
				// symbol: 'circle', //数值点设定为实心点
				symbolSize: 10, // 折线的点的大小
				itemStyle: {
					normal: {
						color: "#FF7272", //点的颜色
						lineStyle: {
							color: "#FF7272", //线的颜色
							width: 5 // 折线图线条粗细设置
						}
					}
				}
			}
		]
	};

	// 数据源给予
	mychart.setOption(option);
};
</script>
<style lang="scss" scoped></style>
