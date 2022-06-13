<template>
  <nav class="topo">
    <router-link to="/" class="btBack">
      Voltar
    </router-link>
  </nav>
  <main>
    <div class="fullDetails">
      <div v-for="(object, ind) in objects" :key="ind" class="details">
          <img :src="object.strDrinkThumb" alt="Poster" class="image" />
          <div class="txt">
            <h2>{{ object.strDrink }}</h2>
            <p>{{object.strInstructions}}</p>
          </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { loadFullData } from '../services'
import { typeObjectJSON } from "../types";

const route = useRoute()
const objects = ref<Array<typeObjectJSON>>([])

const initData = async () => {
    objects.value = await loadFullData(route.params.id)
}
onMounted(() => {
  initData()
})
</script>

<style lang="scss">

.btBack {
  background-color: #fff;
  color: #000;
  padding: 10px 15px;
  border-radius: 5px;
}
.fullDetails {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;

  .details {
    padding: 16px;
    display: flex;

    h2 {
      color: #FFF;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .image {
      display: block;
      max-width: 400px;
      margin: 0 15px 15px 0;
    }

    p {
      color: #FFF;
      font-size: 18px;
      line-height: 1.4;
    }
  }

}

</style>
