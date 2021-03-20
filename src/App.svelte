<script>
	import Days from './components/DaysRecursive.svelte';
</script>

<main>
	<div class="days color">
		<Days locales="no" />
	</div>
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
		--black: hsl(0,0%,2.5%);
		--black-2: hsl(0,0%,10%);
		--fg: var(--black);
		--fg-i: white;
		--root-bg: hsl(var(--h-month,0),20%,10%);
		background: var(--root-bg);
		min-height: 100vh;
	}

	@media (prefers-color-scheme: dark) {
		:root {
			--fg: hsl(0,0%,95%);
			--fg-i: var(--black-2);
		}
	}

	body {
		margin: 0;
		font-family: var(--font-system);
		color: var(--fg);
	}

	main {
		/* Days further down gets a subtle gradually darker bg */
		background: linear-gradient(var(--root-bg),var(--black));
		min-height: 100vh;
	}

	.days {
		display: grid;
		/* Use ch or ex for relative to font-family */
		grid-template-columns: repeat(var(--cols, 1), 1fr);
		position: relative;
		z-index: 2;
	}

	.days :global(.day) {
		height: 100%;
	}

	@media (min-width: 600px) { main { --cols: 3; } }
	@media (min-width: 1200px) { main { --cols: 4; } }
	@media (min-width: 1800px) { main { --cols: 5; } }
	@media (min-width: 2100px) { main { --cols: 6; } }
</style>
