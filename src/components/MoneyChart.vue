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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  mounted() {},
  data() {
    return {
      chartData: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },
    }
  },
  computed: {
    data() {
      const monthList = this.$store.state.monthList as Expense[]
      const data: { [key: string]: number } = {}
      Object.keys(categoriesList).map((key: string) => (data[key] = 0))
      monthList.map((spend: Expense) => {
        data[spend.type || 'no-category'] += spend.amount
      })
      console.log(data)
      return {
        labels: Object.values(categoriesList),
        datasets: [
          {
            data: Object.values(data),
            label: 'Ваши траты за данный месяц',
            backgroundColor: [
              '#55ce55',
              '#5597ec',
              '#f8bb48',
              '#ff4242',
              '#b564f7',
              '#000000',
              '#53ffd4',
              '#a52a2a',
              '#ffff00',
              '#7a7a7a',
            ],
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
