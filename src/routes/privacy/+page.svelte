<script>
	import { onMount } from 'svelte';
	
	let currentSection = '';
	
	onMount(() => {
		// Scroll suave para seções
		const handleHashChange = () => {
			const hash = window.location.hash.slice(1);
			if (hash) {
				const element = document.getElementById(hash);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
					currentSection = hash;
				}
			}
		};
		
		window.addEventListener('hashchange', handleHashChange);
		handleHashChange(); // Check initial hash
		
		return () => window.removeEventListener('hashchange', handleHashChange);
	});
</script>

<svelte:head>
	<title>Política de Privacidade - MutterCorp</title>
	<meta name="description" content="Política de Privacidade da MutterCorp. Saiba como coletamos, usamos e protegemos seus dados pessoais." />
	<meta name="robots" content="index, follow" />
</svelte:head>

<div class="privacy-container">
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<h1 class="hero-title">Política de Privacidade</h1>
			<p class="hero-subtitle">Transparência total sobre como tratamos seus dados</p>
			<div class="last-updated">
				<span class="update-badge">📅 Última atualização: 15 de Janeiro de 2025</span>
			</div>
		</div>
	</section>

	<!-- Navigation Menu -->
	<nav class="privacy-nav">
		<div class="nav-container">
			<h3>Navegação Rápida</h3>
			<ul class="nav-list">
				<li><a href="#introducao" class="nav-link">1. Introdução</a></li>
				<li><a href="#dados-coletados" class="nav-link">2. Dados Coletados</a></li>
				<li><a href="#uso-dados" class="nav-link">3. Uso dos Dados</a></li>
				<li><a href="#compartilhamento" class="nav-link">4. Compartilhamento</a></li>
				<li><a href="#cookies" class="nav-link">5. Cookies</a></li>
				<li><a href="#seguranca" class="nav-link">6. Segurança</a></li>
				<li><a href="#direitos" class="nav-link">7. Seus Direitos</a></li>
				<li><a href="#contato" class="nav-link">8. Contato</a></li>
			</ul>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="main-content">
		
		<!-- 1. Introdução -->
		<section id="introducao" class="content-section">
			<h2 class="section-title">
				<span class="section-number">1.</span>
				Introdução
			</h2>
			<div class="section-content">
				<p>A <strong>MutterCorp</strong> ("nós", "nosso" ou "empresa") está comprometida em proteger e respeitar sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você:</p>
				<ul>
					<li>Visita nosso website (muttercorp.com.br)</li>
					<li>Utiliza nossos produtos e serviços</li>
					<li>Entra em contato conosco</li>
					<li>Interage com nossas aplicações e plataformas</li>
				</ul>
				<div class="highlight-box">
					<h4>🛡️ Nosso Compromisso</h4>
					<p>Seguimos rigorosamente a <strong>Lei Geral de Proteção de Dados (LGPD)</strong> e as melhores práticas internacionais de proteção de dados.</p>
				</div>
			</div>
		</section>

		<!-- 2. Dados Coletados -->
		<section id="dados-coletados" class="content-section">
			<h2 class="section-title">
				<span class="section-number">2.</span>
				Dados que Coletamos
			</h2>
			<div class="section-content">
				
				<h3>2.1 Dados Fornecidos Diretamente</h3>
				<div class="data-category">
					<h4>📝 Informações de Contato</h4>
					<ul>
						<li>Nome completo</li>
						<li>Endereço de e-mail</li>
						<li>Número de telefone</li>
						<li>Empresa/Organização</li>
						<li>Cargo/Função</li>
					</ul>
				</div>

				<div class="data-category">
					<h4>💼 Informações Profissionais</h4>
					<ul>
						<li>Área de atuação</li>
						<li>Necessidades específicas</li>
						<li>Orçamento aproximado</li>
						<li>Prazos de projeto</li>
					</ul>
				</div>

				<h3>2.2 Dados Coletados Automaticamente</h3>
				<div class="data-category">
					<h4>🔍 Dados de Navegação</h4>
					<ul>
						<li>Endereço IP</li>
						<li>Tipo de navegador e versão</li>
						<li>Sistema operacional</li>
						<li>Páginas visitadas e tempo de permanência</li>
						<li>Referrer (site de origem)</li>
						<li>Resolução de tela</li>
					</ul>
				</div>

				<div class="data-category">
					<h4>📊 Dados de Performance</h4>
					<ul>
						<li>Velocidade de carregamento</li>
						<li>Interações com elementos da página</li>
						<li>Erros técnicos encontrados</li>
						<li>Padrões de uso das aplicações</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- 3. Uso dos Dados -->
		<section id="uso-dados" class="content-section">
			<h2 class="section-title">
				<span class="section-number">3.</span>
				Como Usamos seus Dados
			</h2>
			<div class="section-content">
				
				<div class="purpose-grid">
					<div class="purpose-card">
						<div class="purpose-icon">🎯</div>
						<h4>Prestação de Serviços</h4>
						<p>Desenvolver soluções personalizadas, fornecer suporte técnico e entregar projetos conforme acordado.</p>
					</div>

					<div class="purpose-card">
						<div class="purpose-icon">📞</div>
						<h4>Comunicação</h4>
						<p>Responder suas consultas, enviar propostas comerciais e manter você informado sobre nossos serviços.</p>
					</div>

					<div class="purpose-card">
						<div class="purpose-icon">⚡</div>
						<h4>Melhoria Contínua</h4>
						<p>Analisar o uso do site para melhorar a experiência do usuário e otimizar nossos produtos.</p>
					</div>

					<div class="purpose-card">
						<div class="purpose-icon">🔒</div>
						<h4>Segurança</h4>
						<p>Detectar e prevenir fraudes, ataques cibernéticos e uso indevido de nossos sistemas.</p>
					</div>

					<div class="purpose-card">
						<div class="purpose-icon">⚖️</div>
						<h4>Compliance Legal</h4>
						<p>Cumprir obrigações legais, regulamentares e contratuais aplicáveis ao nosso negócio.</p>
					</div>

					<div class="purpose-card">
						<div class="purpose-icon">📈</div>
						<h4>Analytics</h4>
						<p>Gerar insights sobre tendências de mercado e comportamento para desenvolver novos produtos.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- 4. Compartilhamento -->
		<section id="compartilhamento" class="content-section">
			<h2 class="section-title">
				<span class="section-number">4.</span>
				Compartilhamento de Dados
			</h2>
			<div class="section-content">
				<div class="warning-box">
					<h4>🚫 Nunca Vendemos seus Dados</h4>
					<p>A MutterCorp <strong>jamais vende, aluga ou comercializa</strong> seus dados pessoais com terceiros para fins comerciais.</p>
				</div>

				<h3>4.1 Compartilhamento Autorizado</h3>
				<p>Podemos compartilhar suas informações apenas nas seguintes situações:</p>

				<div class="sharing-scenarios">
					<div class="scenario">
						<h4>🤝 Parceiros de Negócio</h4>
						<p>Com seu consentimento explícito, para projetos que envolvam especialistas terceirizados ou soluções complementares.</p>
					</div>

					<div class="scenario">
						<h4>🛠️ Prestadores de Serviço</h4>
						<p>Com fornecedores que nos auxiliam (hospedagem, e-mail marketing, analytics), sempre sob rigorosos contratos de confidencialidade.</p>
					</div>

					<div class="scenario">
						<h4>⚖️ Exigências Legais</h4>
						<p>Quando obrigatório por lei, ordem judicial ou para proteger nossos direitos legítimos.</p>
					</div>

					<div class="scenario">
						<h4>🏢 Transferência Empresarial</h4>
						<p>Em caso de fusão, aquisição ou venda da empresa, seus dados podem ser transferidos ao novo controlador.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- 5. Cookies -->
		<section id="cookies" class="content-section">
			<h2 class="section-title">
				<span class="section-number">5.</span>
				Cookies e Tecnologias Similares
			</h2>
			<div class="section-content">
				<p>Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site.</p>

				<div class="cookies-types">
					<div class="cookie-type">
						<h4>🍪 Cookies Essenciais</h4>
						<p><strong>Sempre ativos</strong> - Necessários para o funcionamento básico do site (navegação, segurança, lembrança de preferências).</p>
					</div>

					<div class="cookie-type">
						<h4>📊 Cookies de Analytics</h4>
						<p><strong>Opcionais</strong> - Nos ajudam a entender como você usa o site para melhorarmos a experiência.</p>
						<ul>
							<li>Google Analytics 4</li>
							<li>Hotjar (mapas de calor)</li>
						</ul>
					</div>

					<div class="cookie-type">
						<h4>🎯 Cookies de Marketing</h4>
						<p><strong>Opcionais</strong> - Utilizados para personalizar anúncios e medir a eficácia de campanhas.</p>
						<ul>
							<li>Google Ads</li>
							<li>Facebook Pixel</li>
							<li>LinkedIn Insights</li>
						</ul>
					</div>
				</div>

				<div class="cookie-control">
					<h4>🎛️ Controle seus Cookies</h4>
					<p>Você pode gerenciar suas preferências de cookies a qualquer momento:</p>
					<button class="cookie-settings-btn">⚙️ Configurar Cookies</button>
				</div>
			</div>
		</section>

		<!-- 6. Segurança -->
		<section id="seguranca" class="content-section">
			<h2 class="section-title">
				<span class="section-number">6.</span>
				Segurança dos Dados
			</h2>
			<div class="section-content">
				<p>Implementamos medidas técnicas e organizacionais rigorosas para proteger seus dados:</p>

				<div class="security-measures">
					<div class="security-category">
						<h4>🔐 Proteção Técnica</h4>
						<ul>
							<li>Criptografia SSL/TLS para transmissão</li>
							<li>Criptografia AES-256 para armazenamento</li>
							<li>Firewalls e sistemas de detecção de intrusão</li>
							<li>Backups automáticos e seguros</li>
							<li>Monitoramento 24/7</li>
						</ul>
					</div>

					<div class="security-category">
						<h4>👥 Proteção Organizacional</h4>
						<ul>
							<li>Acesso limitado por função (need-to-know)</li>
							<li>Treinamento regular em segurança</li>
							<li>Contratos de confidencialidade</li>
							<li>Auditorias periódicas</li>
							<li>Plano de resposta a incidentes</li>
						</ul>
					</div>
				</div>

				<div class="incident-response">
					<h4>🚨 Em Caso de Incidente</h4>
					<p>Se detectarmos qualquer violação de dados que possa afetar sua privacidade, notificaremos:</p>
					<ul>
						<li>Autoridades competentes em <strong>72 horas</strong></li>
						<li>Você diretamente em <strong>até 5 dias úteis</strong></li>
						<li>Medidas imediatas de contenção e correção</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- 7. Seus Direitos -->
		<section id="direitos" class="content-section">
			<h2 class="section-title">
				<span class="section-number">7.</span>
				Seus Direitos (LGPD)
			</h2>
			<div class="section-content">
				<p>Conforme a Lei Geral de Proteção de Dados, você tem os seguintes direitos:</p>

				<div class="rights-grid">
					<div class="right-card">
						<div class="right-icon">👁️</div>
						<h4>Acesso</h4>
						<p>Saber quais dados pessoais temos sobre você e como os utilizamos.</p>
					</div>

					<div class="right-card">
						<div class="right-icon">✏️</div>
						<h4>Correção</h4>
						<p>Corrigir dados incompletos, inexatos ou desatualizados.</p>
					</div>

					<div class="right-card">
						<div class="right-icon">🗑️</div>
						<h4>Exclusão</h4>
						<p>Solicitar a eliminação de dados desnecessários ou processados incorretamente.</p>
					</div>

					<div class="right-card">
						<div class="right-icon">📱</div>
						<h4>Portabilidade</h4>
						<p>Receber seus dados em formato estruturado e legível por máquina.</p>
					</div>

					<div class="right-card">
						<div class="right-icon">❌</div>
						<h4>Oposição</h4>
						<p>Opor-se ao processamento quando baseado em interesse legítimo.</p>
					</div>

					<div class="right-card">
						<div class="right-icon">🔒</div>
						<h4>Restrição</h4>
						<p>Limitar o processamento em situações específicas.</p>
					</div>
				</div>

				<div class="exercise-rights">
					<h4>📧 Como Exercer seus Direitos</h4>
					<p>Para exercer qualquer desses direitos, entre em contato conosco:</p>
					<div class="contact-methods">
						<div class="contact-method">
							<strong>E-mail:</strong> privacidade@muttercorp.com.br
						</div>
						<div class="contact-method">
							<strong>Telefone:</strong> (11) 9999-9999
						</div>
						<div class="contact-method">
							<strong>Prazo de Resposta:</strong> Até 15 dias úteis
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- 8. Contato -->
		<section id="contato" class="content-section">
			<h2 class="section-title">
				<span class="section-number">8.</span>
				Entre em Contato
			</h2>
			<div class="section-content">
				<div class="contact-info">
					<div class="contact-card">
						<h4>🏢 Controlador de Dados</h4>
						<p><strong>MutterCorp Tecnologia Ltda.</strong></p>
						<p>CNPJ: XX.XXX.XXX/0001-XX</p>
						<p>São Paulo - SP, Brasil</p>
					</div>

					<div class="contact-card">
						<h4>👨‍💼 Encarregado de Dados (DPO)</h4>
						<p><strong>Maikon Weber</strong></p>
						<p>📧 dpo@muttercorp.com.br</p>
						<p>📞 (11) 9999-9999</p>
					</div>

					<div class="contact-card">
						<h4>🛡️ Privacidade e Segurança</h4>
						<p>📧 privacidade@muttercorp.com.br</p>
						<p>📧 seguranca@muttercorp.com.br</p>
						<p>🔗 muttercorp.com.br/contato</p>
					</div>
				</div>

				<div class="complaint-info">
					<h4>⚖️ Autoridade de Proteção de Dados</h4>
					<p>Se não ficar satisfeito com nossas respostas, você pode contatar a ANPD:</p>
					<ul>
						<li><strong>ANPD</strong> - Autoridade Nacional de Proteção de Dados</li>
						<li>🌐 www.gov.br/anpd</li>
						<li>📧 comunicacao@anpd.gov.br</li>
					</ul>
				</div>
			</div>
		</section>

	</main>

	<!-- Footer -->
	<footer class="privacy-footer">
		<div class="footer-content">
			<p>Esta Política de Privacidade foi atualizada em <strong>15 de Janeiro de 2025</strong>.</p>
			<p>Para alterações futuras, você será notificado com <strong>30 dias de antecedência</strong>.</p>
			<div class="footer-links">
				<a href="/terms">Termos de Uso</a>
				<a href="/cookies">Política de Cookies</a>
				<a href="/contato">Fale Conosco</a>
			</div>
		</div>
	</footer>
</div>

<style>
	.privacy-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
	}

	/* Hero Section */
	.hero {
		text-align: center;
		padding: 4rem 2rem 2rem;
		background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
	}

	.hero-title {
		font-size: clamp(3rem, 6vw, 5rem);
		font-weight: 900;
		margin-bottom: 1rem;
		background: linear-gradient(45deg, #fff, #a8edea);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: clamp(1.2rem, 2.5vw, 1.8rem);
		margin-bottom: 2rem;
		opacity: 0.9;
	}

	.last-updated {
		display: inline-block;
	}

	.update-badge {
		background: rgba(255, 255, 255, 0.2);
		padding: 0.5rem 1rem;
		border-radius: 2rem;
		font-size: 0.9rem;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	/* Navigation */
	.privacy-nav {
		background: rgba(0, 0, 0, 0.2);
		padding: 2rem;
		position: sticky;
		top: 0;
		z-index: 100;
		backdrop-filter: blur(10px);
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.nav-container h3 {
		margin-bottom: 1rem;
		font-size: 1.2rem;
		opacity: 0.9;
	}

	.nav-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.nav-link {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		padding: 0.5rem;
		border-radius: 0.5rem;
		transition: all 0.3s ease;
		display: block;
	}

	.nav-link:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	/* Main Content */
	.main-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.content-section {
		margin-bottom: 4rem;
		scroll-margin-top: 100px;
	}

	.section-title {
		font-size: clamp(2rem, 4vw, 2.5rem);
		font-weight: 800;
		margin-bottom: 2rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.section-number {
		background: linear-gradient(45deg, #ff6b6b, #feca57);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		font-weight: 900;
	}

	.section-content {
		background: rgba(255, 255, 255, 0.05);
		padding: 2rem;
		border-radius: 1rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	/* Content Elements */
	.highlight-box {
		background: linear-gradient(45deg, rgba(76, 175, 80, 0.2), rgba(139, 195, 74, 0.2));
		padding: 1.5rem;
		border-radius: 0.5rem;
		border-left: 4px solid #4caf50;
		margin: 1.5rem 0;
	}

	.warning-box {
		background: linear-gradient(45deg, rgba(255, 152, 0, 0.2), rgba(255, 193, 7, 0.2));
		padding: 1.5rem;
		border-radius: 0.5rem;
		border-left: 4px solid #ff9800;
		margin: 1.5rem 0;
	}

	.data-category {
		background: rgba(255, 255, 255, 0.05);
		padding: 1.5rem;
		border-radius: 0.5rem;
		margin: 1rem 0;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.data-category h4 {
		margin-bottom: 1rem;
		color: #a8edea;
	}

	/* Purpose Grid */
	.purpose-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin: 2rem 0;
	}

	.purpose-card {
		background: rgba(255, 255, 255, 0.08);
		padding: 1.5rem;
		border-radius: 0.5rem;
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.purpose-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.purpose-card h4 {
		margin-bottom: 1rem;
		color: #a8edea;
	}

	/* Sharing Scenarios */
	.sharing-scenarios {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.scenario {
		background: rgba(255, 255, 255, 0.05);
		padding: 1.5rem;
		border-radius: 0.5rem;
		border-left: 3px solid #667eea;
	}

	.scenario h4 {
		margin-bottom: 0.5rem;
		color: #a8edea;
	}

	/* Cookies */
	.cookies-types {
		display: grid;
		gap: 1.5rem;
		margin: 2rem 0;
	}

	.cookie-type {
		background: rgba(255, 255, 255, 0.05);
		padding: 1.5rem;
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.cookie-control {
		text-align: center;
		margin: 2rem 0;
	}

	.cookie-settings-btn {
		background: linear-gradient(45deg, #667eea, #764ba2);
		color: white;
		border: none;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.cookie-settings-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
	}

	/* Security */
	.security-measures {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin: 2rem 0;
	}

	.security-category {
		background: rgba(255, 255, 255, 0.05);
		padding: 1.5rem;
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.security-category h4 {
		margin-bottom: 1rem;
		color: #a8edea;
	}

	.incident-response {
		background: rgba(244, 67, 54, 0.1);
		padding: 1.5rem;
		border-radius: 0.5rem;
		border-left: 4px solid #f44336;
		margin: 2rem 0;
	}

	/* Rights */
	.rights-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin: 2rem 0;
	}

	.right-card {
		background: rgba(255, 255, 255, 0.08);
		padding: 1.5rem;
		border-radius: 0.5rem;
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
	}

	.right-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.right-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.right-card h4 {
		margin-bottom: 1rem;
		color: #a8edea;
	}

	.exercise-rights {
		background: rgba(76, 175, 80, 0.1);
		padding: 1.5rem;
		border-radius: 0.5rem;
		border-left: 4px solid #4caf50;
		margin: 2rem 0;
	}

	.contact-methods {
		display: grid;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.contact-method {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
	}

	/* Contact */
	.contact-info {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin: 2rem 0;
	}

	.contact-card {
		background: rgba(255, 255, 255, 0.08);
		padding: 2rem;
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.contact-card h4 {
		margin-bottom: 1rem;
		color: #a8edea;
	}

	.complaint-info {
		background: rgba(33, 150, 243, 0.1);
		padding: 1.5rem;
		border-radius: 0.5rem;
		border-left: 4px solid #2196f3;
		margin: 2rem 0;
	}

	/* Footer */
	.privacy-footer {
		background: rgba(0, 0, 0, 0.3);
		padding: 3rem 2rem;
		text-align: center;
		margin-top: 4rem;
	}

	.footer-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.footer-links {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-top: 2rem;
		flex-wrap: wrap;
	}

	.footer-links a {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		transition: all 0.3s ease;
	}

	.footer-links a:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.privacy-nav {
			padding: 1rem;
		}

		.nav-list {
			grid-template-columns: 1fr;
		}

		.main-content {
			padding: 1rem;
		}

		.purpose-grid,
		.rights-grid,
		.security-measures,
		.contact-info {
			grid-template-columns: 1fr;
		}

		.footer-links {
			flex-direction: column;
			gap: 1rem;
		}
	}

	/* Scrollbar */
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
	}

	::-webkit-scrollbar-thumb {
		background: linear-gradient(45deg, #667eea, #764ba2);
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(45deg, #5a67d8, #6b46c1);
	}

	/* Smooth scrolling */
	html {
		scroll-behavior: smooth;
	}

	/* Focus styles for accessibility */
	.nav-link:focus,
	.cookie-settings-btn:focus,
	.footer-links a:focus {
		outline: 2px solid #a8edea;
		outline-offset: 2px;
	}
</style> 