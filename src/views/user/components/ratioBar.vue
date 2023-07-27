<template>
	<!-- 男女比例 -->

	<div class="echarts" id="ratioBar"></div>
	<!-- <div v-if="initNum == 0" class="bar">暂无数据</div> -->
	<!-- </div> -->
</template>

<script setup lang="ts">
import { ECharts, EChartsOption, init } from "echarts";
import { ref } from "vue";
// import { ref } from "vue";
// const initNum = ref(0);
// var total = ref();
const initChart = (data: any): ECharts => {
	/* 获取容器 */
	// total.value = data;
	console.log("获取到了吗", data);
	const maleValue = ref();
	const femaleValue = ref();
	const label1 = ref();
	const label2 = ref();
	// let maleValue = data[0]?.man_num;
	// let femaleValue = data[0]?.woman_num;

	let total = ref();
	let malePercent = ref();
	//label那里要根据总数为0动态显示为文字暂无数据 有数据则正常显示男女比例
	let femalePercent = ref();
	if (data[0]?.total_num == 0) {
		maleValue.value = 1;
		femaleValue.value = 0;
		total.value = maleValue.value + femaleValue.value;
		malePercent.value = maleValue.value / total.value;
		label1.value = "暂无数据";
		label2.value = "暂无数据";
	} else {
		maleValue.value = data[0]?.man_num;
		femaleValue.value = data[0]?.woman_num;
		total.value = maleValue.value + femaleValue.value;
		femalePercent.value = femaleValue.value / total.value;
		// woman_num.value = data[0]?.woman_num;
		malePercent.value = maleValue.value / total.value;
		label1.value = `${(malePercent.value * 100).toFixed(2)}%`;
		label2.value = `${(femalePercent.value * 100).toFixed(2)}%`;
	}
	console.log("data", data);

	console.log("1", total.value, malePercent.value, femalePercent.value);

	const charEle = document.getElementById("ratioBar") as HTMLElement;
	/* 生成echarts */
	const charEch: ECharts = init(charEle);
	const option: EChartsOption = {
		xAxis: {
			type: "value",
			show: false
		},
		grid: {
			left: 20,
			// top: "30px",
			bottom: 20,
			right: 20
		},
		yAxis: [
			{
				type: "category",
				position: "left",
				data: ["男生"],
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: false,
					formatter: "{value}" + data.woman * 100 + "%"
				}
			},
			{
				type: "category",
				position: "right",
				data: ["女士"],
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: false,
					padding: [20, 0, 40, -60],
					fontSize: 12,
					lineHeight: 60,
					color: "rgba(255, 255, 255, 0.9)",
					// formatter: "{value}" + data.woman * 100 + "%",
					rich: {
						a: {
							color: "transparent",
							lineHeight: 30,
							fontFamily: "digital",
							fontSize: 12
						}
					}
				}
			}
		],
		series: [
			{
				type: "bar",
				barWidth: 20,
				data: [malePercent.value],
				z: 20,
				itemStyle: {
					borderRadius: 10,
					color: "#0081FF"
					//最底层的默认bar
				}
			},
			{
				type: "bar",
				barWidth: 20,
				data: [0],
				barGap: "-100%",
				itemStyle: {
					borderRadius: 10,
					color: "#0081FF"
				},
				label: {
					show: true,
					position: "insideLeft",
					offset: [0, 25],
					color: "#666666",
					formatter: `{name|男士 }: {value|${label1.value}}`,
					rich: {
						name: {
							color: "#666"
						},
						value: {
							color: "#0081FF"
						}
					}
				}
			},
			{
				type: "bar",
				barWidth: 20,
				data: [1],
				barGap: "-100%",
				itemStyle: {
					borderRadius: 10,
					color: "#FF7272"
				},
				label: {
					show: true,
					position: "insideRight",
					offset: [0, 25],
					color: "#666666",
					formatter: `{name|女士 }: {value|${label2.value}}`,
					rich: {
						name: {
							color: "#666"
						},
						value: {
							color: "#FF7272"
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
	height: 2.2rem;
}
.bar {
	display: flex;
	margin: 0 auto;
	margin-top: 1.25rem;
}
</style>
