<template>
  <div class="container">
    <add-todo-vue />
    <filter-todo-vue />
    <h1>Todos</h1>
    <todo-vue />
  </div>
</template>

<script>
import TodoVue from '../components/Todo.vue'
import AddTodoVue from '../components/AddTodo.vue'
import FilterTodoVue from '../components/FilterTodo.vue'
export default {
  components: {
    TodoVue,
    AddTodoVue,
    FilterTodoVue
  }
}
</script>

<style lang="scss" scoped>
</style>
