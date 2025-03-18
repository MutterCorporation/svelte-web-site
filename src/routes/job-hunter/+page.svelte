<svelte:head>
  <title>Job Hunter - Conectando Talentos Tech</title>
  <meta name="description" content="Encontre as melhores vagas em tecnologia ou contrate os melhores talentos para sua empresa">
  <meta name="keywords" content="Vagas Tech, Programação, Desenvolvimento, Recrutamento TI, Empregos Tech">
  <meta name="author" content="MutterCorp">
  <meta property="og:title" content="Job Hunter - O Marketplace de Talentos Tech">
  <meta property="og:description" content="Conectando empresas inovadoras aos melhores talentos em tecnologia">
  <meta property="og:url" content="https://muttercorp.com.br/job-hunter">
  <meta property="og:type" content="website">
</svelte:head>

<script>
  import Header from '../../components/Header.svelte';
  import { fly, fade } from 'svelte/transition';

  // Estados
  let searchTerm = '';
  let selectedTech = [];
  let selectedLevel = 'all';

  // Dados mockados
  const featuredJobs = [
    {
      id: 1,
      company: "TechCorp",
      logo: "https://via.placeholder.com/150",
      title: "Desenvolvedor Full Stack Senior",
      location: "Remoto",
      salary: "R$ 15k - 20k",
      tags: ["React", "Node.js", "TypeScript"],
      posted: "há 2 dias"
    },
    // Adicione mais vagas
  ];

  const techStack = [
    "JavaScript", "Python", "Java", "React", "Node.js",
    "TypeScript", "Angular", "Vue.js", "PHP", "Ruby"
  ];

  const levels = [
    { value: "all", label: "Todos os níveis" },
    { value: "junior", label: "Júnior" },
    { value: "mid", label: "Pleno" },
    { value: "senior", label: "Sênior" }
  ];
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
  <Header />

  <!-- Hero Section -->
  <section class="relative py-20 overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto text-center" in:fly="{{ y: 50, duration: 1000 }}">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 text-white">
          Encontre seu próximo
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            desafio tech
          </span>
        </h1>
        <p class="text-xl text-gray-300 mb-12">
          Conectando os melhores talentos às empresas mais inovadoras
        </p>

        <!-- Barra de Busca -->
        <div class="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              bind:value={searchTerm}
              placeholder="Buscar vagas..."
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <select
              bind:value={selectedLevel}
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
            >
              {#each levels as level}
                <option value={level.value}>{level.label}</option>
              {/each}
            </select>
            <button class="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold transition-all">
              Buscar Vagas
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Tech Stack Filter -->
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap gap-3 justify-center">
        {#each techStack as tech}
          <button
            class="px-4 py-2 rounded-full text-sm font-medium transition-all
                   {selectedTech.includes(tech) 
                     ? 'bg-purple-600 text-white' 
                     : 'bg-white/5 text-gray-300 hover:bg-white/10'}"
            on:click={() => {
              selectedTech = selectedTech.includes(tech)
                ? selectedTech.filter(t => t !== tech)
                : [...selectedTech, tech]
            }}
          >
            {tech}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <!-- Featured Jobs -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-white mb-12 text-center">Vagas em Destaque</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each featuredJobs as job}
          <div 
            class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all"
            in:fly="{{ y: 50, duration: 500 }}"
          >
            <div class="flex items-start gap-4">
              <img src={job.logo} alt={job.company} class="w-12 h-12 rounded-xl" />
              <div>
                <h3 class="text-xl font-semibold text-white mb-1">{job.title}</h3>
                <p class="text-gray-400">{job.company}</p>
              </div>
            </div>
            
            <div class="mt-4 flex items-center gap-3">
              <span class="text-gray-400 text-sm flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
              <span class="text-purple-400 text-sm">{job.salary}</span>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              {#each job.tags as tag}
                <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {tag}
                </span>
              {/each}
            </div>

            <div class="mt-6 flex items-center justify-between">
              <span class="text-gray-400 text-sm">{job.posted}</span>
              <a href={`/job-hunter/vaga/${job.id}`} class="text-purple-400 hover:text-purple-300 font-medium">
                Ver detalhes →
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="text-center md:text-left">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Para Empresas
          </h2>
          <p class="text-gray-300 mb-8">
            Encontre os melhores talentos tech para sua empresa. Poste suas vagas e alcance milhares de desenvolvedores.
          </p>
          <a href="/job-hunter/empresa/cadastro" class="inline-block px-8 py-3 bg-white text-purple-900 font-semibold rounded-xl hover:bg-gray-100 transition-all">
            Publicar Vaga
          </a>
        </div>

        <div class="text-center md:text-left">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Para Desenvolvedores
          </h2>
          <p class="text-gray-300 mb-8">
            Crie seu perfil, destaque suas habilidades e encontre as melhores oportunidades do mercado.
          </p>
          <a href="/job-hunter/dev/cadastro" class="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all">
            Criar Perfil
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold text-purple-400 mb-2">2.5k+</div>
          <div class="text-gray-400">Vagas Ativas</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-purple-400 mb-2">10k+</div>
          <div class="text-gray-400">Desenvolvedores</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-purple-400 mb-2">500+</div>
          <div class="text-gray-400">Empresas</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-purple-400 mb-2">95%</div>
          <div class="text-gray-400">Taxa de Contratação</div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  :global(body) {
    @apply bg-gray-900;
  }

  /* Animações */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
</style>
