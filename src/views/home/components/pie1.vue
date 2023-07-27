<template>
	<!-- 数据来源 -->
	<div class="title">医师职称占比</div>
	<div class="echarts" id="pie1"></div>
	<!-- <div class="right-bar"></div> -->
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";
// import mapJson from "../assets/china.json";
// import echarts from "@/utils/echarts";
// import * as echarts from "echarts";
import { colorList } from "@/assets/map/pie1";
import { ref, toRaw } from "vue";

// echarts.registerMap("china", chinaMap as any);
/* echarts sysmbol */

const initChart = (data: any): ECharts => {
	const subText = ref();
	const echartsBox = document.getElementById("pie1") as HTMLElement;
	const echarts: ECharts = init(echartsBox);
	// console.log("pie1", data);
	let exactData = toRaw(data.data);
	let total = toRaw(data.total);
	// console.log("");

	const option = {
		title: [
			{
				text: "总人数",
				left: "39%",
				top: "46%",
				textAlign: "center",
				textBaseline: "middle",
				textStyle: {
					color: "#666666",
					fontWeight: "normal",
					fontSize: 20
				}
			},
			{
				text: total,
				left: "39%",
				top: "53%",
				textAlign: "center",
				textBaseline: "middle",
				textStyle: {
					color: "#1D2129",
					fontWeight: "normal",
					fontSize: 22
				}
			}
		],
		// title: {
		// 	top: "43%",
		// 	left: "32%",
		// 	// x: "center",
		// 	// y: "center",
		// 	text: "{val|总人数}\n{name|" + total + "}{val|}",
		// 	// subtext: 9999,

		// 	textStyle: {
		// 		align: "center",
		// 		rich: {
		// 			name: {
		// 				fontSize: 22,
		// 				fontWeight: "normal",
		// 				color: "#1D2129",
		// 				padding: [8, 25]
		// 			},
		// 			val: {
		// 				fontSize: 18,
		// 				fontWeight: "normal",
		// 				color: "#4E5969",
		// 				padding: [0, 15]
		// 			}
		// 		}
		// 	}
		// },
		// {
		//         text: "总人数",
		//         left: '49%',
		//         top: '46%',
		//         textAlign: 'center',
		//         textBaseline: 'middle',
		//         textStyle: {
		//             color: '#999',
		//             fontWeight: 'normal',
		//             fontSize: 20
		//         }
		//     }, {
		//         text: total,
		//         left: '49%',
		//         top: '51%',
		//         textAlign: 'center',
		//         textBaseline: 'middle',
		//         textStyle: {
		//             color: '#666',
		//             fontWeight: 'normal',
		//             fontSize: 40
		//         }
		//     },
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
		// 右侧标识符
		legend: [
			{
				type: "scroll",
				orient: "vertical",
				icon: "roundRect",
				left: "70%",
				align: "left",
				top: "20%",
				itemGap: 30,
				itemWidth: 16,
				itemHeight: 16,
				textStyle: {
					color: "#000000"
				},
				data: exactData.name
			}
		],
		series: [
			{
				// hoverAnimation: true,
				type: "pie",
				center: ["40%", "50%"],
				radius: ["35%", "60%"],
				clockwise: true,
				avoidLabelOverlap: false,
				hoverOffset: 20,
				// roseType: "radius",
				// clockwise: true,
				// avoidLabelOverlap: true,
				// hoverOffset: 15,
				itemStyle: {
					normal: {
						shadowColor: "rgba(255,255,255,0.88)",
						shadowBlur: 60,
						color: function (params: any) {
							return colorList[params.dataIndex];
						}
					}
				},
				label: {
					show: true,
					position: "inner",
					formatter: function (data1: any) {
						//.toFixed(0)去掉小数位，如果为2就是保留两位小数
						let b = data1.percent.toFixed(0) + "%";
						subText.value = b;
						return b;
					},

					rich: {
						hr: {
							backgroundColor: "t",
							borderRadius: 3,
							width: 3,
							height: 3,
							padding: [3, 3, 0, -12]
						},
						a: {
							padding: [-30, 15, -20, 15]
						}
					}
				},

				labelLine: {
					normal: {
						length: 20,
						length2: 30,
						lineStyle: {
							width: 1
						}
					},
					emphasis: {
						show: true
					}
				},
				data: exactData
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
	// right: 20%;
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
