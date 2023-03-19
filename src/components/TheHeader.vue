<template>
	<header class="game__header">
		<div v-if="gameOver" class="game__header-notification">
			<h3 class="game__header-text">{{ gameWon ? 'You Won!' : 'Game Over' }}</h3>
			<button class="game__header-action" @click="startGame">Start again?</button>
		</div>
		<h2 class="game__score">Score: {{ score }}</h2>
	</header>
</template>

<script lang="ts" setup>
	import { injectGameState } from '@/game-state-provider';
	import { computed } from 'vue';

	const { score, gameOver, startGame } = injectGameState();
	const gameWon = computed(() => score.value >= 2048 && gameOver.value);
</script>

<style lang="scss" scoped>
	.game {
		&__header {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
		}

		&__score {
			font-weight: 200;
			font-size: 3.2rem;
			margin-top: 0;
		}

		&__header-notification {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 2rem;
		}

		&__header-text {
			margin: 0;
			font-size: 1.8rem;
			font-weight: 300;
		}

		&__header-action {
			background-color: transparent;
			border: none;
			color: var(--brand-main);
			position: relative;
			cursor: pointer;
			margin-left: 1rem;
			font-size: 1.4rem;

			&::after {
				content: '';
				position: absolute;
				bottom: -2px;
				left: 50%;
				transform: translateX(-50%);
				height: 2px;
				width: 60%;
				background-color: var(--brand-main);
				transition: width 600ms cubic-bezier(0.68, -0.6, 0.32, 1.6);
			}

			&:hover::after {
				width: 100%;
			}
		}
	}
</style>
