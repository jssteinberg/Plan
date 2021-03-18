/** @function getDays - recursively return an array days starting on dateObj.
 *  @param {number} length - number of daysto get.
 *  @param {Object} dateObj - Date object of day to start on.
 *  @param {number} [index=1] - no reason to change (manually).
 *  @return {Object[]} - array of days following each other. */
const getListOfDays = (length, dateObj, index = 1) => {
	if (index < length)
		return [dateObj].concat(getListOfDays(
			length,
			// get day after current
			new Date(dateObj.getTime() + (24 * 60 * 60 * 1000)),
			index + 1
		));
	else
		return [dateObj];
};

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
const getHue = (str) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	const h = ~~(360 * hash);
	return h % 360;
};

export {
	getListOfDays,
	isToday,
	getHue,
};
