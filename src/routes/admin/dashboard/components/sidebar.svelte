<!-- components/Sidebar.svelte -->
<script>
	// Props
	export let activeTab = 'overview';
	/**
	 * @type {any[]}
	 */
	export let menuItems = [];
	export let onTabChange;

	/**
	 * @param {any} iconName
	 */
	function getIconSvg(iconName) {
		switch (iconName) {
			case 'trending-up':
				return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>`;
			case 'shopping-bag':
				return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>`;
			case 'package':
				return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>`;
			case 'truck':
				return `<path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>`;
			case 'users':
				return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>`;
			case 'dollar-sign':
				return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`;
			case 'image':
				return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>`;
			default:
				return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`;
		}
	}
</script>

<div class="sticky top-0 h-screen w-64 bg-indigo-800">
	<div class="p-4">
		<div class="flex items-center space-x-2 px-4 pb-4 pt-2">
			<svg
				class="h-8 w-8 text-white"
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
			<span class="text-xl font-bold text-white">FitStorePro</span>
		</div>

		<ul class="mt-6">
			{#each menuItems as item}
				<li>
					<button
						on:click={() => onTabChange(item.id)}
						class="flex w-full items-center rounded-md px-4 py-3 text-sm font-medium {activeTab ===
						item.id
							? 'bg-indigo-900 text-white'
							: 'text-indigo-100 hover:bg-indigo-700'}"
					>
						<svg
							class="mr-3 h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							{@html getIconSvg(item.icon)}
						</svg>
						{item.label}
					</button>
				</li>
			{/each}
		</ul>

		<div class="mt-10 px-4">
			<div class="rounded-lg bg-indigo-700 p-4">
				<h5 class="mb-2 text-sm font-medium text-white">Progresso da Loja</h5>
				<div class="mt-1">
					<div class="relative pt-1">
						<div class="flex h-2 overflow-hidden rounded bg-indigo-300 text-xs">
							<div
								style="width: 75%"
								class="flex flex-col justify-center whitespace-nowrap bg-white text-center text-white shadow-none"
							></div>
						</div>
					</div>
					<p class="mt-2 text-xs text-indigo-100">75% completo</p>
					<a href="#" class="mt-2 inline-block text-xs text-white hover:text-indigo-200">
						Ver mais detalhes
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="absolute bottom-0 w-full p-4">
		<div class="flex items-center px-4">
			<div class="flex-shrink-0">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-medium text-white"
				>
					A
				</div>
			</div>
			<div class="ml-3">
				<p class="text-sm font-medium text-white">Admin</p>
				<a href="#" class="text-xs text-indigo-300 hover:text-white">Ver perfil</a>
			</div>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button class="ml-auto text-indigo-300 hover:text-white">
				<svg
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					></path>
				</svg>
			</button>
		</div>
	</div>
</div>
