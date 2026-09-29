import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { clinicStatus } from '../utils/format';

export function useClinicStatus() {
  const { t } = useTranslation();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 60000);
    return () => clearInterval(id);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- tick forces a re-read of the clock
  return useMemo(() => clinicStatus(t), [t, tick]);
}
