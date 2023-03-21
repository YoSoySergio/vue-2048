<template>
	<li class="grid__cell">
		<Transition name="fade">
			<span v-if="value > 0" class="grid__tile" :style="tileBg">
				{{ value }}
			</span>
		</Transition>
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
	}

	.grid__tile {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		color: var(--brand-dark);
		font-weight: bold;
		border-radius: 100%;
		width: var(--cell-size);
		height: var(--cell-size);
	}
</style>

<style>
	.fade-enter-active,
	.fade-leave-active {
		transition: transform 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		transform: scale(0);
	}
</style>
