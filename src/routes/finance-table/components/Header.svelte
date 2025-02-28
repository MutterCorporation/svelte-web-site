<!-- components/Header.svelte -->
<script>
    import { page } from '$app/stores';
    $: activeLink = $page.url.pathname; 
  </script>
  
  <header class="bg-white shadow">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <a href="/finance-table" class="text-xl font-bold text-blue-500">Finance Table</a>
        </div>
        <nav>
          <a 
            href="/finance-table/dashboard" 
            class="{activeLink === '/finance-table/dashboard' ? 'border-blue-500 text-blue-500 ml-5' : 'border-transparent text-gray-500 ml-5'}"
          >
            Dashboard
          </a>
          <a 
            href="/finance-table/transactions" 
            class="{activeLink === '/finance-table/transactions' ? 'border-blue-500 text-blue-500 ml-5' : 'border-transparent text-gray-500 ml-5'}"
          >
            Transações
          </a>
          <a 
            href="/finance-table/reports" 
            class="{activeLink === '/finance-table/reports' ? 'border-blue-500 text-blue-500 ml-5' : 'border-transparent text-gray-500 ml-5'}"
          >
            Relatórios
          </a>
          <a 
            href="/finance-table/settings" 
            class="{activeLink === '/finance-table/settings' ? 'border-blue-500 text-blue-500 ml-5' : 'border-transparent text-gray-500 ml-5'}"
          >
            Configurações
          </a>
        </nav>
      </div>
    </div>
  </header>