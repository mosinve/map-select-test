<template>
<li @click.stop='handleMapAdd' :class='{ selected, added }'>{{ item.name }}
  <ul v-if='item.children && item.children.length'>
    <source-item v-for='(child, index) in item.children'
                 :item='child'
                 :key='index'
                 :handle-select='handleSelect'
                 :handle-map-add='handleMapAdd'
    ></source-item>
  </ul>
</li>
</template>

<script>
  /* eslint-disable no-console */

  export default {
    name: 'SourceItem',
    props: {
      item: {
        type: Object,
        required: true
      },
      handleSelect: Function,
      handleMapAdd: Function
    },

    data() {
      return {
        selected: false,
        added: false
      }
    }
  }
</script>

<style scoped>
.selected {
  background-color: yellow;
}
.added:after {
  content: '\2714'
}
</style>
