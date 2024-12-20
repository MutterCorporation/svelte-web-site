<script>
    import { Card, Button, Toggle } from 'flowbite-svelte';

    export let title;
    export let description;
    export let picture;

    let vCard = false;
</script>

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
<div class="w-full h-full relative">
  <!-- SVG Mask Background -->
 
  <!-- Card Content -->
  <Card class="bg-gradient-to-r from-blue-100 to-red-200 relative z-10 p-6 flex flex-col h-full items-center text-white" img={picture} title={title} reverse={vCard}>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">{description}</p>
    <Button class="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-6 rounded-md shadow-lg">
      Ir para o site
    </Button>
  </Card>
</div>
