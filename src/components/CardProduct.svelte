<!-- components/CardProduct.svelte -->
<script>
  import { cart } from '../lib/cartStore';
  import { fly } from 'svelte/transition';
  
  export let title;
  export let description;
  export let picture;
  export let price = 99.99; // Adicione preço aos seus produtos
  export let id = crypto.randomUUID(); // Identificador único para cada produto
  
  let isHovered = false;
</script>

<div
  class="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
  transition:fly={{ y: 50, duration: 300 }}
>
  <div class="aspect-w-1 aspect-h-1 relative overflow-hidden">
      <img
          src={picture}
          alt={title}
          class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {#if isHovered}
          <div
              class="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity"
              transition:fly={{ y: 50, duration: 200 }}
          >
              <button
                  class="transform rounded-full bg-white px-6 py-2 font-semibold text-pink-500 transition-transform hover:scale-105"
                  on:click={() => cart.addItem({ id, title, description, picture, price })}
              >
                  Adicionar ao Carrinho
              </button>
          </div>
      {/if}
  </div>

  <div class="p-4">
      <h3 class="mb-2 text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
      <p class="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>
      <div class="flex items-center justify-between">
          <span class="text-xl font-bold text-pink-500">R$ {price}</span>
          <div class="flex items-center gap-2">
              <button
                  class="rounded-full bg-pink-100 p-2 text-pink-500 transition-colors hover:bg-pink-200"
                  on:click={() => cart.addItem({ id, title, description, picture, price })}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
              </button>
          </div>
      </div>
  </div>
</div>