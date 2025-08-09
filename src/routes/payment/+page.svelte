<script>
    let loading = false;
    let error = "";

    async function startPayment() {
        loading = true;
        error = "";
        const token = localStorage.getItem('authToken'); // substitua pelo método correto de obter o token

        try {
            const response = await fetch("https://dev.muttercorp.com.br/payments/checkout", {
                method: "POST", // normalmente checkout é POST, mas pode ser GET se sua API pedir
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}` // substitua pelo token real
                },
                body: JSON.stringify({
                    "tenantCode": "muttercorp",
                    "provider": "stripe",
                    "planId": "prod_STwcVSvuDQKIdR"
                    }
                )
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data?.checkoutUrl) {
                // redireciona para o checkout
                window.location.href = data.checkoutUrl;
            } else {
                throw new Error("Resposta inválida da API");
            }
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }
</script>

<main class="p-4">
    <h1>Pagamento</h1>

    <button on:click={startPayment} disabled={loading}>
        {loading ? "Processando..." : "Pagar agora"}
    </button>

    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
</main>
