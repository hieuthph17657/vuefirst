<script>
import Menu from './components/menu/Menu.vue'

export default {
  components: {
    Menu
  }
}
</script>
<template>
  <div id="app">
    <Menu/>
    <!-- <nav>
        <router-link to='/'>Home</router-link>
        <router-link to='/theWelcome'>Register</router-link>
        <router-link to='/login'>Login</router-link>
        <router-link to='/category'>Category</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

