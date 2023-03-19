<template>
	<ul class="grid">
		<GridCell v-for="(cell, index) in cells" :key="index" :value="cell.value" />
	</ul>
</template>

<script lang="ts" setup>
	import { computed } from 'vue';
	import GridCell from './GridCell.vue';
	import { injectGameState } from '@/game-state-provider';

	const { board } = injectGameState();

	const cells = computed(() => board.value.flatMap((row, y) => row.map((value, x) => ({ x, y, value }))));
</script>

<style scoped>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--grid-size), 1fr);
		grid-template-rows: repeat(var(--grid-size), 1fr);
		gap: var(--cell-gap);
		margin: 0;
		padding: 0;
		position: relative;
	}
</style>
