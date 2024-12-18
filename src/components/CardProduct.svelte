<script>
    import { Card, Button, Toggle } from 'flowbite-svelte';

    export let title;
    export let description;
    export let picture;

    let vCard = false;
</script>

<div  class="space-y-4">
    <Card img={picture} title={title} reverse={vCard}>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">{description}</p>
      <Button>
        Read more 
      </Button>
    </Card>
  </div>