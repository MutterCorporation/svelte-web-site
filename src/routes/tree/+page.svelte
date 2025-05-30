<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import TouchButton from './componentes/TouchButton.svelte';
    import Modal from './componentes/Modal.svelte';

    let user_information = {
        user_id: 123,
        user_name: "Maikon Weber",
        user_description: `Olá! Sou Maikon Weber, desenvolvedor de software e músico. 
        Tenho vasta experiência na criação de infraestrutura e sistemas complexos. 
        Sou apaixonado por tecnologia, inovação e artes, e estou 
        sempre em busca de novos desafios. Entre em contato se quiser colaborar em projetos ou precisar de ajuda!`,
        user_phrase: "A vida é um catavento de emoção",
        user_photo: "https://avatars.githubusercontent.com/u/45263705?v=4"
    };

    const linkCategories = [
        {
            title: "Aplicações",
            links: [
                { name: "Kama-Doro", url: "www.sexpomodoro.com.br", icon: "⏰", color: "bg-pink-600" },
                { name: "Job Hunter", url: "/job-hunter", icon: "💼", color: "bg-purple-600" },
                { name: "Finance Table", url: "/finance-table", icon: "💰", color: "bg-green-600" },
                { name: "Cryptostomp", url: "/cryptostomp", icon: "📈", color: "bg-blue-600" }
            ]
        },
        {
            title: "Redes Sociais",
            links: [
                { name: "GitHub", url: "https://github.com/maikonweber", icon: "👨‍💻", color: "bg-gray-800" },
                { name: "X", url: "https://x.com/MaikonWeber1", icon: "🐦", color: "bg-black" },
                { name: "BlueSky", url: "https://bsky.app/profile/muttercorp.com.br", icon: "☁️", color: "bg-sky-500" },
                { name: "Twitch", url: "https://www.twitch.tv/maikonweber", icon: "🎮", color: "bg-purple-700" },
                { name: "SoundCloud", url: "https://soundcloud.com/search?q=maikon%20weber%20carvalho", icon: "🎵", color: "bg-orange-600" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/maikonwebercorp/", icon: "🔗", color: "bg-blue-700" }
            ]
        },
        {
            title: "Conteúdo",
            links: [
                { name: "Blog", url: "https://muttercorp.com.br/blog/", icon: "📝", color: "bg-yellow-600" },
                { name: "Carderno de Linguas", url: "https://spurious-distance-5d8.notion.site/Aulas-de-Linguas-20227a442c8880a3ba4efa828af0b1c7", icon: "📝", color: "bg-yellow-600" },
                { name: "Biblioteca TI", url: "https://drive.google.com/drive/folders/13IJWGRoithYsfv8mIMup2Ieno_rsFI3A", icon: "📚", color: "bg-green-700" },
                { name: "Carderno de Programação", url: "https://spurious-distance-5d8.notion.site/Livro-da-Programa-o-20227a442c88804cb783e27df30b04ba", icon: "📝", color: "bg-yellow-600" },
                { name: "Minha Biografia", url: "https://spurious-distance-5d8.notion.site/Biografia-20327a442c88805ab1e7df310de2ad7f?source=copy_link", icon: "📝", color: "bg-yellow-600" },  
                { name: "Notícias Investimento", url: "https://muttercorp.com.br/cryptostomp", icon: "📊", color: "bg-blue-800" },
                { name: "Livro", url: "https://drive.google.com/drive/folders/1k7WVLtxa_riyXEs15HYLCkkfVChCp-SV", icon: "📖", color: "bg-red-700" }
            ]
        }
    ];

    let showModal = $state(false);

    function openModal(value) {
        showModal = value;
    }
</script>

<div class="brutal-container">
    <!-- Efeitos de Fundo -->
    <div class="noise"></div>
    <div class="grid-overlay"></div>

    <!-- Header -->
    <header class="brutal-header">
        <div class="profile-container">
            <div class="profile-pic-wrapper">
                <img 
                    src={user_information.user_photo} 
                    alt={user_information.user_name}
                    class="profile-pic"
                />
                <div class="glitch-effect"></div>
            </div>
            
            <h1 class="brutal-title">{user_information.user_name}</h1>
            <p class="brutal-subtitle">{user_information.user_phrase}</p>
        </div>

        <div class="description-box">
            <p>{user_information.user_description}</p>
        </div>

        <div class="action-buttons">
            <TouchButton {openModal} />
            <a href="/Profile.pdf" download class="brutal-button">
                <span class="button-text">DOWNLOAD CV</span>
                <span class="button-glitch"></span>
            </a>
        </div>
    </header>

    <!-- Links por Categoria -->
    <main class="brutal-main">
        {#each linkCategories as category, i}
            <section 
                class="brutal-section"
                in:fly="{{ y: 50, duration: 500, delay: i * 200 }}"
            >
                <h2 class="category-title">{category.title}</h2>
                <div class="links-grid">
                    {#each category.links as link}
                        <a 
                            href={link.url}
                            class="brutal-link {link.color}"
                            target={link.url.startsWith('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                        >
                            <span class="link-icon">{link.icon}</span>
                            <span class="link-text">{link.name}</span>
                            <span class="link-arrow">→</span>
                        </a>
                    {/each}
                </div>
            </section>
        {/each}
    </main>

    <!-- Footer -->
    <footer class="brutal-footer">
        <p>© {new Date().getFullYear()} MUTTERCORP</p>
    </footer>
</div>

{#if showModal}
    <Modal closeModal={() => openModal(false)} />
{/if}

<style>
    /* Container Principal */
    .brutal-container {
        min-height: 100vh;
        padding: 2rem;
        position: relative;
        background: #000;
        color: #fff;
        font-family: 'Space Mono', monospace;
    }

    /* Efeitos de Fundo */
    .noise {
        position: fixed;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        opacity: 0.05;
        pointer-events: none;
        z-index: 1;
    }

    .grid-overlay {
        position: fixed;
        inset: 0;
        background: 
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 50px 50px;
        pointer-events: none;
        z-index: 1;
    }

    /* Header */
    .brutal-header {
        max-width: 800px;
        margin: 0 auto 4rem;
        position: relative;
        z-index: 2;
    }

    .profile-container {
        text-align: center;
        margin-bottom: 2rem;
    }

    .profile-pic-wrapper {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto 2rem;
    }

    .profile-pic {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 4px solid #fff;
        border-radius: 50%;
    }

    .brutal-title {
        font-size: 3rem;
        font-weight: bold;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: -2px;
    }

    .brutal-subtitle {
        font-size: 1.2rem;
        color: #888;
        margin-top: 0.5rem;
    }

    .description-box {
        background: #fff;
        color: #000;
        padding: 2rem;
        border: 4px solid #000;
        margin-bottom: 2rem;
        box-shadow: 8px 8px 0 #000;
    }

    /* Botões */
    .action-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 2rem;
    }

    .brutal-button {
        padding: 1rem 2rem;
        background: #fff;
        color: #000;
        border: 4px solid #000;
        font-weight: bold;
        text-decoration: none;
        text-transform: uppercase;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 4px 4px 0 #000;
    }

    .brutal-button:hover {
        transform: translate(-4px, -4px);
        box-shadow: 8px 8px 0 #000;
    }

    /* Links Grid */
    .brutal-section {
        max-width: 800px;
        margin: 0 auto 4rem;
    }

    .category-title {
        font-size: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 0.5rem;
        border-bottom: 4px solid #fff;
    }

    .links-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }

    .brutal-link {
        display: flex;
        align-items: center;
        padding: 1rem;
        background: #fff;
        color: #000;
        text-decoration: none;
        border: 4px solid #000;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 4px 4px 0 #000;
    }

    .brutal-link:hover {
        transform: translate(-4px, -4px);
        box-shadow: 8px 8px 0 #000;
    }

    .link-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
    }

    .link-text {
        font-weight: bold;
        flex: 1;
    }

    .link-arrow {
        font-size: 1.2rem;
    }

    /* Footer */
    .brutal-footer {
        text-align: center;
        padding-top: 2rem;
        border-top: 4px solid #fff;
        max-width: 800px;
        margin: 0 auto;
    }

    /* Responsividade */
    @media (max-width: 768px) {
        .brutal-container {
            padding: 1rem;
        }

        .brutal-title {
            font-size: 2rem;
        }

        .links-grid {
            grid-template-columns: 1fr;
        }

        .action-buttons {
            flex-direction: column;
        }
    }
</style>
