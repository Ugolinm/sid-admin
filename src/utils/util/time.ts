export function handleTime(data: any) {
	let arr = "";
	if (data == undefined) {
		arr = "0";
	} else if (data <= 3600) {
		arr = (data / 60).toFixed(2) + "min";
	} else {
		arr = (data / 3600).toFixed(2) + "h";
	}
	return arr;
}
