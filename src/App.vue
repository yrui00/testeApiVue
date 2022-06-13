<script setup lang="ts">
</script>

<template>
  <router-view />
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;

  &::selection {
    background: transparentize(#42B883, 0.5);
  }
}

body {
  background-color: #35495E;
}

a {
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.topo {
  width: 100%;
  display: flex;
  background-color: #000;
  height: 80px;
  align-items: center;
  box-sizing: border-box;
  padding-left: 100px;
  margin-bottom: 20px;
}
</style>
