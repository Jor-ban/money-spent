<template>
  <div class="home container">
    <div class="left-part">
      <nav v-if="userData">
        <h4>Привет, {{ userData.displayName }}</h4>
        <div class="row">
          <a-button type="dashed" @click="manipulateMonth(-1)">◄</a-button>
          <h2>{{ monthName }} {{ year }}</h2>
          <a-button type="dashed" @click="manipulateMonth(1)">►</a-button>
        </div>
        <h3>Потрачено за этот месяц: {{ spendedOveral }} сум</h3>
      </nav>
      <nav v-else>
        <a-skeleton />
      </nav>
      <MoneyChart v-if="spends.length" />
    </div>
    <div class="right-part">
      <div v-if="spends.length" class="spendings">
        <spending
          v-for="spending in spends"
          :key="spending.time"
          :spending="spending"
        />
      </div>
      <div v-else-if="loading" class="container">
        <a-skeleton />
        <a-skeleton />
        <a-skeleton />
        <a-skeleton />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import moment from 'moment'
import { UserData } from '@/types/userData.interface'
import Spending from '@/components/Spending.vue'
import { ActionTypes } from '@/store/types/actionTypes'
import MoneyChart from '@/components/MoneyChart.vue'
import { Expense } from '@/types/expense.interface'
import { parseMoney } from '@/utils/parseMoney'

@Options({
  data() {
    return {
      userUid: '',
      now: moment(),
      monthNum: -1,
      monthName: 'January',
      year: -1,
      spends: [],
      userDoc: null,
      monthPicker: null,
      loading: true,
    }
  },
  computed: {
    userData() {
      const userData = this.$store.state.userData
      if (userData) {
        if (!this.userUid) {
          this.retrieveData(userData.uid)
        }
        return userData as UserData
      } else {
        return null
      }
    },
    spendedOveral() {
      return parseMoney(
        this.spends.reduce(
          (total: number, spend: Expense) => total + spend.amount,
          0
        )
      )
    },
  },
  created() {
    this.monthNum = this.now.month() + 1
    this.year = this.now.year()
    this.monthName = this.now.format('MMMM')
  },
  methods: {
    async retrieveData(userUid: string) {
      this.userUid = userUid
      this.spends = await this.$store.dispatch(
        ActionTypes.RETRIEVE_MONTH,
        this.monthNum + '-' + this.year
      )
      this.loading = false
    },
    async dateChange(date: unknown, dateString: string) {
      this.now = moment(dateString)
      this.monthNum = this.now.month() + 1
      this.year = this.now.year()
      this.spends = await this.$store.dispatch(
        ActionTypes.RETRIEVE_MONTH,
        this.monthNum + '-' + this.year
      )
    },
    async manipulateMonth(type: number) {
      this.spends = []
      this.loading = true
      if (type === -1) {
        this.now.subtract(1, 'month')
      } else {
        this.now.add(1, 'month')
      }
      this.monthName = this.now.format('MMMM')
      this.monthNum = this.now.month() + 1
      this.year = this.now.year()
      this.spends = await this.$store.dispatch(
        ActionTypes.RETRIEVE_MONTH,
        this.now.format('M-YYYY')
      )
      this.loading = false
    },
  },
  components: { Spending, MoneyChart },
})
export default class HomeView extends Vue {}
</script>

<style scoped>
nav {
  margin: 10px 0;
  text-align: center;
}
.row {
  display: flex;
  justify-content: space-evenly;
}
.left-part {
  width: 100%;
}
.container {
  max-width: 760px;
  margin: 0 auto;
}
.spendings {
  padding-bottom: 100px;
}
@media (min-width: 760px) {
  .container {
    max-width: 1200px;
    display: flex;
  }
  .left-part {
    width: 400px;
  }
  .right-part {
    width: calc(100% - 430px);
    padding-left: 30px;
    max-height: 100vh;
    overflow-y: auto;
  }
}
</style>
