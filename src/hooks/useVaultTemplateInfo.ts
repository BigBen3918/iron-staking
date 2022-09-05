import { useMemo } from 'react';
import { useGetVaultTemplate } from 'src/api/backend-api';
import { VaultConfig } from 'src/iron-bank/config';
import logoIron from 'src/assets/img/IRON-logo.png';
import logoQuickswap from 'src/assets/img/QUICKSWAP_LOGO.png';

const useVaultTemplateInfo = (template: VaultConfig) => {
  const info = useGetVaultTemplate(template?.id);
  const apy = useMemo(() => {
    if (!info?.apr) {
      return;
    }
    const numberOfCompoundingPerYear = 365; // daily compound
    const apr = parseFloat(info?.apr + '') / 100;
    const apy =
      100 * (Math.pow(1 + apr / numberOfCompoundingPerYear, numberOfCompoundingPerYear) - 1);
    return apy.toFixed(0);
  }, [info?.apr]);

  const dailyApr = useMemo(() => {
    if (!info?.dailyApr) {
      return;
    }
    return parseFloat(info?.dailyApr).toFixed(2);
  }, [info?.dailyApr]);

  const platformName = useMemo(() => {
    switch (template?.platform) {
      case 'iron':
        return 'IRON Finance';
      case 'quickswap':
        return 'Quickswap';
    }
  }, [template?.platform]);

  const platformLogo = useMemo(() => {
    switch (template?.platform) {
      case 'iron':
        return logoIron;
      case 'quickswap':
        return logoQuickswap;
    }
  }, [template?.platform]);

  return {
    apy,
    dailyApr,
    platformName,
    platformLogo,
  };
};

export default useVaultTemplateInfo;
