import http from "@/api";
import { baseUrls } from "@/api/config/servicePort";
const base1 = baseUrls.base1;
const base2 = baseUrls.base2;
// 心电模块接口
export const getXindianData = () => {
	return http.post(`${base1}/xindian/home`);
};
export const getXindianNewData = (parmas: any) => {
	return http.post(`${base1}/xindian/trend`, {
		date: parmas
	});
};
// 心电表格数据
export const getTableData = (p: any) => {
	return http.post(`${base1}/xindian/table`, {
		p: p
	});
};
// 导出excel多条 /doctor/setAdminData
export const dataExc = (params: any) => {
	return http.post(`${base1}/xindian/exportExcel`, { exactData: params }, { responseType: "blob" });
};
// 下载心电信息
export const xindianExc = (userId: any, dataId: any) => {
	return http.post(`${base2}/doc_web/fetch-data/${userId}/${dataId}`, {}, { responseType: "blob" });
	// f1e80453 - a6d7 - 4375 - acfe - 9ad7942db7ce  b86039f6 - 473c - 4ecb - a69b - f56aea94f9b1.dat
	//https://api.alphaecg.cn/bu/doc_web/fetch-data/b54301ad-211e-4917-b902-3949b4d8823b/8c564dcb-bb16-4cc0-96a5-46774b7b0a72.DAT
};
