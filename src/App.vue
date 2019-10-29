<template>
  <main class="main" id="main-app">
    <p>{{message}}</p>
    <Notes :notes="notes" 
      @remove="removeNote" 
      @submitNote="addNote"
      @addNewItem="addNewItem"
      @removeItem="removeItem"
      @toggleCheck="toggleCheck"/>
  </main>
</template>

<script>
import Notes from "./components/Notes";
import axios from "axios";
import _ from "lodash";


export default {
  name: "mainApp",
  data: function() {
    return {
      notes: [],
      message: 'message',
      noteIndex: 0
    };
  },
  components: {
    Notes
  },
  methods: {
    addNote: function(note) {
      axios.post('https://my-json-server.typicode.com/WeylandXlcrb/testapi/notes', note)
      .then(res => {
        this.message = res.data
        this.notes.push(res.data);
      });
    },
    removeNote: function(note) {
      axios.delete('https://my-json-server.typicode.com/WeylandXlcrb/testapi/notes/' + note.id)
      .then(res => {
        this.notes = _.without(this.notes, note);
        this.message = res.data
      })
      .catch(err => this.message = err);
    },
    addNewItem: function(newItem, currentNote) {
      axios.put('https://my-json-server.typicode.com/WeylandXlcrb/testapi/notes/' + this.notes[currentNote.id].id, this.notes[currentNote.id].list[this.notes[currentNote.id].list.length -1])
      .then(res => {
        this.notes[currentNote.id].list.push(newItem);
        this.message = res.data
      })
      .catch(err => this.message = err);
    },
    removeItem: function(item, id) {
      this.notes[id].list = _.without(this.notes[id].list, item);
      axios.put('https://my-json-server.typicode.com/WeylandXlcrb/testapi/notes/' + id, { 
        list: this.notes[id].list
      })
      .then(res => this.message = res.data)
      .catch(err => this.message = err);
    },
    toggleCheck: function(item, id) {
      this.notes[id].list[item].checked = !this.notes[id].list[item].checked;
      // this.message = this.notes[id].list[item];
      axios.put('https://my-json-server.typicode.com/WeylandXlcrb/testapi/notes/' + id, { 
        list: {
          [item]: {
            checked: this.notes[id].list[item].checked
          }
        }
      })
      .then(res => this.message = res.data)
      .catch(err => this.message = err);
    },
  },
  mounted() {
    axios.get("https://my-json-server.typicode.com/WeylandXlcrb/testapi/notes")
    .then(res => (this.notes = res.data));
  }
};
</script>
<style lang="scss">
@import "./assets/scss/style.scss";
</style>