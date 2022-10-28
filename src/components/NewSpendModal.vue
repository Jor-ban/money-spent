<template>
  <div v-if="monthName">
    <button :style="buttonStyles || {}" class="plus-btn" @click="openModal()">
      [ + ] Добавить трату
    </button>
    <a-modal
      :visible="modalOpened"
      :title="
        (editingExpense ? 'Изменить трату на ' : 'Добавить трату на ') +
        monthName
      "
      @cancel="handleCancel"
    >
      <input
        v-model="amount"
        placeholder="Сколько денег (в сумах)"
        class="money-input"
        ref="amount"
      />
      <a-textarea
        v-model:value="comment"
        placeholder="Комментарий к трате"
        :auto-size="{ minRows: 2, maxRows: 5 }"
        class="textarea"
      />
      <p>
        <span>Категория: </span>
        <a-dropdown>
          <a-button :class="'btn-category category-' + type" @click.prevent>
            {{ categoriesList[type] }}
            <DownOutlined />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="key in Object.keys(categoriesList)"
                :key="key"
              >
                <a @click="type = key" class="category">
                  <div :class="'category-color category-' + key">_</div>
                  {{ categoriesList[key] }}
                </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </p>
      <!-- FOOTER -->
      <template #footer>
        <div v-if="editingExpense">
          <a-button danger @click="deleteExpense">Удалить</a-button>
          <a-button type="primary" @click="editExpense"
            >Изменить трату</a-button
          >
        </div>
        <div v-else>
          <a-button type="primary" @click="handleOk">Добавить</a-button>
        </div>
      </template>
    </a-modal>
  </div>
  <div v-else></div>
</template>
<script lang="ts">
import { ActionTypes } from '@/store/types/actionTypes'
import { parseMoney } from '@/utils/parseMoney'
import { Options, Vue } from 'vue-class-component'
import { Expense } from '@/types/expense.interface'
import { MutationTypes } from '@/store/types/mutationTypes'
import { categoriesList } from '@/consts/categoriesList'

@Options({
  data: () => ({
    modalOpened: false,
    amount: '',
    comment: '',
    type: 'no-category',
    categoriesList,
  }),
  methods: {
    async handleOk() {
      if (isNaN(Number(this.amount.replaceAll(' ', '')))) {
        alert('Money amount is entered wrong')
      } else {
        await this.$store.dispatch(ActionTypes.ADD_EXPENCE, {
          amount: Number(this.amount.replaceAll(' ', '')),
          comment: this.comment,
          type: this.type,
        } as Expense)
        this.modalOpened = false
        this.emptyForm()
      }
    },
    handleCancel() {
      this.$store.commit(MutationTypes.EDIT_EXPENSE, null)
      this.modalOpened = false
      this.emptyForm()
    },
    editExpense() {
      this.$store.dispatch(ActionTypes.EDIT_EXPENCE, {
        amount: Number(this.amount.replaceAll(' ', '')),
        comment: this.comment,
        type: this.type,
        time: this.editingExpense.time,
      })
      this.$store.commit(MutationTypes.EDIT_EXPENSE, null)
    },
    async deleteExpense() {
      await this.$store.dispatch(
        ActionTypes.DELETE_EXPENSE,
        this.editingExpense
      )
      this.modalOpened = false
    },
    openModal() {
      this.$store.commit(MutationTypes.EDIT_EXPENSE, null)
      this.modalOpened = true
    },
    emptyForm() {
      Object.assign(this, {
        modalOpened: false,
        amount: '',
        comment: '',
        type: 'no-category',
      })
    },
  },
  computed: {
    monthName(): string {
      return this.$store.state.currentMonthName
    },
    editingExpense(): Expense {
      return this.$store.state.editingExpense
    },
  },
  watch: {
    amount() {
      this.amount = parseMoney(this.amount)
    },
    editingExpense() {
      if (this.editingExpense) {
        Object.assign(this, this.editingExpense)
        this.modalOpened = true
      } else {
        this.emptyForm()
      }
    },
  },
  props: { buttonStyles: Object },
})
export default class NewSpendModal extends Vue {}
</script>

<style scoped lang="scss">
.plus-btn {
  font-weight: 900;
  border-radius: 50%;
  padding: 0;
  height: 50px;
  width: 50px;
  border: none;
  background-color: rgb(72, 151, 255);
  color: white;
  font-weight: bold;
}
.money-input {
  width: 100%;
  height: 40px;
  font-size: 22px;
  border: 1px solid rgb(190, 190, 190);
  border-radius: 1px !important;
  outline: none;
  padding: 0 12px;
  margin-bottom: 10px;

  &:focus {
    border-color: rgb(0, 183, 255);
    box-shadow: 0 0 2px 0 rgb(0, 183, 255);
  }
}
.textarea {
  margin-bottom: 10px;
}
.category {
  display: flex;

  .category-color {
    min-width: 7px;
    height: 100%;
    border-radius: 7px;
    margin-left: -5px;
    background-color: grey;
    margin-right: 5px;
    color: transparent;
  }
}
.btn-category {
  color: black !important;
  &.category-nessesary {
    color: white !important;
  }
}
</style>
