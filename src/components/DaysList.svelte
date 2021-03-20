<script>
	import Day from './Date.svelte';
	import { getDays } from '../utils.js';

	export let fromDate = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
	// Get days, starting with yesterday
	const days = getDays(fromDate, {length: 31});
</script>

{#each days as day,i}
	<div class="day-wrapper">
		<Day dateObj="{day}" locales="no" index="{i}" />
	</div>
{/each}
