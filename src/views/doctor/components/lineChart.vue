<template>
	<!-- 数据来源 -->
	<div class="echarts" id="lineChart"></div>
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";
const initChart = (data: any): ECharts => {
	const echartsBox = document.getElementById("lineChart") as HTMLElement;
	const echarts: ECharts = init(echartsBox);
	const option = {
		tooltip: {
			backgroundColor: "rgba(255,255,255,0.8)",
			trigger: "axis",
			axisPointer: {
				type: "cross",
				crossStyle: {
					color: "#999"
				}
			}
		},
		legend: {
			data: ["总人数", "待审核", "已通过", "未通过", "冻结"],
			icon: "rect",
			itemWidth: 10, // 设置宽度
			itemHeight: 10, // 设置高度
			itemGap: 40, // 设置间距
			bottom: "5%"
		},
		xAxis: [
			{
				type: "category",
				data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
				axisLabel: {
					textStyle: {
						fontSize: 12,

						color: "#999999"
					}
				},

				splitLine: {
					lineStyle: {
						type: "dashed",
						color: "rgba(255,255,255,0.11)"
						// type: "dotted" // 坐标线使用点线
					}
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
				splitLine: {
					lineStyle: {
						type: "dashed",
						color: "#D9D9D9"
						// type: "dotted" // 坐标线使用点线
					}
				},
				axisLabel: {
					textStyle: {
						fontSize: 12,

						color: "#999999"
					}
				}
			}
		],
		series: [
			{
				name: "总人数",
				type: "line",
				smooth: false, // 平滑曲线显示
				symbol: "circle", // 标记的图形为实心圆
				symbolSize: 8, // 标记的大小
				itemStyle: {
					color: "#579AFF",
					borderColor: "#fff", // 圆点透明 边框
					borderWidth: 1
				},
				data: data.map((val: any) => {
					return {
						value: val.value2 + val.value3 + val.value4 + val.value5
					};
				})
			},
			{
				name: "待审核",
				type: "bar",
				itemStyle: {
					color: "#F6D052"
				},
				data: data.map((val: any) => {
					return {
						value: val.value2
					};
				})
			},
			{
				name: "已通过",
				type: "bar",
				itemStyle: {
					color: "#3ACBE9"
				},
				data: data.map((val: any) => {
					return {
						value: val.value3
					};
				})
			},
			{
				name: "未通过",
				type: "bar",
				itemStyle: {
					color: "#FFA680"
				},
				data: data.map((val: any) => {
					return {
						value: val.value4
					};
				})
			},
			{
				name: "冻结",
				type: "bar",
				itemStyle: {
					color: "#ABB7C7"
				},
				data: data.map((val: any) => {
					return {
						value: val.value5
					};
				})
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
