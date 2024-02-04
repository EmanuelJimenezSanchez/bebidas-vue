import { ref, watch, onMounted } from "vue"
import { defineStore } from "pinia"
import { useBebidasStore } from "./bebidas"

export const useFavoritosStore = defineStore('favoritos', () => {

  const bebidas = useBebidasStore()
  const favoritos = ref([])

  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
  })

  watch(favoritos, () => {
    sincronizarLocalStorage()
  }, {
    deep: true
  })

  function sincronizarLocalStorage () {
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
  }
  
  function existeFavorito (id) {
    const favoritosLocal = JSON.parse(localStorage.getItem('favoritos')) ?? []
  
    return favoritosLocal.some(favorito => favorito.idDrink === id)
  }

  function handleClickFavorito() {
    if (existeFavorito(bebidas.receta.idDrink)) {
      console.log('Ya existe en favoritos')
    } else {
      favoritos.value.push(bebidas.receta)
    }
  }

  return {
    handleClickFavorito,
    favoritos,
    existeFavorito
  }
})