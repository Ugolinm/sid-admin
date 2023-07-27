import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";
const formRouter: Array<RouteRecordRaw> = [
	{
		path: "/xindian",
		component: Layout,
		redirect: "/xindian/xindianHandle",
		meta: {
			title: "心电管理"
		},
		children: [
			{
				path: "/xindian/xindianHandle",
				name: "xindianHandle",
				component: () => import("@/views/xindian/xindianHandle/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "心电概况",
					key: "xindianHandle"
				}
			},
			{
				path: "/xindian/xindianList",
				name: "xindianList",
				component: () => import("@/views/xindian/xindianList/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "心电列表",
					key: "xindianList"
				}
			}
		]
	}
];

export default formRouter;
