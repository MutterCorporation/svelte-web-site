# Exemplos Práticos dos Services

Este documento contém exemplos práticos de uso dos services refatorados com MutterCorpService.

## Exemplo 1: Sistema de Autenticação Completo

```javascript
import { getAuthService } from './services/index.js';

class AuthManager {
  constructor() {
    this.authService = getAuthService();
  }

  async loginUser(credentials) {
    try {
      const result = await this.authService.login(credentials);
      console.log('Login realizado com sucesso:', result);
      return result;
    } catch (error) {
      console.error('Erro no login:', error.message);
      throw error;
    }
  }

  async getUserProfile() {
    try {
      const user = await this.authService.getCurrentUser();
      return user;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error.message);
      return null;
    }
  }

  async updateUserProfile(profileData) {
    try {
      const updatedUser = await this.authService.updateProfile(profileData);
      console.log('Perfil atualizado:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error.message);
      throw error;
    }
  }
}

// Uso
const authManager = new AuthManager();
await authManager.loginUser({ email: 'user@example.com', password: 'senha123' });
```

## Exemplo 2: Dashboard de Blog com Interações

```javascript
import { getBlogService, getBlogInteractionsService } from './services/index.js';

class BlogDashboard {
  constructor() {
    this.blogService = getBlogService();
    this.interactionsService = getBlogInteractionsService();
  }

  async loadDashboard() {
    try {
      // Buscar posts recentes
      const posts = await this.blogService.fetchBlogPosts({ 
        page: 1, 
        limit: 10,
        sortBy: 'createdAt',
        order: 'desc'
      });

      // Buscar estatísticas de cada post
      const postsWithStats = await Promise.all(
        posts.map(async (post) => {
          const views = await this.interactionsService.getPostViews(post.id);
          const comments = await this.interactionsService.getPostComments(post.id);
          
          return {
            ...post,
            stats: {
              views: views.count,
              comments: comments.length
            }
          };
        })
      );

      return postsWithStats;
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
      return [];
    }
  }

  async createPost(postData) {
    try {
      // Converter markdown para HTML se necessário
      if (postData.markdown) {
        postData.content = await this.blogService.convertMarkdownToHtml(postData.markdown);
      }

      // Criar o post
      const newPost = await this.blogService.submitBlogPost(postData);
      
      // Publicar no Twitter se solicitado
      if (postData.publishToTwitter) {
        await this.blogService.submitTweetPost({
          content: `Novo post: ${newPost.title} ${newPost.url}`
        });
      }

      return newPost;
    } catch (error) {
      console.error('Erro ao criar post:', error);
      throw error;
    }
  }
}
```

## Exemplo 3: Sistema de CRM com Leads e Projetos

```javascript
import { getLeadsService, getProjectsService } from './services/index.js';

class CRMManager {
  constructor() {
    this.leadsService = getLeadsService();
    this.projectsService = getProjectsService();
  }

  async processNewLead(leadData) {
    try {
      // Criar o lead
      const lead = await this.leadsService.createLead(leadData);
      
      // Adicionar nota inicial
      await this.leadsService.addLeadNote(lead.id, 'Lead criado automaticamente');
      
      // Se for um lead qualificado, criar projeto
      if (leadData.qualified) {
        const project = await this.projectsService.createProject({
          name: `Projeto para ${lead.name}`,
          description: `Projeto gerado a partir do lead ${lead.id}`,
          leadId: lead.id,
          status: 'proposal'
        });

        // Atualizar status do lead
        await this.leadsService.updateLeadStatus(lead.id, 'converted');
        
        return { lead, project };
      }

      return { lead };
    } catch (error) {
      console.error('Erro ao processar lead:', error);
      throw error;
    }
  }

  async getLeadsPipeline() {
    try {
      const leads = await this.leadsService.fetchLeads();
      const stats = await this.leadsService.fetchLeadStats();
      
      // Agrupar leads por status
      const pipeline = leads.reduce((acc, lead) => {
        if (!acc[lead.status]) {
          acc[lead.status] = [];
        }
        acc[lead.status].push(lead);
        return acc;
      }, {});

      return { pipeline, stats };
    } catch (error) {
      console.error('Erro ao buscar pipeline:', error);
      return { pipeline: {}, stats: {} };
    }
  }

  async bulkUpdateLeads(leadIds, updateData) {
    try {
      const result = await this.leadsService.bulkUpdateLeads(leadIds, updateData);
      
      // Adicionar nota em cada lead atualizado
      await Promise.all(
        leadIds.map(leadId => 
          this.leadsService.addLeadNote(leadId, `Atualização em lote: ${JSON.stringify(updateData)}`)
        )
      );

      return result;
    } catch (error) {
      console.error('Erro na atualização em lote:', error);
      throw error;
    }
  }
}
```

## Exemplo 4: Dashboard Financeiro

```javascript
import { getFinanceService } from './services/index.js';

class FinanceDashboard {
  constructor() {
    this.financeService = getFinanceService();
  }

  async loadFinancialOverview(period = 'month') {
    try {
      const [
        userData,
        transactions,
        budget,
        goals,
        reports
      ] = await Promise.all([
        this.financeService.fetchUserData(),
        this.financeService.fetchTransactions({ period }),
        this.financeService.fetchBudget(),
        this.financeService.fetchGoals(),
        this.financeService.fetchReports({ period })
      ]);

      return {
        user: userData,
        transactions,
        budget,
        goals,
        reports,
        summary: this.calculateSummary(transactions, budget)
      };
    } catch (error) {
      console.error('Erro ao carregar overview financeiro:', error);
      return null;
    }
  }

  calculateSummary(transactions, budget) {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome: income,
      totalExpenses: expenses,
      netIncome: income - expenses,
      budgetUsage: budget.total ? (expenses / budget.total) * 100 : 0
    };
  }

  async addTransaction(transactionData) {
    try {
      const transaction = await this.financeService.createTransaction(transactionData);
      
      // Verificar se precisa criar categoria
      if (transactionData.newCategory) {
        await this.financeService.createCategory({
          name: transactionData.newCategory,
          type: transactionData.type
        });
      }

      return transaction;
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      throw error;
    }
  }
}
```

## Exemplo 5: Uso com Múltiplos Services

```javascript
import { Services, DefaultServices } from './services/index.js';

class ApplicationManager {
  constructor() {
    // Usar services padrão
    this.services = DefaultServices;
  }

  async initializeApp() {
    try {
      // Verificar autenticação
      const user = await this.services.auth.getCurrentUser();
      
      if (user) {
        // Carregar dados iniciais
        const [projects, leads, recentPosts] = await Promise.all([
          this.services.projects.fetchProjects({ limit: 5 }),
          this.services.leads.fetchLeads({ limit: 5 }),
          this.services.blog.fetchBlogPosts({ limit: 3 })
        ]);

        return {
          user,
          projects,
          leads,
          recentPosts
        };
      }

      return { user: null };
    } catch (error) {
      console.error('Erro na inicialização:', error);
      return { user: null };
    }
  }

  async performBulkOperations(data) {
    try {
      const results = await Promise.allSettled([
        // Criar múltiplos leads
        ...data.leads.map(lead => this.services.leads.createLead(lead)),
        
        // Criar múltiplas transações
        ...data.transactions.map(transaction => 
          this.services.finance.createTransaction(transaction)
        ),
        
        // Criar múltiplos posts
        ...data.posts.map(post => this.services.blog.submitBlogPost(post))
      ]);

      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      return { successful, failed, results };
    } catch (error) {
      console.error('Erro nas operações em lote:', error);
      throw error;
    }
  }
}

// Uso
const app = new ApplicationManager();
const appData = await app.initializeApp();
```

## Exemplo 6: Configuração Personalizada

```javascript
import { getAuthService, getBlogService } from './services/index.js';
import { ENVIRONMENTS } from './services/constants.js';

// Services com configuração personalizada
const productionAuth = getAuthService({
  environment: ENVIRONMENTS.PRODUCTION,
  timeout: 15000,
  retries: 5
});

const devBlog = getBlogService({
  environment: ENVIRONMENTS.DEVELOPMENT,
  timeout: 5000,
  retries: 2
});

// Uso em diferentes ambientes
if (process.env.NODE_ENV === 'production') {
  await productionAuth.login(credentials);
} else {
  await devBlog.fetchBlogPosts();
}
```
