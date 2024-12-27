<script>
    import { onMount } from "svelte";
    import { Accordion, AccordionItem } from "flowbite-svelte";
	import Header from "../../components/Header.svelte";
	import Footer from "../../components/Footer.svelte";
    /**
     * @type {any[]}
     */
    
    export let roletas = [];

    const fetchRoletasName = () => {
        const authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haWtvbndlYmVyIiwibmFtZSI6Ik1haWtvbiIsImlkIjozLCJlbWFpbCI6Im1haWtvbndlYmVyQGdtYWlsLmNvbSIsInBlcm1pc3Npb24iOnsiYWRtaW4iOnRydWUsImJsdWVza3lwaGFzZSI6dHJ1ZX0sImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MzQ5ODU1ODMsImV4cCI6MTczNTQxNzU4M30.5RKI7bTYBkBsoiM_tezZrnmGPTEURpM2djxt_XJgVRE';

        fetch('https://dev.muttercorp.com.br/roleta', {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Authorization': authToken
            }
        }).then(response => response.json())
          .then(data => {
              console.log(data);
              roletas = data;
          });
    };

    onMount(() => {
        fetchRoletasName();
    });
</script>

<style>
    .casino-header {
        font-size: 1.25rem;
        font-weight: bold;
        padding: 12px;
        background-color: #e5e7eb; /* Amber 400 */
        color: #ffffff; /* Slate 800 */
        border-radius: 0.5rem 0.5rem 0 0;
    }
    .casino-body {
        padding: 16px;
        background-color: #ffffff; /* Gray 50 */
        color: #ffffff; /* Gray 700 */
        border: 1px solid #e5e7eb; /* Gray 200 */
        border-radius: 0 0 0.5rem 0.5rem;
    }

    .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    margin-top: 10px;
    background-color: #f87171; /* bg-color-red-200 */
    width: 100%;
    height: 90px; /* Ajuste a altura conforme necessário */
    color: white;
    font-size: 24px;
    border-radius: 5px;
    font-weight: bold;
  }

</style>

<Header title="Sinais da Roleta" />

<Accordion class="p-9 rounded-lg bg-color-gray-100">
    {#each roletas as roleta}
        <AccordionItem on:click={() => console.log('clicked')}>
            <div slot="header" class="bg-color-yellow-400 text-color-gray-800 p-4">
                <h2>{roleta}</h2>
            </div>
            <div class="casino-body">
                <p class="mb-4"> {roleta}</p>
                <div>
                   <div>
                <div class="mt-4">
                    <h3 class="text-lg font-semibold text-slate-800">Links</h3>
                    <ul class="list-disc pl-5 text-blue-600">
                        <li><a href="#" class="hover:underline">Link 1</a></li>
                    </ul>
                </div>
                <div class="mt-4">
                    <h3 class="text-lg font-semibold text-slate-800">Image</h3>
                    <img src="https://via.placeholder.com/150" alt="Placeholder Image" class="rounded-md border border-gray-300">
                </div>
                </div>
                <div class="mt-4">
                    <h3 class="text-lg font-semibold text-slate-800">Event List</h3>
                    <ul class="list-disc pl-5 text-gray-600">
                        <li>Event 1 - 2023-10-01</li>
                        <li>Event 2 - 2023-10-15</li>
                    </ul>
            </div>
            <div class="banner">Banner</div>
                </div>

            </div>
        </AccordionItem>
    {/each}
</Accordion>
<Footer/>
