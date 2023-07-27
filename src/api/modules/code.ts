import http from "@/api";
import { baseUrls } from "@/api/config/servicePort";
const base1 = baseUrls.base1;
const base2 = baseUrls.base2;
// 权益码新增
export const addcodes = (p: any) => {
	return http.post(`${base1}/code/add`, {
		form: p
	});
};
// 权益码列表数据展示
export const getTable = (p: any) => {
	return http.post(`${base1}/code/table`, {
		p: p
	});
};
// 导出权益码数据
export const dataExc = (p: any, n: any) => {
	return http.post(`${base1}/code/download`, { exactData: p, userId: n }, { responseType: "blob" });
};

// 权益码兑换状态实时更新
export const changeRedeem = (p: any) => {
	return http.post(`${base2}/pat_app/redeem-status`, p);
};
// 导出权益码全部数据
export const dataExcAll = (p: any, n: any, u: any) => {
	return http.post(`${base1}/code/downloadAll`, { exactData: p, userId: n, uuid: u }, { responseType: "blob" });
};
export const getAllData = () => {
	return http.post(`${base1}/code/getAllData`, {});
};
// 写入领用记录
export const insertHist = (p: any, n: any, u: any) => {
	return http.post(`${base1}/code/exportList`, { num: p, userId: n, uuid: u });
};
// 权益码详情列表
export const getExactInfo = (p: any) => {
	return http.post(`${base1}/code/exactList`, {
		p: p
	});
};
