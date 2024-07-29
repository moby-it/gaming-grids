<script setup lang="ts">
import NavBar from './NavBar.vue';
const { user, signOut } = useAuth();
const { showHelpModal } = useHelpModal();
const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 425);
</script>
<template>
    <header>
        <div>
            <h2 class="logo" @click="async () => navigateTo('/')">
                <NuxtImg src="/LoL_Icon_Flat_GOLD.png" />eagueGrid
            </h2>
            <ClientOnly>
                <NavBar v-if="!isMobile" />
            </ClientOnly>
            <div>
                <svg
                    @click="showHelpModal"
                    width="30px"
                    height="30px"
                    stroke-width="1.7"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#c8aa6f"
                        stroke-width="1.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999"
                        stroke="#c8aa6f"
                        stroke-width="1.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M12 18.01L12.01 17.9989"
                        stroke="#c8aa6f"
                        stroke-width="1.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
                <HelpModal />

                <div
                    v-show="!user"
                    class="g_id_signin"
                    data-type="standard"
                    data-shape="pill"
                    data-theme="filled_black"
                    data-text="signin"
                    data-size="medium"
                    data-logo_alignment="left"
                ></div>
                <User
                    v-if="user"
                    :name="user.name"
                    :email="user.email"
                    :avatar-url="user.avatarUrl"
                    @log-out="signOut"
                />
            </div>
        </div>
        <ClientOnly>
            <NavBar v-if="isMobile" />
        </ClientOnly>
    </header>
</template>

<style scoped>
svg {
    cursor: pointer;
}

img {
    height: var(--gap-6);
}

header {
    border-bottom: 1px solid var(--accent-300);
}
header > div {
    margin: 0 auto;
    display: flex;
    padding: var(--gap-3);
    justify-content: space-between;
    align-items: center;
    color: var(--accent-300);
    max-width: 1024px;
}

header div div {
    display: flex;
    gap: var(--gap-4);
    align-items: center;
}

hgroup {
    text-align: center;
}

.logo {
    cursor: pointer;
}

@media (max-width: 425px) {
    h2 {
        font-size: var(--font-size-xl);
    }
    img {
        width: 2rem;
        height: 2rem;
    }
    header div {
        gap: var(--gap-2);
    }
    header {
        display: flex;
        color: var(--accent-300);
        border-bottom: 1px solid var(--accent-300);
    }
}
@container (max-width: 1024px) {
    header {
        margin-right: 1024px;
    }
}
</style>
