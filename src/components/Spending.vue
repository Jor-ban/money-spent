<template>
  <div class="spending">
    <div :class="spending.type"></div>
    <div>
      <h2>{{ parseMoney(spending.amount) }}</h2>
      <p>{{ moment(spending.time) }}</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Options, Vue } from 'vue-class-component'
import { parseMoney } from '@/utils/parseMoney'

@Options({
  name: 'Spending',
  methods: {
    moment(time) {
      return moment(time).format('hh:mm-DD')
    },
    parseMoney: (money) => parseMoney(money),
  },
  props: {
    spending: {
      type: Object,
      required: true,
    },
  },
})
export default class Spending extends Vue {}
</script>

<style scoped lang="scss">
.spending {
  display: flex;

  h2 {
    margin-bottom: 0;
  }
}
</style>
