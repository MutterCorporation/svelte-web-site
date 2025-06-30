<!-- Página da Solução: Gateway de Pagamentos -->
<script>
// @ts-nocheck

  import SolutionTemplate from '../../../components/SolutionTemplate.svelte';
  import { t, tget } from '../../../lib/i18n/texts.js';
</script>

<SolutionTemplate
  title={t('SOLUTIONS.PAYMENT_GATEWAY.TITLE')}
  subtitle={t('SOLUTIONS.PAYMENT_GATEWAY.SUBTITLE')}
  description={t('SOLUTIONS.PAYMENT_GATEWAY.DESCRIPTION')}
  features={tget('SOLUTIONS.PAYMENT_GATEWAY.FEATURES')}
  icon="💳"
  gradient="from-emerald-600 to-cyan-600"
/> 