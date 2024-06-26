
<script>
    import { onMount } from 'svelte';
    
  
    export function load() {
       const token = localStorage.getItem('MutterCorp');
       const isAuthenticated = !!token;
 
       return {
          isAuthenticated
       };
    }
 
    // Executes when the component is mounted
    onMount(() => {
       const { isAuthenticated } = load();
       if (!isAuthenticated) {
          window.location.href = '/login'; // Redirect to login if not authenticated
       }
    });
 </script>
 
 <h1>Minha Página Protegida</h1>
 <p>Este conteúdo só é acessível se o usuário estiver autenticado.</p>
 