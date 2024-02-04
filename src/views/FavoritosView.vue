<script setup>
  import Receta from '../components/Receta.vue'
  import { useFavoritosStore } from '../stores/favoritos'

  const favoritos = useFavoritosStore()
</script>

<template>
  <h1 class="text-6xl font-extrabold">Favoritos</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <Receta
      v-for="receta in favoritos.favoritos"
      :key="receta.idDrink"
      :receta="receta"
      class="aspect-[346.4/346.4]"
    />
  </div>
</template>