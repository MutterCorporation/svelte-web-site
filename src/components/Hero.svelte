<style>
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #230f2b;
      text-align: center;
      height: 50vh;
      border-radius: 15px;
      width: 90%;
      margin-bottom: 2rem;
    }
  
    .h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
  
    .p {
      font-size: 1.5rem;
      max-width: 600px;
    }
  </style>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

<div class="relative flex flex-col items-center justify-center 
  bg-gradient-to-r from-cyan-700 to-red-600 h-auto 
  rounded-xl shadow-2xl text-white text-center 
  p-8 m-6 sm:m-10 md:m-14 lg:m-18 xl:m-24 2xl:m-28 space-y-8 font-roboto">

  <!-- SVG como fundo -->
  <svg class="absolute inset-0 w-full h-full text-blue-900 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#005f99" fill-opacity="0.6" d="M0,96L48,101.3C96,107,192,117,288,138.7C384,160,480,192,576,213.3C672,235,768,245,864,224C960,203,1056,149,1152,149.3C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    <path fill="#007bbf" fill-opacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,176C672,171,768,181,864,192C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    <path fill="#0099e6" fill-opacity="0.2" d="M0,256L48,245.3C96,235,192,213,288,181.3C384,149,480,107,576,117.3C672,128,768,192,864,202.7C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
  </svg>

  <!-- Conteúdo principal -->
  <div class="relative z-10 space-y-4">
    <h1 class="text-3xl sm:text-4xl font-bold leading-tight">
      Inovação em Soluções de Negócios
    </h1>
    <p class="text-lg sm:text-xl font-medium">
      Transformando ideias em realidade,<br> impulsionando o futuro dos negócios.
    </p>
  </div>

  <!-- Formulário -->
  <form class="relative z-10 flex flex-col sm:flex-row items-center w-full max-w-lg space-y-3 sm:space-y-0 sm:space-x-3">
    <input 
      type="email" 
      placeholder="Digite seu e-mail" 
      class="flex-grow p-3 text-gray-700 rounded-md focus:outline-none focus:ring-4 focus:ring-cyan-600 focus:border-transparent shadow-md"
      required>
    <button 
      type="submit" 
      class="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-6 rounded-md shadow-lg">
      Inscreva-se
    </button>
  </form>
</div>
