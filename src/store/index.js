import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

const Api = {
  async get(...params) {
    try {
      return Promise.resolve({ data: true });
      // return axios.get(...params);
    } catch (err) {
      console.error(err);
    }
  },
  async post(...params) {
    try {
      return Promise.resolve({ data: true });
      // return axios.post(...params);
    } catch (err) {
      console.error(err);
    }
  },
  async put(...params) {
    try {
      return Promise.resolve({ data: true });
      // return axios.put(...params);
    } catch (err) {
      console.error(err);
    }
  },
  async delete(...params) {
    try {
      return Promise.resolve({ data: true });
      // return axios.delete(...params);
    } catch (err) {
      console.error(err);
    }
  },
}

Vue.use(Vuex)

const userId = 'Jonathan_Joestar';

export default new Vuex.Store({
  getters: {
    'table/list'({ tables }) {
      return Object.keys(tables).reduce((list, tableId) => {
        if (tables[tableId]) {
          return [
            ...list,
            tables[tableId],
          ];
        }

        return list;
      }, []);
    },
    'table/itemById'({ tables }) {
      return id => {
        if (!tables[id]) return null;
        const { size, data } = tables[id];

        return [...new Array(size[0])]
          .map((_, index) => {
            return [...new Array(size[1])]
              .map((_, jndex) => data?.[index]?.[jndex]);
          });
      };
    },
  },
  state: {
    tables: {
      "1": {
        name: "Таблица 1",
        id: 1,
        size: [20, 20],
        data: {
          3: {
            2: 'trololo'
          }
        }
      },
      "2": {
        name: "Таблица 2",
        id: 2,
        size: [15, 10],
        data: {
          4: {
            5: 'zhozho'
          }
        }
      },
    }
  },
  mutations: {
    'table/updateList'({ tables }, payload) {
      payload.forEach(tableId => {
        tables[tableId] = {
          ...(tables[tableId] || {
            id: tableId,
            size: [0, 0],
            data: {},
          }),
        };
      });
    },
    'table/updateInfo'({ tables }, payload) {
      const table = tables[payload.id] || {};
      const data = {...table.data};
      payload.data.forEach((cell) => {
        if (data[cell.x]) {
          data[cell.x][cell.y] = cell.val;
        } else {
          data[cell.x] = {}
          data[cell.x][cell.y] = cell.val;
        }
      });
      tables[payload.id] = {
        ...table,
        ...payload,
        data,
      };
    },
    'table/delete'({ tables }, id) {
      tables[id] = null;
    },
  },
  actions: {
    async 'table/getList'({ commit }) {
      const { data } = await Api.get(`/api/v1/table/list/${userId}`);

      commit('table/updateList', data);
      return data;
    },
    async 'table/getInfo'({ commit }, tableId) {
      const [
        size,
        { data },
      ] = await Promise.all([
        Api.get(`/api/v1/table/size/${tableId}`),
        Api.get(`/api/v1/table/data/${tableId}`)
      ]);

      const result = {
        id: tableId,
        size: size.data,
        data,
      };

      commit('table/updateInfo', result);

      return result;
    },
    async 'table/create'({ dispatch }, form) {
      const { data } = await Api.post(`/api/v1/table/${userId}`);
      dispatch('table/getList');
      const info = await dispatch('table/getInfo', data.table);

      return info;
    },
    async 'table/update'({ commit, getters }, {
      id,
      cells,
    }) {
      const { data } = await Api.put(`/api/v1/table/data/${id}`, cells);

      const result = {
        id,
        data: cells,
      };

      if (data) {
        commit('table/updateInfo', result);
      }

      return result;
    },
    async 'table/delete'({ commit }, id) {
      const { data } = await Api.delete(`/api/v1/table/${id}`);

      if (data) {
        commit('table/delete', id);
      }

      return data;
    },
    async 'row/add'({ commit, getters }, tableId) {
      const table = getters['table/itemById'](tableId);
      const { data } = await Api.post(`/api/v1/row/${tableId}/${table.size[0] + 1}`);

      if (data) {
        commit('table/updateInfo', {
          ...table,
          size: [
            table.size[0] + 1,
            table.size[1],
          ],
        });
      }

      return data;
    },
    async 'column/add'({ commit, getters }, tableId) {
      const table = getters['table/itemById'](tableId);
      const { data } = await Api.post(`/api/v1/row/${tableId}/${table.size[1] + 1}`);

      if (data) {
        commit('table/updateInfo', {
          ...table,
          size: [
            table.size[0],
            table.size[1] + 1,
          ],
        });
      }

      return data;
    },
    async 'row/delete'({ dispatch }, {
      row,
      tableId,
    }) {
      const { data } = await Api.delete(`/api/v1/row/${tableId}/${row}`);

      if (data) {
        await dispatch('table/getInfo', tableId);
      }

      return data;
    },
    async 'column/delete'({ dispatch }, {
      column,
      tableId,
    }) {
      const { data } = await Api.delete(`/api/v1/column/${tableId}/${column}`);

      if (data) {
        await dispatch('table/getInfo', tableId);
      }

      return data;
    },
  },
})
