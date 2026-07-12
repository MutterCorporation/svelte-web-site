/**
 * Produtos MutterCorp exibidos na home (#produtos).
 * Para trocar um link, edite só PRODUCT_URLS abaixo.
 */
export const PRODUCT_URLS = {
	emotiveCare: 'https://emotivecare.com.br',
	jyhhad: 'https://jyhhad.muttercorp.com.br',
	noticiaApi: 'https://noticia-api.vercel.app/',
	barbeiroShop: 'https://barbeiro-shop-seven.vercel.app/'
};

/** @type {Array<{ name: string, url: string, tag: string, summary: string, points: string[], accent: string }>} */
export const products = [
	{
		name: 'EmotiveCare',
		url: PRODUCT_URLS.emotiveCare,
		tag: 'Saúde emocional · IA',
		summary:
			'O segundo cérebro emocional: IA que realmente entende o histórico de cada pessoa e acompanha a evolução do bem-estar — inclusive com profissionais de saúde.',
		points: ['IA com contexto real', 'Painel para terapeutas', 'Jornada contínua'],
		accent: 'emotive'
	},
	{
		name: 'Jyhhad',
		url: PRODUCT_URLS.jyhhad,
		tag: 'Jogos · VTES',
		summary:
			'Methuselah Online: a experiência completa de Vampire: The Eternal Struggle — monte decks, entre no lobby ou treine contra a IA.',
		points: ['Multiplayer ao vivo', 'Decks por clã', 'Partidas vs IA'],
		accent: 'jyhhad'
	},
	{
		name: 'Notice',
		url: PRODUCT_URLS.noticiaApi,
		tag: 'Notícias · API',
		summary:
			'Agregador de notícias em português — tecnologia, crypto, investimentos e mais — com feed vivo e API/Swagger para integrar onde você quiser.',
		points: ['Feed contínuo', 'API / Swagger', 'Categorias prontas'],
		accent: 'noticia'
	},
	{
		name: 'BarberSync',
		url: PRODUCT_URLS.barbeiroShop,
		tag: 'Barbearia · CRM · WhatsApp',
		summary:
			'Agenda online, CRM e atendimento WhatsApp com IA para barbearias — recupere clientes e transforme a operação em crescimento.',
		points: ['Agenda online', 'CRM da barbearia', 'WhatsApp com IA'],
		accent: 'barbeiro'
	}
];
