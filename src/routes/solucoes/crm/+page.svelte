<!-- Página da Solução: CRM Empresarial -->
<script>
// @ts-nocheck

  import SolutionTemplate from '../../../components/SolutionTemplate.svelte';
  import { t, tget } from '../../../lib/i18n/texts.js';
</script>

<SolutionTemplate
  title={t('SOLUTIONS.CRM.TITLE')}
  subtitle={t('SOLUTIONS.CRM.SUBTITLE')}
  description={t('SOLUTIONS.CRM.DESCRIPTION')}
  features={tget('SOLUTIONS.CRM.FEATURES')}
  icon="📊"
  gradient="from-orange-600 to-red-600"
/> 