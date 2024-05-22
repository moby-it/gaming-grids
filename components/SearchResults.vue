<script setup lang="ts">
const props = defineProps<{
	input: unknown;
}>();
const results = ref<string[] | null>(null);
const el = ref<(HTMLElement | null)[]>([]);
const timeout = ref();
const focusedChoice = ref<number | null>(null);
const emits = defineEmits(["playerChosen"]);
async function fetchResults() {
	const res = await $fetch("/api/champions", {
		query: { search: props.input },
	});
	if (res) {
		results.value = res;
	}
}
onMounted(() => {
	window.addEventListener("keyup", (e) => {
		const focusedListItem = el.value.find((e) => {
			if (e) return e.classList.contains("focused");
		});
		navigateList(e.key, results, focusedChoice, focusedListItem as HTMLLIElement, emits);
	});
});
watchEffect(async () => {
	if (timeout.value) clearTimeout(timeout.value);
	if (props.input) {
		timeout.value = setTimeout(() => {
			fetchResults();
			focusedChoice.value = 0;
		}, 0);
	}
});
</script>

<template>
	<ul class="results" v-if="results && results.length && input">
		<li
			ref="el"
			@mousemove="focusedChoice = index"
			:class="{ focused: focusedChoice === index }"
			v-for="(result, index) of results"
			@click="() => $emit('playerChosen', result)"
		>
			{{ result }}
		</li>
	</ul>
</template>

<style scoped>
.results {
	display: flex;
	flex-direction: column;
	position: absolute;
	margin-top: 50px;
	cursor: pointer;
	background-color: rgba(128, 128, 128, 0.3);
	width: 400px;
	max-height: 300px;
	overflow-y: auto;
	border-radius: 0 0 10px 10px;
	background-color: rgba(0, 89, 128, 0.3);

	li {
		font-family: "Beaufort";
		padding: 9px var(--gap-1);

		&.focused {
			background-color: var(--primary-600);
		}
	}
}

@media (max-width: 992px) {
	.results {
		width: 350px;
		max-height: 200px;
		margin-top: 50px;

		li {
			padding: 2.5px var(--gap-1);
		}
	}
}

@media (max-width: 768px) {
	.results {
		width: 300px;
	}
}

@media (max-width: 576px) {
	.results {
		width: 250px;
		max-height: 180px;
	}
}

@media (max-width: 425px) {
	.results {
		width: 200px;
		max-height: 160px;

		li {
			padding: 5px var(--gap-1);
		}
	}
}
</style>
