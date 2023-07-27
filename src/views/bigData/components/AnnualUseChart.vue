<template>
	<!-- 心电设备概况分析 第五块内容 -->
	<div class="actual-total">
		<!-- <div class="expect-total">可预约总量<i>999999</i>人</div> -->
		<div class="top">
			<div class="actual-title">总数</div>
			<div class="actual-itemtotal">
				<div class="actual-item" v-for="(item, index) in actualTotal.split('')" :key="index">
					{{ item }}
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="columnBox">
				<div class="column1">
					<img class="image" src="@/assets/images/column1.png" />
					<div class="dataBox">
						<div class="number">32423</div>
						<span class="data">正常</span>
					</div>
				</div>
				<div class="column2">
					<img class="image" src="@/assets/images/column2.png" />
					<div class="dataBox">
						<div class="number">32423</div>
						<span class="data">新增</span>
					</div>
				</div>
				<div class="column3">
					<img class="image" src="@/assets/images/column3.png" />
					<div class="dataBox">
						<div class="number">32423</div>
						<span class="data">失联</span>
					</div>
				</div>
			</div>
		</div>
		<div class="divider-box">
			<span class="title">设备趋势图</span>
			<img class="divider" src="@/assets/images/bigscreen-divider.png" />
		</div>
	</div>
	<div class="echarts" id="AnnualUseChart"></div>
</template>

<script setup lang="ts">
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import { ref, Ref } from "vue";
import { ECharts, init } from "echarts";
import * as echarts from "echarts";
// import echarts from "echarts/types/dist/echarts";
const actualTotal: Ref<string> = ref("15098");
let color = ["#3574EF", "#8146FF", "#FFC005", "#FF515A", "#8B5CFF", "#00CA69"];
let echartData = [
	{
		name: "2016",
		value1: 232,
		value2: 135,
		value3: 188
	},
	{
		name: "2017",
		value1: 432,
		value2: 335,
		value3: 188
	},
	{
		name: "2018",
		value1: 652,
		value2: 247,
		value3: 123
	},
	{
		name: "2019",
		value1: 389,
		value2: 622,
		value3: 156
	},
	{
		name: "2020",
		value1: 555,
		value2: 236,
		value3: 256
	},
	{
		name: "2021",
		value1: 278,
		value2: 651,
		value3: 239
	},
	{
		name: "2022",
		value1: 782,
		value2: 233,
		value3: 307
	}
];

let xAxisData = echartData.map(v => v.name);
// ["1", "2", "3", "4", "5", "6", "7", "8"]
let yAxisData1 = echartData.map(v => v.value1);
// let yAxisData2 = echartData.map(v => v.value2);
// let yAxisData3 = echartData.map(v => v.value3);
const hexToRgba = (hex: string, opacity: number) => {
	let rgbaColor = "";
	let reg = /^#[\da-f]{6}$/i;
	if (reg.test(hex)) {
		rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt("0x" + hex.slice(3, 5))},${parseInt(
			"0x" + hex.slice(5, 7)
		)},${opacity})`;
	}
	return rgbaColor;
};
const initChart = (): ECharts => {
	const charEle = document.getElementById("AnnualUseChart") as HTMLElement;
	const charEch: ECharts = init(charEle);
	const option = {
		color: color,
		data: ["医生", "用户"],
		// legend: {
		// 	top: 380,
		// 	left: 250,
		// 	textStyle: {
		// 		color: "#9FACBC"
		// 	}
		// },
		tooltip: {
			backgroundColor: "rgba(255,255,255,0.8)",
			trigger: "axis",
			formatter: function (params: any[]) {
				let html = "";
				params.forEach(v => {
					// console.log(v);
					html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
									color[v.componentIndex]
								};"></span>
                ${v.name}年.${v.seriesName}
                <span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                `;
				});

				return html;
			},
			extraCssText: "background: rgba(255,255,255,0.8); border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;",
			axisPointer: {
				type: "cross",
				crossStyle: {
					color: "#fff"
				}
			}
		},
		grid: {
			// top: "50%",
			containLabel: true,
			bottom: "10%"
		},
		xAxis: [
			{
				type: "category",
				boundaryGap: false,
				axisTick: {
					show: false // 隐藏x轴的分割点
				},
				axisPointer: {
					type: "shadow"
				},
				axisLabel: {
					formatter: "{value}年",
					textStyle: {
						color: "#9FACBC"
					}
				},
				// axisLine: {
				// 	lineStyle: {
				// 		color: "#D9D9D9"
				// 	}
				// },
				data: xAxisData
			}
		],
		yAxis: [
			{
				min: 0,
				max: 800,
				interval: 200,
				type: "value",
				name: "数量",
				axisLabel: {
					textStyle: {
						color: "#9FACBC"
					}
				},
				nameTextStyle: {
					color: "#9198A3",
					fontSize: 12,
					align: "right",
					lineHeight: 46
				},
				splitLine: {
					lineStyle: {
						type: "dashed",
						color: "rgba(255,255,255,0.11)"
						// type: "dotted" // 坐标线使用点线
					}
				},
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				}
			}
		],
		series: [
			{
				name: "报告数量",
				type: "line",
				smooth: true,
				// showSymbol: false,/
				symbolSize: 8,
				zlevel: 3,
				itemStyle: {
					normal: {
						color: "#2F72FF", //点的颜色
						lineStyle: {
							color: "#2F72FF", //线的颜色
							width: 5 // 折线图线条粗细设置
						}
					}
				},
				lineStyle: {
					normal: {
						color: color[0],

						shadowBlur: 3,
						shadowColor: hexToRgba(color[0], 0.5),
						shadowOffsetY: 8,
						width: 5
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0,
							0,
							0,
							1,
							[
								{
									offset: 0,
									color: hexToRgba(color[0], 0.2)
								},
								{
									offset: 1,
									color: hexToRgba(color[0], 0)
								}
							],
							false
						),
						shadowColor: hexToRgba(color[0], 0.1),
						shadowBlur: 10
					}
				},
				data: yAxisData1
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
	top: 15%;
	width: 100%;
	height: calc(100% - 350px);
}
.actual-total {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 3.75rem;
	margin-top: 10px;
	margin-right: 4px;
	.top {
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 0.625rem;
		.actual-title {
			display: flex;
			height: 0.625rem;
			margin-top: 0.25rem;

			// margin-left: 0.8rem;
			font-family: "Microsoft YaHei";
			font-size: 0.3rem;
			font-weight: 500;
			line-height: 0.625rem;
			color: #ffffff;
		}
		.actual-itemtotal {
			display: flex;
			flex-direction: row;
			margin-top: 0.25rem;
			margin-left: 0.25rem;
			.actual-item {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 0.6rem;
				height: 0.625rem;

				// padding-left: 10px;

				// margin-right: .0625rem;
				font-family: Arial;
				font-size: 0.4rem;
				font-weight: bold;
				line-height: 30px;
				color: #ffffff;
				background: url("@/assets/images/bigscreen-paihang.png") no-repeat;
				background-size: 100% 100%;
				/* stylelint-disable-next-line no-duplicate-selectors */
				& {
					margin-right: 0.125rem;
				}
			}
		}
	}
	.bottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 2.5rem;
		margin-top: 0.25rem;
		.columnBox {
			display: flex;
			flex-direction: row;
			margin-top: 0.625rem;

			// align-items: center;
			.column1 {
				display: flex;
				flex-direction: column;
				.dataBox {
					display: flex;
					flex-direction: column;
					margin-top: 0.125rem;
					.number {
						height: 0.275rem;
						font-family: Arial;
						font-size: 0.3rem;
						font-weight: 500;
						line-height: 0.275rem;
						color: #2ca6ff;
						text-align: center;
					}
					.data {
						height: 18px;
						margin-top: 0.0925rem;
						font-family: Arial;
						font-size: 0.1875rem;
						font-weight: 400;
						line-height: 18px;
						color: #ffffff;
						text-align: center;
					}
				}
				.image {
					width: 1rem;
					height: 1.5rem;
				}
			}
			.column2 {
				display: flex;
				flex-direction: column;
				margin-left: 1.25rem;
				.dataBox {
					display: flex;
					flex-direction: column;
					margin-top: 0.125rem;
					.number {
						height: 0.275rem;
						font-family: Arial;
						font-size: 0.3rem;
						font-weight: 500;
						line-height: 0.275rem;
						color: #2ca6ff;
						text-align: center;
					}
					.data {
						height: 18px;
						margin-top: 0.0925rem;
						font-family: Arial;
						font-size: 0.1875rem;
						font-weight: 400;
						line-height: 18px;
						color: #ffffff;
						text-align: center;
					}
				}
				.image {
					width: 1rem;
					height: 1.5rem;
				}
			}
			.column3 {
				display: flex;
				flex-direction: column;
				margin-left: 1.25rem;
				.dataBox {
					display: flex;
					flex-direction: column;
					margin-top: 0.125rem;
					.number {
						height: 0.275rem;
						font-family: Arial;
						font-size: 0.3rem;
						font-weight: 500;
						line-height: 0.275rem;
						color: #2ca6ff;
						text-align: center;
					}
					.data {
						height: 18px;
						margin-top: 0.0925rem;
						font-family: Arial;
						font-size: 0.1875rem;
						font-weight: 400;
						line-height: 18px;
						color: #ffffff;
						text-align: center;
					}
				}
				.image {
					width: 1rem;
					height: 1.5rem;
				}
			}
		}
	}
	.divider-box {
		display: flex;
		flex-direction: column;
		height: 0.25rem;
		margin-top: 0.65rem;
		margin-left: 0.25rem;
		.title {
			height: 16px;
			margin-bottom: 0.25rem;
			font-family: "Microsoft YaHei";
			font-size: 16px;
			font-weight: 500;
			line-height: 16px;
			color: #397bff;
		}
	}
}
</style>
