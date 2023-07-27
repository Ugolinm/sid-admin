import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

const formRouter: Array<RouteRecordRaw> = [
	{
		path: "/user",
		component: Layout,
		redirect: "/user/userHandle",
		meta: {
			title: "使用者管理"
		},
		children: [
			{
				path: "/user/userHandle",
				name: "userHandle",
				component: () => import("@/views/user/userHandle/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用者概况",
					key: "userHandle"
				}
			},
			{
				path: "/user/userList",
				name: "userList",
				component: () => import("@/views/user/userList/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用者列表",
					key: "userList"
				}
			},
			{
				path: "/user/userList",
				name: "userHistory",
				component: () => import("@/views/user/userList/userhistory.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用者列表",
					key: "userHistory"
				}
			}
		]
	}
];

export default formRouter;
