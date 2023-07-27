import http from "@/api";
import { baseUrls } from "@/api/config/servicePort";
const base1 = baseUrls.base1;
const base2 = baseUrls.base2;
// 心电模块接口
export const getReportData = () => {
	return http.post(`${base1}/report/home`);
};
export const getReportNewData = (parmas: any) => {
	return http.post(`${base1}/xindian/trend`, {
		date: parmas
	});
};
export const getTableData = (p: any) => {
	return http.post(`${base1}/report/table`, {
		p: p
	});
};

// 导出excel多条 /doctor/setAdminData
export const dataExc = (params: any) => {
	return http.post(`${base1}/report/exportExcel`, { exactData: params }, { responseType: "blob" });
};
// 下载报告
export const reportExc = (params: any) => {
	return http.post(`${base2}/doc_web/fetch-pdf/${params}`, {}, { responseType: "blob" });
};
