<template>
<ul>
  <source-item v-for='(item, index) in sourceData'
               :item='item'
               :key='index'
               :handle-select='handleMapSelect'
               :handle-map-add='handleMapAdd'
  ></source-item>
</ul>
</template>

<script>
  import SourceItem from './SourceItem'
  export default {
    name: 'SourceList',
    components: {SourceItem},
    props:{
      sourceData: {
        type: Array
      }
    },
    methods: {
      handleMapSelect(data){
        this.$emit('map-selected', data)
      },
      handleMapAdd(data){
        this.$emit('map-added', data)
      }
    }
  }
</script>
