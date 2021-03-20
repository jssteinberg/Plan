<script>
	import { getDays } from '../utils.js';
	export let fromDate = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
	const days = getDays(fromDate);
</script>

{#each days as day,index}
	<Day
		isToday="{index === 1 ? 'true' : 'false'}"
		{index}
		day="{day.getDay()}"
		month="{day.getMonth()}"
		>
		<h2 class="text-h3">
			{#each displayDate.split(' ') as word}
				<span>{word}</span>
			{/each}
			{#if typeof time !== 'undefined'}
				<span>{time}</span>
			{/if}
		</h2>
	</Day>
{/each}
