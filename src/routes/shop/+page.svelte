<script>
  import CardProduct from '../../components/CardProduct.svelte';
  import Carousell from '../../components/Carousell.svelte';
  import { Footer, FooterCopyright, FooterLinkGroup, FooterBrand, FooterLink } from 'flowbite-svelte'
 let images = [
  {
    alt: "Binance Refer",
    src: "https://conteudointimo.s3.amazonaws.com/56e93a94570d8e976ded439a2c17ff6ee370bd0b9adb9b7776e105b3f31ce880.jpeg",
    title: "Binance Refer"
  },
  {
    alt: "Liberdade do Tabaco: Pare de Fumar e Reconquistar sua Saúde",
    src: "https://conteudointimo.s3.amazonaws.com/01ff0ed71c22eee1c1537969077735553124fde9b40531ca4272b5f3f96e69c9.png",
    title: "Liberdade do Tabaco: Pare de Fumar e Reconquistar sua Saúde"
  },
  {
    alt: "Método Renda com Cortes",
    src: "https://conteudointimo.s3.amazonaws.com/afab3c49f93e0550f8ef513dfaeb66ec5af6a37532dbad7963563154006fb86e.png",
    title: "Método Renda com Cortes"
  },
  {
    alt: "Ladrões de Cassinos",
    src: "https://conteudointimo.s3.amazonaws.com/4824a9039674ccb775a42922af392eeab4f95d46cf52e156998a91db71601f58.png",
    title: "Ladrões de Cassinos"
  },
  {
    alt: "Sinais Milionários",
    src: "https://conteudointimo.s3.amazonaws.com/0d025aa992861545cd0c8639967b18f40bcb7171e40ffd6ad9f7c47b2927340b.png",
    title: "Sinais Milionários"
  }

];


  let vCard = false;
</script>

<div class="space-y-4 px-4 md:px-8 lg:px-16">
  <!-- Carousel -->
  <div class="w-full mx-auto max-w-screen-xl">
    <Carousell />
  </div>

  <!-- Renderizando os CardProducts com o array de imagens -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
    {#each images as image}
      <CardProduct
        title={image.title}
        description={image.alt}
        picture={image.src}
        class="w-full"
      />
    {/each}
  </div>
  <script>
    import { Footer, FooterCopyright, FooterLinkGroup, FooterBrand, FooterLink } from 'flowbite-svelte';
  </script>
  
  <Footer footerType="logo">
    <div class="sm:flex sm:items-center sm:justify-between">
      <FooterBrand href="https://flowbite.com" src="/images/flowbite-svelte-icon-logo.svg" alt="Flowbite Logo" name="Flowbite" />
      <FooterLinkGroup ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
        <FooterLink href="/">About</FooterLink>
        <FooterLink href="/">Privacy Policy</FooterLink>
        <FooterLink href="/">Licensing</FooterLink>
        <FooterLink href="/">Contact</FooterLink>
      </FooterLinkGroup>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <FooterCopyright href="/" by="Flowbite™" />
  </Footer>
</div>
