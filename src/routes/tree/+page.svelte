<script>
    let user_information = {
        user_id: 123,
        user_name: "Maikon Weber",
        user_description: `Olá! Sou Maikon Weber, desenvolvedor de software e músico. 
        Tenho vasta experiência na criação de infraestrutura e sistemas complexos. 
        Sou apaixonado por tecnologia, inovação e artes, e estou 
        sempre em busca de novos desafios. Entre em contato se quiser colaborar em projetos ou precisar de ajuda!`,
        user_phrase: "A vida é um catavento de emoção",
        user_photo: "https://avatars.githubusercontent.com/u/45263705?v=4", 
        links: [
            { name: "GitHub", url: "https://github.com/maikonweber" },
            { name: "x", url: "https://x.com/MaikonWeber1" },
            { name: "Blog", url: "https://muttercorp.com.br/blog/"},
            { name: "Drive", url: "https://drive.google.com/drive/folders/13IJWGRoithYsfv8mIMup2Ieno_rsFI3A?usp=sharing tbcv "},        
            { name: "SoundCloud", url: "https://soundcloud.com/search?q=maikon%20weber%20carvalho"},
            { name: "BlueSky", url: "https://bsky.app/profile/muttercorp.com.br"},
            { name: "Twitch", url: "https://www.twitch.tv/maikonweber"}
        ]
    };

    let { links } = user_information;

    import TouchButton from './componentes/TouchButton.svelte'; 
    import Modal from './componentes/Modal.svelte'; 

    let showModal = false;

    function openModal(value) {
        showModal = value;
    }
</script>

<div class="background-overlay"></div>

<div class="link-tree">
    <div class="user-information">
        <div class="user-photo">
            <img src={user_information.user_photo} alt="Maikon Weber">
        </div>
        <TouchButton {openModal} />
        <div class="user-description">
            {user_information.user_description}
        </div>
        <div class="user-phrase">
            {user_information.user_phrase}
        </div>
    </div>
    {#each links as link}
        <a href={link.url} target="_blank" rel="noopener noreferrer" class="link link-{link.name.toLowerCase()}">
            {link.name}
        </a>
    {/each}
</div>

{#if showModal}
    <Modal closeModal={() => openModal(false)} />
{/if}

<style>
    .background-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #333, #000);
        z-index: -1; /* Coloca o fundo atrás dos outros elementos */
    }

    .link-tree {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        padding: 2rem;
        background: linear-gradient(135deg, #060606, hsl(200, 20%, 97%));
        border-radius: 10px;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        position: relative;
        z-index: 1; /* Garante que o conteúdo esteja sobre o fundo */
    }

    .user-information {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;
    }

    .user-photo img {
        border-radius: 50%;
        width: 150px;
        height: 150px;
        object-fit: cover;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .user-description {
        font-size: 1rem;
        color: #ffffff;
        line-height: 1.5;
    }

    .user-phrase {
        font-size: 1.2rem;
        font-style: italic;
        color: #fafdff;
    }
    
    .link {
        display: block;
        width: 100%;
        text-align: center;
        padding: 1rem;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s, transform 0.3s;
    }

    .link:hover {
        transform: scale(1.05);
    }

    .link-github {
        background-color: #333;
        color: white;
    }

    .link-x {
        background-color: black;
        color: white;
    }

    .link-blog {
        background-color: #f39c12; /* Cor aleatória */
        color: white;
    }

    .link-drive {
        background-color: green; /* Cor aleatória */
        color: white;
    }

    .link-bluesky {
        background-color: rgb(79, 205, 228); /* Cor aleatória */
        color: rgb(238, 243, 245);
    }

    .link-soundcloud {
        background-color: rgb(194, 61, 9); /* Cor aleatória */
        color: rgb(243, 237, 235);
    }

    .link-twitch {
        background-color: rgb(163, 9, 194); /* Cor aleatória */
        color: rgb(243, 237, 235);        
    }
</style>
