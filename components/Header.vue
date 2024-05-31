<script setup lang="ts">
const modals = useModal();
const route = useRoute();
</script>
<template>
  <header>
    <h2>
      <NuxtImg src="/LoL_Icon_Flat_GOLD.png" />eague Grid
    </h2>
    <div>
      <svg width="40px" height="40px" stroke-width="1.2" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg" color="#c8aa6f">
        <path d="M15 21H9V12.6C9 12.2686 9.26863 12 9.6 12H14.4C14.7314 12 15 12.2686 15 12.6V21Z" stroke="#c8aa6f"
          stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path
          d="M20.4 21H15V18.1C15 17.7686 15.2686 17.5 15.6 17.5H20.4C20.7314 17.5 21 17.7686 21 18.1V20.4C21 20.7314 20.7314 21 20.4 21Z"
          stroke="#c8aa6f" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path
          d="M9 21V16.1C9 15.7686 8.73137 15.5 8.4 15.5H3.6C3.26863 15.5 3 15.7686 3 16.1V20.4C3 20.7314 3.26863 21 3.6 21H9Z"
          stroke="#c8aa6f" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path
          d="M10.8056 5.11325L11.2147 3.1856C11.8314 2.93813 12.1686 2.93813 12.2853 3.1856L13.1944 5.11325L15.2275 5.42427C15.4884 5.46418 15.5923 5.79977 15.4035 5.99229L13.9326 7.4917L14.2797 9.60999C14.3243 9.88202 14.0515 10.0895 13.8181 9.96099L12 8.96031L10.1819 9.96099C9.94851 10.0895 9.67568 9.88202 9.72026 9.60999L10.0674 7.4917L8.59651 5.99229C8.40766 5.79977 8.51163 5.46418 8.77248 5.42427L10.8056 5.11325Z"
          stroke="#c8aa6f" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      <svg v-if="route.path === '/'" @click="modals.showHelpModal" width="40px" height="40px" stroke-width="1.7"
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#c8aa6f">
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="#c8aa6f" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke="#c8aa6f" stroke-width="1.7"
          stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M12 18.01L12.01 17.9989" stroke="#c8aa6f" stroke-width="1.7" stroke-linecap="round"
          stroke-linejoin="round"></path>
      </svg>
      <section v-if="route.path === '/'">
        <Button @click="navigateTo('/sign-in')" primary>Sign In</Button>
      </section>
      <section v-if="route.path === '/sign-in'">
        <Button @click="console.log('called')" primary>Back</Button>
      </section>
    </div>
  </header>
  <Teleport to="#game" v-if="modals.helpModal.value">
    <HelpModal @close-modal="modals.hideHelpModal" ref="helpModal" />
  </Teleport>
</template>

<style scoped>
svg {
  cursor: pointer;
}

img {
  height: var(--gap-6)
}

header {
  display: flex;
  padding: var(--gap-2);
  justify-content: space-between;
  color: var(--accent-300);
  border-bottom: 1px solid var(--accent-300);
}

header div {
  display: flex;
  gap: var(--gap-4);
  align-items: center;
}

hgroup {
  text-align: center;
}

@media (max-width:576px) {
  img {
    height: var(--gap-5)
  }

  h2 {
    font-size: 1rem;
  }

  svg {
    height: var(--gap-5);
  }

  header div {

    gap: var(--gap-2);

  }
}

@media (max-width:425px) {
  header {
    display: flex;
    padding: var(--gap-1);
    justify-content: space-between;
    color: var(--accent-300);
    border-bottom: 1px solid var(--accent-300);
  }
}
</style>