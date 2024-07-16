<script>
    import { onMount } from 'svelte';

    export let data;

    let images = [
        { id: 1, url: 'https://via.placeholder.com/150', alt: 'Image 1' },
        { id: 2, url: 'https://via.placeholder.com/150', alt: 'Image 2' },
        { id: 3, url: 'https://via.placeholder.com/150', alt: 'Image 3' },
        { id: 4, url: 'https://via.placeholder.com/150', alt: 'Image 4' },
        { id: 5, url: 'https://via.placeholder.com/150', alt: 'Image 5' },
        { id: 6, url: 'https://via.placeholder.com/150', alt: 'Image 6' },
        { id: 7, url: 'https://via.placeholder.com/150', alt: 'Image 7' },
        { id: 8, url: 'https://via.placeholder.com/150', alt: 'Image 8' },
        // Adicione mais imagens conforme necessário
    ];

    let showModal = false;
    let currentImage = {};
    let imageLoaded = Array(images.length).fill(false);

    function openModal(image) {
        currentImage = image;
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    function disableRightClick(event) {
        event.preventDefault();
    }

    function handleImageLoad(index) {
        imageLoaded[index] = true;
    }
</script>

<div class="container">
    <div class="container_left">    
        <div class="content">
            <div class="gallery">
                {#each images as image, index (image.id)}
                    <div class="gallery-item" on:contextmenu={disableRightClick} on:click={() => openModal(image)}>
                        {#if imageLoaded[index]}
                            <img src={image.url} alt={image.alt} on:load={() => handleImageLoad(index)} />
                        {:else}
                            <div class="skeleton"></div>
                        {/if}
                        <div class="overlay"></div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

{#if showModal}
    <div class="modal" on:click={closeModal}>
        <div class="modal-content" on:click|stopPropagation>
            <span class="close" on:click={closeModal}>&times;</span>
            <img src={currentImage.url} alt={currentImage.alt} on:contextmenu={disableRightClick} />
        </div>
    </div>
{/if}

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

    .gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 20px;
    }

    .gallery-item {
        position: relative;
        flex: 1 0 calc(33.333% - 10px);
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .gallery-item img {
        width: 100%;
        height: auto;
        display: block;
        user-select: none; /* Evita a seleção da imagem */
        pointer-events: none; /* Bloqueia o clique direito */
    }

    .gallery-item .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0); /* Overlay transparente */
        pointer-events: none; /* Não interfere na interação */
    }

    .skeleton {
        width: 100%;
        padding-top: 100%; /* Aspect ratio 1:1 */
        background-color: #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        user-select: none; /* Evita a seleção de texto */
    }

    .modal-content {
        position: relative;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 90%;
        max-height: 90%;
    }

    .modal-content img {
        width: 100%;
        height: auto;
        display: block;
        user-select: none; /* Evita a seleção da imagem */
        pointer-events: none; /* Bloqueia o clique direito */
    }

    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.5em;
        cursor: pointer;
        user-select: none; /* Evita a seleção do botão de fechar */
    }
</style>
