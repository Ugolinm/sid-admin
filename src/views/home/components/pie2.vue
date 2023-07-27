<template>
	<!-- 数据来源 -->
	<div class="title">男女占比</div>
	<div class="echarts" id="pie2"></div>
	<!-- <div class="right-bar"></div> -->
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";
import { toRaw } from "vue";

// import { toRaw } from "vue";
// import { sexYdata } from "@/assets/map/pie2";

// echarts.registerMap("china", chinaMap as any);
/* echarts sysmbol */

const initChart = (data: any): ECharts => {
	const echartsBox = document.getElementById("pie2") as HTMLElement;
	const echarts: ECharts = init(echartsBox);

	let exactData = toRaw(data.data);

	// console.log("男女", Array.isArray(exactData)); // true);

	const option = {
		grid: {
			// top: "20%",
			// left: "7%",
			right: "70%"
			// bottom: "10%",

			// containLabel: true
		},
		// title: {
		//  text: "性别分布",
		//  subtext: "",
		//  left: "left"
		// },
		// tooltip: {
		//  trigger: "item"
		// },
		tooltip: {
			confine: false,
			appendToBody: true,
			trigger: "item",
			backgroundColor: "rgba(255,255,255,0.8)", //通过设置rgba调节背景颜色与透明度
			color: "black",
			borderWidth: "1",
			borderColor: "transparent",
			textStyle: {
				color: "#333333"
			}
			// formatter: function (data1: any) {
			//  //.toFixed(0)去掉小数位，如果为2就是保留两位小数
			//  let b = data1.percent.toFixed(0) + "%";
			//  subText.value = b;
			//  return b;
			// }
		},
		legend: {
			orient: "vertical",
			left: "70%",
			top: "50%",
			itemWidth: 14,
			itemHeight: 14,
			itemGap: 30
		},
		color: ["#FF7272", "#0081FF"],

		series: [
			{
				name: "男女占比",
				type: "pie",
				radius: "60%",
				center: ["40%", "50%"],
				data: exactData,
				label: {
					show: true,
					position: "inside",
					// formatter: (params: any) => {
					// 	console.log("par", params);
					// },
					formatter: (params: any) => {
						const unit = params.unit || "";
						console.log("par", params);

						return "{a|" + params.name + "占" + unit + params.percent + "%}";
					},
					rich: {
						a: {
							color: "#ffffff",
							fontSize: 14,
							height: 16,
							align: "center"
						}
					}
				},
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)"
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
	// left: 10%;
	width: 100%;
	height: 400px;
}
.title {
	display: flex;
	height: 0.3rem;
	margin-left: 0.275rem;
	font-family: "Microsoft YaHei";
	font-size: 0.225rem;
	font-weight: 500;
	line-height: 0.3rem;
	color: #333333;
}
</style>
