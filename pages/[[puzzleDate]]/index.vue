<script setup lang="ts">
import type { Champion, GameStatus } from '#imports';
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const route = useRoute();
const puzzleDate = route.params.puzzleDate as string;
console.log('puzzle date', puzzleDate);
const puzzleId = await fetchPuzzleIdByDate(supabase, puzzleDate);
</script>
<template>
    <h1 v-if="!puzzleId">Puzzle not found</h1>
    <Game v-else :puzzle-id="puzzleId" />
</template>
