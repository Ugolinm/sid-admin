<template>
	<!-- 使用者概况 -->
	<div class="actual-total">
		<div class="panel-data">
			<div class="left-data">
				<img class="icon" src="@/assets/images/bigscreen1-total.png" />
				<div class="content">
					<div class="name1"><i class="number">423</i> <span class="unit">人</span></div>

					<div class="name2">累计总人数</div>
				</div>
			</div>

			<div class="right-data">
				<img class="icon" src="@/assets/images/bigscreen1-add.png" />
				<div class="content">
					<div class="name1"><i class="number">43</i> <span class="unit">人</span></div>

					<div class="name2">新增人数</div>
				</div>
			</div>
		</div>
	</div>
	<div class="echarts" id="RealTimeAccessChart"></div>
</template>

<script setup lang="ts">
import { ECharts, init } from "echarts";
const initChart = (data: number = 1): ECharts => {
	const charEle = document.getElementById("RealTimeAccessChart") as HTMLElement;
	const charEch: ECharts = init(charEle);
	const option = {
		tooltip: {
			backgroundColor: "rgba(255,255,255,0.8)",
			trigger: "axis",
			axisPointer: {
				type: "cross",
				crossStyle: {
					color: "#fff"
				}
			}
		},
		toolbox: {
			feature: {}
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
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					lineStyle: {
						type: "dashed",
						color: "rgba(255,255,255,0.11)"
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
				},
				splitLine: {
					lineStyle: {
						type: "dashed",
						color: "rgba(255,255,255,0.11)"
						// type: "dotted" // 坐标线使用点线
					}
				}
			}
		],
		series: [
			{
				name: "男",
				type: "bar",
				data: [602, 350, 500, 448, 270, 520],
				barWidth: "15%",
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
				barWidth: "15%",
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
	charEch.setOption(option);
	return charEch;
};
defineExpose({
	initChart
});
</script>
<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: calc(100% - 50px);
	padding-top: 0.375rem;
}
.actual-total {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 0.625rem;
	margin-top: 10px;
	margin-right: 4px;
	.panel-data {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		width: 8rem;

		// width: 5rem;

		// background-color: #ffffff;
		.left-data {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			width: 3rem;
			height: 1rem;
			background: linear-gradient(90deg, #154c81 0%, rgb(8 75 128 / 0%) 100%);
			border-radius: 0;
			opacity: 1;

			// background-color: pink;
			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 0.5rem;
				height: 0.5rem;
				padding: 0.22rem 0.25rem;
			}
			.content {
				display: flex;
				flex-direction: column;
				width: 1.25rem;
				padding-top: 0.125rem;

				// padding-bottom: 0.125rem;
				.name1 {
					display: flex;
					flex-direction: row;

					// background-color: red;
					.number {
						width: 0.375rem;
						height: 0.2625rem;
						padding-top: 0.0875rem;
						font-family: Arial;
						font-size: 0.25rem;
						font-style: normal;
						font-weight: bold;
						line-height: 0.2625rem;
						color: #0aa7ff;
					}
					.unit {
						width: 0.15rem;
						height: 0.2375rem;
						padding-top: 0.1125rem;
						padding-left: 0.125rem;
						font-family: "Microsoft YaHei";
						font-size: 0.15rem;
						font-weight: 400;
						line-height: 0.2375rem;
						color: #99b3c8;
					}
				}
				.name2 {
					display: flex;

					// width: 0.875rem;
					height: 0.2375rem;
					padding-top: 0.075rem;
					font-family: "Microsoft YaHei";
					font-size: 0.175rem;
					font-weight: 400;
					line-height: 0.2375rem;
					color: #deebf6;
				}
			}
		}
		.right-data {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			width: 3rem;
			height: 1rem;
			background: linear-gradient(90deg, #154c81 0%, rgb(8 75 128 / 0%) 100%);
			border-radius: 0;
			opacity: 1;

			// background-color: pink;
			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 0.5rem;
				height: 0.5rem;
				padding: 0.22rem 0.25rem;
			}
			.content {
				display: flex;
				flex-direction: column;
				width: 1.25rem;
				padding-top: 0.125rem;

				// padding-bottom: 0.125rem;
				.name1 {
					display: flex;
					flex-direction: row;

					// background-color: red;
					.number {
						width: 0.375rem;
						height: 0.2625rem;
						padding-top: 0.0875rem;
						font-family: Arial;
						font-size: 0.25rem;
						font-style: normal;
						font-weight: bold;
						line-height: 0.2625rem;
						color: #31fbfb;
					}
					.unit {
						width: 0.15rem;
						height: 0.2375rem;
						padding-top: 0.1125rem;
						padding-left: 0.125rem;
						font-family: "Microsoft YaHei";
						font-size: 0.15rem;
						font-weight: 400;
						line-height: 0.2375rem;
						color: #99b3c8;
					}
				}
				.name2 {
					display: flex;

					// width: 0.875rem;
					height: 0.2375rem;
					padding-top: 0.075rem;
					font-family: "Microsoft YaHei";
					font-size: 0.175rem;
					font-weight: 400;
					line-height: 0.2375rem;
					color: #deebf6;
				}
			}
		}
	}
}
</style>
