<!-- <template>
	<div class="st-table">
		<el-table :data="table.tableData" border style="width: 100%">
			<el-table-column prop="date" label="日期" width="180"> </el-table-column>
			<el-table-column prop="name" label="姓名" width="180">
				<template #default="scope">
					<input type="text" v-model="scope.row.name" v-show="scope.row.iseditor" />
					<span v-show="!scope.row.iseditor">{{ scope.row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="地址">
				<template #default="scope">
					<input type="text" v-model="scope.row.address" v-show="scope.row.iseditor" />
					<span v-show="!scope.row.iseditor">{{ scope.row.address }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="300">
				<template #default="scope">
					<el-button @click="edit(scope.row, scope)">编辑</el-button>
					<el-button @click="save(scope.row)">保存</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script setup lang="ts">
import { reactive } from "vue";

const table = reactive({
	tableData: [
		{
			date: "2016-05-02",
			name: "王小虎",
			address: "",
			iseditor: false
		},
		{
			date: "2016-05-04",
			name: "王小虎",
			address: "上海市普陀区金沙江路 1517 弄",
			iseditor: false
		},
		{
			date: "2016-05-01",
			name: "王小虎",
			address: "上海市普陀区金沙江路 1519 弄",
			iseditor: false
		},
		{
			date: "2016-05-03",
			name: "王小虎",
			address: "上海市普陀区金沙江路 1516 弄",
			iseditor: false
		}
	]
});

const edit = (row: any, index: any) => {
	row.iseditor = true;
};
const save = (row: any, index?: any) => {
	console.log(row);

	row.iseditor = false;
};
</script>
<style lang="scss" scoped>
.st-table {
	padding: 10px;
}
</style> -->
