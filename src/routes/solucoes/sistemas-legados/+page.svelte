<!-- Página da Solução: Manutenção de Sistemas Legados -->
<script>
// @ts-nocheck

  import SolutionTemplate from '../../../components/SolutionTemplate.svelte';
  import { t, tget } from '../../../lib/i18n/texts.js';
</script>

<SolutionTemplate
  title={t('SOLUTIONS.LEGACY_SYSTEMS.TITLE')}
  subtitle={t('SOLUTIONS.LEGACY_SYSTEMS.SUBTITLE')}
  description={t('SOLUTIONS.LEGACY_SYSTEMS.DESCRIPTION')}
  features={tget('SOLUTIONS.LEGACY_SYSTEMS.FEATURES')}
  icon="🔧"
  gradient="from-amber-600 to-orange-600"
/> 