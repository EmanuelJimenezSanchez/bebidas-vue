<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useModalStore } from '../stores/modal'
import { useBebidasStore } from '../stores/bebidas'
import { useFavoritosStore } from '../stores/favoritos'

const modal = useModalStore()
const bebidas = useBebidasStore()
const favoritos = useFavoritosStore()

const formatearIngredientes = () => {
  const ingredientesDiv = document.createElement('DIV')

  for (let i = 1; i <= 15; i++) {
    if (bebidas.receta[`strIngredient${i}`]) {
      const ingrediente = bebidas.receta[`strIngredient${i}`]
      const cantidad = bebidas.receta[`strMeasure${i}`]

      const ingredienteCantidad = document.createElement('P')
      ingredienteCantidad.classList.add('text-md', 'text-gray-500')
      ingredienteCantidad.textContent = `${ingrediente} - ${cantidad}`

      ingredientesDiv.appendChild(ingredienteCantidad)
    }
  }

  return ingredientesDiv
}
</script>

<template>
  <TransitionRoot 
    appear 
    :show="modal.modal" 
    as="template">

    <Dialog as="div" @close="modal.handleClickModal()" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-8"
            >
              <div class="flex flex-col gap-4">
                <DialogTitle
                  as="h3"
                  class="text-3xl font-extrabold leading-6 text-gray-900"
                >
                  {{ bebidas.receta.strDrink }}
                </DialogTitle>
                
                <img 
                  :src="bebidas.receta.strDrinkThumb" 
                  :alt="'Imagen de ' + bebidas.receta.strDrink"
                  class="mx-auto w-96 my-4"
                />
              </div>
              
              <div class="flex flex-col gap-2">
                <DialogTitle
                  as="h3"
                  class="text-2xl font-extrabold leading-6 text-gray-900"
                >
                  Ingredientes y Cantidades
                </DialogTitle>

                <div v-html="formatearIngredientes().outerHTML"></div>
              </div>

              <div class="flex flex-col gap-2">
                <DialogTitle
                  as="h3"
                  class="text-2xl font-extrabold leading-6 text-gray-900"
                >
                  Instrucciones
                </DialogTitle>

                <p class="text-md text-gray-500">{{ bebidas.receta.strInstructions }}</p>
              </div>

              <div class="flex justify-between">
                <button
                  type="button"
                  class="inline-flex justify-center items-center rounded-md border border-transparent bg-gray-100 px-5 py-3 text-sm font-medium text-gray-500 border-gray-300 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  @click="modal.handleClickModal()"
                >
                  Cerrar Receta
                </button>

                <button
                  type="button"
                  class="inline-flex justify-center items-center rounded-md border border-transparent bg-orange-600 px-5 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  @click="favoritos.handleClickFavorito()"
                >
                  Agregar a Favoritos
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


