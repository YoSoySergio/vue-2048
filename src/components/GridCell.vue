<template>
	<li class="grid__cell" :style="tileBg">
		{{ value > 0 ? value : '' }}
	</li>
</template>

<script lang="ts" setup>
	import { computed, type PropType } from 'vue';

	const props = defineProps({
		value: {
			type: Number as PropType<number>,
			default: () => 0,
		},
	});

	const DARKEST_HUE = 250;
	const HUE_STEP = 10;

	const tileBg = computed(() => {
		if (props.value === 0) return { backgroundColor: 'transparent' };
		const color = DARKEST_HUE + Math.log2(props.value) * HUE_STEP;
		return {
			backgroundColor: `hsl(${color}deg 50% 50%)`,
		};
	});
</script>

<style scoped>
	.grid__cell {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		width: var(--cell-size);
		height: var(--cell-size);
		overflow: hidden;
		color: var(--brand-dark);
		font-weight: bold;
	}
</style>
