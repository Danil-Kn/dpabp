<template>
  <div class="app">
    <SideBar />
    <main>
      <RouterView></RouterView>
    </main>
  </div>
</template>


<script setup>
import SideBar from '@components/Sidebar/SideBar.vue'
</script>


<style scoped>
.app {
    width: 100vw;
    height: 100vh;
    padding: 0;
    overflow: hidden;
    display: grid;
    grid-template-columns: 12rem auto;
}

main{
    overflow: hidden auto;
}
</style>