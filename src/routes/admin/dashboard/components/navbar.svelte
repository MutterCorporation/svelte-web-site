<!-- components/Navbar.svelte -->
<script>
	// Você pode adicionar lógica para o navbar aqui, como dropdown, etc.
	let searchQuery = '';
</script>

<nav class="border-b border-gray-200 bg-white shadow-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex items-center">
				<div class="flex flex-shrink-0 items-center">
					<svg
						class="h-8 w-8 text-indigo-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						></path>
					</svg>
					<span class="ml-2 text-xl font-bold text-gray-900">FitStorePro</span>
				</div>
			</div>
			<div class="flex items-center">
				<div class="relative mx-3">
					<span class="absolute inset-y-0 left-0 flex items-center pl-3">
						<svg
							class="h-5 w-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</span>
					<input
						type="text"
						bind:value={searchQuery}
						class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
						placeholder="Buscar..."
					/>
				</div>
				<button class="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-500">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600"
					>
						A
					</div>
					<span class="ml-2">Admin</span>
					<svg
						class="ml-1 h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
</nav>
