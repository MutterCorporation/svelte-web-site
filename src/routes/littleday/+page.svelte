<script>
	import { onMount } from 'svelte';
	import Tweet from '../../components/Tweet.svelte';
	import TweetForm from '../../components/TweetForm.svelte';
	import UserDescription from '../../components/UserDescription.svelte';
	import { fetchUser, fetchTweets, postTweet, deleteTweet } from '../../lib/service';
	import { handleFetchError, redirectToLogin} from '../../lib/index'


	let currentUser = {};
	let tweets = [];
	let isAuthenticated = false;

	function load() {
		const token = localStorage.getItem('MutterCorp');
		return {
			isAuthenticated: !!token
		};
	}


    async function fetchUserData() {
        const token = localStorage.getItem('MutterCorp');
        if (!token) {
            redirectToLogin();
            return;
        }

        try {
            currentUser = await fetchUser(token);
        } catch (error) {
            handleFetchError(error.message);
        }
    }

    async function fetchUserTweets() {
        const token = localStorage.getItem('MutterCorp');
        if (!token) {
            redirectToLogin();
            return;
        }

        try {
            tweets = await fetchTweets(token);
        } catch (error) {
            handleFetchError(error.message);
        }
    }

    async function handlePostTweet(event) {
        const { detail } = event;
        const content = detail.content;

        const token = localStorage.getItem('MutterCorp');
        if (!token) {
            redirectToLogin();
            return;
        }

        try {
            await postTweet(token, content);
            await fetchUserTweets(); // Atualiza os tweets após a postagem bem-sucedida
        } catch (error) {
            console.error('Erro ao postar tweet:', error.message);
            handleFetchError(error.message);
        }
    }

    async function handleDeleteTweet(event) {
        const { detail } = event;
        const tweetId = detail.id;

        const token = localStorage.getItem('MutterCorp');
        if (!token) {
            redirectToLogin();
            return;
        }

        try {
            await deleteTweet(token, tweetId);
            await fetchUserTweets();
        } catch (error) {
            handleFetchError(error.message);
        }
    }


	onMount(() => {
        const { isAuthenticated } = load();
        if (!isAuthenticated) {
            window.location.href = '/login';
        } else {
            fetchUserTweets();
            fetchUserData();
        }
    });
	
</script>

<div class="container">
	<div class="container_left">
		<div class="user-description">
			<UserDescription {currentUser} />
		</div>
		<div class="content">
			<h1>Mini Twitter</h1>
			<TweetForm on:submit={postTweet} class="small-text" />
			<div class="tweets small-text">
				{#each tweets as tweet (tweet.id)}
					<Tweet {tweet} on:delete={deleteTweet} />
				{/each}
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

	h1 {
		color: #1da1f2;
		text-align: center;
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
