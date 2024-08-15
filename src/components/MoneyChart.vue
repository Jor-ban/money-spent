<template>
  <PieChart :chartData="data" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Pie } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
import { Expense } from '@/types/expense.interface'
import { categoriesList } from '@/consts/categoriesList'
Chart.defaults.font.size = 14
Chart.register(...registerables)

@Options({
  components: { PieChart: Pie },
  computed: {
    data() {
      const monthList = this.$store.state.monthList as Expense[]
      const data: { [key: string]: number } = {}
      categoriesList.forEach((c) => (data[c.codename] = 0))

      monthList.map((spend: Expense) => {
        data[spend.type || 'no-category'] += spend.amount
      })
      return {
        labels: categoriesList.map((c) => c.title),
        datasets: [
          {
            data: Object.values(data),
            label: 'Ваши траты за данный месяц',
            backgroundColor: categoriesList.map((c) => c.color),
          },
        ],
        hoverOffser: 4,
      }
    },
  },
})
export default class MoneyChart extends Vue {}
</script>

<style></style>
