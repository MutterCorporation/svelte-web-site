1. Timeline Geral
   Descrição: Uma linha do tempo onde todos os usuários podem ver as postagens públicas.
   Funcionalidades:
   Exibição de postagens em ordem cronológica.
   Opção de curtir, comentar e compartilhar postagens.
   Filtros para visualizar apenas tipos específicos de conteúdo (fotos, vídeos, texto).

2. Timeline por Usuário
   Descrição: Cada usuário tem uma linha do tempo personalizada com suas próprias postagens e conteúdo.
   Funcionalidades:
   Perfil do usuário com informações básicas e biografia.
   Exibição das postagens do usuário em ordem cronológica.
   Botão de seguir/desseguir.

3. Galeria Pública
   Descrição: Uma seção onde os usuários podem publicar fotos que serão visíveis para todos.
   Funcionalidades:
   Upload de fotos com título e descrição.
   Organização das fotos em álbuns ou categorias.
   Opção de curtir e comentar em fotos.

4. Fotos Privadas
   Descrição: Uma seção onde os usuários podem publicar fotos que só serão acessíveis mediante pagamento.
   Funcionalidades:
   Upload de fotos privadas com título e descrição.
   Definição de preço para acesso às fotos.
   Opção de definir um período de tempo durante o qual as fotos estarão acessíveis após o pagamento.

5. Acesso a Fotos Privadas por Valor e Tempo Determinado
   Descrição: Mecanismo para liberar acesso a fotos privadas mediante pagamento.
   Funcionalidades:
   Sistema de pagamento integrado (por exemplo, PayPal, Stripe).
   Configuração do preço para acesso às fotos privadas.
   Controle de acesso por tempo limitado após o pagamento (ex: 24 horas, 48 horas).
   Notificações para os usuários quando o acesso estiver próximo de expirar.
   Funcionalidades Gerais
   Autenticação: Sistema de login e registro com verificação de e-mail.
   Notificações: Notificações para novas interações, como curtidas, comentários e novos seguidores.
   Configurações de Conta: Opções para os usuários editarem seu perfil, alterarem senhas e configurarem preferências de privacidade.
   Sugestões de Implementação
   Frontend:

Utilize Svelte para construir a interface de usuário.
Tailwind CSS para estilização rápida e responsiva.
Integre uma biblioteca de pagamento, como Stripe, para facilitar transações.
Backend:

Nest com Express para o servidor backend.
Banco de dados relacional como PostgreSQL para armazenar dados de usuários e postagens.
JWT (JSON Web Token) para autenticação de usuário.

Deploy
Utilize uma plataforma como Heroku, AWS, ou DigitalOcean para hospedar sua aplicação.
Configurar HTTPS para garantir a segurança das transações e dados.
Essas são as diretrizes básicas para o seu MVP. Deseja adicionar mais alguma funcionalidade ou precisa de mais detalhes sobre alguma das etapas?
