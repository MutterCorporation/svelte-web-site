<script>
  import { inject } from '@vercel/analytics'
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

injectSpeedInsights();

</script>

<main>
    <slot />
</main>

<style>
    :global(body) {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
</style>