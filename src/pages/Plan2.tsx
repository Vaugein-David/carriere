import { ProcedurePage } from '../components/ProcedurePage';
import { plan2 } from '../data/plan-2';
import { LangProvider } from '../i18n';

export default function Plan2() {
  return (
    <LangProvider>
      <ProcedurePage data={plan2} />
    </LangProvider>
  );
}
