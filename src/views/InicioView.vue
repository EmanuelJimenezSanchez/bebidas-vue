<script setup>
  import Receta from '../components/Receta.vue'
  import { useBebidasStore } from '../stores/bebidas'


  const bebidas = useBebidasStore()
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>

  <p v-if="bebidas.noRecetas" class="text-2xl my-10 text-center">
    No hay Resultados, utiliza el buscador para encontrar recetas.
  </p>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <Receta
      v-for="receta in bebidas.recetas"
      :key="receta.idDrink"
      :receta="receta"
    />
  </div>
</template>