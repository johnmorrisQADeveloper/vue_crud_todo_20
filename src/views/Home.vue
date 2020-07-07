<template>
  <v-app id="inspire">
    <v-card>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        dense
        :headers="headers"
        :items="allTodos"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
        :expanded.sync="expanded"
        item-key="title"
        show-expand
      >
        <template v-slot:item.completed="{ item }">
          <v-chip :color="getColor(item.completed)" dark>{{ item.completed ? 'YES': 'NO' }}</v-chip>
        </template>

        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Expandable Table</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch> -->
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="4" md="12">
                        <v-text-field class="inputTodo" v-model="editedItem.title" label="Title"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <p>Title: {{ item.title }}</p>
            <p>ID: {{item._id}}</p>
          </td>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions(['fetchTodos', 'addTodo', 'deleteTodo', 'updateTodo']),
    getColor (completed) {
      if (completed) return 'red'
      else return 'green'
    },
    editItem (todo, action) {
      this.editedIndex = this.allTodos.indexOf(todo)
      this.editedItem = Object.assign({}, todo)
      this.dialog = true
    },
    deleteItem (item) {
      confirm('Are you sure you want to delete this item?') &&
        this.deleteTodo(item._id)
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {
        Object.assign(this.allTodos[this.editedIndex], this.editedItem)
        await this.updateTodo(this.editedItem)
      } else {
        await this.addTodo(this.editedItem.title)
      }
      // this.updateTodo(this.editedItem)
      this.close()
    }
  },
  data () {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        title: '',
        completed: ''
      },
      defaultItem: {
        title: '',
        completed: false
      },
      expanded: [],
      singleExpand: false,
      search: '',
      todos: [],
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Completed', value: 'completed' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  name: 'Home',
  components: {},
  computed: {
    ...mapGetters(['allTodos']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  async created () {
    await this.fetchTodos()
    this.loading = false
  }
}
</script>
