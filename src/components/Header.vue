<script setup>
  import { computed } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import { useBebidasStore } from '../stores/bebidas'
  import { useNotificacionStore } from '../stores/notificacion';

  const route = useRoute()
  const store = useBebidasStore()
  const notificacion = useNotificacionStore()

  const paginaInicio = computed(() => route.name === 'inicio')

  const handleSubmit = () => {
    if (Object.values(store.busqueda).includes('')) {
      
      notificacion.$patch({
        texto: 'Todos los campos son obligatorios',
        error: true
      })
      notificacion.mostrarNotificacion()

      return
    }

    store.obtenerRecetas()
  }
</script>

<template>
  <header 
    class="bg-slate-800"
    :class="{ header: paginaInicio}"  
  >
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink
            :to="{ name: 'inicio' }"
          >
            <img 
              src="/img/logo.svg" 
              alt="Logotipo"
              class="w-32 aspect-[128/111.8]"  
            />
          </RouterLink>
        </div>

        <nav class="flex gap-4 text-white">
          <RouterLink
            :to="{ name: 'inicio' }"
            class="uppercase foont-bold"
            active-class="text-orange-500"
          >
            Inicio
          </RouterLink>

          <RouterLink
            :to="{ name: 'favoritos' }"
            class="uppercase foont-bold"
            active-class="text-orange-500"
          >
            Favoritos
          </RouterLink>
        </nav>
      </div>

      <form 
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        v-if="paginaInicio"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label 
            for="ingredientes"
            class="block text-white uppercase font-extrabold text-lg"
          >
            Nombre o Ingredientes
          </label>

          <input 
            type="text"
            id="ingredientes"
            class="p-3 w-full rounded-lg focus:outline-none"
            placeholder="ej. Vodka, Tequila, etc."
            v-model="store.busqueda.nombre"
          >
        </div>

        <div class="space-y-4">
          <label 
            for="categoria"
            class="block text-white uppercase font-extrabold text-lg"
          >
            Categoria
          </label>

          <select 
            id="categoria"
            class="p-3 w-full rounded-lg focus:outline-none"
            v-model="store.busqueda.categoria"
          >
            <option value="" disabled selected>-- Seleccione --</option>
            <option
              v-for="categoria in store.categorias"
              :key="categoria.strCategory"
              :value="categoria.strCategory"
            >{{ categoria.strCategory }}</option>
          </select>
        </div>

        <input 
          type="submit"
          class="bg-orange-800 hover:bg-orange-900 text-white uppercase font-extrabold py-2 w-full rounded-lg cursor-pointer transition duration-300"
          value="Buscar Receta"
        >
      </form>
    </div>
  </header>
</template>

<style>
  .header {
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center;
  }
</style>

