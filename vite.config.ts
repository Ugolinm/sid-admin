import { defineConfig, UserConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// import { wrapperEnv } from "./src/utils/getEnv";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import eslintPlugin from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx";
export default defineConfig((): UserConfig => {
	// const env = loadEnv(mode, process.cwd());
	// const viteEnv = wrapperEnv(env);

	return {
		base: "/",
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/var.scss";`
				}
			}
		},
		server: {
			// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
			host: "0.0.0.0",
			// port: viteEnv.VITE_PORT,
			open: true,
			cors: true,
			// 代理跨域（mock 不需要配置跨域，直接能访问，）
			proxy: {
				"/api": {
					// target: "https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0", // fastmock
					target: "https://mock.mengxuegu.com/mock/631995274944d71a56f261c9/zoey", // easymock
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				}
			}
		},
		plugins: [
			vue(),
			createHtmlPlugin({
				inject: {
					data: {
						title: "数创管理平台"
					}
				}
			}),
			// * 使用 svg 图标
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), "src/assets/icons")],
				symbolId: "icon-[dir]-[name]"
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * vite 可以使用 jsx/tsx 语法
			vueJsx(),
			// * name 可以写在 script 标签上
			VueSetupExtend(),
			// * gzip compress

			viteCompression({
				verbose: true,
				disable: false,
				threshold: 10240,
				algorithm: "gzip",
				ext: ".gz"
			})
			// * cdn 引入（vue按需引入会导致依赖vue的插件出现问题(列如:pinia/vuex)）
		],
		// * 打包去除 console.log && debugger
		esbuild: {
			pure: ["console.log", "debugger"]
		},
		build: {
			outDir: "dist",
			minify: "esbuild",
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		}
	};
});
