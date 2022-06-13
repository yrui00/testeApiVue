import { ref } from "vue";
import { typeObjectsJSON } from "../types";

export const loadData = async ():Promise<Array<typeObjectsJSON>> => {
    const objects = ref<Array<typeObjectsJSON>>([])
    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`)
    .then(response => response.json())
    .then(data => {
        return objects.value = data.drinks
    });
    return objects.value
    
}

export const loadFullData = async (id:string | string[]):Promise<Array<typeObjectsJSON>> => {
    const objects = ref<Array<typeObjectsJSON>>([])
    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => {
        return objects.value = data.drinks
    });
    return objects.value
    
}
