<template>
  <div class="login">
    <a-result
      status="404"
      title="Login"
      sub-title="I can't recognize you. Please login."
    >
      <template #extra>
        <a-button type="primary" @click="login()">Login With Google</a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from '@/store/types/actionTypes'
import { Vue } from 'vue-class-component'
import { useStore } from 'vuex'

export default class LoginComponent extends Vue {
  $store = useStore()

  async login() {
    await this.$store.dispatch(ActionTypes.LOGIN)
    if (this.$store.state.isAuthenticated) {
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
