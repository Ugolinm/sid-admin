// import { RouteRecordRaw } from "vue-router";
// import { Layout } from "@/routers/constant";

// // 表单 Form 模块
// const formRouter: Array<RouteRecordRaw> = [
// 	{
// 		path: "/device",
// 		component: Layout,
// 		redirect: "/device/deviceHandle",
// 		meta: {
// 			title: "设备管理"
// 		},
// 		children: [
// 			{
// 				path: "/device/deviceHandle",
// 				name: "deviceHandle",
// 				component: () => import("@/views/device/deviceHandle/index.vue"),
// 				meta: {
// 					keepAlive: true,
// 					requiresAuth: true,
// 					title: "设备概况",
// 					key: "deviceHandle"
// 				}
// 			},
// 			{
// 				path: "/device/deviceList",
// 				name: "deviceList",
// 				component: () => import("@/views/device/deviceList/index.vue"),
// 				meta: {
// 					keepAlive: true,
// 					requiresAuth: true,
// 					title: "统计列表",
// 					key: "deviceList"
// 				}
// 			},
// 			{
// 				path: "/device/deviceList",
// 				name: "deviceDetails",
// 				component: () => import("@/views/device/deviceList/deviceDetails/deviceDetail.vue"),
// 				meta: {
// 					keepAlive: true,
// 					requiresAuth: true,
// 					title: "统计列表",
// 					key: "deviceDetails"
// 				}
// 			}
// 		]
// 	}
// ];

// export default formRouter;
