<template>
	<TheHeader />
	<TheGrid />
</template>

<script setup lang="ts">
	import TheHeader from './TheHeader.vue';
	import TheGrid from '@/components/TheGrid.vue';
	import { provideGameState } from '@/game-state-provider';

	provideGameState();
</script>
