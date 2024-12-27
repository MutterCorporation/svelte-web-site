<!-- src/routes/produto/[slug]/+page.svelte -->
<script>
    import { cart } from '../../../lib/cartStore';
    import { toasts } from '../../../lib/TostStore';
    import { fly, fade } from 'svelte/transition';
    
    /** @type {import('./$types').PageData} */
    export let data;
    
    let quantity = 1;
    let selectedTab = 'descricao';
    
    $: product = data.product;
    
    function addToCart() {
        cart.addItem({
            id: product.id,
            // @ts-ignore
            title: product.title,
            price: product.price,
            quantity,
            image: product.src
        });
        toasts.success('Produto adicionado ao carrinho!');
    }
</script>

<div class="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8">
    <div class="container mx-auto px-4">
        <!-- Breadcrumb -->
        <nav class="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <a href="/" class="hover:text-pink-600">Home</a>
            <span>/</span>
            <span>{product.category || 'Produtos'}</span>
            <span>/</span>
            <span class="text-gray-900">{product.title}</span>
        </nav>

        <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
            <!-- Product Images -->
            <div 
                class="space-y-4"
                in:fly={{ x: -50, duration: 500 }}
            >
                <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-xl bg-white shadow-lg">
                    <img
                        src={product.src}
                        alt={product.title}
                        class="h-full w-full object-cover"
                    />
                </div>
            </div>

            <!-- Product Info -->
            <div 
                class="space-y-6"
                in:fly={{ x: 50, duration: 500 }}
            >
                <div>
                    <h1 class="text-4xl font-bold text-gray-900">{product.title}</h1>
                    <p class="mt-4 text-3xl font-bold text-pink-600">
                        R$ {product.price?.toFixed(2)}
                    </p>
                </div>

                <!-- Quantidade e Add to Cart -->
                <div class="space-y-4 rounded-lg bg-white p-6 shadow-lg">
                    <div class="flex items-center gap-4">
                        <span class="text-gray-700">Quantidade:</span>
                        <div class="flex items-center gap-3">
                            <button
                                class="h-8 w-8 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200"
                                on:click={() => quantity = Math.max(1, quantity - 1)}
                            >
                                -
                            </button>
                            <span class="w-8 text-center text-lg font-medium">{quantity}</span>
                            <button
                                class="h-8 w-8 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200"
                                on:click={() => quantity += 1}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button
                        class="w-full rounded-lg bg-pink-600 py-4 text-lg font-semibold text-white hover:bg-pink-700"
                        on:click={addToCart}
                    >
                        Adicionar ao Carrinho
                    </button>
                </div>

                <!-- Tabs -->
                <div class="border-b border-gray-200">
                    <div class="flex gap-8">
                        <button
                            class="border-b-2 pb-4 text-sm font-medium transition-colors
                                {selectedTab === 'descricao' ? 
                                'border-pink-500 text-pink-600' : 
                                'border-transparent text-gray-500 hover:text-gray-700'}"
                            on:click={() => selectedTab = 'descricao'}
                        >
                            Descrição
                        </button>
                        <button
                            class="border-b-2 pb-4 text-sm font-medium transition-colors
                                {selectedTab === 'detalhes' ? 
                                'border-pink-500 text-pink-600' : 
                                'border-transparent text-gray-500 hover:text-gray-700'}"
                            on:click={() => selectedTab = 'detalhes'}
                        >
                            Detalhes do Produto
                        </button>
                    </div>
                </div>

                <!-- Tab Content -->
                <div class="min-h-[200px] space-y-4">
                    {#if selectedTab === 'descricao'}
                        <p class="leading-relaxed text-gray-600">
                            {product.description}
                        </p>
                    {:else}
                        <div class="space-y-4">
                            <div class="grid grid-cols-2 gap-x-8 gap-y-4">
                                <div class="text-sm font-medium text-gray-500">Categoria</div>
                                <div>{product.category || 'Digital'}</div>
                                
                                <div class="text-sm font-medium text-gray-500">Formato</div>
                                <div>Digital - Download Imediato</div>
                                
                                <div class="text-sm font-medium text-gray-500">Garantia</div>
                                <div>7 dias</div>
                                
                                <div class="text-sm font-medium text-gray-500">Suporte</div>
                                <div>30 dias</div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>