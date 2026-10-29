import { PlanPage } from '../components/PlanPage';
import { plan1 } from '../data/plan-1';
import { LangProvider } from '../i18n';

export default function Plan1() {
  return (
    <LangProvider>
      <PlanPage data={plan1} />
    </LangProvider>
  );
}
