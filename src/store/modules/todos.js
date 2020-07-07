import axios from 'axios'

const state = {
  todos: []
}

const getters = {
  allTodos: (state) => state.todos,
  getIndex: (state) => state.todos.length
}

const actions = {
  async fetchTodos ({ commit }) {
    const response = await axios.get('https://cryptic-sierra-47326.herokuapp.com/todos')
    commit('SET_TODOS', response.data)
  },
  async addTodo ({ commit }, title) {
    const response = await axios.post('https://cryptic-sierra-47326.herokuapp.com/todos', {
      title, completed: false
    })
    commit('NEW_TODO', response.data)
  },
  async deleteTodo ({ commit }, _id) {
    await axios.delete(`https://cryptic-sierra-47326.herokuapp.com/todos/${_id}`)
    commit('REMOVE_TODO', _id)
  },
  async filterTodo ({ commit }, number) {
    const response = await axios.get(`https://cryptic-sierra-47326.herokuapp.com/todos/count/${number}`)
    commit('SET_TODOS', response.data)
  },
  async updateTodo ({ commit }, updateTodo) {
    console.log(JSON.stringify(updateTodo))
    const response = await axios.patch(`https://cryptic-sierra-47326.herokuapp.com/todos/${updateTodo._id}`, { ...updateTodo })
    commit('UPDATE_TODOS', response.data)
    const responses = await axios.get('https://cryptic-sierra-47326.herokuapp.com/todos')
    commit('SET_TODOS', responses.data)
  }
}

const mutations = {
  SET_TODOS: (state, todos) => (state.todos = todos),
  NEW_TODO: (state, todo) => state.todos.unshift(todo),
  REMOVE_TODO: (state, _id) => (state.todos = state.todos.filter(todo => todo._id !== _id)),
  UPDATE_TODOS: (state, updateTodo) => {
    const index = state.todos.findIndex(todo => todo._id === updateTodo._id)
    if (index !== -1) {
      state.todos.splice(index, 1, updateTodo)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
