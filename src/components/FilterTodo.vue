<template>
  <div>
    Filter Todos:
    <select @change="selectDrop">
      <option value="7">7</option>
      <option value="5">5</option>
      <option value="3">3</option>
      <option value="2">2</option>
    </select>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['filterTodo']),
    selectDrop (e) {
      this.filterTodo(e.target.options[e.target.options.selectedIndex].value)
    }
  }
}
</script>

<style scoped>
select {
  margin-top: 20px;
  padding: 6px;
  border: #41b883 1px solid;
}
</style>
