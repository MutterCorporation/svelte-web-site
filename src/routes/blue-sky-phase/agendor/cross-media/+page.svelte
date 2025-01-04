<script>
    import { onMount } from 'svelte';
    import Loading from '../../../../components/Loding.svelte';

    let postContent = $state('');
    let mediaFile = null;
    let mediaPreview = '';
    let selectedPlatforms = $state([]);
    let scheduledDate = $state('');
    let isLoading = $state(false);
    const charLimit = 300;

    // Platforms configuration
    const platforms = [
        { id: 'tiktok', name: 'TikTok', icon: '🎵' },
        { id: 'kwai', name: 'Kwai', icon: '📱' },
        { id: 'instagram', name: 'Instagram', icon: '📸' },
        { id: 'twitter', name: 'Twitter', icon: '🐦' },
        { id: 'bluesky', name: 'BlueSky', icon: '☁️' },
        { id: 'Youtube', name: 'Youtube', icon: '' }
    ];
    
    function togglePlatform(platformId) {
        if (selectedPlatforms.includes(platformId)) {
            selectedPlatforms = selectedPlatforms.filter(id => id !== platformId);
        } else {
            selectedPlatforms = [...selectedPlatforms, platformId];
        }
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            mediaFile = file;
            // Create preview URL
            mediaPreview = URL.createObjectURL(file);
        }
    }

    function clearMedia() {
        mediaFile = null;
        mediaPreview = '';
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
    }

    async function handleSubmit(event) {
        event.preventDefault();
        isLoading = true;

        const formData = new FormData();
        formData.append('content', postContent);
        formData.append('platforms', JSON.stringify(selectedPlatforms));
        formData.append('scheduledDate', scheduledDate);
        if (mediaFile) {
            formData.append('media', mediaFile);
        }

        try {
            const token = localStorage.getItem('MutterCorp');
            const response = await fetch('https://dev.muttercorp.com.br/cross-post', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                // Reset form
                postContent = '';
                selectedPlatforms = [];
                scheduledDate = '';
                clearMedia();
                alert('Post scheduled successfully!');
            } else {
                throw new Error('Failed to schedule post');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to schedule post. Please try again.');
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        const token = localStorage.getItem('MutterCorp');
        if (!token) {
            window.location.href = '/login';
        }
    });
</script>

<div class="container mx-auto p-6">
    <div class="glass-card">
        <header class="text-center mb-8">
            <h1 class="text-3xl font-bold text-white">Cross Media Poster</h1>
            <p class="text-lg text-gray-200">Schedule your posts across multiple platforms</p>
        </header>

        {#if isLoading}
            <Loading message="Scheduling your post..." />
        {:else}
            <form on:submit={handleSubmit} class="space-y-6">
                <!-- Content Input -->
                <div class="form-group glass-input">
                    <label for="content">Post Content ({charLimit - postContent.length} characters remaining)</label>
                    <textarea
                        id="content"
                        bind:value={postContent}
                        maxlength={charLimit}
                        placeholder="What's on your mind?"
                        class="w-full"
                    ></textarea>
                </div>

                <!-- Media Upload -->
                <div class="form-group glass-input">
                    <label for="media">Media Upload</label>
                    <input
                        type="file"
                        id="media"
                        accept="image/*,video/*"
                        on:change={handleFileChange}
                        class="file-input"
                    />
                    {#if mediaPreview}
                        <div class="media-preview">
                            {#if mediaFile.type.startsWith('image/')}
                                <img src={mediaPreview} alt="Preview" />
                            {:else if mediaFile.type.startsWith('video/')}
                                <video src={mediaPreview} controls></video>
                            {/if}
                            <button type="button" class="clear-media" on:click={clearMedia}>
                                Clear Media
                            </button>
                        </div>
                    {/if}
                </div>

                <!-- Platform Selection -->
                <div class="platform-grid">
                    {#each platforms as platform}
                        <button
                            type="button"
                            class="platform-button glass-button {selectedPlatforms.includes(platform.id) ? 'selected' : ''}"
                            on:click={() => togglePlatform(platform.id)}
                        >
                            <span class="platform-icon">{platform.icon}</span>
                            {platform.name}
                        </button>
                    {/each}
                </div>

                <!-- Schedule DateTime -->
                <div class="form-group glass-input">
                    <label for="schedule">Schedule Post</label>
                    <input
                        type="datetime-local"
                        id="schedule"
                        bind:value={scheduledDate}
                    />
                </div>

                <button  on:click={handleSubmit} type="submit" class="submit-button glass-button" disabled={!postContent || selectedPlatforms.length === 0}>
                    Schedule Post
                </button>
            </form>
        {/if}
    </div>
</div>

<style>
    /* Updated color scheme using the provided palette */
    :global(body) {
        background: linear-gradient(135deg, #cc0c39 0%, #1693a7 100%);
        min-height: 100vh;
    }

    .glass-card {
        background: rgba(22, 147, 167, 0.1); /* #1693a7 with opacity */
        backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid rgba(248, 252, 193, 0.2); /* #f8fcc1 with opacity */
        padding: 2rem;
        box-shadow: 0 8px 32px rgba(204, 12, 57, 0.2); /* #cc0c39 with opacity */
    }

    .glass-input {
        background: rgba(248, 252, 193, 0.05); /* #f8fcc1 with opacity */
        backdrop-filter: blur(5px);
        border-radius: 10px;
        border: 1px solid rgba(230, 120, 30, 0.2); /* #e6781e with opacity */
        padding: 1rem;
        margin-bottom: 1rem;
    }

    .glass-button {
        background: rgba(22, 147, 167, 0.2); /* #1693a7 with opacity */
        backdrop-filter: blur(5px);
        border: 1px solid rgba(248, 252, 193, 0.3); /* #f8fcc1 with opacity */
        border-radius: 10px;
        padding: 0.75rem 1.5rem;
        color: #f8fcc1;
        transition: all 0.3s ease;
    }

    .glass-button:hover {
        background: rgba(230, 120, 30, 0.3); /* #e6781e with opacity */
        transform: translateY(-2px);
    }

    .glass-button.selected {
        background: rgba(204, 12, 57, 0.3); /* #cc0c39 with opacity */
        border-color: rgba(248, 252, 193, 0.5); /* #f8fcc1 with opacity */
        color: #f8fcc1;
    }

    textarea {
        background: rgba(22, 147, 167, 0.1); /* #1693a7 with opacity */
        border: 1px solid rgba(248, 252, 193, 0.2); /* #f8fcc1 with opacity */
        border-radius: 8px;
        color: #f8fcc1;
        min-height: 120px;
        padding: 0.75rem;
        width: 100%;
    }

    textarea::placeholder {
        color: rgba(248, 252, 193, 0.5); /* #f8fcc1 with opacity */
    }

    label {
        color: #f8fcc1;
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    .platform-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
    }

    .platform-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .media-preview {
        margin-top: 1rem;
        position: relative;
    }

    .media-preview img,
    .media-preview video {
        max-width: 100%;
        border-radius: 10px;
        border: 2px solid rgba(248, 252, 193, 0.2); /* #f8fcc1 with opacity */
    }

    .clear-media {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(204, 12, 57, 0.8); /* #cc0c39 with opacity */
        color: #f8fcc1;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .submit-button {
        width: 100%;
        background: linear-gradient(45deg, 
            rgba(204, 12, 57, 0.7), /* #cc0c39 */
            rgba(230, 120, 30, 0.7) /* #e6781e */
        );
        color: #f8fcc1;
    }

    .submit-button:hover:not(:disabled) {
        background: linear-gradient(45deg, 
            rgba(230, 120, 30, 0.7), /* #e6781e */
            rgba(204, 12, 57, 0.7) /* #cc0c39 */
        );
    }

    .submit-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .file-input {
        background: rgba(22, 147, 167, 0.1); /* #1693a7 with opacity */
        border: 1px solid rgba(248, 252, 193, 0.2); /* #f8fcc1 with opacity */
        border-radius: 8px;
        padding: 0.5rem;
        color: #f8fcc1;
        width: 100%;
    }

    input[type="datetime-local"] {
        background: rgba(22, 147, 167, 0.1); /* #1693a7 with opacity */
        border: 1px solid rgba(248, 252, 193, 0.2); /* #f8fcc1 with opacity */
        border-radius: 8px;
        color: #f8fcc1;
        padding: 0.5rem;
        width: 100%;
    }

    @media (max-width: 640px) {
        .platform-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .glass-card {
            padding: 1rem;
        }
    }
</style>
