export default defineNuxtRouteMiddleware((to, from) => {
    if (from.query.puzzleDate && !to.query.puzzleDate) {
        return navigateTo({ ...to, query: from.query });
    }
});
