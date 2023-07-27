// import * as crypto from "crypto";
export function getTime(timeStamp: any) {
	// 13位时间戳转时间
	const date = new Date(timeStamp);
	let y = date.getFullYear();
	let m: any = date.getMonth() + 1;
	m = m < 10 ? "0" + m : m;
	let d: any = date.getDate();
	d = d < 10 ? "0" + d : d;
	let currentdate = y + "-" + m + "-" + d;
	let hh: any = date.getHours();
	hh = hh < 10 ? "0" + hh : hh;
	let mm: any = date.getMinutes();
	mm = mm < 10 ? "0" + mm : mm;
	let ss: any = date.getSeconds();
	ss = ss < 10 ? "0" + ss : ss;
	let time = hh + ":" + mm + ":" + ss;
	return currentdate + " " + time;
}
