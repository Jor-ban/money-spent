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
.d-flex {
  display: flex !important;
}
</style>
