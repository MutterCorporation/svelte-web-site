<script>
    export let roletas = [
        { nome: 'Roleta 1' },
        { nome: 'Roleta 2' },
        { nome: 'Roleta 3' }
    ];
</script>

<div class="flex flex-col items-center gap-4 p-4 bg-gray-100 min-h-screen">
    {#each roletas as roleta}
        <div class="flex justify-center items-center w-full max-w-xl p-4 bg-white border border-gray-300 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold">{roleta.nome}</h2>
        </div>
    {/each}
</div>
