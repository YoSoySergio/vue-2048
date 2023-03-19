<template>
	<main class="game__wrapper">
		<The2048Game />
	</main>
</template>

<script setup lang="ts">
	import The2048Game from '@/components/The2048Game.vue';
</script>

<style scoped>
	.game__wrapper {
		width: 100%;
		height: 100%;
		max-width: 600px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
