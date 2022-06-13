<template>
  <div class="pagination">
    <div v-on:click="handdleChange(1)" class="btPage">←</div>
    <div 
    v-for="index in props.totalPages" 
    v-on:click="handdleChange(index)" 
    v-bind:class="{ active: ((index) == props.currentPage), 'btPage': true }"
    >
      {{(index)}}
    </div>
    <div v-on:click="handdleChange(props.totalPages)" class="btPage">→</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';


type Props = {
  currentPage?: number, 
  totalPages?: number, 
  change?: Function
}
const props = withDefaults(defineProps<Props>(), {
  currentPage: 1, 
  totalPages: 1, 
})
  const maxPages = ref<number>(1)
  const minPages = ref<number>(1)


const handdleChange = (page:number) => {
  if(props.change){
    props.change(page)
  }
}

watch(props, (newVal) => {
  maxPages.value = Math.min(5, props.totalPages)
  minPages.value = Math.max(props.currentPage-2, 1)
}, { deep: true })

</script>


<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 5px;

  .btPage {
    background-color: #fff;
    color: #000;
    padding: 10px 0px;
    border-radius: 5px;
    cursor:pointer;
    width:30px;
    text-align: center;
  }
  .btPage.active {
    background-color: rgb(160, 86, 2);
    color: #fff;
  }
}
</style>
