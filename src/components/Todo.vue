<template>
  <div>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box">= Incomplete</span>
      </span>
      <span>
        <span class="complete-box">= Complete</span>
      </span>
    </div>
    <div class="todos">
      <div
        @click="onDblClick(todo)"
        class="todo"
        :class="{'is-complete': todo.completed}"
        v-for="todo in allTodos"
        :key="todo.id"
      >
        {{ todo.title}}
        <font-awesome-icon @click="deleteTodo(todo._id)" class="i" icon="trash" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
    onDblClick (todo) {
      const status = Boolean(todo.completed)
      const updatedTodo = {
        _id: todo._id,
        title: todo.title,
        completed: !status
      }
      this.updateTodo(updatedTodo)
    }
  },
  computed: {
    ...mapGetters(['allTodos'])
  },
  async created () {
    await this.fetchTodos()
  }
}
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
