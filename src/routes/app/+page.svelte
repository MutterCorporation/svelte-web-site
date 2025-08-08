<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	onMount(() => {
		// Captura o token da URL (?token=...)
		const token = $page.url.searchParams.get('token');
		
		if (token) {
			// Salva o token no localStorage para acesso posterior
			localStorage.setItem('MutterCorp', token);
			
			// Redireciona para a p�gina admin
			goto('/admin', { replaceState: true });
		} else {
			// Se n�o h� token, redireciona para login
			goto('/login', { replaceState: true });
		}
	});
</script>

<svelte:head>
	<title>Processando autentica��o...</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
	<div class="max-w-md w-full space-y-8 p-8">
		<div class="text-center">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
			<h2 class="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
				Processando autentica��o...
			</h2>
			<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
				Aguarde enquanto validamos suas credenciais.
			</p>
		</div>
	</div>
</div>