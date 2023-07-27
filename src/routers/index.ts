import router from "@/routers/router";
import NProgress from "@/config/nprogress";

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from) => {
	NProgress.start();
	// 是否已经登录
	// const globalStore = GlobalStore();
	if (!localStorage.getItem("token") && to.name !== "login") {
		NProgress.done();
		return { name: "login" };
	}
	NProgress.done();
	return true;
});
router.afterEach(() => {
	NProgress.done();
});

export default router;
