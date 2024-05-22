<script setup lang="ts">
const model = defineModel();
const emits = defineEmits(["playerChosen"]);
const handlePlayerChosen = (playerName: string) => {
	emits("playerChosen", playerName);
};
</script>

<template>
	<section class="search">
		<input autocomplete="off" id="search-player" v-model="model" placeholder="Type a player name" />
		<SearchResults :input="model" @player-chosen="handlePlayerChosen" />
	</section>
</template>

<style scoped>
.search {
	display: flex;
	width: 400px;
	flex-direction: column;
	height: 50px;
	padding-top: 20px;

	& input {
		background-color: rgba(0, 89, 128, 0.3);
		flex: 1;
		border-radius: 10px 10px 0 0;
	}

	& input:focus {
		outline: none;
	}
}

@media (max-width: 992px) {
	.search {
		width: 350px;
		margin-left: 25px;
	}
}

@media (max-width: 768px) {
	.search {
		width: 300px;
		margin-left: 40px;
	}
}

@media (max-width: 576px) {
	.search {
		padding-top: 0;
		width: 250px;
		margin-left: 50px;
	}
}

@media (max-width: 425px) {
	.search {
		padding-top: 10px;
		width: 200px;
		margin-left: 67px;
	}
}
</style>
