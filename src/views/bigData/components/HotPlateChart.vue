<template>
	<!-- 医生概况 -->
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
		<div class="actual-center">
			<span class="title">按职称占比</span>
			<img class="divider" src="@/assets/images/bigscreen-divider.png" />
		</div>
	</div>

	<div class="echarts" id="HotPlateChart"></div>
</template>

<script setup lang="ts">
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
// import { ref, Ref } from "vue";
import { ECharts, init } from "echarts";
import { colorList, legendData1, data1 } from "@/assets/map/pie1";
import { ref } from "vue";
// const actualTotal: Ref<string> = ref("216908");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const subText = ref();
const initChart = (): ECharts => {
	const charEle = document.getElementById("HotPlateChart") as HTMLElement;
	const charEch: ECharts = init(charEle);
	let total = data1.reduce((a, b) => {
		return a + b.value * 1;
	}, 0);
	const option = {
		title: {
			top: "48%",
			left: "23%",

			text: "{name|" + total + "}\n{val|总人数}",
			// subtext: 9999,

			textStyle: {
				align: "center",
				rich: {
					name: {
						fontSize: 20,
						fontWeight: "normal",
						color: "#31FBFB",
						padding: [8, 10]
					},
					val: {
						fontSize: 16,
						fontWeight: "normal",
						color: "#96C3F6",
						padding: [0, 10]
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
			// formatter: function (data1: any) {
			// 	//.toFixed(0)去掉小数位，如果为2就是保留两位小数
			// 	let b = data1.percent.toFixed(0) + "%";
			// 	subText.value = b;
			// 	return b;
			// }
		},

		// 右侧标识符
		legend: [
			{
				type: "scroll",
				orient: "vertical",
				icon: "roundRect",
				left: "65%",
				// align: "left",
				top: "25%",
				itemGap: 30,
				itemWidth: 16,
				itemHeight: 16,

				textStyle: {
					color: "#FFFFFF"
				},
				formatter: function (name: any) {
					let res = data1.filter(v => v.name === name);
					let percent = ((res[0].value * 100) / total).toFixed(2);
					return name + "    " + percent + "%";
				},

				data: legendData1
			}
		],
		series: [
			{
				type: "pie",
				radius: ["30%", "65%"],
				center: ["30%", "60%"],
				roseType: "radius",
				itemStyle: {
					normal: {
						shadowColor: "#031033",
						shadowBlur: 60,
						color: function (params: any) {
							return colorList[params.dataIndex];
						}
					}
				},
				label: {
					show: false,
					color: "inherit",
					// position: "inner",
					fontSize: 14,
					formatter: "{b} {d}%"
				},

				data: data1
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
	height: calc(100% - 100px);
	padding-top: 0.375rem;
}
.actual-total {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 0.625rem;
	margin-top: 10px;
	margin-right: 4px;

	// background-color: #ffffff;
	.panel-data {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		width: 8rem;
		padding: 0 0.375rem;

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
	.actual-center {
		display: flex;
		flex-direction: column;
		padding-top: 0.25rem;
		padding-left: 0.125rem;
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
