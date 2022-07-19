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
@import 'firebaseui/dist/firebaseui.css';
@import 'ant-design-vue/dist/antd.css';
</style>
