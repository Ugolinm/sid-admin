<template>
	<div class="login-page">
		<div class="login-box">
			<div class="right-sc">
				<div class="bd">
					<div class="logo">
						<img src="@/assets/images/login-logo.png" alt="" />
					</div>
					<div class="form-box">
						<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="demo-ruleForm">
							<el-form-item prop="username">
								<el-input
									v-model="loginForm.username"
									style="width: 350px; height: 50px"
									clearable
									:prefix-icon="UserFilled"
									placeholder="请输入账号"
								/>
							</el-form-item>
							<el-form-item prop="password" style="margin-top: 20px">
								<el-input
									v-model="loginForm.password"
									type="password"
									show-password
									style="width: 350px; height: 50px"
									:prefix-icon="Lock"
									placeholder="请输入密码"
								/>
							</el-form-item>
							<el-form-item>
								<!-- <el-checkbox v-model="loginForm.checked" name="type" />
                <p style="padding: 10px">记住密码</p> -->
							</el-form-item>
							<!-- 提交按钮 -->
							<el-form-item>
								<el-button
									type="primary"
									@click="login(loginFormRef)"
									:loading="loading"
									style="width: 350px; height: 50px; margin-top: 20px; background-color: #075fa2; outline: none"
									>登录</el-button
								>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
			<div class="l-box">
				<div class="left-sc">
					<div class="welcome-box">欢迎登录</div>
					<div class="scgl-box">数创医疗管理平台</div>
					<div class="tp"><img src="../../../assets/images/around.png" /></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Login } from "@/api/interface";
import type { ElForm } from "element-plus";
import { ElMessage } from "element-plus";
import { loginApi } from "@/api/modules/login";
import { GlobalStore } from "@/store";
import { Base64 } from "js-base64";
// import { MenuStore } from "@/store/modules/menu";
import { TabsStore } from "@/store/modules/tabs";
// import md5 from "js-md5";
// 引入icon小图标
import { Lock, UserFilled } from "@element-plus/icons-vue";

const globalStore = GlobalStore();
// const menuStore = MenuStore();
const tabStore = TabsStore();

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
// const checked=ref()
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "change" }],
	password: [{ required: true, message: "请输入密码", trigger: "change" }]
});

// 登录表单数据
const loginForm: any = reactive({
	username: "",
	password: "",
	checked: false
});

const loading = ref<boolean>(false);
const router = useRouter();
// login
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			const requestLoginForm: Login.ReqLoginForm = {
				username: loginForm.username,
				password: Base64.encode(loginForm.password),
				checked: loginForm.checked
			};
			const res: any = await loginApi(requestLoginForm);
			// console.log("登录状态", res);
			if (res.code == "200") {
				console.log(res.data);
				localStorage.setItem("token", res.access_token);
				localStorage.setItem("user", res.data?.uname);
				// globalStore.setToken(res.access_token);
				// menuStore.setMenuList([]);
				tabStore.closeMultipleTab();
				ElMessage.success("登录成功！");
				router.push({ name: "doctorHandle" });
			} else {
				ElMessage.warning("登录失败！");
			}
		} finally {
			loading.value = false;
		}
	});
};
onMounted(() => {
	// 监听enter事件（调用登录）
	document.onkeydown = (e: any) => {
		e = window.event || e;
		if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
			if (loading.value) return;
			login(loginFormRef.value);
		}
	};
});
</script>

<style lang="scss" scoped>
.login-page {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: url("@/assets/images/login-bgc.png") no-repeat;
	background-attachment: fixed;
	background-position: center;
	background-size: cover;
	.login-box {
		position: relative;
		display: flex;
		width: 1200px;
		height: 620px;
		margin: 80px auto;
		overflow: hidden;
		border-radius: 20px 0 0 20px;
	}
	.right-sc {
		position: absolute;
		top: 51px;
		left: 650px;
		width: 550px;
		height: 500px;
		background-color: white;
		border-radius: 0 20px 20px 0;
		.bd {
			position: absolute;
			top: 50px;
			left: 110px;
			width: 380px;
			height: 400px;
			.logo {
				margin-top: 10px;
				margin-left: 1.1rem;
			}
			.form-box {
				width: 350px;
				height: 240px;
				margin-top: 45px;
				margin-left: 25px;
			}
		}
	}
	.l-box {
		position: absolute;
		top: -200px;
		left: -282px;
		width: 1000px;
		height: 1000px;

		// background-color: pink;
		background-color: #075fa2;
		border-radius: 50%;
		.left-sc {
			position: absolute;
			top: 200px;
			left: 283px;
			z-index: 999;
			width: 615px;
			height: 600px;
			background-color: #075fa2;
			border-radius: 20px 0 0 20px;
			.welcome-box {
				width: 150px;
				height: 39px;
				margin-top: 44px;
				margin-left: 41px;
				font-size: 28px;
				font-weight: 300;
				line-height: 39px;
				color: rgb(255 255 255 / 80%);
				letter-spacing: 4px;
			}
			.scgl-box {
				width: 487px;
				height: 67px;
				margin-top: 30px;
				margin-left: 110px;
				font-size: 45px;
				color: #ffffff;
				letter-spacing: 14px;
			}
			.tp {
				width: 550px;
				height: 350px;
				margin-top: 40px;
				margin-left: 70px;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
