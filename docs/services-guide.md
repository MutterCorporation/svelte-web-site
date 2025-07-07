# Services Guide - MutterCorpService Architecture

Este guia documenta a nova arquitetura de services baseada no MutterCorpService, que padroniza todas as comunicações com APIs no projeto.

## Visão Geral

Todos os services agora seguem um padrão consistente baseado na classe `MutterCorpService`, que fornece:

- Autenticação padronizada
- Tratamento de erros consistente
- Configuração de ambiente
- Validação de parâmetros
- Sanitização de dados
- Padrão singleton para instâncias

## Estrutura dos Services

### BaseService

Todos os services estendem a classe `BaseService`, que por sua vez estende `MutterCorpService`:

```javascript
import { BaseService } from './services/index.js';
import { HTTP_METHODS } from './services/constants.js';
import { getAuthToken } from './api.js';

class MyService extends BaseService {
  constructor(config = {}) {
    const authConfig = {
      ...config,
      getCookieCorp: () => Promise.resolve(getAuthToken() || ''),
      getSessionMutterCorp: () => Promise.resolve(getAuthToken() || '')
    };
    super(authConfig);
  }

  async myMethod(params) {
    this.validateRequiredParams(params, ['requiredField']);
    return this.makeServiceRequest('/endpoint', {
      method: HTTP_METHODS.POST,
      body: params
    });
  }
}
```

### Padrão Singleton

Cada service implementa o padrão singleton para garantir uma única instância:

```javascript
let serviceInstance = null;

export function getMyService(config = {}) {
  if (!serviceInstance) {
    serviceInstance = new MyService(config);
  }
  return serviceInstance;
}
```

### Compatibilidade com Versões Anteriores

Todos os services mantêm compatibilidade com as funções existentes:

```javascript
// Exporta funções de conveniência para compatibilidade
const service = getMyService();

export const myFunction = (params) => service.myMethod(params);
```

## Services Disponíveis

### AuthService

Gerencia autenticação e perfil do usuário:

```javascript
import { getAuthService } from './services/index.js';

const authService = getAuthService();

// Ou usando funções de conveniência
import { login, logout, getCurrentUser } from './services/index.js';

await login({ email, password });
const user = await getCurrentUser();
await logout();
```

### BlogService

Gerencia posts do blog e integrações externas:

```javascript
import { getBlogService } from './services/index.js';

const blogService = getBlogService();

// Buscar posts
const posts = await blogService.fetchBlogPosts({ page: 1, limit: 10 });

// Criar post
const newPost = await blogService.submitBlogPost({
  title: 'Título',
  content: 'Conteúdo',
  tags: ['tag1', 'tag2']
});
```

### ProjectsService

Gerencia projetos e propostas:

```javascript
import { getProjectsService } from './services/index.js';

const projectsService = getProjectsService();

// Buscar projetos
const projects = await projectsService.fetchProjects();

// Criar projeto
const project = await projectsService.createProject({
  name: 'Novo Projeto',
  description: 'Descrição do projeto'
});
```

### LeadsService

Gerencia leads e conversões:

```javascript
import { getLeadsService } from './services/index.js';

const leadsService = getLeadsService();

// Criar lead
const lead = await leadsService.createLead({
  name: 'Nome do Lead',
  email: 'email@exemplo.com',
  phone: '(11) 99999-9999'
});

// Converter lead para cliente
await leadsService.convertLeadToCustomer(leadId, customerData);
```

### FinanceService

Gerencia transações financeiras e relatórios:

```javascript
import { getFinanceService } from './services/index.js';

const financeService = getFinanceService();

// Buscar transações
const transactions = await financeService.fetchTransactions({
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});

// Criar transação
const transaction = await financeService.createTransaction({
  amount: 1000,
  type: 'income',
  category: 'sales'
});
```

## Uso Centralizado

Você pode importar todos os services de uma vez:

```javascript
import { Services, DefaultServices } from './services/index.js';

// Usando factory functions
const services = Services.all();
const { auth, blog, projects } = services;

// Usando instâncias padrão
const { auth, blog, projects } = DefaultServices;

// Ou services individuais com configuração
const authService = Services.auth({ environment: 'production' });
```

## Configuração de Ambiente

Os services suportam diferentes ambientes:

```javascript
import { ENVIRONMENTS } from './services/constants.js';

const service = getMyService({
  environment: ENVIRONMENTS.PRODUCTION,
  timeout: 10000,
  retries: 3
});
```

## Tratamento de Erros

Todos os services usam tratamento de erro padronizado:

```javascript
try {
  const result = await service.myMethod(params);
} catch (error) {
  if (error.name === 'MutterCorpApiError') {
    console.error('API Error:', error.message, error.statusCode);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Validação de Parâmetros

Os services validam automaticamente parâmetros obrigatórios:

```javascript
// Isso irá lançar um erro se 'name' ou 'email' estiverem ausentes
await service.createLead({ name: 'João', email: 'joao@exemplo.com' });
```

## Migração de Código Existente

Para migrar código existente:

1. **Mantenha as importações existentes** - elas continuam funcionando
2. **Gradualmente migre para as classes** quando precisar de mais controle
3. **Use o índice centralizado** para novas implementações

```javascript
// Código antigo (ainda funciona)
import { fetchBlogPosts } from './services/blog.js';

// Código novo (recomendado)
import { getBlogService } from './services/index.js';
const blogService = getBlogService();
```
