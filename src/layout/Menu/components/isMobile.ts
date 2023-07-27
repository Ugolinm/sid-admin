export const isMobile = (): boolean => {
	let flag = navigator.userAgent.match(
		/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|Bl ackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windo ws Phone)/i
	);
	if (flag === null) {
		return false;
	} else {
		return true;
	}
};
