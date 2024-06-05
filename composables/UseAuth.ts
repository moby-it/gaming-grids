
export const useAuth = () => {
    const supabase = useSupabaseClient();
    const session = useSupabaseSession();
    const user = ref();
    const loading = ref(true);
    supabase.auth.onAuthStateChange((event, session) => {
        setTimeout(async () => {
            await fetchUser()
        }, 0)
    })

    async function fetchUser() {
        user.value = session?.value?.user || null;
        loading.value = false;
    }

    async function signInWithGoogle(): Promise<void> {
        loading.value = true;
        const { data: res, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
        if (error) console.log(error); else await fetchUser();
    }

    async function signOut() {
        loading.value = true;
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error); else await fetchUser();

    }
    return {
        user: computed(() => user.value),
        loading: computed(() => loading.value),
        signInWithGoogle,
        signOut,
        fetchUser,
    }
}
