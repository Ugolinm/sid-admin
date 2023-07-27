<!-- 医师区域排名TOP10 -->

<template>
	<div demo-bg class="chart">
		<dv-scroll-board class="board" :config="config" style="width: 350px; height: 240px" />
	</div>
</template>

<script lang="ts" setup>
// @mouseover="mouseoverHandler"
// @click="clickHandler"
import { reactive } from "vue";

const config = reactive({
	header: ["排名", "医师数量", "地区", "接诊量"],
	data: [
		["1", "610", "北京", "12345"],
		["2", "484", "上海", "33421"],
		["3", "437", "江苏", "42819"],
		["4", "624", "西安", "33333"],
		["5", "289", "南京", "29867"],
		["6", "333", "深圳", "11902"],
		["7", "423", "云南", "88993"],
		["8", "25", "天津", "99999"],
		["9", "667", "宁夏", "28833"],
		["10", "2", "河北", "66666"]
	],
	index: false,
	// columnWidth: [50],
	align: ["center"],

	indexHeader: "排名",
	oddRowBGC: "#0C225A", // 奇数行背景色
	evenRowBGC: "#0A1851" // 偶数行背景色
});

// const mouseoverHandler = (e: any) => {
// 	// console.log(e);
// };

// const clickHandler = (e: any) => {
// 	// console.log(e);
// };
</script>
<style lang="scss" scoped>
.chart {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 0.8rem;
	::v-deep .board .header {
		background: #0a1851 !important;
		border-radius: 4px;
		box-shadow: inset 0 0 19px 0 rgb(103 210 244 / 41%);
	}
	/* stylelint-disable-next-line selector-type-no-unknown */
	.dv-scroll-board {
		// background: #0a1851;
		// border-radius: 4px;
		// box-shadow: inset 0 0 19px 0 rgb(103 210 244 / 41%);
		::v-deep .header-item {
			font-family: "Microsoft YaHei";
			font-size: 0.2rem;
			color: #0e9cff;
		}
		::v-deep .ceil {
			font-family: "Microsoft YaHei";
			font-size: 0.2rem;
			color: #ffffff;
		}
	}
}

// ::v-deep .board {
// 	background: #0a1851;
// 	border-radius: 4px;
// 	box-shadow: inset 0 0 19px 0 rgb(103 210 244 / 41%);
// }
</style>
