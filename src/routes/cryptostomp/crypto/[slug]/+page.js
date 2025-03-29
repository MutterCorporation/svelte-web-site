export function load({ params }) {
	return {
		symbol: params.slug.toUpperCase()
	};
}
