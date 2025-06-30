// Mensagem Histórica do Fundador - Maikon Weber
// E-mail original enviado em 24 de maio de 2018

export const FOUNDER_HISTORIC_EMAIL = {
  metadata: {
    from: 'Maikon Weber <mutter.corp@gmail.com>',
    date: 'qui., 24 de mai. de 2018, 01:03',
    to: ['elvislpg2016', 'Luan', 'Derik', 'Dai'],
    subject: 'Fundação da MutterCorp - Visão Revolucionária'
  },
  
  content: {
    greeting: 'Ola, amigos!',
    
    mainMessage: `Venho comunicar a vocês a minha imensa satisfação por ter você como membros chefes de nosso time de desenvolvimento, e a diante desta imensa satisfação comunico que seremos revolucionários, desafiadores e dedicados o foco no mercado em soluções tecnológica efetiva e baixo custo permitindo o acesso a diversos tipo de público.

Mutter Corporation tem como seu pico, se expandir a ser a pioneira e tecnologia no BRASIL!

Sei que pode ser Maluquice! Mas meu objetivo e fazer a NASA brasileira!

Vamo embora ??`,
    
    technicalDocument: {
      title: 'Modelagem de Negócios e Modelo SRS da Linguagem CommentScript',
      introduction: `Este é a apresentação do Modelagem de Negocios e Modelo SRS da Linguagem CommentScript:
      
1. "Desenvolvida numa Syntax que tenta ser similar a Python/JS";
2. "A Tag <Script>" em documento html executara a função CommentScript() indica o início do codigo";
3. "O CommentScript é uma chamada para algo que não existe, pois de fato o todo o CommentScript() será tratado como comentário e será sub-endido dentro do interpretador JS";
4. "Sendo assim a Linguagem trabalha como um Paradigma que denominamos 'ORIENTAÇÃO A COMENTÁRIOS'";
5. "Idealismo subjetivo" @GeorgeBerkeley.`,
      
      companyStructure: {
        company: 'Mutter Corp',
        focus: 'Soluções Tecnologias',
        founder: '@MaikonWeber - Fundador - CTO - Desenvolvedor',
        projectManager: '@NoobiaDomingos - Gerente de Projetos',
        groups: [
          '@MutterCorp',
          '@GrupoQuadrivium',
          '@LlamArtStudio'
        ]
      },
      
      acknowledgment: 'Agradeço pela oportunidade de mostrar a minha tese, peço ajuda de toda comunidade Devops para implentação e evolução deste projeto',
      
      philosophicalQuote: {
        text: 'O incentivo Mútuo da fé e a união de diferentes em corpo unidos em mente, Multiplicam em mil nossa força. A coragem e a sabedoria também triplicam! Por isso vamos avançar alegre e harmoniosamente!',
        author: '@DaisakuIkeda',
        source: '#SeikyoShimbun - #BSGI',
        date: '15 de Abril de 2018'
      },
      
      justification: {
        devopsDefinition: 'DevOps é defender fortemente a automação e monitoramento em todas as fases da construção do software, da integração, teste, liberação para implantação e gerenciamento de infraestrutura. DevOps pretende fornecer, em ciclos de desenvolvimento menores, frequência de implantação aumentada, liberações mais seguras, em alinhamento próximo com os objetivos de negócio',
        source: '@Wikipedia',
        
        opportunity: 'Sendo assim surge a oportunidade de desenvolver uma Linguagem para tratamento de comentários e Protocolos de Interpretação. Protocolos de Interpretação são instruções para determinado padrão de documento. Ex: ModeloSRS',
        
        objective: 'Com objetivo de deixar o Codigo cada vez mais comunicativo, interativo, e apresentar facilidade na didática, permitindo o entendimento do codigo para todos os STAKEHOLDERS do Projeto'
      },
      
      projectDetails: {
        objectiveSmart: 'Linguagem de Alto Nível que utiliza o paradigma de Orientação a Comentário facilitando e aprimorando o desenvolvimento de projetos do início ao fim',
        
        benefits: [
          'Melhoria na interpretação de codigos por qualquer pessoa indiferente de sua área dentro do projeto',
          'Utilização da Linguagem com recursos focados em Midias Socias',
          'Tratamento dos Comentário para aprimoramento de Linguagem de Máquinas'
        ],
        
        product: 'CommentScript - Linguagem de Alto Nível - Paradigma de Orientação a Comentários',
        
        requirements: [
          'Apoio de uma Comunidade Ativa'
        ],
        
        stakeholdersExternal: [
          'Adeptos da Linguagem e do Paradigma',
          'Comunidade de TI'
        ],
        
        stakeholdersInternal: [
          '@MutterCorp',
          '@GrupoQuadrivium',
          '@ComunidadeCommentScript'
        ],
        
        restrictions: [
          'Falta de interesse de desenvolvedores para o paradigma'
        ],
        
        premises: [
          'Oferecer suporte para Midias Sociais',
          'Facilitar a compressão e utilização de IOT para leigos',
          'Tratamento de Comentários poderão ajudar na melhora a produção de machinelearnig',
          'Facilidade de criação de classes',
          'Visualização de Informações do Codigo',
          'Produção Agilizada e Controle de Versão detalhado',
          'Tratamento detalhado de ERROS'
        ],
        
        timeline: {
          '2018-05-09': 'Entrega do Modelo SRS',
          '2018-05-10': 'Inicio do projeto via GitHub',
          '2018-05-18': 'Produçao de Exemplos',
          '2018-05-22': 'Versão 0.0.1',
          '2018-05-04': 'Apresentação de Linguagem para Comunidade'
        },
        
        risks: [
          'Não conseguir executar o projeto de acordo com o esperado',
          'Não desenvolver o interesse da comunidade Devops pela linguagem',
          'Não conseguir cumprir prazos'
        ]
      }
    }
  }
};

// Função para extrair seções específicas
/**
 * @param {keyof typeof FOUNDER_HISTORIC_EMAIL.content} section
 */
export function getFounderMessageSection(section) {
  return FOUNDER_HISTORIC_EMAIL.content[section];
}

// Função para obter a mensagem formatada
export function getFormattedFounderMessage() {
  const { metadata, content } = FOUNDER_HISTORIC_EMAIL;
  
  return {
    header: `De: ${metadata.from}
Data: ${metadata.date}
Para: ${metadata.to.join(', ')}
Assunto: ${metadata.subject}`,
    
    body: `${content.greeting}

${content.mainMessage}`,
    
    technicalSection: content.technicalDocument
  };
}

// Citação inspiracional para uso em diferentes contextos
export const INSPIRATIONAL_QUOTE = {
  text: 'Sei que pode ser Maluquice! Mas meu objetivo e fazer a NASA brasileira!',
  author: 'Maikon Weber',
  context: 'Fundação da MutterCorp - 2018',
  meaning: 'Visão audaciosa de criar a principal empresa de tecnologia do Brasil'
};

// Valores fundamentais extraídos da mensagem
export const FOUNDING_VALUES = [
  'Revolucionário',
  'Desafiador', 
  'Dedicado',
  'Inovador',
  'Visionário',
  'Colaborativo'
];

// DNA da empresa baseado na mensagem histórica
export const COMPANY_DNA = {
  vision: 'Ser a NASA brasileira',
  mission: 'Soluções tecnológicas efetivas e baixo custo para todos',
  approach: 'Revolucionário, desafiador e dedicado',
  innovation: 'Paradigma de Orientação a Comentários',
  community: 'Apoio e evolução colaborativa'
}; 