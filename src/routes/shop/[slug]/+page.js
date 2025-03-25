import { error } from "@sveltejs/kit";

export async function load({ params }) {
const products = {
    'binance-refer': {
        id: 1,
        title: 'Binance Refer',
        slug: 'binance-refer',
        price: 97.00,
        src: 'https://conteudointimo.s3.amazonaws.com/56e93a94570d8e976ded439a2c17ff6ee370bd0b9adb9b7776e105b3f31ce880.jpeg',
        description: 'Aprenda a lucrar com indicações na maior exchange do mundo. Este curso completo vai te ensinar todas as estratégias necessárias para maximizar seus ganhos com o programa de referência da Binance.',
        category: 'Investimentos'
    },
    'liberdade-do-tabaco': {
        id: 2,
        title: 'Liberdade do Tabaco',
        slug: 'liberdade-do-tabaco',
        price: 67.00,
        src: 'https://conteudointimo.s3.amazonaws.com/01ff0ed71c22eee1c1537969077735553124fde9b40531ca4272b5f3f96e69c9.png',
        description: 'Método comprovado para abandonar o cigarro definitivamente. Um guia passo a passo para conquistar sua liberdade do tabaco e recuperar sua saúde.',
        category: 'Saúde'
    }
    // Adicione outros produtos aqui
};

// @ts-ignore
const product = products[params.slug];

if (!product) {
    throw error(404, 'Produto não encontrado');
}

return {
    product
};
}

