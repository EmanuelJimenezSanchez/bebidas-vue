<script setup>
  import { useBebidasStore } from '../stores/bebidas'

  const bebidas = useBebidasStore()

  defineProps({
    receta: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <div class="border shadow-lg">
    <div class="overflow-hidden">
      <img 
        class="hover:scale-110 transition-transform hover:rotate-2 aspect-[346.4/346.4]"
        :src="receta.strDrinkThumb" 
        :alt="'Imagen de ' + receta.strDrink"
      >
    </div>

    <div class="p-5">
      <h2 class="text-2xl truncate font-extrabold">{{ receta.strDrink }}</h2>

      <button
        type="button"
        class="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
        @click="bebidas.seleccionarBebida(receta.idDrink)"
      >
        Ver Receta
      </button>
    </div>
  </div>
</template>

