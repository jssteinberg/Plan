<script>
	import Day from './components/Day.svelte';

	/** @function getDays
	 *  @param {number} length - number of day to get
	 *  @param {Object} dateObj - new Date()
	 *  @param {number} [index=1] - no reason to fuck with
	 *  @return {Object[]} - array of days */
	const getDays = (length, dateObj, index = 1) => {
		if (index < length)
			return [dateObj].concat(getDays(
				length,
				// get day after current
				new Date(dateObj.getTime() + (24 * 60 * 60 * 1000)),
				index + 1
			));
		else
			return [dateObj];
	};
	// Get days, starting with yesterday
	const days = getDays(31, new Date(new Date().getTime() - (24 * 60 * 60 * 1000)));
</script>

<main>
	{#each days as day,i}
		<Day dateObj="{day}" locales="no" index="{i}" />
	{/each}
</main>

<style global>
	@import 'floor-typography-css/src/reset.css';
	@import 'floor-typography-css/src/normalize-style.css';
	@import 'floor-typography-css/src/vars.css';
	/* Files below are optional: */
	@import 'floor-typography-css/src/headings-font.css';
	@import 'floor-typography-css/src/headings-font-lg.css' (min-width: 1200px);
	@import 'floor-typography-css/src/headings-margin.css';

	:root {
		--space: calc(1rem * (1 + var(--added-lead)));
		--font-system: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
		--fg: hsl(0,0%,5%);
		--fg-invert: white;

		background: var(--fg);
	}

	@media (prefers-color-scheme: dark) {
		:root {
			--fg: hsl(0,0%,90%);
			--fg-invert: hsl(0,0%,10%);
			background: var(--fg-invert);
		}
	}

	body {
		margin: 0;
		font-family: var(--font-system);
		color: var(--fg);
	}

	main {
		display: grid;
		/* Use ch or ex for relative to font-family */
		grid-template-columns: repeat(var(--cols, 1), 1fr);
	}

	@media (min-width: 600px) { main { --cols: 3; } }
	@media (min-width: 1200px) { main { --cols: 4; } }
	@media (min-width: 1800px) { main { --cols: 5; } }
	@media (min-width: 2100px) { main { --cols: 6; } }
</style>
