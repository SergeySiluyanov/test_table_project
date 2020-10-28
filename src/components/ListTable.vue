<template>
  <div class="listTable">
    <div class="listTable__button">
      <CustomButton text="Добавить новую таблицу" @click="handleClick"/>
    </div>
    <ListTableItem
      v-for="item in list"
      :key="item.id"
      :title-table="item.name"
      :id="item.id"
    />
    <b-modal id="added_table" hide-footer>
      <template #modal-title>
        Создать новую таблицу
      </template>
      <div class="d-block text-center">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Название таблицы:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Сохранить</b-button>
          <b-button type="reset" variant="danger">Отменить</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ListTableItem from '@/components/common/ListTableItem.vue'
import CustomButton from '@/components/common/Button.vue'
export default {
  name: 'ListTable',
  components: {
    ListTableItem,
    CustomButton,
  },
  data: () => ({
    form: {
      name: '',
      column: 1,
      row: 1
    },
    show: true
  }),
  computed: {
    ...mapGetters({
      list: 'table/list',
    }),
    getListTable() {
      return [
        {name: 'table1', id: '1'},
        {name: 'table2', id: '2'},
        {name: 'table3', id: '3'},
        {name: 'table4', id: '4'},
      ]
    }
  },
  methods: {
    handleClick() {
      this.$bvModal.show('added_table')
    },
    onSubmit(evt) {
      evt.preventDefault()
      this.$bvModal.hide('added_table')
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      this.$bvModal.hide('added_table')
      this.form.column = ''
      this.form.row = 1
      this.form.name = 1
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .listTable {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px;

    &__button {
      margin-bottom: 20px;
      width: 100%;
    }
  }
</style>
