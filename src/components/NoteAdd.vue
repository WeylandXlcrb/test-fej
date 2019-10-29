<template>
  <li class="note note--new" >
    <div class="note--new__btn" @click="hidepanel = !hidepanel"></div>
    <form id="noteAddForm" :style="[hidepanel ? {'display': 'none'} : {'display': 'block'}]"
     @submit.prevent="addNote">
      <input type="text" placeholder="Название списка" v-model="noteName">
      <button type="submit">+</button>
    </form>
  </li>
</template>
<script>
export default {
  name: "NoteAdd",
  data() {
    return {
      note: [],
      noteName: '',
      hidepanel: true
    };
  },
  methods: {
    addNote: function() {
      this.note = {
        name: this.noteName,
        list: []
      }
      this.$parent.$emit('submitNote', this.note);
      this.noteName = '';
      this.hidepanel = true;
    }
  },
  props: []
};
</script>