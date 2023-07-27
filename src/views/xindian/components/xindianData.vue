<template>
	<!-- 数据来源 -->

	<div class="echarts" id="xindianDataRef"></div>
	<!-- <div class="right-bar"></div> -->
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";

const PieColor = ["#e05efd", "#fdbf5e", "#22cce2"];

const initChart = (data?: any, data1?: any): ECharts => {
	const echartsBox = document.getElementById("xindianDataRef") as HTMLElement;
	const echarts: ECharts = init(echartsBox);
	console.log("data1", data[0]);
	let avr: any = isNaN(data[0].time / data[0].num) == true ? "0" : (data[0].time / data[0].num).toFixed(2);
	const option = {
		title: {
			// x: 180,
			x: "center",
			y: "center",
			// top: 120,
			// left: "center",
			text: "{a|平均时长}", //主标题
			subtext: `{c|${avr}}{b|h}`, //副标题
			textStyle: {
				//主标题样式
				rich: {
					a: {
						fontSize: "0.2rem",
						color: "#666"
					}
				}
			},
			subtextStyle: {
				//副标题样式
				rich: {
					b: {
						fontSize: ".2rem",
						fontWeight: 40,
						color: "#666"
					},
					c: {
						fontSize: ".2rem",
						fontWeight: "600",
						color: "#1d2129"
					}
				}
			}
		},
		tooltip: {
			trigger: "item",
			backgroundColor: "rgba(255,255,255,0.8)", //通过设置rgba调节背景颜色与透明度
			color: "black",
			borderWidth: "1",
			borderColor: "transparent",
			textStyle: {
				color: "#333333"
			}
		},
		legend: {
			//图例
			top: "90%",
			left: "center",
			align: "left", //设置图例中的文字位置在icon标识符的右侧
			itemGap: 45, // 设置图例之间的间距
			icon: "circle",
			itemWidth: 10,

			textStyle: {
				//图例的文字样式
				color: "#9e9e9e",
				fontSize: 12
			}
		},
		series: [
			{
				name: "心电数据采集时长",
				type: "pie",
				radius: ["40%", "70%"],
				center: ["50%", "50%"], //饼图整体位置
				avoidLabelOverlap: false,
				color: PieColor,
				label: {
					show: true,
					color: "#fff",
					fontSize: 12,
					position: "inner",
					formatter: "{d}%"
				},
				emphasis: {
					show: true
				},
				labelLine: {
					show: false
				},
				data: data1
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
