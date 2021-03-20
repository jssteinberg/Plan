/** @function getDays - recursively return an array days starting on dateObj.
 *  @param {Object} dateObj - Date object of day to start on.
 *  @param {Object} [options={}] - options.
 *  @param {string} [options.month] - month to return.
 *  @param {number} [options.length] - number of days to get, fallback to month of first
 *  dateObj.
 *  @param {number} [options.index] - no reason to change (manually).
 *  @return {Object[]} - array of Date objects in order. */
const getDays = (dateObj, options = {}) => {
	if (typeof options.index !== 'number') options.index = 0;
	if (!options.length && !options.month) options.month = dateObj.getMonth();

	const tomorrow = new Date(dateObj.getTime() + (24 * 60 * 60 * 1000));
	options.index = options.index + 1;

	if (options.length && options.index < options.length) {
		return [dateObj].concat(getDays(
			tomorrow,
			options
		));
	} else if (options.month && tomorrow.getMonth() === options.month) {
		return [dateObj].concat(getDays(
			tomorrow,
			options
		));
	} else
		return [dateObj];
};

export default getDays;
