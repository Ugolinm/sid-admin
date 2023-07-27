<template>
	<!-- 数据来源 -->

	<div class="echarts" id="barchart1"></div>
	<!-- <div class="right-bar"></div> -->
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";
// import echarts from "echarts/types/dist/echarts";
import { toRaw } from "vue";
// import { toRaw } from "vue";
//全局变量
// var echarts: any = null;
const initChart = (data: any): ECharts => {
	// if (echartsBox != null && echartsBox != "" && echartsBox != undefined) {
	// 	echartsBox.dispose(); //解决echarts dom已经加载的报错
	// }

	// var echarts;

	// if (echarts != null && echarts != "" && echarts != undefined) {
	// 	echarts.dispose();
	// }
	// myChart = echarts.init(document.getElementById("domID"));
	let echartsBox = document.getElementById("barchart1") as HTMLElement;
	let echarts = init(echartsBox);

	console.log("data", data);
	let woman: any = toRaw(data.list_Female);
	let man = toRaw(data.list_Male);
	console.log("男生", man);
	let ratio_woman: any = [];
	let ratio_man: any = [];
	// 这个里面装入每一个年龄段的总人数
	let ratio_total: any = [];

	man.forEach(function (v: any, index: any) {
		ratio_total.push(v + woman[index]);
	});
	//
	ratio_total.forEach(function (v: any, index: any) {
		ratio_man.push(((isNaN(man[index] / v) ? 0 : man[index] / v).toFixed(2) as any) * 100);
		ratio_woman.push(((isNaN(woman[index] / v) ? 0 : woman[index] / v).toFixed(2) as any) * 100);
	});
	// console.log("相加的结果", ratio_total);
	// console.log("男", man);

	// console.log("女占比率", ratio_woman);
	// console.log("男占比率", ratio_man);

	// console.log("result", arr);

	const option = {
		grid: {
			top: "20%",
			left: "40",
			right: "50"
		},

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
			feature: {}
		},
		legend: {
			data: ["男性数量", "女性数量", "男性占比量", "女性占比量"],
			itemWidth: 8,
			itemHeight: 8,
			left: "25%",
			top: "6%"
		},
		xAxis: [
			{
				type: "category",
				data: ["40岁以下", "40-50岁", "50-60岁", "60-70岁", "70-80岁", "80岁以上"],
				axisLabel: {
					margin: 15,
					color: "#979797",
					textStyle: {
						fontSize: 12
					}
				},
				// axisPointer: {
				// 	type: "shadow"
				// },
				axisTick: {
					show: false // 隐藏x轴的分割点
				},
				axisLine: {
					lineStyle: {
						color: "#D9D9D9"
					}
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
				max: 100,
				interval: 20,
				axisLabel: {
					formatter: "{value}"
				},
				axisLine: {
					show: false
				},

				axisTick: {
					show: false
				},
				splitLine: {
					lineStyle: {
						type: "dashed",
						color: "#D9D9D9"
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
						console.log(value);
						return `${value}%`;
					}
				}
			}
		],
		series: [
			{
				name: "男性数量",
				type: "bar",
				data: man,
				barWidth: "20%",
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
				name: "女性数量",
				type: "bar",
				data: woman,
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
				name: "男性占比量",
				type: "line",
				yAxisIndex: 1,
				data: ratio_man,
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
				},
				tooltip: {
					valueFormatter: function (value: any) {
						return value + "%";
					}
				}
			},
			{
				name: "女性占比量",
				type: "line",
				yAxisIndex: 1,
				data: ratio_woman,
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
				},
				tooltip: {
					valueFormatter: function (value: any) {
						return value + "%";
					}
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
	// right: 20%;
	// left: 10%;
	// top: 40%;
	width: 100%;
	height: 350px;
}
</style>
