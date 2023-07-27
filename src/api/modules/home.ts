import http from "@/api";
// import qs from "qs";
/**
 * @name 首页模块
 */
// * 首页接口
export const gethomeList1 = (params?: object) => {
	return http.post("/home/init", params); // 正常 post json 请求  ==>  application/json
	// return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	// return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	// return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};
export const gethomeList2 = (params: any) => {
	return http.post("/home/inits", {
		date: params
	}); // 正常 post json 请求  ==>  application/json
};
