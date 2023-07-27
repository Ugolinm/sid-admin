<template>
	<!-- 数据来源 -->

	<div class="echarts" id="map"></div>
	<div class="right-bar">
		<span class="bar-title">全国</span>
		<div class="bar-list">
			<span class="list-left">医生</span>
			<div class="list-right">
				<span class="num">3034</span>
				<span class="unit">名</span>
			</div>
		</div>
		<div class="bar-list">
			<span class="list-left">使用者</span>
			<div class="list-right">
				<span class="num">3034</span>
				<span class="unit">名</span>
			</div>
		</div>
		<div class="bar-list">
			<span class="list-left">设备</span>
			<div class="list-right">
				<span class="num">3034</span>
				<span class="unit">台</span>
			</div>
		</div>
		<div class="bar-list">
			<span class="list-left">心电数据</span>
			<div class="list-right">
				<span class="num">2223034</span>
				<span class="unit">份</span>
			</div>
		</div>
		<div class="bar-list">
			<span class="list-left">报告</span>
			<div class="list-right">
				<span class="num">133034</span>
				<span class="unit">份</span>
			</div>
		</div>
	</div>
	<!-- <div class="right-bar"></div> -->
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from "echarts";
// import mapJson from "../assets/china.json";
// import echarts from "@/utils/echarts";
import * as echarts from "echarts";
import { chinaMap } from "@/assets/map/china";
import { ref } from "vue";
// echarts.registerMap("china", chinaMap as any);
/* echarts sysmbol */
let mapData = ref();
echarts.registerMap("china", chinaMap as any);
const initChart = (): ECharts => {
	const echartsBox = document.getElementById("map") as HTMLElement;
	const echarts: ECharts = init(echartsBox);

	const option = {
		// backgroundColor: "#0A1851",
		geo: {
			top: "20%",
			map: "china",
			// right: "10%",

			type: "map",
			roam: false,
			zoom: 1.3,
			scaleLimit: { min: 0, max: 3 }, // 缩放级别
			// regions: [
			// 	{
			// 		name: "南海诸岛",
			// 		value: 0,
			// 		itemStyle: {
			// 			normal: {
			// 				opacity: 0,
			// 				label: {
			// 					show: true
			// 				}
			// 			}
			// 		}
			// 	}
			// ],
			itemStyle: {
				areaColor: "#BAE7FF", //默认的地图板块颜色
				borderWidth: 1,
				borderColor: "#F6FCFF"
			}
		},

		tooltip: {
			trigger: "item",
			show: false
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
	echarts.on("click", function (params: any) {
		// console.log("地图", params.name);
		mapData.value = params.name;
	});
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
	width: 70%;
	height: 100%;
}
.right-bar {
	display: flex;
	flex-direction: column;
	width: 28%;
	height: 5.5rem;
	margin-top: 1rem;

	// align-items: center;
	// justify-content: center;
	margin-right: 0.375rem;
	background: linear-gradient(322deg, #fdfeff 0%, #f4f6fb 100%);
	border-radius: 6px;
	.bar-title {
		height: 0.3125rem;

		// height: 0.625rem;
		margin-top: 0.1875rem;
		margin-left: 0.1875rem;
		font-family: "Microsoft YaHei";
		font-size: 16px;
		font-weight: bold;
		line-height: 0.3125rem;
		color: #333333;
	}
	.bar-list {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 13%;
		margin-top: 0.25rem;
		margin-right: 0.125rem;
		margin-left: 0.125rem;
		background: rgb(255 255 255 / 90%);
		border-radius: 4px;
		box-shadow: 6px 0 20px 0 rgb(33 87 188 / 10%);
		.list-left {
			height: 0.3rem;
			margin-left: 0.15rem;
			font-family: "Microsoft YaHei";
			font-size: 16px;
			font-weight: 400;
			line-height: 0.3rem;
			color: #666666;
		}
		.list-right {
			display: flex;
			flex-direction: row;
			margin-right: 0.1875rem;
			.num {
				height: 0.275rem;
				font-family: Arial;
				font-size: 20px;
				font-weight: bold;
				line-height: 0.275rem;
				color: #333333;
			}
			.unit {
				height: 0.3rem;
				margin-left: 0.1rem;
				font-family: "Microsoft YaHei";
				font-size: 0.2rem;
				font-weight: 400;
				line-height: 0.3rem;
				color: #999999;
			}
		}
	}
}
</style>
