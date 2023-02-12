<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold text-black mt-2 mb-6">Club Fight</h1>
    <div class="rounded bg-secondary-200 w-32 mb-12">
      <img src="@/assets/icons/club.svg" alt="club logo" />
    </div>
    <router-link
      :to="{ path: '/battle' }"
      class="font-bold text-center bg-secondary-200 rounded w-52 p-2 hover:bg-main-300 transition duration-150 ease-in-out"
    >
      Battle Now!
    </router-link>
  </div>
</template>
