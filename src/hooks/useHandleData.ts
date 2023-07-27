import { ElMessageBox, ElMessage } from "element-plus";
import { h } from "vue";
// import { HandleData } from "./interface";

/**
 * @description 操作单条数据信息(二次确认【删除、禁用、启用、重置密码】)
 * @param {Function} api 操作数据接口的api方法(必传)
 * @param {Object} params 携带的操作数据参数 {id,params}(必传)
 * @param {String} message 提示信息(必传)
 * @param {String} confirmType icon类型(不必传,默认为 warning)
 * @return Promise
 */
export const useHandleData = <P = any, R = any>(
	api: (params: P) => Promise<R>,
	params: any,
	message: string
	// confirmType: HandleData.MessageType = "warning"
) => {
	return new Promise((resolve, reject) => {
		ElMessageBox({
			title: "解冻",
			message: h("p", null, [
				h("span", null, "您确定解冻 "),
				h("span", { style: "color: #207BBA" }, `${message}`),
				h("span", null, "医师的账户吗？")
			])
		}).then(async () => {
			const res = await api(params);
			if (!res) return reject(false);
			ElMessage({
				type: "success",
				message: `解冻成功!`
			});
			resolve(true);
		});
	});
};
export const freezeHandleData = <P = any, R = any>(
	api: (params: P) => Promise<R>,
	params: any,
	message: string
	// confirmType: HandleData.MessageType = "warning"
) => {
	return new Promise((resolve, reject) => {
		ElMessageBox({
			title: "冻结",
			message: h("p", null, [
				h("span", null, "您确定冻结 "),
				h("span", { style: "color: #207BBA" }, `${message}`),
				h("span", null, "医师的账户吗？")
			])
		}).then(async () => {
			const res = await api(params);
			if (!res) return reject(false);
			ElMessage({
				type: "success",
				message: `冻结成功!`
			});
			resolve(true);
		});
	});
};
// 删除信息
export const deleData = <P = any, R = any>(
	api: (params: P) => Promise<R>,
	params: any,
	message?: string
	// confirmType: HandleData.MessageType = "warning"
) => {
	return new Promise((resolve, reject) => {
		ElMessageBox({
			title: "套餐删除",
			message: "您确定删除这条套餐吗？"
		}).then(async () => {
			const res = await api(params);
			if (!res) return reject(false);
			ElMessage({
				type: "success",
				message: `删除成功!`
			});
			resolve(true);
		});
	});
};
