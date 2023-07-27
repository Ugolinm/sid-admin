<template>
	<!-- 中间地图 -->
	<div class="echarts-header">
		<div class="first"></div>
		<div class="second">全国</div>
		<div class="everyItem">
			<span class="left-i">医生:</span>
			<span class="right-number">3334</span>
			<span class="right-number">名</span>
		</div>
		<div class="everyItem">
			<span class="left-i">患者:</span>
			<span class="right-number">2638</span>
			<span class="right-number">名</span>
		</div>
		<div class="everyItem">
			<span class="left-i">设备:</span>
			<span class="right-number">78</span>
			<span class="right-number">台</span>
		</div>
		<div class="everyItem4">
			<span class="left-i">心电数据:</span>
			<span class="right-number">874567</span>
			<span class="right-number">条</span>
		</div>
		<div class="everyItem5">
			<span class="left-i">报告数据:</span>
			<span class="right-number">874567</span>
			<span class="right-number">条</span>
		</div>
	</div>
	<div class="echarts" id="mapChart"></div>
</template>

<script setup lang="ts">
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import { ECharts, init } from "echarts";
import echarts from "@/utils/echarts";
import mapJson from "../assets/china.json";
/* echarts sysmbol */

const initChart = (): ECharts => {
	const charEle = document.getElementById("mapChart") as HTMLElement;
	const charEch: ECharts = init(charEle);
	echarts.registerMap("china", mapJson as any);
	const option = {
		// backgroundColor: "#0A1851",
		geo: {
			top: "110px",
			map: "china",
			roam: false,
			zoom: 1.6,
			scaleLimit: { min: 0, max: 3 }, // 缩放级别
			regions: [
				{
					name: "南海诸岛",
					value: 0,
					itemStyle: {
						normal: {
							opacity: 0,
							label: {
								show: false
							}
						}
					}
				}
			],
			itemStyle: {
				areaColor: "#292955", //默认的地图板块颜色
				borderWidth: 1,
				borderColor: "#1EB1DF"
			}
		},

		tooltip: {
			trigger: "item"
		},

		//配置属性
		series: [
			{
				name: "数据",
				type: "map",
				mapType: "china",
				roam: false,
				geoIndex: 0,
				label: {
					show: true //省份名称,
				},
				data: [
					{ name: "北京", value: Math.round(Math.random() * 500) },
					{ name: "天津", value: Math.round(Math.random() * 500) },
					{ name: "上海", value: Math.round(Math.random() * 500) },
					{ name: "重庆", value: Math.round(Math.random() * 500) },
					{ name: "河北", value: Math.round(Math.random() * 500) },
					{ name: "河南", value: Math.round(Math.random() * 500) },
					{ name: "云南", value: Math.round(Math.random() * 500) },
					{ name: "辽宁", value: Math.round(Math.random() * 500) },
					{ name: "黑龙江", value: Math.round(Math.random() * 500) },
					{ name: "湖南", value: Math.round(Math.random() * 500) },
					{ name: "安徽", value: Math.round(Math.random() * 500) },
					{ name: "山东", value: Math.round(Math.random() * 500) },
					{ name: "新疆", value: Math.round(Math.random() * 500) },
					{ name: "江苏", value: Math.round(Math.random() * 500) },
					{ name: "浙江", value: Math.round(Math.random() * 500) },
					{ name: "江西", value: Math.round(Math.random() * 500) },
					{ name: "湖北", value: Math.round(Math.random() * 500) },
					{ name: "广西", value: Math.round(Math.random() * 500) },
					{ name: "甘肃", value: Math.round(Math.random() * 500) },
					{ name: "山西", value: Math.round(Math.random() * 500) },
					{ name: "内蒙古", value: Math.round(Math.random() * 500) },
					{ name: "陕西", value: Math.round(Math.random() * 500) },
					{ name: "吉林", value: Math.round(Math.random() * 500) },
					{ name: "福建", value: Math.round(Math.random() * 500) },
					{ name: "贵州", value: Math.round(Math.random() * 500) },
					{ name: "广东", value: Math.round(Math.random() * 500) },
					{ name: "青海", value: Math.round(Math.random() * 500) },
					{ name: "西藏", value: Math.round(Math.random() * 500) },
					{ name: "四川", value: Math.round(Math.random() * 500) },
					{ name: "宁夏", value: Math.round(Math.random() * 500) },
					{ name: "海南", value: Math.round(Math.random() * 500) },
					{ name: "台湾", value: Math.round(Math.random() * 500) },
					{ name: "香港", value: Math.round(Math.random() * 500) },
					{ name: "澳门", value: Math.round(Math.random() * 500) }
				] //数据
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
	height: calc(100% - 120px);
}
.echarts-header {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	// justify-content: flex-start;

	// justify-content: center;
	width: 95%;
	height: 0.7rem;
	margin: auto;
	margin-top: 0.8rem;
	background: rgb(19 76 131 / 24%);

	// background-color: aquamarine;
	border-radius: 0;
	opacity: 1;

	/* 水平主轴居中 */

	/* 垂直交叉轴居中 */
	.first {
		// left: 50%;
		display: flex;
		width: 0.05rem;
		height: 0.2rem;
		background: #08fefe;
		border-radius: 0;
		opacity: 1;
	}
	.second {
		display: flex;
		width: 0.7rem;

		// margin: auto;
		margin-left: 0.3rem;
		font-family: "Microsoft YaHei";
		font-size: 16px;
		font-weight: 500;
		color: #08fefe;
	}
	.everyItem {
		display: flex;

		// flex-direction: row;
		align-items: center;
		width: 13%;

		// width: 60%;9
		// justify-content: flex-start;
		height: 0.375rem;
		margin-left: 0.4rem;

		// margin-left: 0.3rem;
		.left-i {
			display: flex;
			flex-direction: row;
			height: 0.25rem;
			font-family: "Microsoft YaHei";
			font-size: 14px;
			font-weight: 400;
			line-height: 0.25rem;
			color: rgb(243 249 255 / 70%);
		}
		.right-number {
			height: 20px;
			margin-left: 0.125rem;
			font-family: "Microsoft YaHei";
			font-size: 14px;
			font-weight: 400;
			line-height: 20px;
			color: #ffffff;
		}
	}
	.everyItem4 {
		display: flex;

		// flex-direction: row;
		align-items: center;
		width: 20%;
		height: 0.375rem;
		.left-i {
			display: flex;
			flex-direction: row;
			height: 0.25rem;
			font-family: "Microsoft YaHei";
			font-size: 14px;
			font-weight: 400;
			line-height: 0.25rem;
			color: rgb(243 249 255 / 70%);
		}
		.right-number {
			height: 20px;
			margin-left: 0.125rem;

			// margin-left: 0.1rem;
			font-family: "Microsoft YaHei";
			font-size: 14px;
			font-weight: 400;
			line-height: 20px;
			color: #ffffff;
		}
	}
	.everyItem5 {
		display: flex;

		// flex-direction: row;
		align-items: center;
		width: 20%;

		// width: 60%;9
		// justify-content: flex-start;
		height: 0.375rem;

		// margin-left: 0.4rem;

		// margin-left: 0.3rem;
		.left-i {
			display: flex;
			flex-direction: row;
			height: 0.25rem;
			font-family: "Microsoft YaHei";
			font-size: 14px;
			font-weight: 400;
			line-height: 0.25rem;
			color: rgb(243 249 255 / 70%);
		}
		.right-number {
			height: 20px;
			margin-left: 0.125rem;
			font-family: "Microsoft YaHei";
			font-size: 14px;
			font-weight: 400;
			line-height: 20px;
			color: #ffffff;
		}
	}
}
</style>
