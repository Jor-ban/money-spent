<template>
  <div class="spending">
    <div
      :class="['category-' + spending.type, 'spending-type']"
      :style="{
        'background-color': categoriesList.find(
          (c) => c.codename === spending.type
        ).color,
      }"
    ></div>
    <div class="mr-auto">
      <h2>{{ parseMoney(spending.amount) }} сум</h2>
      <p>{{ moment(spending.time) }}</p>
      <h3 v-if="spending.comment">{{ spending.comment }}</h3>
    </div>
    <div class="buttons">
      <a-button @click="edit(spending)" type="text">
        <edit-outlined />
      </a-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Options, Vue } from 'vue-class-component'
import { parseMoney } from '@/utils/parseMoney'
import { EditOutlined } from '@ant-design/icons-vue'
import { MutationTypes } from '@/store/types/mutationTypes'
import { categoriesList } from '@/consts/categoriesList'

@Options({
  name: 'Spending',
  data: () => ({
    categoriesList,
  }),
  methods: {
    moment(time) {
      return moment(time).format('DD hh:mm')
    },
    parseMoney: (money) => parseMoney(money),
    edit(spending) {
      this.$store.commit(MutationTypes.EDIT_EXPENSE, spending)
    },
  },
  props: {
    spending: {
      type: Object,
      required: true,
    },
  },
  components: { EditOutlined },
})
export default class Spending extends Vue {}
</script>

<style scoped lang="scss">
.spending {
  display: flex;
  background-color: rgb(246, 246, 246);
  border-radius: 12px;
  padding: 7px 7px 7px 7px;
  min-height: 60px;
  margin: 5px 0;

  .spending-type {
    background-color: grey;
    border-radius: 20px;
    margin-right: 10px;
    width: 10px;
    opacity: 0.7;
  }
  .mr-auto {
    margin-right: auto;
  }
  h2 {
    margin-bottom: 0;
    font-weight: 700;
  }
  p {
    margin-bottom: 4px;
  }
}
</style>
