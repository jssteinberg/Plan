<script context="module">
	import { writable } from 'svelte/store';
	export const todayObj = writable(new Date);
</script>

<script>
	import { isToday, getHueFromString as getH } from '../utils.js';
	import { fade } from 'svelte/transition';
	export let locales = null;
	export let index = 0;
	export let length = 14;

	const getDateObjectFromIndex = (i = 0) => {
		if (i === 0) return new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
		else if (i === 1) return new Date();
		else return new Date(new Date().getTime() + (((i - 1) * 24) * 60 * 60 * 1000));
	};
	/** @function initToday - Side effects! Is only run for Day that's today. */
	const initToday = () => {
		const getTime = (dateObj, locales) => {
			const today = new Date();
			if (!isToday(dateObj)) return undefined;
			if (typeof locales === 'string' && locales.length)
				return today.toLocaleTimeString(locales);
			else
				return today.toLocaleTimeString();
		};

		document.documentElement.style.setProperty('--h-today', getH(displayDate));
		document.documentElement.style.setProperty('--h-month', hueMonth);

		dayClasses += ' today';
		time = getTime(dateObj, locales);

		// tick tock clock
		const clock = setInterval(() => {
			time = getTime(dateObj, locales);
			if (typeof time === 'undefined') {
				clearInterval(clock);
				// dispatch event of day change, or something in module or store...
				todayObj.set(new Date());
				dayClasses = getDayClasses(dateObj, 0);
			}
		}, 1000);
	};
	/** @function getDayClasses - Get classes for Day.
	 *  @param {Object} dateObj - JS Date object.
	 *  @param {number} [index=0] - index for .display-day-
	 *  @return {string} - string of classes. */
	const getDayClasses = (dateObj, index = 0) => {
		return `day display-day-${index} day-${dateObj.getDay()} month-${dateObj.getMonth()}`;
	};
	const loadMoreDays = () => {
		length = length + 14;
	};

	const dateObj = getDateObjectFromIndex(index);
	const hueMonth = getH(dateObj.toLocaleDateString('en', {month:'long', year:'numeric'}));
	let displayDate = dateObj.toLocaleDateString();
	let dayClasses = getDayClasses(dateObj, index);
	let time;

	// if locales, update certain variables
	if (locales) {
		displayDate = dateObj.toLocaleDateString(locales, {
			weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
		});
	}

	todayObj.subscribe(() => {
		// if Day is today
		if (isToday(dateObj)) {
			initToday();
		}
	});
</script>

<section class="{dayClasses}" style="--h-day:{getH(displayDate)};--h-month:{hueMonth};--index-day:{index};" in:fade>
	<h2 class="text-h3">
		{#each displayDate.split(' ') as word}
			<span>{word}</span>
		{/each}
		{#if typeof time !== 'undefined'}
			<span>{time}</span>
		{/if}
	</h2>
</section>

{#if index < length}
	<svelte:self index="{index + 1}" {locales} {length} />
{:else}
	<button on:click="{loadMoreDays}">+</button>
{/if}

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
