import { ref, watch, onMounted } from "vue"
import { defineStore } from "pinia"
import { useBebidasStore } from "./bebidas"

export const useFavoritosStore = defineStore('favoritos', () => {

  const bebidas = useBebidasStore()
  const favoritos = ref([])

  onMounted(() => {
    const favoritosLocal = JSON.parse(localStorage.getItem('favoritos'))

    console.log(favoritosLocal)

    if (favoritosLocal) {
      favoritos.value = favoritosLocal
    }
  })

  watch(favoritos, () => {
    sincronizarLocalStorage()
    console.log('Favoritos actualizados')
  }, {
    deep: true
  })

  const sincronizarLocalStorage = () => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
  }

  const handleClickFavorito = () => {
    favoritos.value.push(bebidas.receta)
  }

  return {
    handleClickFavorito,
    favoritos
  }
})