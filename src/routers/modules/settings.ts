import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 设置模块
const settingRouter: Array<RouteRecordRaw> = [
	{
		path: "/settings",
		component: Layout,
		redirect: "/settings/servelist",
		meta: {
			title: "设置"
		},
		children: [
			{
				path: "/settings/servelist",
				name: "servelist",
				component: () => import("@/views/settings/servelist/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "服务套餐",
					key: "servelist"
				}
			},
			{
				path: "/settings/code",
				name: "code",
				component: () => import("@/views/settings/code/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "权益码管理",
					key: "code"
				}
			},
			{
				path: "/settings/code",
				name: "codeInfo",
				component: () => import("@/views/settings/code/codeInfo.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "权益码列表详情",
					key: "codeInfo"
				}
			}
		]
	}
];

export default settingRouter;
