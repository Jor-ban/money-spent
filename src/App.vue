<template>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ActionTypes } from './store/types/actionTypes'

@Options({
  async mounted() {
    await this.$store.dispatch(ActionTypes.LOGIN_FROM_COOKIES)
    if (!this.$store.state.isAuthenticated) {
      this.$router.push('/login')
    }
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import 'ant-design-vue/dist/antd.css';
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.category- {
  &food {
    background-color: #55ce55 !important;
  }
  &transport {
    background-color: #5597ec !important;
  }
  &home {
    background-color: #f8bb48 !important;
  }
  &subscribtions {
    background-color: #ff4242 !important;
  }
  &clothes {
    background-color: #b564f7 !important;
  }
  &nessesary {
    background-color: #000000 !important;
  }
  &devices {
    background-color: #53ffd4 !important;
  }
  &internet {
    background-color: #a52a2a !important;
  }
  &lend {
    background-color: #ffff00 !important;
  }
}
.d-flex {
  display: flex !important;
}
</style>
