<template>
	<!-- 数据来源 -->

	<div class="echarts" id="reportLookRef"></div>
	<!-- <div class="right-bar"></div> -->
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";

// const years = ref(2022);

const PieColor = ["#fdbf5e", "#22cce2"];

const initChart = (data: any): ECharts => {
	const echartsBox = document.getElementById("reportLookRef") as HTMLElement;
	const echarts: ECharts = init(echartsBox);
	console.log("查看", data);
	// const y_num, n_num;
	// console.log("zzz", result.N_num);
	const yData = data?.map((item: any) => {
		const { Y_num } = item;
		return Y_num;
	});
	const nData = data?.map((item: any) => {
		const { N_num } = item;
		return N_num;
	});
	console.log("y", yData);

	const ChartData = [
		{ value: nData, name: "未查看" },
		{ value: yData, name: "已查看" }
	];
	const option = {
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
			top: "70%",
			left: "center",
			align: "left",
			itemGap: 45, // 设置图例之间的间距
			icon: "circle",
			itemWidth: 10,
			data: ChartData,
			textStyle: {
				//图例的文字样式
				color: "#9e9e9e",
				fontSize: 12,
				fontWeight: "normal"
			}
		},
		series: [
			{
				name: "报告数量",
				type: "pie",
				radius: ["40%", "70%"],
				center: ["50%", "35%"], //饼图整体位置
				avoidLabelOverlap: false,
				color: PieColor,
				label: {
					show: true,
					color: "#fff",
					fontSize: 13,
					position: "inner",
					formatter: "{d}%"
				},
				emphasis: { show: false },
				labelLine: { show: false },
				data: ChartData
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
	height: 8rem;
}
</style>
