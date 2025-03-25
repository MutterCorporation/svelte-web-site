<script>
    /** @type {{openModal: any}} */
    let { openModal } = $props();

    function handleClick() {
        openModal(true);
    }
</script>

<button class="touch-button" onclick={handleClick}>
    Touch me
</button>

<style>
    .touch-button {
        padding: 0.5rem 1rem;
        background-color: #000000;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .touch-button:hover {
        background-color: #ebebeb;
    }
</style>
