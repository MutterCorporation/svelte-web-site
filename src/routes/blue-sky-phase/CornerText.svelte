<script>
	export let text = "Informações Importantes";
</script>

<div class="corner-text">
	<p>{text}</p>
</div>

<style>
	.corner-text {
		position: fixed;
		bottom: 10px;
		right: 10px;
		background: rgba(0, 0, 0, 0.7);
		color: #fff;
		padding: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
	}
</style>