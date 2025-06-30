<!-- Página da Solução: Automação de Marketing -->
<script>
// @ts-nocheck

  import SolutionTemplate from '../../../components/SolutionTemplate.svelte';
  import { t, tget } from '../../../lib/i18n/texts.js';
</script>

<SolutionTemplate
  title={t('SOLUTIONS.MARKETING_AUTOMATION.TITLE')}
  subtitle={t('SOLUTIONS.MARKETING_AUTOMATION.SUBTITLE')}
  description={t('SOLUTIONS.MARKETING_AUTOMATION.DESCRIPTION')}
  features={tget('SOLUTIONS.MARKETING_AUTOMATION.FEATURES')}
  icon="📈"
  gradient="from-indigo-600 to-purple-600"
/> 