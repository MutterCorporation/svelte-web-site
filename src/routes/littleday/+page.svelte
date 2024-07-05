<script>
    import { onMount } from 'svelte';
    import Tweet from '../../components/Tweet.svelte';
    import TweetForm from '../../components/TweetForm.svelte';
    import UserDescription from '../../components/UserDescription.svelte'
  
    let currentUser = {};
    let tweets = [];
    let isAuthenticated = false;
  
    function load() {
      const token = localStorage.getItem('MutterCorp');
      return {
        isAuthenticated: !!token
      };
    }
  
    async function fetchUser() {
      const token = localStorage.getItem('MutterCorp');
      if (!token) {
        redirectToLogin();
        return;
      }
  
      try {
        const res = await fetch('https://api.muttercorp.com.brusers/get-user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          currentUser = data;
        } else {
          handleFetchError(res.status);
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    }
  
    async function fetchTweets() {
      const token = localStorage.getItem('MutterCorp');
      if (!token) {
        redirectToLogin();
        return;
      }
  
      try {
        const res = await fetch('https://api.muttercorp.com.br/tweet-story/all-tweet-user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          const data = await res.json();
          tweets = data;
        } else {
          handleFetchError(res.status);
        }
      } catch (error) {
        console.error('Failed to fetch tweets', error);
      }
    }
  
    async function postTweet(event) {
      const { detail } = event
      const content = detail.content

      const token = localStorage.getItem('MutterCorp');
      if (!token) {
        redirectToLogin();
        return;
      }
  
      try {
        const res = await fetch('https://api.muttercorp.com.br/tweet-story/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ content })
        });
  
        if (res.ok) {
          console.log('Tweet postado com sucesso');
          fetchTweets(); // Atualiza os tweets após a postagem bem-sucedida
        } else {
          console.error('Erro ao postar tweet:', res.status);
          handleFetchError(res.status);
        }
      } catch (error) {
        console.error('Failed to post tweet', error);
      }
    }
  
    async function deleteTweet(id) {
      const token = localStorage.getItem('MutterCorp');
      if (!token) {
        redirectToLogin();
        return;
      }
  
      try {
        const res = await fetch(`https://api.muttercorp.com.br/tweets/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (res.ok) {
          fetchTweets();
        } else {
          handleFetchError(res.status);
        }
      } catch (error) {
        console.error('Failed to delete tweet', error);
      }
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
  
    onMount(() => {
      const authStatus = load();
      isAuthenticated = authStatus.isAuthenticated;
      if (!isAuthenticated) {
        redirectToLogin();
      } else {
        fetchTweets();
        fetchUser();
      }
    });
  </script>
  
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
  