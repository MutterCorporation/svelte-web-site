<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    let gastos = [];
    let entradas = [];
    let modalOpen = false;
    let novoRegistro = { descricao: '', valor: 0, tipo: 'gasto' }; // Estrutura para novo registro

    const dispatch = createEventDispatcher();

    export function load() {
        const token = localStorage.getItem('MutterCorp');
        const isAuthenticated = !!token;

        return {
            isAuthenticated
        };
    }

    async function fetchRegistros() {
        // Aqui você faria requisições para obter gastos e entradas
        // Exemplo de endpoint fictício
        const resGastos = await fetch(`http://localhost:3001/gastos`);
        if (resGastos.ok) {
            const data = await resGastos.json();
            gastos = data;
        } else {
            console.error('Failed to fetch gastos');
        }

        const resEntradas = await fetch(`http://localhost:3001/entradas`);
        if (resEntradas.ok) {
            const data = await resEntradas.json();
            entradas = data;
        } else {
            console.error('Failed to fetch entradas');
        }
    }

    async function criarRegistro() {
        const res = await fetch('http://localhost:3001/criar-registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('MutterCorp')}`
            },
            body: JSON.stringify(novoRegistro)
        });

        if (res.ok) {
            // Limpar e fechar modal após sucesso
            novoRegistro = { descricao: '', valor: 0, tipo: 'gasto' };
            modalOpen = false;
            fetchRegistros(); // Recarregar dados
        } else {
            console.error('Falha ao criar registro');
        }
    }

    async function deletarRegistro(id, tipo) {
        const res = await fetch(`http://localhost:3001/${tipo}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('MutterCorp')}`
            }
        });

        if (res.ok) {
            fetchRegistros(); // Recarregar dados após exclusão
        } else {
            console.error(`Falha ao deletar ${tipo}`);
        }
    }

    onMount(() => {
        const { isAuthenticated } = load();
        if (!isAuthenticated) {
            window.location.href = '/login';
        } else {
            fetchRegistros();
        }
    });
</script>

<style>
    /* Estilos para a tabela e modal */
</style>

<h1>Minha Página Protegida</h1>
<p>Este conteúdo só é acessível se o usuário estiver autenticado.</p>

<button on:click={() => modalOpen = true}>Adicionar Registro</button>

<!-- Modal para adicionar novo registro -->
{#if modalOpen}
    <div class="modal">
        <form on:submit|preventDefault={criarRegistro}>
            <label>
                Descrição:
                <input type="text" bind:value={novoRegistro.descricao}>
            </label>
            <label>
                Valor:
                <input type="number" step="0.01" bind:value={novoRegistro.valor}>
            </label>
            <label>
                Tipo:
                <select bind:value={novoRegistro.tipo}>
                    <option value="gasto">Gasto</option>
                    <option value="entrada">Entrada</option>
                </select>
            </label>
            <button type="submit">Salvar</button>
            <button type="button" on:click={() => modalOpen = false}>Cancelar</button>
        </form>
    </div>
{/if}

<!-- Tabela de Gastos -->
{#if gastos.length > 0}
    <h2>Gastos</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each gastos as gasto (gasto.id)}
                <tr>
                    <td>{gasto.id}</td>
                    <td>{gasto.descricao}</td>
                    <td>{gasto.valor}</td>
                    <td class="actions">
                        <button on:click={() => deletarRegistro(gasto.id, 'gastos')}>Delete</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <p>Nenhum gasto disponível.</p>
{/if}

<!-- Tabela de Entradas -->
{#if entradas.length > 0}
    <h2>Entradas</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each entradas as entrada (entrada.id)}
                <tr>
                    <td>{entrada.id}</td>
                    <td>{entrada.descricao}</td>
                    <td>{entrada.valor}</td>
                    <td class="actions">
                        <button on:click={() => deletarRegistro(entrada.id, 'entradas')}>Delete</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <p>Nenhuma entrada disponível.</p>
{/if}
