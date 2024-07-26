<script setup lang="ts">
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const route = useRoute();
const puzzleDate = route.query.puzzleDate ? (route.query.puzzleDate as string) : '';
const puzzleIdStore = usePuzzleIdStore();
const { puzzleId, loading } = storeToRefs(puzzleIdStore);
puzzleIdStore.getPuzzleId(puzzleDate);
</script>
<template>
    <h1 v-if="loading">Loading</h1>
    <h1 v-else-if="!puzzleId">Puzzle not found</h1>
    <Game v-else :puzzle-id="puzzleId" />
</template>
