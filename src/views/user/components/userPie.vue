<template>
	<!-- 医生板块下一图 -->
	<div class="echarts" id="userPie"></div>
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";
// import * as echarts from "echarts";

const initChart = (data: any): ECharts => {
	// let yData = ["上海", "北京", "浙江", "杭州", "南京", "武汉", "山东", "广州", "青岛", "河北"];
	// let data: any = ["2000", "1800", "1600", "1000", "800", "1200", "900", "1100", "1700", "999"];
	console.log("user", data);

	data.sort((a: any, b: any) => b - a);
	// let max = [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000];
	const echartsBox = document.getElementById("userPie") as HTMLElement;
	const echarts: ECharts = init(echartsBox);
	const option = {
		tooltip: {
			//提示框
			// show: true,
			trigger: "item",
			// 提示框显示内容,此处{b}表示各数据项名称，此项配置为默认显示项，{c}表示数据项的值，默认不显示，({d}%)表示数据项项占比，默认不显示。
			backgroundColor: "rgba(255,255,255,0.8))",
			padding: 25,
			borderColor: "transparent"
		},

		legend: {
			//图例
			orient: "vertical", //竖直展示
			top: "20%",
			left: "45%",
			// align: "left",
			itemGap: 40, // 设置图例之间的间距
			icon: "circle",
			itemWidth: 10,
			textStyle: {
				//图例的文字样式
				color: "#9e9e9e",
				fontSize: 13
			}
		},
		// 系列列表
		series: [
			{
				name: "用户画像 ",
				type: "pie",
				radius: ["50%", "95%"],
				// avoidLabelOverlap: false,
				// 各部分颜色
				color: ["#df5efc", "#0081ff", "#3b72ad", "#22cce2", "#fdcc00", "#ff9d83"],
				center: ["25%", "50%"],
				label: {
					show: true,
					position: "inner",
					color: "#fff",
					fontSize: "7.5",
					formatter: "{d}%"
				},
				// emphasis: {
				// 	//鼠标滑过数据显示
				// 	label: {
				// 		show: true,
				// 		fontSize: "15",
				// 		fontWeight: "400"
				// 	}
				// },
				labelLine: {
					show: false
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
	height: 2.5rem;
}
</style>
