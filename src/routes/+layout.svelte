<script>
import "../app.css";
/** @type {{children?: import('svelte').Snippet}} */
let { children } = $props();

</script>

<main>
	{@render children?.()}
</main>




<style>
	:global(body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: Arial, sans-serif;
	}
</style>
