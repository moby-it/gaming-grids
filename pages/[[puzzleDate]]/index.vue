<script setup lang="ts">
import { SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = useSupabaseClient();
const route = useRoute();
const puzzleDate = (route.query.puzzleDate as string) ?? '';
const { data: puzzleId } = await fetchPuzzleIdByDate(supabase, puzzleDate);
</script>
<template>
    <h1 v-if="!puzzleId">Puzzle not found</h1>
    <Game v-else :puzzle-id="puzzleId" />
</template>
