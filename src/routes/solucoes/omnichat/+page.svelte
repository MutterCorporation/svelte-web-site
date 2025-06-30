<!-- Página da Solução: Omnichat Whitelabel -->
<script>
// @ts-nocheck

  import SolutionTemplate from '../../../components/SolutionTemplate.svelte';
  import { t, tget } from '../../../lib/i18n/texts.js';
</script>

<SolutionTemplate
  title={t('SOLUTIONS.OMNICHAT.TITLE')}
  subtitle={t('SOLUTIONS.OMNICHAT.SUBTITLE')}
  description={t('SOLUTIONS.OMNICHAT.DESCRIPTION')}
  features={tget('SOLUTIONS.OMNICHAT.FEATURES')}
  icon="💬"
  gradient="from-green-600 to-teal-600"
/> 