<script lang="ts" setup>
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const route = useRoute();

const puzzleDate = route.params.puzzleDate as string;
const puzzleId = await fetchPuzzleIdByDate(supabase, puzzleDate);
</script>
<template>
    <h1 v-if="!puzzleId">Puzzle not found</h1>
    <MostPopularGame v-else :puzzle-id="puzzleId" />
</template>

<style></style>
