<template>
  <div class="home">
    <nav v-if="userData">
      <h4>Привет, {{ userData.displayName }}</h4>
      <div class="row">
        <a-button type="dashed" @click="manipulateMonth(-1)">◄</a-button>
        <h2>{{ monthName }} {{ year }}</h2>
        <a-button type="dashed" @click="manipulateMonth(1)">►</a-button>
      </div>
    </nav>
    <div class="spendings">
      <spending
        v-for="spending in spends"
        :key="spending.time"
        :spending="spending"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import moment from 'moment'
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore'
import { Expense } from '@/types/expence.interface'
import { UserData } from '@/types/userData.interface'
import Spending from '@/components/Spending.vue'

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
      db: getFirestore(),
      monthPicker: null,
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
  },
  created() {
    this.monthNum = this.now.month() + 1
    this.year = this.now.year()
    this.monthName = this.now.format('MMMM')
  },
  methods: {
    retrieveData(userUid: string) {
      this.userUid = userUid
      this.userDoc = doc(this.db, 'users', userUid)
      this.retrieveMonth(this.monthNum + '-' + this.year)
    },
    async retrieveMonth(monthName: string) {
      console.log(monthName)
      const thisMonthCollection = collection(this.userDoc, monthName)
      const docs = await getDocs(thisMonthCollection)
      const spends: Expense[] = []
      docs.forEach((doc) => {
        const expense = doc.data() as Expense
        spends.push(expense)
      })
      this.spends = spends
    },
    dateChange(date: unknown, dateString: string) {
      this.now = moment(dateString)
      this.monthNum = this.now.month() + 1
      this.year = this.now.year()
      this.retrieveMonth(this.monthNum + '-' + this.year)
    },
    manipulateMonth(type: number) {
      if (type === -1) {
        this.now.subtract(1, 'month')
      } else {
        this.now.add(1, 'month')
      }
      this.monthName = this.now.format('MMMM')
      this.monthNum = this.now.month() + 1
      this.year = this.now.year()
      this.retrieveMonth(this.now.format('M-YYYY'))
    },
  },
  components: { Spending },
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
</style>
