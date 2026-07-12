/**
 * Links da página /tree (link-in-bio).
 * Altere URLs aqui — a página importa este arquivo.
 */
import { PRODUCT_URLS } from '$lib/products.js';

export const TREE_PROFILE = {
	name: 'Maikon Weber',
	fullName: 'Maikon Weber de Carvalho',
	role: 'Senior Software Engineer · Solutions Architect · Fundador da MutterCorp',
	location: 'São Paulo, Brasil',
	photo: 'https://avatars.githubusercontent.com/u/45263705?v=4',
	about: [
		'Sou desenvolvedor full stack e arquiteto de soluções, com foco em NestJS, Kafka e sistemas distribuídos. Fundei a MutterCorp para transformar ideias em produtos digitais — de APIs e painéis a SaaS com IA.',
		'Hoje atuo na Smart Sky com infraestrutura de dados e soluções geoespaciais. Já passei por operações de logística (Abbiamo), AIoT (Group Link One) e BPO/telecom (Grupo PLL), sempre entregando software que resolve problema real de negócio.'
	]
};

export const TREE_URLS = {
	site: '/',
	whatsapp:
		'https://wa.me/5511915009625?text=' +
		encodeURIComponent('Olá Maikon! Vi seu linktree e quero conversar.'),
	email: 'mailto:mutter.corp@gmail.com',
	linkedin: 'https://www.linkedin.com/in/maikonwebercorp/',
	github: 'https://github.com/maikonweber',
	x: 'https://x.com/MaikonWeber1',
	cv: '/Profile.pdf',
	emotiveCare: PRODUCT_URLS.emotiveCare,
	jyhhad: PRODUCT_URLS.jyhhad,
	noticiaApi: PRODUCT_URLS.noticiaApi,
	barbeiroShop: PRODUCT_URLS.barbeiroShop,
	abbiamolog: 'https://abbiamolog.com/',
	smartSky: 'https://smartsky.com.br',
	groupLinkOne: 'https://grouplinkone.com/',
	grupoPll: 'https://grupopll.com.br'
};

/** @typedef {{ label: string, href: string, hint?: string, external?: boolean, download?: boolean }} TreeLink */

/** @type {{ id: string, title: string, links: TreeLink[] }[]} */
export const TREE_SECTIONS = [
	{
		id: 'contato',
		title: 'Contato',
		links: [
			{ label: 'WhatsApp', href: TREE_URLS.whatsapp, hint: 'Fale comigo agora', external: true },
			{ label: 'E-mail', href: TREE_URLS.email, hint: 'mutter.corp@gmail.com' },
			{
				label: 'LinkedIn',
				href: TREE_URLS.linkedin,
				hint: 'Currículo e recomendações',
				external: true
			},
			{ label: 'Baixar CV', href: TREE_URLS.cv, hint: 'PDF', download: true }
		]
	},
	{
		id: 'produtos',
		title: 'Produtos MutterCorp',
		links: [
			{
				label: 'EmotiveCare',
				href: TREE_URLS.emotiveCare,
				hint: 'Saúde emocional com IA',
				external: true
			},
			{
				label: 'Jyhhad',
				href: TREE_URLS.jyhhad,
				hint: 'Vampire: The Eternal Struggle online',
				external: true
			},
			{
				label: 'Notice',
				href: TREE_URLS.noticiaApi,
				hint: 'Agregador de notícias + API',
				external: true
			},
			{
				label: 'BarberSync',
				href: TREE_URLS.barbeiroShop,
				hint: 'CRM e WhatsApp para barbearias',
				external: true
			},
			{ label: 'Site MutterCorp', href: TREE_URLS.site, hint: 'Produtos, serviços e experiências' }
		]
	},
	{
		id: 'experiencia',
		title: 'Experiência',
		links: [
			{
				label: 'Smart Sky',
				href: TREE_URLS.smartSky,
				hint: 'Infra de dados · geoespacial · atual',
				external: true
			},
			{
				label: 'Abbiamo',
				href: TREE_URLS.abbiamolog,
				hint: 'Logística e e-commerce',
				external: true
			},
			{
				label: 'Group Link One',
				href: TREE_URLS.groupLinkOne,
				hint: 'AIoT · telemetria',
				external: true
			},
			{
				label: 'Grupo PLL',
				href: TREE_URLS.grupoPll,
				hint: 'BPO · telecom',
				external: true
			}
		]
	},
	{
		id: 'redes',
		title: 'Redes',
		links: [
			{ label: 'GitHub', href: TREE_URLS.github, hint: '@maikonweber', external: true },
			{ label: 'X / Twitter', href: TREE_URLS.x, hint: '@MaikonWeber1', external: true }
		]
	}
];
