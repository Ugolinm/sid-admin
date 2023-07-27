import { Login } from "@/api/interface/index";
import Menu from "@/assets/json/menuDoc.json";
import { baseUrls } from "@/api/config/servicePort";
const base1 = baseUrls.base1;

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: any) => {
	return http.post(`${base1}/login`, params); // 正常 post json 请求  ==>  application/json
};

// * 获取菜单列表
export const getMenuList = () => {
	return Menu;
};
