import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 表单 Form 模块
const formRouter: Array<RouteRecordRaw> = [
	{
		path: "/doctor",
		component: Layout,
		redirect: "/doctor/doctorHandle",
		meta: {
			title: "医生管理"
		},
		children: [
			{
				path: "/doctor/doctorHandle",
				name: "doctorHandle",
				component: () => import("@/views/doctor/doctorHandle/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "医生列表",
					key: "doctorHandle"
				}
			},
			{
				path: "/doctor/doctorList",
				name: "doctorList",
				component: () => import("@/views/doctor/doctorList/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "医生概况",
					key: "doctorList"
				}
			},
			{
				path: "/doctor/doctorHandle",
				name: "doctorHistory",
				component: () => import("@/views/doctor/doctorHandle/doctorhistory.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "医生诊断记录列表",
					key: "doctorHistory"
				}
			},
			{
				path: "/doctor/doctorHandle",
				name: "doctorInfo",
				component: () => import("@/views/doctor/doctorHandle/doctorInfo.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "医生详情",
					key: "doctorInfo"
				}
			}
		]
	}
];

export default formRouter;
