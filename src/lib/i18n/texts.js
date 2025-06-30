// Sistema de Internacionalização da MutterCorp
// Todos os textos isolados para facilitar tradução via n8n

export const TEXTS = {
  // Textos comuns
  COMMON: {
    LOADING: 'Carregando...',
    ERROR: 'Erro',
    SUCCESS: 'Sucesso',
    CANCEL: 'Cancelar',
    SAVE: 'Salvar',
    DELETE: 'Excluir',
    EDIT: 'Editar',
    ADD: 'Adicionar',
    SEARCH: 'Buscar',
    FILTER: 'Filtrar',
    PREVIOUS: 'Anterior',
    NEXT: 'Próximo',
    VIEW_ALL: 'Ver todos',
    CLOSE: 'Fechar',
    SUBMIT: 'Enviar',
    NAME: 'Nome',
    EMAIL: 'E-mail',
    PHONE: 'Telefone',
    MESSAGE: 'Mensagem',
    CONTENT_DEVELOPMENT: 'Conteúdo em Desenvolvimento',
    CONTENT_DEVELOPMENT_TEXT: 'Esta seção está sendo desenvolvida. Em breve teremos mais funcionalidades disponíveis.'
  },

  // Layout global
  LAYOUT: {
    NAV: {
      HOME: 'Início',
      SHOP: 'Loja',
      BLOG: 'Blog',
      LINKS: 'Links',
      TASK_DORO: 'Task Doro',
      MAIN: 'Principal',
      APPS: 'Aplicações',
      MENU: 'Menu'
    },
    FOOTER: {
      TAGLINE: 'Transformando negócios através da tecnologia e IA',
      COMPANY: 'Empresa',
      ABOUT: 'Sobre',
      BLOG: 'Blog',
      CONTACT: 'Contato',
      LEGAL: 'Legal',
      PRIVACY: 'Privacidade',
      TERMS: 'Termos',
      COOKIES: 'Cookies',
      SOCIAL: 'Redes Sociais',
      RIGHTS: 'Todos os direitos reservados.'
    }
  },

  // Navegação
  NAV: {
    HOME: 'Início',
    ABOUT: 'Sobre',
    SERVICES: 'Serviços',
    CONTACT: 'Contato',
    ADMIN: 'Admin',
    LOGIN: 'Login'
  },

  // Página principal
  HOMEPAGE: {
    HERO_TITLE: 'Inovação & Tecnologia',
    HERO_SUBTITLE: 'Soluções empresariais com Machine Learning e IA que transformam seu negócio',
    CTA_SOLUTIONS: 'Conhecer Soluções',
    CTA_CONTACT: 'Falar com Especialista',
    
    APPLICATIONS_TITLE: 'Nossas Aplicações',
    TECHNOLOGIES_TITLE: 'Tecnologias que Utilizamos',
    SERVICES_TITLE: 'Nossas Soluções',
    SUCCESS_CASES_TITLE: 'Casos de Sucesso',
    WHY_CHOOSE_TITLE: 'Por que Escolher a MutterCorp?',
    COMPANY_HISTORY_TITLE: 'Nossa História',
    
    CONTACT_TITLE: 'Pronto para Transformar seu Negócio?',
    CONTACT_SUBTITLE: 'Entre em contato conosco e descubra como nossas soluções em ML, IA e tecnologia podem impulsionar seus resultados',
    
    FORM_NAME_PLACEHOLDER: 'Seu nome completo',
    FORM_EMAIL_PLACEHOLDER: 'seu@email.com',
    FORM_PHONE_PLACEHOLDER: '(00) 00000-0000',
    FORM_MESSAGE_PLACEHOLDER: 'Como podemos ajudar?',
    FORM_SUBMIT: 'Agendar Demonstração',
    FORM_SENDING: 'Enviando...',
    FORM_SUCCESS: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    FORM_ERROR: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.'
  },

  // Admin Dashboard
  ADMIN: {
    DASHBOARD_TITLE: 'Dashboard',
    LOADING_DATA: 'CARREGANDO DADOS...',
    SEARCH_PLACEHOLDER: 'Buscar...',
    
    SIDEBAR: {
      BRAND_NAME: 'FitStorePro',
      OVERVIEW: 'Visão Geral',
      PRODUCTS: 'Produtos',
      ORDERS: 'Pedidos',
      SHIPMENTS: 'Envios',
      DESIGNS: 'Estampas',
      CUSTOMERS: 'Clientes',
      FINANCE: 'Financeiro',
      PROGRESS_TITLE: 'Progresso da Loja',
      PROGRESS_COMPLETE: '75% configurado',
      VIEW_DETAILS: 'Ver detalhes',
      ADMIN_USER: 'Administrador',
      VIEW_PROFILE: 'Ver perfil'
    },

    OVERVIEW: {
      TITLE: 'Visão Geral',
      TOTAL_SALES: 'Vendas Totais',
      NEW_ORDERS: 'Novos Pedidos',
      PENDING_SHIPMENTS: 'Envios Pendentes',
      NEW_CUSTOMERS: 'Novos Clientes',
      INCREASE: 'Aumento',
      SALES_BY_CATEGORY: 'Vendas por Categoria',
      SALES_PERFORMANCE: 'Performance de Vendas',
      RECENT_ORDERS: 'Pedidos Recentes',
      TABLE_ID: 'ID',
      TABLE_PRODUCT: 'Produto',
      TABLE_CUSTOMER: 'Cliente',
      TABLE_DATE: 'Data',
      TABLE_STATUS: 'Status',
      TABLE_VALUE: 'Valor'
    },

    PRODUCTS: {
      TITLE: 'Produtos',
      SEARCH_PLACEHOLDER: 'Buscar produtos...',
      ALL_CATEGORIES: 'Todas Categorias',
      NEW_PRODUCT: 'Novo Produto',
      EDIT_PRODUCT: 'Editar Produto',
      PRODUCT_NAME: 'Nome do Produto',
      CATEGORY: 'Categoria',
      PRICE: 'Preço',
      DESCRIPTION: 'Descrição',
      ACTIVE: 'Produto Ativo',
      HAS_VARIANTS: 'Possui Variantes'
    },

    DESIGNS: {
      TITLE: 'Estampas',
      SEARCH_PLACEHOLDER: 'Buscar estampas...',
      ALL_STATUS: 'Todos Status',
      NEW_DESIGN: 'Cadastro de Estampa',
      DESIGN_NAME: 'Nome da Estampa',
      SELECT_FILE: 'Selecionar Arquivo',
      NO_FILE_SELECTED: 'Nenhum arquivo selecionado',
      PREVIEW: 'Preview',
      NO_IMAGE: 'Sem imagem'
    },

    BLOG: {
      TITLE: 'BLOG ADMIN CONTROL',
      TRENDING_TITLE: 'TENDÊNCIAS DO DIA',
      LOADING_TRENDS: 'Carregando tendências...',
      NO_TRENDS: 'Nenhuma tendência encontrada.',
      BLOG_LABEL: 'BLOG:',
      IMAGE_LABEL: 'IMAGEM:',
      TITLE_LABEL: 'TÍTULO:',
      PREVIEW_TEXT: 'PREVIEW TEXT:',
      CONTENT_LABEL: 'CONTEÚDO:',
      CONTENT_PLACEHOLDER: 'Digite o conteúdo do post aqui...',
      SUBMIT_POST: 'ENVIAR POST'
    },

    PROPOSALS: {
      TITLE: 'FRELLA',
      SUBTITLE: 'Sistema Brutalista de Propostas',
      SELECT_PROJECT: 'Selecione um projeto para enviar uma proposta',
      SEND_PROPOSAL: 'ENVIAR PROPOSTA',
      ESTIMATED_VALUE: 'Valor Estimado (R$):',
      ESTIMATED_TIME: 'Tempo Estimado (dias):',
      PROPOSAL_TEXT: 'Texto da Proposta:',
      PROPOSAL_PLACEHOLDER: 'Descreva sua proposta ou use o gerador de IA abaixo...',
      CATEGORY: 'Categoria',
      LEVEL: 'Nível',
      PROPOSALS: 'Propostas',
      INTERESTED: 'interessados'
    },

    COMMON: {
      CONTENT_DEVELOPMENT: 'Conteúdo em Desenvolvimento',
      CONTENT_DEVELOPMENT_TEXT: 'Esta seção está sendo desenvolvida. Em breve teremos mais funcionalidades disponíveis.'
    }
  },

  // Soluções individuais
  SOLUTIONS: {
    ML_SERVICES: {
      TITLE: 'Machine Learning & IA',
      SUBTITLE: 'Soluções inteligentes para automação e análise de dados',
      DESCRIPTION: 'Transforme seus dados em insights acionáveis com nossas soluções de Machine Learning e Inteligência Artificial',
      FEATURES: [
        'Análise preditiva de dados',
        'Chatbots inteligentes',
        'Automação de processos',
        'Recomendações personalizadas'
      ]
    },
    
    OMNICHAT: {
      TITLE: 'Omnichat Whitelabel',
      SUBTITLE: 'Plataforma de atendimento multicanal personalizada',
      DESCRIPTION: 'Unifique todos os canais de atendimento ao cliente em uma única plataforma com sua marca',
      FEATURES: [
        'Integração com WhatsApp, Instagram e Facebook',
        'Chat em tempo real no seu site',
        'Relatórios detalhados de atendimento',
        'Personalização completa da interface'
      ]
    },

    CRM: {
      TITLE: 'CRM Empresarial',
      SUBTITLE: 'Gestão completa do relacionamento com clientes',
      DESCRIPTION: 'Organize, automatize e otimize toda a jornada do cliente com nosso CRM inteligente',
      FEATURES: [
        'Pipeline de vendas personalizado',
        'Automação de processos',
        'Integração com e-mail marketing',
        'Dashboard de performance'
      ]
    },

    INFLUENCER_SITES: {
      TITLE: 'Sites para Influencers',
      SUBTITLE: 'Criação de sites profissionais e infoprodutos',
      DESCRIPTION: 'Transforme sua audiência em receita com sites otimizados para conversão',
      FEATURES: [
        'Landing pages otimizadas',
        'Integração com redes sociais',
        'Sistemas de afiliados',
        'Área de membros'
      ]
    },

    PAYMENT_GATEWAY: {
      TITLE: 'Gateway de Pagamentos',
      SUBTITLE: 'Soluções completas de pagamento online',
      DESCRIPTION: 'Aceite pagamentos de forma segura e eficiente com nossa solução completa',
      FEATURES: [
        'Integração com múltiplas bandeiras',
        'Pagamentos recorrentes',
        'Relatórios financeiros',
        'Segurança PCI DSS'
      ]
    },

    MARKETING_AUTOMATION: {
      TITLE: 'Automação de Marketing',
      SUBTITLE: 'Ferramentas para automação de marketing digital',
      DESCRIPTION: 'Automatize suas campanhas e nutra leads de forma inteligente',
      FEATURES: [
        'Sequências de e-mail automáticas',
        'Segmentação avançada',
        'A/B testing',
        'Analytics em tempo real'
      ]
    },

    LEGACY_SYSTEMS: {
      TITLE: 'Manutenção de Sistemas Legados',
      SUBTITLE: 'Suporte e modernização de sistemas antigos',
      DESCRIPTION: 'Dê nova vida aos seus sistemas críticos com nossa expertise em modernização',
      FEATURES: [
        'Análise de código legado',
        'Refatoração e otimização',
        'Migração para tecnologias modernas',
        'Documentação técnica'
      ]
    },

    PENTEST: {
      TITLE: 'Pentest & Vulnerabilidades',
      SUBTITLE: 'Testes de segurança e análise de vulnerabilidades',
      DESCRIPTION: 'Proteja seu negócio com nossos serviços especializados em cibersegurança',
      FEATURES: [
        'Testes de penetração',
        'Análise de vulnerabilidades',
        'Relatórios de segurança',
        'Consultoria em cibersegurança'
      ]
    }
  },

  // Status e estados
  STATUS: {
    SENT: 'Enviado',
    PROCESSING: 'Processando',
    DELIVERED: 'Entregue',
    DELAYED: 'Atrasado',
    CANCELLED: 'Cancelado'
  },

  // Mensagens
  MESSAGES: {
    SUCCESS_SAVED: 'Salvo com sucesso!',
    SUCCESS_DELETED: 'Excluído com sucesso!',
    SUCCESS_SENT: 'Enviado com sucesso!',
    ERROR_GENERIC: 'Ocorreu um erro inesperado.',
    ERROR_NETWORK: 'Erro de conexão. Verifique sua internet.',
    CONFIRM_DELETE: 'Tem certeza que deseja excluir?'
  },

  // Página Tree - Perfil Pessoal
  TREE: {
    USER_INFO: {
      NAME: 'Maikon Weber',
      PHRASE: 'A vida é um catavento de emoção',
      DESCRIPTION: 'Olá! Sou Maikon Weber, desenvolvedor de software e músico. Tenho vasta experiência na criação de infraestrutura e sistemas complexos. Sou apaixonado por tecnologia, inovação e artes, e estou sempre em busca de novos desafios. Entre em contato se quiser colaborar em projetos ou precisar de ajuda!'
    },
    ACTIONS: {
      DOWNLOAD_CV: 'DOWNLOAD CV',
      TOUCH_ME: 'Touch me'
    },
    CATEGORIES: {
      APPS: 'Aplicações',
      SOCIAL: 'Redes Sociais', 
      CONTENT: 'Conteúdo',
      RESEARCH: 'Pesquisa & Desenvolvimento'
    },
    APPS: {
      KAMA_DORO: 'Kama-Doro',
      JOB_HUNTER: 'Job Hunter',
      FINANCE_TABLE: 'Finance Table',
      CRYPTOSTOMP: 'Cryptostomp'
    },
    SOCIAL: {
      GITHUB: 'GitHub',
      X: 'X',
      BLUESKY: 'BlueSky',
      TWITCH: 'Twitch',
      SOUNDCLOUD: 'SoundCloud',
      LINKEDIN: 'LinkedIn'
    },
    CONTENT: {
      BLOG: 'Blog',
      LANGUAGE_NOTEBOOK: 'Carderno de Linguas',
      IT_LIBRARY: 'Biblioteca TI',
      PROGRAMMING_NOTEBOOK: 'Carderno de Programação',
      BIOGRAPHY: 'Minha Biografia',
      INVESTMENT_NEWS: 'Notícias Investimento',
      BOOK: 'Livro'
    },
    RESEARCH: {
      COMMENTSCRIPT_PAPER: 'CommentScript Paper',
      NLP_RESEARCH: 'Pesquisa em NLP',
      PROMPT_ENGINEERING: 'Engenharia de Prompts',
      AI_DEVELOPMENT: 'Desenvolvimento de IA'
    },
    MODAL: {
      TITLE: 'Deixe sua mensagem',
      MESSAGE_PLACEHOLDER: 'Escreva sua mensagem (máx. 500 caracteres)',
      NAME_PLACEHOLDER: 'Nome (opcional)',
      EMAIL_PLACEHOLDER: 'Email (opcional)',
      ANONYMOUS: 'Enviar como anônimo',
      SEND: 'Enviar',
      SUCCESS: 'Mensagem enviada com sucesso!',
      ERROR: 'Houve um problema ao enviar a mensagem. Tente novamente.',
      NETWORK_ERROR: 'Erro ao enviar a mensagem. Verifique sua conexão e tente novamente.',
      MAX_CHARS_ERROR: 'A mensagem deve ter no máximo 500 caracteres.'
    },
    FOOTER: {
      COPYRIGHT: '© {year} MUTTERCORP'
    },
    PAPER: {
      TITLE: 'CommentScript: Um Paradigma de Organização de Comentários Aplicado à Engenharia de Prompts com NLP',
      ABSTRACT: 'A presente proposta introduz o CommentScript como um paradigma de organização semântica de comentários voltado à engenharia de prompts. Inspirado em abordagens filosóficas do idealismo subjetivo (George Berkeley), o CommentScript visa transformar blocos de anotações e instruções em estruturas interpretáveis por máquinas e humanos, melhorando o entendimento de sistemas baseados em linguagem natural (NLP).',
      INTRODUCTION: 'A ascensão de modelos de linguagem natural trouxe à tona a importância da construção eficaz de prompts. No entanto, a ausência de estrutura padronizada em muitos sistemas de entrada dificulta tanto a reutilização, quanto a compreensão de intenção por parte de humanos e máquinas.',
      THEORETICAL_FOUNDATION: 'A Orientação a Comentários propõe que a estrutura de comentários, frequentemente descartada na engenharia de software, pode ser elevada a um instrumento central de projeto e comunicação. Comentários não são ruído, mas narrativas de intenção.',
      COMMENTSCRIPT_MODEL: 'A estrutura básica do CommentScript segue uma hierarquia baseada em: Identificadores de intenção (-> Justificativa, -> Benefício), Tags sociais (@autor, #tema), Estruturas temporais (data(), linha do tempo), Elementos de citação (_*()), Assinaturas semânticas (sig(){}).',
      NLP_APPLICATIONS: 'O CommentScript permite a criação de prompts estruturados com múltiplas camadas semânticas, facilitando o treinamento e fine-tuning de modelos de IA.',
      CHALLENGES: 'Dificuldade de padronização entre diferentes comunidades; Resistência inicial à adoção; Necessidade de ferramentas de apoio (IDEs, linters, validadores sintáticos para comentários).',
      PROMPT_ENHANCEMENT: '🧠 Como o CommentScript pode melhorar um prompt? O CommentScript não é apenas uma brincadeira com comentários, ele propõe uma nova camada semântica para prompts, que pode ser interpretada por humanos e por modelos de linguagem (LLMs) — como se fosse um "meta-prompt" que dá contexto ao prompt real.',
      CLEAR_SEPARATION: '🔍 1. Separação clara entre intenção, contexto e instrução: Muitos prompts hoje falham porque misturam tudo numa frase só. O CommentScript obriga o autor a separar: -> Justificativa: por que esse prompt existe; -> Objetivo: o que se espera como saída; -> Riscos: o que pode dar errado; -> Stakeholders: para quem a resposta é direcionada.',
      REUSABLE_FRAMEWORK: '🧱 2. Criação de estrutura reutilizável (Prompt Framework): Hoje engenheiros de prompt reinventam a roda a cada projeto. O CommentScript padroniza isso em formato replicável: Pode ser versionado em Git; Pode ser lido por scripts NLP; Pode gerar prompt templates adaptáveis por perfil de usuário.',
      SEMANTIC_ENRICHMENT: '🧠 3. Enriquecimento Semântico para LLMs: Ao incluir citações (_*()), datas (data()), autores (@), fontes (#), o prompt se torna muito mais rico semanticamente. Isso ajuda o LLM a: Compreender melhor o tom, autoridade, urgência; Diferenciar instrução objetiva de comentários filosóficos; Aprender contexto persistente.',
      MULTIDISCIPLINARY: '📡 4. Alinhamento Multidisciplinar: Engenharia de prompt é engenharia de comunicação com máquinas. O CommentScript permite que gestores, designers, desenvolvedores e redatores escrevam juntos um prompt complexo, entendendo o porquê de cada parte.',
      SUPERVISED_LEARNING: '🤖 5. Base para aprendizado supervisionado: Se você tiver prompts em CommentScript, pode: Anotar automaticamente as partes do prompt; Usar como dataset para fine-tuning; Gerar novos prompts via LLM com base nessa estrutura.',
      PRACTICAL_RESULTS: '🔧 RESULTADOS PRÁTICOS COMPROVADOS: ✅ Maior efetividade da resposta; ✅ Menos ajustes manuais ou tentativas repetidas; ✅ Possibilidade de automatizar geração, validação e documentação de prompts.',
      CONCLUSION: '💥 REVOLUÇÃO NA ENGENHARIA DE PROMPTS: O CommentScript não é apenas uma ferramenta - é uma REVOLUÇÃO na forma como pensamos e estruturamos prompts. Em um mundo onde IA determina o sucesso dos negócios, dominar essa tecnologia é questão de SOBREVIVÊNCIA competitiva!',
      FINAL_IMPACT: '⚡ IMPACTO TRANSFORMADOR: O CommentScript transforma prompts em objetos informacionais ricos, estruturados, explicáveis e versionáveis. Se você está lidando com projetos sérios em LLM, isso é uma base PODEROSA para sua stack de engenharia de prompt.',
      FUTURE_WORK: '🚀 PRÓXIMOS PASSOS REVOLUCIONÁRIOS: • Desenvolvimento de biblioteca de parsing CommentScript; • Integração com IDEs e plataformas de IA generativa; • Criação de ferramenta que transforma arquivos .commentscript em prompts reais; • Desenvolvimento de datasets JSON para NLP; • Testes com equipes multidisciplinares globais.',
              SECTIONS: {
          ABSTRACT: 'Resumo',
          INTRODUCTION: 'Introdução',
          THEORETICAL_FOUNDATION: 'Fundamentação Teórica',
          COMMENTSCRIPT_MODEL: 'O Modelo CommentScript',
          NLP_APPLICATIONS: 'Aplicações em NLP',
          PROMPT_ENHANCEMENT: '🧠 Como Melhorar Prompts',
          CLEAR_SEPARATION: '🔍 Separação Clara de Elementos',
          REUSABLE_FRAMEWORK: '🧱 Framework Reutilizável',
          SEMANTIC_ENRICHMENT: '🧠 Enriquecimento Semântico',
          MULTIDISCIPLINARY: '📡 Alinhamento Multidisciplinar',
          SUPERVISED_LEARNING: '🤖 Aprendizado Supervisionado',
          PRACTICAL_RESULTS: '🔧 Resultados Práticos',
          CHALLENGES: 'Desafios e Riscos',
          CONCLUSION: '💥 Revolução na Engenharia de Prompts',
          FINAL_IMPACT: '⚡ Impacto Transformador',
          FUTURE_WORK: '🚀 Próximos Passos'
        },
      ACTIONS: {
        READ_FULL: 'Ler Paper Completo',
        CLOSE: 'Fechar',
        DOWNLOAD_PDF: 'Download PDF',
        CITE: 'Como Citar'
      }
    }
  },

  // Task-Doro - Pomodoro Timer
  TASK_DORO: {
    TITLE: 'Task-Doro | Gerenciador de Tarefas com Pomodoro',
    BRAND: 'Task-Doro',
    SUBTITLE: 'Gerencie seu tempo com elegância',
    TIMER: {
      START: 'Iniciar',
      STOP: 'Parar', 
      RESET: 'Reiniciar',
      START_ARIA: 'Iniciar timer',
      STOP_ARIA: 'Parar timer',
      RESET_ARIA: 'Reiniciar timer'
    },
    TASKS: {
      ADD_PLACEHOLDER: 'Adicione uma nova tarefa...',
      ADD_BUTTON: 'Adicionar',
      ADD_ARIA: 'Adicionar tarefa',
      COMPLETE_ARIA: 'Marcar tarefa como concluída',
      SELECT: 'Selecionar',
      SELECT_ARIA: 'Selecionar tarefa',
      DELETE: 'Deletar',
      DELETE_ARIA: 'Deletar tarefa',
      POMODOROS_COUNT: '{count} pomodoros',
      NEW_TASK_ARIA: 'Nova tarefa',
      TASK_LIST_ARIA: 'Lista de tarefas'
    },
    NOTIFICATIONS: {
      COMPLETED_TITLE: 'Pomodoro Completed!',
      COMPLETED_BODY: 'Time to take a break!'
    }
  },

  // Job Hunter - Marketplace de Talentos Tech
  JOB_HUNTER: {
    TITLE: 'Job Hunter - Conectando Talentos Tech',
    DESCRIPTION: 'Encontre as melhores vagas em tecnologia ou contrate os melhores talentos para sua empresa',
    KEYWORDS: 'Vagas Tech, Programação, Desenvolvimento, Recrutamento TI, Empregos Tech',
    HERO: {
      TITLE: 'O Marketplace de Talentos Tech',
      SUBTITLE: 'Conectando empresas inovadoras aos melhores talentos em tecnologia',
      SEARCH_PLACEHOLDER: 'Buscar vagas...',
      SEARCH_BUTTON: 'Buscar',
      ALL_LEVELS: 'Todos os níveis',
      LEVELS: {
        JUNIOR: 'Júnior',
        MID: 'Pleno',
        SENIOR: 'Sênior'
      }
    },
    JOB_CARD: {
      LOCATION: 'Localização',
      POSTED: 'há {time}',
      VIEW_DETAILS: 'Ver detalhes →',
      REMOTE: 'Remoto'
    },
    CTA: {
      FOR_COMPANIES: 'Para Empresas',
      COMPANIES_DESC: 'Encontre os melhores talentos tech para sua empresa. Poste suas vagas e alcance milhares de desenvolvedores.',
      POST_JOB: 'Publicar Vaga',
      FOR_DEVELOPERS: 'Para Desenvolvedores',
      DEVELOPERS_DESC: 'Crie seu perfil, destaque suas habilidades e encontre as melhores oportunidades do mercado.',
      CREATE_PROFILE: 'Criar Perfil'
    },
    STATS: {
      ACTIVE_JOBS: 'Vagas Ativas',
      DEVELOPERS: 'Desenvolvedores',
      COMPANIES: 'Empresas',
      HIRE_RATE: 'Taxa de Contratação'
    }
  },

  // Finance Table - Gestão Financeira
  FINANCE_TABLE: {
    TITLE: 'Finance Table - Gestão Financeira Simplificada',
    DESCRIPTION: 'Gerencie suas finanças pessoais de forma simples e eficiente',
    HERO: {
      TITLE: 'Gestão Financeira Simplificada',
      SUBTITLE: 'Controle suas finanças de forma inteligente e visual'
    },
    GUIDE: {
      WELCOME_TITLE: 'Bem-vindo ao Finance Table',
      WELCOME_DESC: 'Gerencie suas finanças de forma simples e eficiente',
      ADD_TRANSACTIONS_TITLE: 'Adicione Transações',
      ADD_TRANSACTIONS_DESC: 'Registre suas receitas e despesas facilmente',
      REPORTS_TITLE: 'Acompanhe Relatórios',
      REPORTS_DESC: 'Visualize gráficos e análises detalhadas',
      CATEGORIES_TITLE: 'Configure suas Categorias',
      CATEGORIES_DESC: 'Personalize as categorias de acordo com suas necessidades'
    },
    SUMMARY: {
      TOTAL_BALANCE: 'Saldo Total',
      INCOME: 'Receitas',
      EXPENSES: 'Despesas',
      SAVINGS: 'Economia'
    },
    ACTIONS: {
      ADD_INCOME: 'Adicionar Receita',
      ADD_EXPENSE: 'Adicionar Despesa',
      VIEW_REPORTS: 'Ver Relatórios',
      MANAGE_CATEGORIES: 'Gerenciar Categorias'
    },
    NAVIGATION: {
      DASHBOARD: 'Dashboard',
      TRANSACTIONS: 'Transações',
      REPORTS: 'Relatórios',
      SETTINGS: 'Configurações'
    }
  },

  // Muscle-Doro - App de Treino
  MUSCLE_DORO: {
    TITLE: 'MUSCLE-DORO',
    SUBTITLE: 'SUA JORNADA FITNESS COMEÇA AQUI',
    MODALITY: 'MODALIDADE',
    WORKOUT_NUMBER: 'NÚMERO DO TREINO',
    CURRENT_EXERCISE: 'EXERCÍCIO ATUAL',
    MUSCLE: 'MÚSCULO',
    DURATION: 'DURAÇÃO',
    DIFFICULTY: 'DIFICULDADE',
    SETS: 'SÉRIES',
    REPS: 'REPETIÇÕES',
    REST: 'DESCANSO',
    FINISH_EXERCISE: 'FINALIZAR EXERCÍCIO',
    LOADING_EXERCISES: 'CARREGANDO EXERCÍCIOS...',
    BUTTONS: {
      LEADERBOARD: 'PLACAR',
      PREMIUM: 'PREMIUM',
      EXERCISES: 'EXERCÍCIOS',
      START_WORKOUT: 'INICIAR TREINO',
      FINISH_WORKOUT: 'FINALIZAR TREINO'
    },
    REPORT: {
      TITLE: 'RELATÓRIO DO TREINO',
      WORKOUT: 'TREINO:',
      TARGET_DURATION: 'DURAÇÃO PLANEJADA:',
      ACTUAL_DURATION: 'DURAÇÃO REAL:',
      TOTAL_WEIGHT: 'TOTAL DE PESO:',
      TOTAL_REPS: 'TOTAL DE REPETIÇÕES:',
      TOTAL_SETS: 'TOTAL DE SÉRIES:'
    },
    ARIA: {
      OPEN_LEADERBOARD: 'Abrir placar de usuários',
      OPEN_PREMIUM: 'Abrir versão premium',
      VIEW_EXERCISES: 'Ver catálogo de exercícios'
    }
  },

  // Omnichat - Plataforma de Atendimento
  OMNICHAT: {
    TITLE: 'OMNICHAT - Comunicação Unificada Inteligente',
    DESCRIPTION: 'Transforme seu atendimento com nossa plataforma completa de comunicação multicanal',
    HERO: {
      TITLE: 'OMNICHAT',
      SUBTITLE: 'COMUNICAÇÃO UNIFICADA INTELIGENTE',
      MAIN_DESC: 'Transforme seu atendimento com nossa plataforma completa de comunicação multicanal, integrando WhatsApp, Instagram, Facebook e chat do site em uma única interface poderosa.',
      CTA_DEMO: 'SOLICITAR DEMONSTRAÇÃO',
      CTA_CONTACT: 'FALAR COM CONSULTOR'
    },
    FEATURES: {
      INTEGRATION_TITLE: 'Integração Completa',
      INTEGRATION_DESC: 'WhatsApp, Instagram, Facebook e Chat do Site unificados em uma só plataforma.',
      
      AUTOMATION_TITLE: 'Automação Inteligente',
      AUTOMATION_DESC: 'Respostas automáticas e fluxos de atendimento que otimizam a experiência.',
      
      REAL_TIME_TITLE: 'Atendimento em Tempo Real',
      REAL_TIME_DESC: 'Interface intuitiva para gerenciar conversas simultâneas com máxima eficiência.',
      
      CUSTOMIZATION_TITLE: 'Personalização Total',
      CUSTOMIZATION_DESC: 'Adapte completamente a plataforma às necessidades da sua marca.',
      
      REPORTS_TITLE: 'Análises e Relatórios',
      REPORTS_DESC: 'Métricas valiosas sobre desempenho do atendimento para otimização contínua das operações.',
      
      SCALABILITY_TITLE: 'Escalabilidade',
      SCALABILITY_DESC: 'Solução adaptável para empresas de qualquer tamanho, crescendo conforme a demanda.'
    },
    WHY_CHOOSE: {
      TITLE: 'POR QUE ESCOLHER O OMNICHAT?',
      
      EFFICIENCY_TITLE: 'Eficiência Operacional',
      EFFICIENCY_DESC: 'Reduza o tempo de resposta e aumente a produtividade da sua equipe com ferramentas inteligentes de automação.',
      
      EXPERIENCE_TITLE: 'Experiência do Cliente',
      EXPERIENCE_DESC: 'Ofereça atendimento personalizado e de qualidade, aumentando a satisfação e fidelização dos seus clientes.',
      
      COMPLETE_INTEGRATION_TITLE: 'Integração Completa',
      COMPLETE_INTEGRATION_DESC: 'Conecte todos os seus canais de comunicação em uma única plataforma, simplificando a gestão.',
      
      ANALYTICS_TITLE: 'Analytics Avançado',
      ANALYTICS_DESC: 'Tenha insights valiosos sobre o desempenho do seu atendimento e tome decisões baseadas em dados.'
    },
    CTA_SECTION: {
      TITLE: 'COMEÇE A TRANSFORMAR SEU ATENDIMENTO',
      SUBTITLE: 'Junte-se a milhares de empresas que já otimizaram sua comunicação com o OMNICHAT'
    }
  },

  // Blog - Centro de Conhecimento
  BLOG: {
    TITLE: 'Blog MutterCorp - Insights e Tendências Tech',
    DESCRIPTION: 'Artigos especializados sobre tecnologia, inovação e soluções empresariais.',
    HERO: {
      TITLE: 'Blog MutterCorp',
      SUBTITLE: 'Insights, tendências e conhecimento em tecnologia'
    },
    NAVIGATION: {
      ALL_POSTS: 'Todos os Posts',
      CATEGORIES: 'Categorias',
      LATEST: 'Mais Recentes',
      POPULAR: 'Mais Populares'
    },
    POST: {
      READ_MORE: 'Ler mais',
      READING_TIME: '{minutes} min de leitura',
      PUBLISHED_ON: 'Publicado em',
      TAGS: 'Tags',
      SHARE: 'Compartilhar',
      RELATED_POSTS: 'Posts Relacionados'
    },
    CATEGORIES: {
      TECH: 'Tecnologia',
      INNOVATION: 'Inovação',
      BUSINESS: 'Negócios',
      TUTORIAL: 'Tutoriais',
      NEWS: 'Notícias'
    }
  },

  // CryptoStomp - Trading de Criptomoedas
  CRYPTOSTOMP: {
    TITLE: 'CryptoStomp - Trading de Criptomoedas',
    DESCRIPTION: 'Plataforma completa para trading de criptomoedas com análises avançadas',
    HERO: {
      TITLE: 'CryptoStomp',
      SUBTITLE: 'Sua plataforma completa de trading cripto'
    },
    TRADING: {
      BUY: 'Comprar',
      SELL: 'Vender',
      PRICE: 'Preço',
      VOLUME: '24h Volume',
      CHANGE: '24h Mudança',
      MARKET_CAP: 'Market Cap',
      ORDER_BOOK: 'Livro de Ofertas',
      TRADE_HISTORY: 'Histórico de Negociações'
    },
    PORTFOLIO: {
      BALANCE: 'Saldo',
      HOLDINGS: 'Posições',
      PNL: 'P&L',
      TRANSACTIONS: 'Transações'
    }
  },

  // Shop - E-commerce
  SHOP: {
    TITLE: 'MutterShop - Loja Online',
    DESCRIPTION: 'Produtos exclusivos e personalizados da MutterCorp',
    HERO: {
      TITLE: 'MutterShop',
      SUBTITLE: 'Produtos exclusivos para desenvolvedores'
    },
    PRODUCT: {
      ADD_TO_CART: 'Adicionar ao Carrinho',
      BUY_NOW: 'Comprar Agora',
      QUANTITY: 'Quantidade',
      PRICE: 'Preço',
      DESCRIPTION: 'Descrição',
      SPECIFICATIONS: 'Especificações',
      REVIEWS: 'Avaliações',
      RELATED: 'Produtos Relacionados'
    },
    CART: {
      TITLE: 'Carrinho de Compras',
      EMPTY: 'Seu carrinho está vazio',
      SUBTOTAL: 'Subtotal',
      SHIPPING: 'Frete',
      TOTAL: 'Total',
      CHECKOUT: 'Finalizar Compra',
      CONTINUE_SHOPPING: 'Continuar Comprando'
    },
    CATEGORIES: {
      ALL: 'Todos',
      TECH: 'Tecnologia',
      APPAREL: 'Vestuário',
      ACCESSORIES: 'Acessórios'
    }
  }
};

// Função para acessar textos simples
/**
 * @param {string} key - Chave do texto (ex: 'COMMON.LOADING')
 * @param {string} [fallback] - Texto de fallback se a chave não for encontrada
 * @returns {string}
 */
export function t(key, fallback = '') {
  const keys = key.split('.');
  /** @type {any} */
  let current = TEXTS;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return fallback || key;
    }
  }
  
  return typeof current === 'string' ? current : fallback || key;
}

// Nova função para acessar arrays ou qualquer tipo de dados
/**
 * @param {string} key - Chave do texto (ex: 'SOLUTIONS.ML_SERVICES.FEATURES')
 * @param {any} [fallback] - Fallback se a chave não for encontrada
 * @returns {any}
 */
export function tget(key, fallback = []) {
  const keys = key.split('.');
  /** @type {any} */
  let current = TEXTS;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return fallback;
    }
  }
  
  return current !== undefined ? current : fallback;
}

// Função para textos com variáveis (formatação)
/**
 * @param {string} key - Chave do texto
 * @param {Record<string, string | number>} variables - Variáveis para substituir
 * @param {string} [fallback] - Texto de fallback se a chave não for encontrada
 * @returns {string}
 */
export function tf(key, variables = {}, fallback = '') {
  let text = t(key, fallback);
  
  // Substituir variáveis no formato {variableName}
  Object.entries(variables).forEach(([variable, value]) => {
    text = text.replace(new RegExp(`{${variable}}`, 'g'), String(value));
  });
  
  return text;
}

export default TEXTS; 