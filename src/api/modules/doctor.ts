import http from "@/api";
import { baseUrls } from "@/api/config/servicePort";
const base1 = baseUrls.base1;
const base2 = baseUrls.base2;
// import qs from "qs";
/**
 * @name 医生模块
 */
// * 医生模块数据接口
export const getdoctorList1 = (params?: object) => {
	return http.post(`${base1}/doctor/home`, params);
};
export const getdoctorListTop = (params?: object) => {
	return http.post(`${base1}/doctor/homeTop`, params);
};
// * 医生模块趋势图数据联动时间接口
export const getdoctorList2 = (params: any) => {
	return http.post(`${base1}/doctor/trend`, {
		date: params
	}); // 正常 post json 请求  ==>  application/json
};

// 医生列表表格全部数据
export const getdoctorTableTol = (params: any) => {
	return http.post(`${base1}/doctor/table`, {
		p: params
	});
};

// 医生列表切换数据
export const getdoctorTableTols = (params: any, tab?: any) => {
	return http.post(`${base1}/doctor/tables`, {
		p: params,
		tab: tab
	});
};

// 医生列表审核dialog提交表单
export const getdoctorDialogForm = (params: any) => {
	return http.post(`${base1}/doctor/table-check`, {
		form: params
	});
};
// * 医生列表解冻用户
export const deleteUser = (params: any) => {
	return http.post(`${base1}/doctor/table-resolve`, {
		resolve: params
	});
};
//医生列表冻结用户
export const freezeUser = (params: any) => {
	return http.post(`${base1}/doctor/table-freeze`, {
		freeze: params
	});
};
//医生列表获取详情展示数据
export const loadExactData = (params: any) => {
	return http.post(`${base1}/doctor/table-exact`, {
		id: params
	});
};
//医生列表诊断情况展示数据
export const loadDiagnosedData = (id: any, p: any) => {
	return http.post(`${base1}/doctor/table/diagnosed`, {
		id: id,
		p: p
	});
};
//医生列表诊断情况查询数据
export const searchDiagnosedData = (id: any, p: any) => {
	return http.post(`${base1}/doctor/table/diagnosed`, {
		id: id,
		p: p
	});
};

// 下载pdf文件测试接口
export const download = () => {
	return http.get(`${base1}/doctor/downpdf`, {}, { responseType: "blob" });
};

//改变权限的接口
export const changeRight = (params: any) => {
	return http.post(`${base1}/doctor/roleChange`, {
		role: params
	});
};
//回显权限数据
export const getRight = (params: any) => {
	return http.post(`${base1}/doctor/roleData`, {
		id: params
	});
};

//登记所有信息
export const setAllData = (params: any) => {
	return http.post(`${base1}/doctor/setData`, {
		data: params
	});
};
export const getCheckData = (params: any) => {
	return http.post(`${base1}/doctor/checkList`, {
		id: params
	});
};
export const viewReport = (pdf: any) => {
	return http.post(`${base2}/${pdf}`);
};
// 导出excel多条 /doctor/setAdminData
export const dataExc = (params: any) => {
	return http.post(`${base1}/exportExcel`, { exactData: params }, { responseType: "blob" });
};
// 导出excel单条
export const dataExcSin = (params: any) => {
	return http.post(`${base1}/exportExcelSin`, { exactData: params }, { responseType: "blob" });
};
// 结算接口
export const calcuData = (params: any) => {
	return http.post(`${base1}/doctor/table/diagnosedSelect`, { form: params });
};
export const expData = (params: any) => {
	return http.post(`${base1}/doctor/table/exportData`, { exactData: params }, { responseType: "blob" });
};
// getImages
export const getImages = (params: any) => {
	return http.post(`${base2}/doc_web/fetch-image/${params}`);
};
