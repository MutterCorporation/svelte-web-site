<!-- components/CardProduct.svelte -->
<script>
    export let all;
    export let title;
    export let description;
    export let picture;
    export let slug;
</script>

<a
    href="/shop/{slug}"
    class="group block overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
>
    <div class="aspect-w-1 aspect-h-1 relative overflow-hidden">
        <!-- <img
            src={picture}
            alt={title}
            class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        -->
        </div>

    <div class="p-4">
        <h3 class="mb-2 text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
        <p class="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>
        <div class="flex items-center justify-between">
            <button
                on:click={() => window.location.href = `/${all}`}
                class="inline-block rounded bg-gray-500 px-4 py-2 text-white w-full transition-colors duration-300 hover:bg-blue-600"
            >
                Go to {all}
            </button>
        </div>
    </div>
</a>