<script>
    import { onMount } from 'svelte';
    import UserDescription from '../../../../components/UserDescription.svelte';

    export let data;

    let currentUser = {};
    let tweets = [];
    let isAuthenticated = false;

    function load() {
        const token = localStorage.getItem('MutterCorp');
        return {
            isAuthenticated: !!token
        };
    }


    function redirectToLogin() {
        localStorage.removeItem('MutterCorp');
        window.location.href = '/login';
    }

    function handleFetchError(status) {
        if (status === 403 || status === 401) {
            redirectToLogin();
        } else {
            console.error('Failed to fetch data');
        }
    }


</script>

<div class="container">
    <div class="container_left">
        <div class="user-description">
            <UserDescription {currentUser} />
        </div>
        <div class="content">
            <div class="tweets small-text">
            </div>
        </div>
    </div>
</div>

<style>
    body {
        font-family: Arial, sans-serif;
    }

    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: white;
    }

    .tweets {
        margin-top: 20px;
    }

    .container_left {
        display: flex;
        flex-direction: row;
    }

    .container_rows {
        display: flex;
        width: 100%;
        flex-direction: column;
        background-color: white;
    }

    .small-text {
        font-size: 0.8em; /* Define um tamanho de fonte menor */
    }

    /* Estilos adicionais para melhorar o layout */
    .user-description {
        flex: 1;
        margin-right: 20px;
    }

    .content {
        flex: 2;
    }
</style>
