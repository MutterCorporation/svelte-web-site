<script>
    import { onMount } from 'svelte';
    
    // State
    let currentPage = 1;
    let pageSize = 10;
    let totalProjects = 0;
    /**
	 * @type {any[]}
	 */
    let projects = [];
    /**
	 * @type {{ id: any; title: any; clientName: any; clientrating: any; category: any; level: any; proposals: any; link: any; description: any; skills: any; scrapedate: string | number | Date; } | null}
	 */
    let selectedProject = null;
    let loading = true;
    let aiOutput = "O texto gerado pela IA aparecerá aqui.";
    
    const baseUrl = 'https://dev.muttercorp.com.br/frella';
    
    // Lifecycle
    onMount(async () => {
     
      await fetchProjectCount();
      await fetchProjects();
    });

    onMount(async () => {
		
	});
    
    // API functions
    async function fetchProjectCount() {
      try {
        const response = await fetch(`${baseUrl}/projects/count`);
        if (response.ok) {
          totalProjects = parseInt(await response.text());
        } else {
          console.error('Erro ao buscar contagem de projetos');
        }
      } catch (error) {
        console.error('Erro de rede:', error);
      }
    }
    
    async function fetchProjects() {
      loading = true;
      try {
        const response = await fetch(`${baseUrl}/projects?page=${currentPage}&pageSize=${pageSize}`);
        if (response.ok) {
          projects = await response.json();
        } else {
          console.error('Erro ao buscar projetos');
        }
      } catch (error) {
        console.error('Erro de rede:', error);
      } finally {
        loading = false;
      }
    }
    
    /**
	 * @param {any} projectId
	 */
    async function fetchProjectDetails(projectId) {
      loading = true;
      try {
        const response = await fetch(`${baseUrl}/projects/${projectId}`);
        if (response.ok) {
          selectedProject = await response.json();
        } else {
          console.error('Erro ao buscar detalhes do projeto');
        }
      } catch (error) {
        console.error('Erro de rede:', error);
      } finally {
        loading = false;
      }
    }
    
    /**
	 * @param {{ projectId: any; estimatedValue: any; estimatedTime: any; proposalText?: any; }} proposal
	 */
    async function submitProposal(proposal) {
      loading = true;
      try {
        const response = await fetch(`${baseUrl}/proposals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
          },
          body: JSON.stringify({
            project_id: proposal.projectId,
            estimated_value: proposal.estimatedValue,
            estimated_time: proposal.estimatedTime
          })
        });
        
        if (response.ok) {
          alert('Proposta enviada com sucesso!');
          // Recarregar os detalhes do projeto após enviar a proposta
          await fetchProjectDetails(proposal.projectId);
        } else {
          alert('Erro ao enviar proposta. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro de rede:', error);
        alert('Erro ao enviar proposta. Verifique sua conexão.');
      } finally {
        loading = false;
      }
    }
    
    /**
	 * @param {any} prompt
	 */
    async function generateAiText(prompt) {
      loading = true;
      aiOutput = "Gerando texto...";
      
      try {
        const response = await fetch('https://dev.muttercorp.com.br/maritalk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*',
             Authorization: `Bearer ${localStorage.getItem('MutterCorp')}`
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: prompt
              }
            ],
            do_sample: true,
            max_tokens: 200,
            temperature: 0.7,
            top_p: 0.95,
            model: "sabia-3"
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Extrair a resposta da IA (ajustar conforme a estrutura real da resposta)
          aiOutput = data.choices ? data.choices[0].message.content : data.response || "Não foi possível obter uma resposta da IA.";
        } else {
          aiOutput = "Erro ao comunicar com a IA. Tente novamente.";
        }
      } catch (error) {
        console.error('Erro ao gerar texto com IA:', error);
        aiOutput = "Erro ao comunicar com a IA. Verifique sua conexão.";
      } finally {
        loading = false;
      }
      
      return aiOutput;
    }
    
    // Handlers
    /**
	 * @param {any} projectId
	 */
    function selectProject(projectId) {
      fetchProjectDetails(projectId);
    }
    
    function handlePrevPage() {
      if (currentPage > 1) {
        currentPage--;
        fetchProjects();
      }
    }
    
    function handleNextPage() {
      if (currentPage * pageSize < totalProjects) {
        currentPage++;
        fetchProjects();
      }
    }
    
    /**
	 * @param {string} estimatedValue
	 * @param {string} estimatedTime
	 * @param {string} proposalText
	 */
    function handleProposalSubmit(estimatedValue, estimatedTime, proposalText) {
      if (!selectedProject) return;
      
      submitProposal({
        projectId: selectedProject.id,
        estimatedValue: parseInt(estimatedValue),
        estimatedTime: parseInt(estimatedTime),
        proposalText
      });
    }
    
    /**
	 * @param {string} prompt
	 */
    async function handleGenerateText(prompt) {
      aiOutput = await generateAiText(prompt);
    }
    
    // Use AI text in proposal form
    let proposalText = "";
    function useAiTextInProposal() {
      if (aiOutput && aiOutput !== "O texto gerado pela IA aparecerá aqui." && aiOutput !== "Gerando texto...") {
        proposalText = aiOutput;
      } else {
        alert('Nenhum texto gerado pela IA ainda. Use o gerador abaixo primeiro.');
      }
    }
    
    // Form state
    let estimatedValue = "";
    let estimatedTime = "";
    let aiPrompt = "";
    
    // Computed values
    $: totalPages = Math.ceil(totalProjects / pageSize);
    $: canGoBack = currentPage > 1;
    $: canGoForward = currentPage < totalPages;
  

	function validateToken() {
		throw new Error('Function not implemented.');
	}
</script>
  
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Courier New', monospace;
    }
    
    :global(body) {
      background-color: #f0f0f0;
      color: #111;
      line-height: 1.6;
    }
    
    .frella-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    header {
      background-color: #000;
      color: #fff;
      padding: 20px;
      margin-bottom: 20px;
      border: 3px solid #000;
    }
    
    h1, h2, h3 {
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: -1px;
    }
    
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    .pagination {
      grid-column: span 2;
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
    
    button {
      background-color: #000;
      color: #fff;
      border: none;
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
      transition: background-color 0.2s;
    }
    
    button:hover {
      background-color: #333;
    }
    
    button:disabled {
      background-color: #666;
      cursor: not-allowed;
    }
    
    .loading {
      text-align: center;
      padding: 20px;
      font-weight: bold;
      grid-column: span 2;
    }
    
    .count-badge {
      background-color: #000;
      color: #fff;
      padding: 5px 10px;
      margin-left: 10px;
      font-size: 14px;
      border: 2px solid #fff;
    }
    
    /* Projects List */
    .projects-container {
      grid-column: span 2;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .project-card {
      background-color: #fff;
      border: 3px solid #000;
      padding: 20px;
      transition: transform 0.2s;
      cursor: pointer;
      position: relative;
    }
    
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 5px 5px 0 #000;
    }
    
    .project-card.selected {
      background-color: #ffff00;
      transform: translateY(-5px);
      box-shadow: 5px 5px 0 #000;
    }
    
    .status-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px 10px;
      font-size: 12px;
      font-weight: bold;
      background-color: #ccc;
    }
    
    /* Project Details */
    .project-details {
      background-color: #fff;
      border: 3px solid #000;
      padding: 20px;
    }
    
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 10px;
    }
    
    .skills-tag {
      display: inline-block;
      background-color: #000;
      color: #fff;
      padding: 5px 10px;
      margin: 3px;
      font-size: 12px;
    }
    
    /* Proposal Form */
    .proposal-form {
      background-color: #fff;
      border: 3px solid #000;
      padding: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    input, textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 2px solid #000;
      font-size: 16px;
    }
    
    .buttons {
      display: flex;
      gap: 10px;
    }
    
    /* AI Generator */
    .ai-generator {
      grid-column: span 2;
      background-color: #e0e0e0;
      border: 3px solid #000;
      padding: 20px;
      margin-top: 20px;
    }
    
    .ai-output {
      background-color: #fff;
      border: 3px solid #000;
      padding: 20px;
      margin-top: 10px;
      white-space: pre-wrap;
      min-height: 100px;
    }
    
    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr;
      }
      
      .pagination, .projects-container, .ai-generator {
        grid-column: span 1;
      }
    }
  </style>
  
  <div class="frella-container">
    <header>
      <h1>FRELLA<span class="count-badge">{totalProjects}</span></h1>
      <p>Sistema Brutalista de Propostas</p>
    </header>
    
    <div class="container">
      {#if loading}
        <div class="loading">CARREGANDO DADOS...</div>
      {/if}
      
      <!-- Projects List -->
      <div class="projects-container">
        {#each projects as project (project.id)}
          <div 
            onclick={() => selectProject(project.id)}
            class="project-card {project.id === selectedProject?.id ? 'selected' : ''}" 
          >
            <h3>{project.title}</h3>
            <p><strong>Categoria:</strong> {project.category}</p>
            <p><strong>Nível:</strong> {project.level}</p>
            <p><strong>Propostas:</strong> {project.proposals}</p>
            <div class="status-badge">{project.interested} interessados</div>
          </div>
        {:else}
          <p>Nenhum projeto encontrado.</p>
        {/each}
      </div>
      
      <!-- Pagination -->
      <div class="pagination">
        <button onclick={handlePrevPage} disabled={!canGoBack}>ANTERIOR</button>
        <div>Página {currentPage} de {totalPages || 1}</div>
        <button onclick={handleNextPage} disabled={!canGoForward}>PRÓXIMO</button>
      </div>
      
      <!-- Project Details -->
      <div class="project-details">
        {#if selectedProject}
          <h2>{selectedProject.title}</h2>
          <p><strong>Cliente:</strong> {selectedProject.clientName} ({selectedProject.clientrating} ★)</p>
          <p><strong>Categoria:</strong> {selectedProject.category}</p>
          <p><strong>Nível:</strong> {selectedProject.level}</p>
          <p><strong>Propostas:</strong> {selectedProject.proposals}</p>
          <p><strong>Link:</strong> <a href={selectedProject.link} target="_blank">{selectedProject.link}</a></p>
          
          <h3>DESCRIÇÃO:</h3>
          <p>{selectedProject.description}</p>
          
          <h3>HABILIDADES:</h3>
          <div class="skills-container">
            {#each selectedProject.skills as skill}
              <span class="skills-tag">{skill}</span>
            {/each}
          </div>
          
          <p><strong>Data de captura:</strong> {new Date(selectedProject.scrapedate).toLocaleString()}</p>
        {:else}
          <h2>DETALHES DO PROJETO</h2>
          <p>Selecione um projeto para ver os detalhes</p>
        {/if}
      </div>
      
      <!-- Proposal Form -->
      <div class="proposal-form">
        <h2>ENVIAR PROPOSTA</h2>
        
        {#if selectedProject}
          <form onsubmit={e => {
            e.preventDefault();
            handleProposalSubmit(estimatedValue, estimatedTime, proposalText);
          }}>
            <div>
              <label for="estimated-value">Valor Estimado (R$):</label>
              <input 
                type="number" 
                id="estimated-value" 
                bind:value={estimatedValue} 
                min="1" 
                required
              />
            </div>
            
            <div>
              <label for="estimated-time">Tempo Estimado (dias):</label>
              <input 
                type="number" 
                id="estimated-time" 
                bind:value={estimatedTime} 
                min="1" 
                required
              />
            </div>
            
            <div>
              <label for="proposal-text">Texto da Proposta:</label>
              <textarea 
                id="proposal-text" 
                bind:value={proposalText} 
                rows="5" 
                placeholder="Descreva sua proposta ou use o gerador de IA abaixo..."
              ></textarea>
            </div>
            
            <div class="buttons">
              <button type="submit">ENVIAR PROPOSTA</button>
              <!-- <button type="button" onclick={useAiTextInProposal}>USAR TEXTO DA IA</button> -->
            </div>
          </form>
        {:else}
          <p>Selecione um projeto para enviar uma proposta</p>
        {/if}

      </div>
      
      </div>
      </div> 
      <!-- AI Generator -->
      <!-- <div class="ai-generator">
        <h2>GERADOR DE PROPOSTA COM IA</h2>
        <p>Use nossa IA para gerar um texto para sua proposta</p>
        
        <textarea 
          bind:value={aiPrompt} 
          rows="3" 
          placeholder="Digite aqui instruções para a IA gerar seu texto..."
        ></textarea>
        
        <button onclick={() => handleGenerateText(aiPrompt)}>GERAR TEXTO</button>
        
        <div class="ai-output">{aiOutput}</div>
      </div>
    </div>
  </div> -->