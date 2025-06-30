#!/bin/bash

echo "🔧 Corrigindo todos os event handlers para sintaxe Svelte 5..."

# Função para substituir eventos em um arquivo
fix_events() {
    local file="$1"
    echo "Corrigindo: $file"
    
    # Substituir on:click por onclick
    sed -i 's/on:click=/onclick=/g' "$file"
    
    # Substituir on:change por onchange
    sed -i 's/on:change=/onchange=/g' "$file"
    
    # Substituir on:keydown por onkeydown
    sed -i 's/on:keydown=/onkeydown=/g' "$file"
    
    # Substituir on:submit por onsubmit
    sed -i 's/on:submit=/onsubmit=/g' "$file"
    
    # Substituir on:input por oninput
    sed -i 's/on:input=/oninput=/g' "$file"
    
    # Substituir on:focus por onfocus
    sed -i 's/on:focus=/onfocus=/g' "$file"
    
    # Substituir on:blur por onblur
    sed -i 's/on:blur=/onblur=/g' "$file"
    
    # Substituir on:hover por onhover (se existir)
    sed -i 's/on:hover=/onhover=/g' "$file"
}

# Lista de arquivos críticos para corrigir
critical_files=(
    "src/components/ProductModal.svelte"
    "src/components/CartComponent.svelte"
    "src/components/Banner.svelte"
    "src/components/Toast.svelte"
    "src/components/SolutionTemplate.svelte"
    "src/routes/+page.svelte"
    "src/routes/tree/+page.svelte"
    "src/routes/shop/[slug]/+page.svelte"
    "src/routes/shop/login/+page.svelte"
    "src/routes/shop/cliente/+page.svelte"
    "src/routes/shop/admin/+page.svelte"
    "src/routes/login/+page.svelte"
    "src/routes/admin/blog/+page.svelte"
    "src/routes/admin/create-lead/+page.svelte"
)

# Corrigir arquivos críticos
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        fix_events "$file"
    else
        echo "❌ Arquivo não encontrado: $file"
    fi
done

echo "✅ Correção concluída!"
echo "🚀 Execute 'npm run dev' para testar as correções." 