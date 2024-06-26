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

    async function fetchVideos() {
        const res = await fetch('http://localhost:3001/videos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('MutterCorp')}`
            }
        });
        if (res.ok) {
            const data = await res.json();
            videos = data;
        } else {
            console.error('Failed to fetch videos');
        }
    }

    async function createVideo() {
        const res = await fetch('http://localhost:3001/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('MutterCorp')}`
            },
            body: JSON.stringify({ title: 'New Video' }) // Modify the body as per your needs
        });

        if (res.ok) {
            fetchVideos(); // Refresh the list after creation
        } else {
            console.error('Failed to create video');
        }
    }

    async function deleteVideo(id) {
        const res = await fetch(`http://localhost:3001/videos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('MutterCorp')}`
            }
        });

        if (res.ok) {
            fetchVideos(); // Refresh the list after deletion
        } else {
            console.error('Failed to delete video');
        }
    }

    onMount(() => {
        const { isAuthenticated } = load();
        if (!isAuthenticated) {
            window.location.href = '/login'; // Redirect to login if not authenticated
        } else {
            fetchVideos();
        }
    });
</script>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 8px 12px;
        border: 1px solid #ddd;
        text-align: left;
    }

    th {
        background-color: #f4f4f4;
    }

    .actions {
        display: flex;
        gap: 8px;
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
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each videos as video (video.id)}
                <tr>
                    <td>{video.id}</td>
                    <td>{video.title}</td>
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
