import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
// import "@/assets/fonts/font.scss";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// custom element css
import "@/styles/element.scss";
// vue Router
import router from "@/routers/index";
// vue i18n
import I18n from "@/language/index";
// pinia store
import pinia from "@/store/index";
// svg icons
import "virtual:svg-icons-register";
// import "./utils/rem.js";
import "./utils/flexible.js";

// main.ts中全局引入
const app = createApp(App);

// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(router).use(I18n).use(pinia).use(ElementPlus).mount("#app");
