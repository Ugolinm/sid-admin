import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 表单 Form 模块
const formRouter: Array<RouteRecordRaw> = [
	{
		path: "/report",
		component: Layout,
		redirect: "/report/reportHandle",
		meta: {
			title: "报告管理"
		},
		children: [
			{
				path: "/report/reportHandle",
				name: "reportHandle",
				component: () => import("@/views/report/reportHandle/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "报告概况",
					key: "reportHandle"
				}
			},
			{
				path: "/report/reportList",
				name: "reportList",
				component: () => import("@/views/report/reportList/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "报告列表",
					key: "reportList"
				}
			}
		]
	}
];

export default formRouter;
