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
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          
          <b-form-group
            id="input-group-2"
            label="Количество колонок:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.column"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-form-group
            id="input-group-3"
            label="Количество строк:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="form.row"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
          <div class="btn-block">
            <b-button type="reset" variant="danger">Отменить</b-button>
            <b-button type="submit" variant="primary">Сохранить</b-button>
          </div>

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
  },
  methods: {
    handleClick() {
      this.$bvModal.show('added_table')
    },
    onSubmit(evt) {
      evt.preventDefault()
      this.$store.dispatch('table/create', this.form);
      this.$bvModal.hide('added_table')
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

  .btn-block {
    align-items: center;
    display: flex;
    justify-content: space-around;
  }
</style>
