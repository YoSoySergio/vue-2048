import { ref, watch, reactive, onMounted, provide, inject, toRefs, type InjectionKey } from 'vue';
import { createEmptyBoard, move, spawnNewTile, isGameOver } from './game';
import type { GameState, MoveDirection, Board } from './types';

type Key = InjectionKey<ReturnType<typeof provideGameState>>;
const INJECTION_KEY: Key = Symbol('provideGameState');

const DEFAULT_GRID_SIZE = 4;

export function provideGameState() {
	const gridSize = ref(DEFAULT_GRID_SIZE);

	const board = ref<Board>(createEmptyBoard(gridSize.value));
	const score = ref(0);
	const gameOver = ref(false);
	const gameWon = ref(false);

	function startGame() {
		board.value = createEmptyBoard(gridSize.value);
		score.value = 0;
		gameOver.value = false;
		board.value = spawnNewTile(board.value);
		board.value = spawnNewTile(board.value);
	}

	function onMove(string: MoveDirection) {
		if (gameWon.value || gameOver.value) return;
		if (isGameOver(board.value)) {
			gameOver.value = true;
			return;
		}

		const [newBoard, newScore] = move(board.value, string);
		board.value = newBoard;
		score.value += newScore;

		if (score.value >= 2048) {
			gameWon.value = true;
		}

		board.value = spawnNewTile(board.value);
	}

	onMounted(() => {
		startGame();
		window.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'ArrowUp':
					onMove('up');
					break;
				case 'ArrowDown':
					onMove('down');
					break;
				case 'ArrowLeft':
					onMove('left');
					break;
				case 'ArrowRight':
					onMove('right');
					break;
			}
		});
	});

	watch(
		[gridSize],
		() => {
			document.documentElement.style.setProperty('--grid-size', gridSize.value.toString());
		},
		{
			immediate: true,
		},
	);

	const state: GameState = reactive({
		gridSize,
		board,
		startGame,
		move,
		score,
		gameOver,
	});

	const injectedState = { ...toRefs(state) };

	provide(INJECTION_KEY, injectedState);
	return injectedState;
}

export function injectGameState() {
	const state = inject(INJECTION_KEY);
	if (!state) {
		throw new Error('provideGameState function has not been called');
	}
	return state;
}
