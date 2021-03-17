/** @function isToday
 *  @param {object} someDate - Date object
 *  @return {boolean} */
const isToday = (someDate) => {
	const today = new Date();
	return someDate.getDate() == today.getDate() &&
		someDate.getMonth() == today.getMonth() &&
		someDate.getFullYear() == today.getFullYear();
};

/** @function getHue - get hue based string.
 *  @param {string} str
 *  @return {number} - hue for hsl(a) */
const getHue = str => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	let h = ~~(360 * hash);
	return h % 360;
};

export {
	isToday,
	getHue,
};
