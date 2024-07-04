<!-- UserDescription.svelte -->

<script>
    export let currentUser;
    console.log(currentUser)
</script>

<style>
    .user-info {
        margin-bottom: 20px;
        padding: 10px;
        border-radius: 5px;
    
    }

    .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        background-color: aqua;
    }

    .user-details {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .user-description {
        margin-top: 10px;
    }

    .container_avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>

<div class="user-info">
    <div class="user-details">
        <div class="container_avatar">    
        <img class="avatar"> 
        <div class="user-description">
        <h2> {currentUser.username}</h2>
        </div>    
        <p> {currentUser.name} {currentUser.lastname} </p>
            <p> {currentUser.email} </p>
            <!-- Adicionar outros campos de descrição conforme necessário -->
        </div>
    </div>
</div>
