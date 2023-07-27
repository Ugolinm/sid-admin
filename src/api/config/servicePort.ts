// baseURlConfig.js
// 打包上线url 后缀加1
const baseUrl1 = import.meta.env.VITE_API_URL as string;

// 本地url

const baseUrl = "http://localhost:4040";

console.log("base", baseUrl);

export const baseUrls = {
	base1: baseUrl,
	base2: "https://api.alphaecg.cn/bu"
};
