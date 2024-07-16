<script>
    import { onMount } from 'svelte';

    let videos = [];

    export function load() {
        const token = localStorage.getItem('MutterCorp');
        const isAuthenticated = !!token;

        return {
            isAuthenticated
        };
    }

    async function fetchVideos(page = 1, size = 100) {
        const res = await fetch(`https://dev.muttercorp.com.br/video/get-videos/${page}/${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('MutterCorp')}`
            }
        });
        if (res.ok) {
            const data = await res.json();
            videos = data.data;
            console.log(videos);
        } else {
            if (res.status === 403 || res.status === 401) {
                localStorage.removeItem('MutterCorp');
            }
            console.error('Failed to fetch videos');
        }
    }

    async function createVideo() {
        const res = await fetch('https://dev.muttercorp.com.br/video/create-video', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('MutterCorp')}`
            },
             // Modify the body as per your needs
        });

        if (res.ok) {
            fetchVideos();
        } else {
            if (res.status === 403 || res.status === 401) {
                localStorage.removeItem('MutterCorp');
            }
            console.error('Failed to fetch videos');
        }
    }

    async function deleteVideo(id) {
        const res = await fetch(`https://dev.muttercorp.com.br/videos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('MutterCorp')}`
            }
        });

        if (res.ok) {
            fetchVideos();
        } else {
            console.error('Failed to delete video');
        }
    }

    onMount(() => {
        const { isAuthenticated } = load();
        if (!isAuthenticated) {
            window.location.href = '/login';
        } else {
            fetchVideos();
        }
    });
</script>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow-x: auto
    }

    th, td {
        padding: 8px 12px;
        border: 1px solid #ddd;
        text-align: left;
    }

    th {
        background-color: #002244; /* Azul marinho */
        color: white;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #ffe6e6; /* Vermelho claro */
    }

    .actions {
        display: flex;
        gap: 8px;
    }

    button {
        background-color: #c40000; /* Vermelho */
        color: white;
        border: none;
        padding: 8px 16px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #ff0000; /* Vermelho mais claro */
    }

    h1 {
        color: #002244; /* Azul marinho */
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    p {
        color: #555;
    }
</style>

<h1>Minha Página Protegida</h1>
<p>Este conteúdo só é acessível se o usuário estiver autenticado.</p>

<button on:click={createVideo}>Create Video</button>

{#if videos.length > 0}
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Tempo Inicia</th>
                <th>Tempo Final</th>
                <th>Categoria</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each videos as video (video.id)}
                <tr>
                    <td>{video.id}</td>
                    <td>{video.nome_arquivo}</td>
                    <td>{video.tempo_inicia}</td>
                    <td>{video.tempo_final}</td>
                    <td>{video.categoria}</td>
                    <td class="actions">
                        <button on:click={() => deleteVideo(video.id)}>Delete</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <p>No videos available.</p>
{/if}
