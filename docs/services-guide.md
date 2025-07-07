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

## Multi-Tenancy e Tenant Codes

O sistema suporta múltiplos tenants (inquilinos), permitindo que diferentes organizações tenham seus próprios blogs e configurações isoladas.

### Tenant Codes Disponíveis

```javascript
import { TENANT_CODES, TENANT_CONFIG } from './services/services/constants.js';

// Tenant codes disponíveis
console.log(TENANT_CODES.MUTTERCORP); // 'muttercorp'
console.log(TENANT_CODES.DEFAULT); // 'muttercorp'

// Configuração do tenant
console.log(TENANT_CONFIG.muttercorp);
// {
//   name: 'MutterCorp',
//   blogName: 'CyberBlog',
//   domain: 'muttercorp.com.br',
//   features: ['blog', 'auth', 'projects', 'leads', 'finance']
// }
```

### Rotas Multi-Tenant

O sistema implementa rotas específicas por tenant:

- **Blog por tenant**: `/blog/[tenantCode]` - Lista posts do tenant
- **Post por tenant**: `/blog/[tenantCode]/[slug]` - Post específico do tenant
- **Exemplo**: `/blog/muttercorp` - Blog da MutterCorp

### Services com Tenant Support

Todos os services de blog agora suportam tenant codes:

```javascript
import { getBlogService } from './services/index.js';

// Service com tenant específico
const blogService = getBlogService({ tenantCode: 'muttercorp' });

// Buscar posts do tenant
const posts = await blogService.fetchBlogPosts({}, 'muttercorp');

// Buscar post específico do tenant
const post = await blogService.fetchPostData('post-slug', 'muttercorp');

// Submeter post para tenant específico
await blogService.submitBlogPost(formData, 'muttercorp');
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

Gerencia posts do blog e integrações externas com suporte completo a multi-tenancy:

```javascript
import { getBlogService } from './services/index.js';

const blogService = getBlogService();

// Buscar posts (tenant padrão: muttercorp)
const posts = await blogService.fetchBlogPosts({ page: 1, limit: 10 });

// Buscar posts de tenant específico
const mutterCorpPosts = await blogService.fetchBlogPosts({ page: 1 }, 'muttercorp');

// Buscar post específico por slug e tenant
const post = await blogService.fetchPostData('meu-post', 'muttercorp');

// Criar post para tenant específico
const newPost = await blogService.submitBlogPost(formData, 'muttercorp');

// Atualizar post
await blogService.updateBlogPost('post-id', formData, 'muttercorp');

// Deletar post
await blogService.deleteBlogPost('post-id', 'muttercorp');

// Submeter tweet (integração Twitter)
await blogService.submitTweetPost('Texto do tweet', {}, 'muttercorp');
```

#### Métodos Disponíveis

- `fetchBlogPosts(params, tenantCode)` - Lista posts do blog
- `fetchPostData(slug, tenantCode)` - Busca post específico
- `submitBlogPost(formData, tenantCode)` - Cria novo post
- `updateBlogPost(postId, formData, tenantCode)` - Atualiza post
- `deleteBlogPost(postId, tenantCode)` - Remove post
- `submitTweetPost(text, options, tenantCode)` - Publica tweet

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
