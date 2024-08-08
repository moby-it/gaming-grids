import { User } from '#imports';
import { safeParse } from 'valibot';

export const useAuth = () => {
    const supabase = useSupabaseClient();
    const session = useSupabaseSession();
    const user = computed(() => {
        if (!session.value?.user) return null;
        const { output, success, issues } = safeParse(User, session.value.user);
        if (!success) {
            console.error(issues);
            throw createError('failed to parse fetchUserPuzzle');
        }
        return output;
    });
    const loading = ref(true);

    async function signInWithGoogle(): Promise<void> {
        loading.value = true;
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) throw createError(error);
        loading.value = false;
    }

    async function signOut() {
        loading.value = true;
        const { error } = await supabase.auth.signOut();
        if (error) throw createError(error);
        loading.value = false;
    }
    return {
        user,
        loading,
        signInWithGoogle,
        signOut,
    };
};
