// import { RouteRecordRaw } from "vue-router";
// import { Layout } from "@/routers/constant";

// // 表单 Form 模块
// const formRouter: Array<RouteRecordRaw> = [
// 	{
// 		path: "/response",
// 		component: Layout,
// 		redirect: "/response/responseHandle",
// 		meta: {
// 			title: "反馈管理"
// 		},
// 		children: [
// 			{
// 				path: "/response/responseHandle",
// 				name: "responseHandle",
// 				component: () => import("@/views/response/responseHandle/index.vue"),
// 				meta: {
// 					keepAlive: true,
// 					requiresAuth: true,
// 					title: "反馈概况",
// 					key: "responseHandle"
// 				}
// 			},
// 			{
// 				path: "/response/responseList",
// 				name: "responseList",
// 				component: () => import("@/views/response/responseList/index.vue"),
// 				meta: {
// 					keepAlive: true,
// 					requiresAuth: true,
// 					title: "反馈列表",
// 					key: "responseList"
// 				}
// 			}
// 		]
// 	}
// ];

// export default formRouter;
