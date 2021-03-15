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
			hash = str.charCodeAt(i) + ((hash << 4) - hash);
		}
		let h = ~~(360 * hash);
		return h % 360;
	};

	const localeOpt = {
		weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
	};

	let displayDate = dateObj.toLocaleDateString(localeOpt);
	let dayClass = '';
	let hueMonth = getH(dateObj.toLocaleDateString());
	let time;
	let clock;

	// if locales, update certain variables
	if (locales) {
		displayDate = dateObj.toLocaleDateString(locales, localeOpt);
		hueMonth = getH(dateObj.toLocaleDateString(locales, {month:'long', year:'numeric'}));
	}

	if (isToday(dateObj)) {
		dayClass='today';
		time = new Date().toLocaleTimeString(locales);
		clock = setInterval(() => {
			time = new Date().toLocaleTimeString(locales);
		}, 1000);
	}
</script>

<section class="{dayClass}" style="--h-day: {getH(displayDate)};--h-month:{hueMonth};--index-day:{index};">
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
		background: hsla(var(--h-month),100%,50%,15%);
	}

	section.today {
		box-shadow: inset 0 0 0 calc(var(--space,1rem) / 3) var(--fg-invert, hsla(0,0%,100%,87.5%));
	}

	section::before {
		content: '';
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
		background: var(--fg-invert, white);
		z-index: -2;
	}

	/* Darker shade based on index */
	section::after {
		content: '';
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
		/* background: linear-gradient( */
		/* 	to right bottom, */
		/* 	hsla(0,0%,50%,calc(1% * var(--index-day))), */
		/* 	hsla(0,0%,50%,calc(1% * (var(--index-day) + 1))) */
		/* ); */
		background: hsla(var(--h-day),100%,calc(100% - 2% * var(--index-day)),5%);
		z-index: -1;
	}

	h2 {
		font-weight: 500;
		/* color: hsl(var(--h-day),100%,25%); */
	}

	span:first-child {
		text-transform: capitalize;
	}

	span {
		display: block;
	}
</style>
