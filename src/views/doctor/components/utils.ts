// 获取当前处理的时间
export function getTime() {
	// const dt = new Date();
	// return date;
	const date = new Date();
	let y = date.getFullYear();
	let m: any = date.getMonth() + 1;
	m = m < 10 ? "0" + m : m;
	let d: any = date.getDate();
	d = d < 10 ? "0" + d : d;
	let currentdate = y + "." + m + "." + d;
	let hh: any = date.getHours();
	hh = hh < 10 ? "0" + hh : hh;
	let mm: any = date.getMinutes();
	mm = mm < 10 ? "0" + mm : mm;
	let ss: any = date.getSeconds();
	ss = ss < 10 ? "0" + ss : ss;
	let time = hh + ":" + mm + ":" + ss;
	return currentdate + " " + time;
}
enum TS_DIGIT {
	_10 = 10,
	_13 = 13
}
export function ts(digit = TS_DIGIT._13): number {
	const t = new Date().getTime();
	if (digit === TS_DIGIT._10) return Math.floor(t / 1000);
	else return t;
}
