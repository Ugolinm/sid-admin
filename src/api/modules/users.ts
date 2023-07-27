import http from "@/api";
import { baseUrls } from "@/api/config/servicePort";
const base1 = baseUrls.base1;
// 使用者模块接口
export const getUserData = () => {
	return http.post(`${base1}/user/home`);
};
export const getUserNewData = (parmas: any) => {
	return http.post(`${base1}/user/trend`, {
		date: parmas
	});
};
// 使用者表格数据
export const getTableData = (p: any) => {
	return http.post(`${base1}/user/table`, {
		p: p
	});
};
export const getTableHistory = (id: any, p: any) => {
	return http.post(`${base1}/user/history`, {
		id: id,
		p: p
	});
};
// 下载pdf文件测试接口
export const download = () => {
	return http.get(`${base1}/user/downpdf`, {}, { responseType: "blob" });
};
// 导出excel多条 /doctor/setAdminData
export const dataExc = (params: any) => {
	return http.post(`${base1}/user/exportExcel`, { exactData: params }, { responseType: "blob" });
};
// 导出excel单条
export const dataExcSin = (params: any) => {
	return http.post(`${base1}/user/exportExcelSin`, { exactData: params }, { responseType: "blob" });
};
