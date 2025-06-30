// Dados das soluções da MutterCorp
// Usando as variáveis de texto para facilitar tradução
import { t } from './i18n/texts.js';

// Apps disponíveis
export const APPS = [
	{
		title: 'CryptoStomp',
		description: 'Análise avançada de criptomoedas com IA e ML',
		icon: '📈',
		link: '/cryptostomp',
		color: 'from-blue-500 to-cyan-500',
		category: 'ML/AI'
	},
	{
		title: 'Sexpomodoro',
		description: 'Timer Pomodoro com posições do Kamasutra',
		icon: '🕐',
		link: 'https://sexpomodoro.com.br',
		color: 'from-pink-500 to-red-500',
		category: 'Produtividade'
	},
	{
		title: 'BillyAgent',
		description: 'Agente de atendimento WhatsApp com IA',
		icon: '🤖',
		link: '/billy-agent',
		color: 'from-green-500 to-emerald-500',
		category: 'ML/AI'
	},
	{
		title: 'Job Hunter',
		description: 'Plataforma de busca de empregos tech',
		icon: '💼',
		link: '/job-hunter',
		color: 'from-purple-500 to-indigo-500',
		category: 'Carreira'
	},
	{
		title: 'Finance Table',
		description: 'Gestão financeira simplificada',
		icon: '💰',
		link: '/finance-table',
		color: 'from-yellow-500 to-orange-500',
		category: 'Finanças'
	},
	{
		title: 'TAB',
		description: 'Aplicativo para transtorno afetivo bipolar',
		icon: '🧠',
		link: '/tab',
		color: 'from-purple-500 to-pink-500',
		category: 'Saúde'
	},
	{
		title: 'WorkPower',
		description: 'Aplicativo para personal trainers',
		icon: '💪',
		link: '/workpower',
		color: 'from-red-500 to-orange-500',
		category: 'Fitness'
	},
	{
		title: 'Jihad (VTES)',
		description: 'Jogo de TCG em Godot',
		icon: '🎮',
		link: '/jihad',
		color: 'from-gray-500 to-black',
		category: 'Gaming'
	}
];

// Serviços principais usando as variáveis de texto
export const SERVICES = [
	{
		title: t('SOLUTIONS.ML_SERVICES.TITLE'),
		description: t('SOLUTIONS.ML_SERVICES.DESCRIPTION'),
		icon: '🤖',
		link: '/solucoes/machine-learning',
		features: t('SOLUTIONS.ML_SERVICES.FEATURES')
	},
	{
		title: t('SOLUTIONS.OMNICHAT.TITLE'),
		description: t('SOLUTIONS.OMNICHAT.DESCRIPTION'),
		icon: '💬',
		link: '/solucoes/omnichat',
		features: t('SOLUTIONS.OMNICHAT.FEATURES')
	},
	{
		title: t('SOLUTIONS.CRM.TITLE'),
		description: t('SOLUTIONS.CRM.DESCRIPTION'),
		icon: '🎯',
		link: '/solucoes/crm',
		features: t('SOLUTIONS.CRM.FEATURES')
	},
	{
		title: t('SOLUTIONS.INFLUENCER_SITES.TITLE'),
		description: t('SOLUTIONS.INFLUENCER_SITES.DESCRIPTION'),
		icon: '🌟',
		link: '/solucoes/sites-influencers',
		features: t('SOLUTIONS.INFLUENCER_SITES.FEATURES')
	},
	{
		title: t('SOLUTIONS.PAYMENT_GATEWAY.TITLE'),
		description: t('SOLUTIONS.PAYMENT_GATEWAY.DESCRIPTION'),
		icon: '💳',
		link: '/solucoes/gateway-pagamentos',
		features: t('SOLUTIONS.PAYMENT_GATEWAY.FEATURES')
	},
	{
		title: t('SOLUTIONS.MARKETING_AUTOMATION.TITLE'),
		description: t('SOLUTIONS.MARKETING_AUTOMATION.DESCRIPTION'),
		icon: '📈',
		link: '/solucoes/automacao-marketing',
		features: t('SOLUTIONS.MARKETING_AUTOMATION.FEATURES')
	},
	{
		title: t('SOLUTIONS.LEGACY_SYSTEMS.TITLE'),
		description: t('SOLUTIONS.LEGACY_SYSTEMS.DESCRIPTION'),
		icon: '🔧',
		link: '/solucoes/sistemas-legados',
		features: t('SOLUTIONS.LEGACY_SYSTEMS.FEATURES')
	},
	{
		title: t('SOLUTIONS.PENTEST.TITLE'),
		description: t('SOLUTIONS.PENTEST.DESCRIPTION'),
		icon: '🛡️',
		link: '/solucoes/pentest',
		features: t('SOLUTIONS.PENTEST.FEATURES')
	}
];

// Tecnologias utilizadas
export const TECHNOLOGIES = [
	{ name: 'React/Next.js', description: 'Frontend moderno' },
	{ name: 'Node.js', description: 'Backend escalável' },
	{ name: 'Python', description: 'Data Science & ML' },
	{ name: 'Svelte/SvelteKit', description: 'Frontend performático' },
	{ name: 'TensorFlow', description: 'Machine Learning' },
	{ name: 'Docker', description: 'Containerização' },
	{ name: 'AWS/Azure', description: 'Cloud computing' },
	{ name: 'PostgreSQL', description: 'Banco de dados' }
];

// Casos de sucesso
export const SUCCESS_CASES = [
	{
		title: 'CryptoStomp',
		description: 'Plataforma de análise de criptomoedas com IA',
		result: 'Aumento de 300% na precisão das previsões',
		icon: '📈',
		link: '/cryptostomp'
	},
	{
		title: 'BillyAgent',
		description: 'Chatbot inteligente para WhatsApp',
		result: 'Redução de 70% no tempo de atendimento',
		icon: '🤖',
		link: '/billy-agent'
	},
	{
		title: 'Job Hunter',
		description: 'Plataforma de busca de empregos',
		result: 'Mais de 10.000 vagas cadastradas',
		icon: '💼',
		link: '/job-hunter'
	}
];

// Dados de contato
export const CONTACT_INFO = {
	email: 'contato@muttercorp.com.br',
	phone: '+55 (11) 99999-9999',
	address: 'São Paulo, SP - Brasil',
	social: {
		linkedin: 'https://linkedin.com/company/muttercorp',
		github: 'https://github.com/muttercorp',
		twitter: 'https://twitter.com/muttercorp'
	}
};

export default {
	APPS,
	SERVICES,
	TECHNOLOGIES,
	SUCCESS_CASES,
	CONTACT_INFO
}; 