<script>
	export let dateObj;
	export let locales = null;
	export let index = 0;

	/** @function isToday
	 *  @param {object} someDate - Date object
	 *  @return {boolean} */
	const isToday = (someDate) => {
		const today = new Date();
		return someDate.getDate() == today.getDate() &&
			someDate.getMonth() == today.getMonth() &&
			someDate.getFullYear() == today.getFullYear();
	};
	/** @function getH - get hue based string.
	 *  @param {string} str
	 *  @return {number} - hue for hsl(a) */
	const getH = str => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		let h = ~~(360 * hash);
		return h % 360;
	};

	const localeOpt = {
		weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
	};

	const hueMonth = getH(dateObj.toLocaleDateString('en', {month:'long', year:'numeric'}));
	let displayDate = dateObj.toLocaleDateString(localeOpt);
	let dayClasses = `display-day-${index} day-${dateObj.getDay()} month-${dateObj.getMonth()}`;
	let time;
	let clock;

	// if locales, update certain variables
	if (locales) {
		displayDate = dateObj.toLocaleDateString(locales, localeOpt);
	}

	if (isToday(dateObj)) {
		dayClasses += ' today';
		time = new Date().toLocaleTimeString(locales);
		clock = setInterval(() => {
			time = new Date().toLocaleTimeString(locales);
		}, 1000);
	}
</script>

<section class="{dayClasses}" style="--h-day:{getH(displayDate)};--h-month:{hueMonth};--index-day:{index};">
	<h2 class="text-h3">
		{#each displayDate.split(' ') as word}
			<span>{word}</span>
		{/each}
		{#if typeof time !== 'undefined'}
			<span>{time}</span>
		{/if}
	</h2>
</section>

<style>
	section {
		position: relative;
		padding: var(--space, 1rem);
		/* BG for month */
		background: hsla(var(--h-month),100%,50%,15%);
	}

	/* section:is(.day-0,.day-6) { */
	/* 	background: hsla(var(--h-month),100%,75%,100%); */
	/* } */

	section.today {
		box-shadow: inset calc(var(--space,1rem) * .375) calc(var(--space,1rem) * .5) var(--fg, black),
		            inset calc(var(--space,1rem) * -.375) calc(var(--space,1rem) * -.5) var(--fg, black);
	}

	section:not(:is(.day-0,.day-6))::before {
		content: '';
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
		z-index: -1;
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

	section:is(.day-0,.day-6) h2 {
		color: hsl(var(--h-month),45%,45%);
		font-weight: bold;
	}

	section.display-day-0 h2 {
		color: gray;
	}

	span:first-child {
		text-transform: capitalize;
	}

	span {
		display: block;
	}
</style>
