<template>
	<!-- 数据来源 -->

	<div class="echarts" id="minichart1"></div>
	<!-- <div class="right-bar"></div> -->
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";
// import { fa } from "element-plus/es/locale";

// import mapJson from "../assets/china.json";
// import echarts from "@/utils/echarts";
// import * as echarts from "echarts";

// echarts.registerMap("china", chinaMap as any);
/* echarts sysmbol */
// let color = ["#22CCE2", "#8146FF", "#FFC005", "#FF515A", "#8B5CFF", "#00CA69"];

const initChart = (): ECharts => {
	const echartsBox = document.getElementById("minichart1") as HTMLElement;
	const echarts: ECharts = init(echartsBox);

	const option = {
		// backgroundColor: "#010429",
		tooltip: {
			show: false,
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			}
		},
		grid: {
			bottom: "30",
			top: "40",
			left: "20",
			right: "20"
		},
		xAxis: [
			{
				type: "category",
				data: ["上海", "上海", "上海", "上海", "上海"], //data.map(e => e.unitname),
				axisLine: {
					show: false, //柱子底部线段显示隐藏
					lineStyle: {
						// show:false,
						color: "#fff",
						type: "dashed"
					}
				},
				axisLabel: {
					show: true,
					color: "#fff",
					fontSize: 14,
					formatter: function (val: string) {
						let strs = val.split(""); //字符串数组
						let str = "";
						// eslint-disable-next-line no-var
						for (var i = 0, s; (s = strs[i++]); ) {
							//遍历字符串数组
							str += s;
							if (!(i % 4)) str += "\n"; //按需要求余
						}
						return str;
					}
				},
				axisTick: {
					show: false
				}
			}
		],
		yAxis: [
			{
				show: false
			}
		],
		series: [
			{
				type: "bar",
				data: [8, 12, 7, 11, 7], // data.map(e => e.nums),
				barWidth: "8",
				itemStyle: {
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#A8D5FF" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#88BDFF" // 100% 处的颜色
							}
						],
						global: false // 缺省为 false
					}
				},
				label: {
					//柱子头部显示数字
					normal: {
						color: "#fff",
						show: true,
						formatter: "{c}",
						position: "top"
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
	width: 100%;
	height: 100%;
}
</style>
