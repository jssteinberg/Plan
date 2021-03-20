<script>
	export let isToday;
	export let index;
	export let day;
	export let month;

	/** @function getDayClasses - Get classes for Day.
	 *  @param {Object} dateObj - JS Date object.
	 *  @param {number} [index=0] - index for .display-day-
	 *  @return {string} - string of classes. */
	const getDayClasses = (dateObj, index = 0) => {
		return `day display-day-${index} day-${dateObj.getDay()} month-${dateObj.getMonth()}`;
	};

	const hueMonth = getH(month);
	let dayClasses = getDayClasses(dateObj, index);
</script>

<section
	class="{dayClasses}"
	style="--h-day:{getH(displayDate)};--h-month:{hueMonth};--index-day:{index};"
	>
	<slot></slot>
</section>

<style>
	section {
		position: relative;
		padding: var(--space, 1rem);
		/* BG for month */
		background: hsla(var(--h-month),100%,50%,15%);
	}

	section.today {
		box-shadow: inset calc(var(--space,1rem) * .4) calc(var(--space,1rem) * .5) hsla(var(--h-month, 0),30%,50%),
		            inset calc(var(--space,1rem) * -.4) calc(var(--space,1rem) * -.5) hsla(var(--h-month, 0),30%,50%);
	}

	section:not(:is(.day-0,.day-6))::before {
		content: '';
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
		z-index: -1;
	}

	:global(.days.color) section:not(:is(.day-0,.day-6))::before {
		/* BG unique day color shade */
		background: hsla(var(--h-day),100%,62.5%,10%);
	}

	section::after {
		content: '';
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
		z-index: -2;
		background: var(--fg-i, white);
		opacity: .9;
	}

	h2 {
		font-weight: 500;
		/* color: hsl(var(--h-day),100%,25%); */
	}

	.today h2 {
		font-weight: bold;
	}

	section:is(.day-0,.day-6):not(.today) h2 {
		color: hsl(var(--h-month),45%,45%);
		font-weight: bold;
	}

	section.display-day-0 h2 {
		color: hsl(var(--h-month),5%,45%);
	}

	span:first-child {
		text-transform: capitalize;
	}

	span {
		display: block;
	}
</style>
