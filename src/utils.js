/** @function isToday
 *  @param {object} dateObj - Date object
 *  @return {boolean} */
const isToday = (dateObj) => {
	const today = new Date();
	return dateObj.getDate() == today.getDate() &&
		dateObj.getMonth() == today.getMonth() &&
		dateObj.getFullYear() == today.getFullYear();
};

/** @function getHue - get hue based string.
 *  @param {string} str
 *  @return {number} - hue for hsl(a) */
const getHueFromString = (str) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	const h = ~~(360 * hash);
	return h % 360;
};

export {
	isToday,
	getHueFromString,
};
