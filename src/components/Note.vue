<template>
  <ul class="note__list">
    <li class="note__item" v-for="(item, i) in list" :key="i" 
    :class="{'note__item--checked': item.checked}"
    @click="$parent.$emit('toggleCheck', i, id)">
      <span class="note__text">
        <input type="checkbox" :checked="item.checked" />
        {{item.item}}
      </span>
      <button class="note__delete" @click="$parent.$emit('removeItem', item, id)"></button>
    </li>
  </ul>
</template>
<script>

export default {
  name: "Note",
  props: ['list', 'id'],
};
</script>