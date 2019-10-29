<template>
  <ul class="notes">
    <li class="note" v-for="note in notes" :key="note.id">
      <div class="note__group">
        <button class="note__delete" @click="$emit('remove', note)"></button>
        <router-link :to="'/' + note.id">
          <h3 class="note__header">{{note.name}}</h3>
        </router-link>
        <Note :list="note.list" :id="note.id"/>
      </div>
      <form class="note__group note__group--input" id="noteAddForm"
        :style="[$route.params.id == note.id ? {'display': 'flex'} : {'display': 'none'}]"
        @submit.prevent="addNoteItem(note)">
        <textarea placeholder="Добавить пункт" v-model="newItem.item"></textarea>
        <button type="submit" class="note__add">+</button>
      </form>
    </li>
    <NoteAdd/>
  </ul>
</template>
<script>
import Note from "./Note";
import NoteAdd from "./NoteAdd";

export default {
  name: "Notes",
  props: ["notes"],
  data() {
    return {
      newItem: [],
    };
  },
  components: {
    Note,
    NoteAdd
  },
  methods: {
    addNoteItem: function(note) {
      this.newItem = {
        item: this.newItem.item,
        checked: false
      }
      this.$emit('addNewItem', this.newItem, note);
      this.newItem = [];
    },
  },
};
</script>