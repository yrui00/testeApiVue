<template>
    <nav class="topo">
        <form @submit.prevent="handdleSubmit()" class="search-box">
            <input type="text" class="input" placeholder="Searching for..." v-model="searchInput" />
            <input type="submit" class="buttonSubmit" value="Search" />
        </form>
    </nav>
    <div class="list-objects">
        <div class="objectList">
            <div v-for="(object, ind) in objectsFiltered" :key="ind" class="object">
                <router-link :to="'/details/' + object.idDrink">
                    <div class="object-image">
                        <img :src="object.strDrinkThumb" :alt="object.strDrink" />
                    </div>
                    <div class="titulo">
                        <p>{{ object.strDrink }}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <Paginate v-if="objectsFiltered.length > 0" :totalPages="totalPages" :currentPage="currentPage" :change="changePage" />
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { loadData } from '../services'
import { typeObjectsJSON } from '../types';
import Paginate from '../components/Paginate.vue';

const searchInput = ref<string>('')
const search = ref<string>('')
const objects = ref<Array<typeObjectsJSON>>([])
const objectsFiltered = ref<Array<typeObjectsJSON>>([])
const postsPerPage:number = 12
const totalPages = ref<number>(1)
const currentPage = ref<number>(1)

const filterObject = () => {
    let arr = objects.value.filter(object => {
        if(object.strDrink){
            return object.strDrink.toLowerCase().includes(search.value.toLowerCase())
        }
    })
    totalPages.value = Math.ceil(arr.length / postsPerPage)
    arr = arr.slice((currentPage.value - 1) * postsPerPage, currentPage.value * postsPerPage)
    objectsFiltered.value = arr
}

const initData = async () => {
    objects.value = await loadData()
    filterObject()
}

const handdleSubmit = () => {
    search.value = searchInput.value
    currentPage.value = 1
    filterObject()
}
const changePage = (page: number) => {
    currentPage.value = page
    filterObject()
}

onBeforeMount(() => {
    initData()
})

</script>

<style lang="scss">
.search-box {
    width: 100%;
    display: flex;
    align-items: center;

    .input {
        width: 50%;
        height: 40px;
        border-radius: 5px;
        padding: 10px;
        border: 3px solid #ccc;
        overflow: hidden;
        margin-right: 10px;
    }

    .buttonSubmit {
        width: 100px;
        height: 40px;
        border-radius: 5px;
        background-color: rgb(160, 86, 2);
        border: 3px solid #ddd;
        color: #ddd;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
    }
}

.objectList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1000px;
    gap: 15px;
    margin: 0 auto;

    .object {
        width: 200px;

        h2 {
            color: #FFF;
            font-size: 28px;
            font-weight: 'bold';
            margin-bottom: 15px;
        }

        .object-image {
            display: block;
            width: 100%;
            height: 250px;
            overflow: hidden;
            border: 4px solid #fff;
            background-color: #fff;
            display: flex;
            justify-content: center;
        }

        .object-image img {
            flex-shrink: 0;
            height: 100%;
            display: block;
        }

        .titulo {
            background-color: #fff;

            p {
                color: #000;
                font-size: 16px;
                line-height: 1.4;
                padding: 0 5px;
                font-weight: bold;
            }
        }
    }
}
</style>
