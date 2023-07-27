import http from "@/api";
import { baseUrls } from "@/api/config/servicePort";
const base1 = baseUrls.base1;

export const addPkg = (form: any) => {
	return http.post(`${base1}/pkg/add`, {
		form: form
	});
};
export const getTableData = (params: any) => {
	return http.post(`${base1}/pkg/table`, {
		p: params
	});
};
export const changePkg = (form1: any) => {
	return http.post(`${base1}/pkg/edit`, {
		form1: form1
	});
};
export const delPkg = (quantity: any) => {
	return http.post(`${base1}/pkg/del`, {
		quantity: quantity
	});
};
