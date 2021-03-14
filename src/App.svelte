<script>
	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style global>
	@import 'floor-typography-css/src/reset.css';
	@import 'floor-typography-css/src/normalize-style.css';
	@import 'floor-typography-css/src/vars.css';
	/* Files below are optional: */
	@import 'floor-typography-css/src/headings-font.css';
	@import 'floor-typography-css/src/headings-font-lg.css' (min-width: 1200px);
	/* Or: @import 'floor-typography-css/src/headings-font-w1200px.css'; */
	@import 'floor-typography-css/src/headings-margin.css';
</style>
