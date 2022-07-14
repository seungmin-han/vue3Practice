<template>
  <div id="nav">
      <router-link to="/">Main</router-link>
      <router-link to="/create">Create</router-link>
  </div>
  <router-view />
  
  
</template>

<style>
#app 
{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav > * 
{
  margin: 0 20px;
}
</style>
