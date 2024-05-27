export async function fetchResults(input: unknown, results: Ref<string[] | null>) {
  const res = await $fetch('/api/champions', { query: { search: input } });
  if (res) {
    results.value = res;
  }
}