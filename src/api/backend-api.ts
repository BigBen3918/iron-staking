import axios, { Method, ResponseType, AxiosRequestConfig } from 'axios';
import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';
import { usePolling } from 'src/hooks/usePolling';
import { zipWith } from 'src/utils/objects';
import { useConfiguration } from '../contexts/ConfigProvider/ConfigProvider';
import {
  Period,
  Measurement,
  MerketProof,
  SampleRate,
  VaultTvlInfo,
  BackendVaultInfo,
} from './models';

export type ApiRequestOption = {
  method: Method;
  body: any;
  responseType?: ResponseType;
  params?: any;
};

export type FarmPoolData = {
  masterChef: string;
  id: number;
  lpToken: string;
  token0: string;
  token1: string;
  tvl: string;
  lpStaked: BigNumber;
  apr: string;
  rewardPerBlock?: string;
};

export type VaultPoolData = {
  masterChef: string;
  id: number;
  lpToken: string;
  token0: string;
  token1: string;
  tvl: string;
  lpStaked: BigNumber;
  apr: string;
};

export type PartnerFarmPoolData = {
  id: number;
  partner: string;
  partnerPoolAddress: string;
  lpToken: string;
  token0: string;
  token1: string;
  rewardToken: string;
  allocPoint: string;
  tvl: string;
  lpTokenPrice: string;
  lpStaked: string;
  apr?: number;
  rewardPerBlock?: string;
};

export type FarmData = {
  total: number;
  pools: FarmPoolData[];
  partnerPools: PartnerFarmPoolData[];
};

export type VaultData = {
  total: number;
  pools: FarmPoolData[];
};

export type BigNumberJson = {
  hex: string;
  type: string;
};

export const useFetchFarmData = () => {
  const fetch = useFetch();
  return useCallback(async () => {
    const data = (await fetch({ url: 'farms' })) as FarmData;
    return data;
  }, [fetch]);
};

export const useFetchVaultData = () => {
  const fetch = useFetch();
  return useCallback(async () => {
    const data = (await fetch({ url: 'farms' })) as FarmData;
    return data;
  }, [fetch]);
};

export const useGetClaimProof = () => {
  const fetch = useFetch();
  return useCallback(
    async (address: string) => {
      if (!address || address === '') {
        return;
      }
      return await fetch<MerketProof>({
        url: 'compensation/claim',
        params: { address },
      });
    },
    [fetch],
  );
};

export const useGetStatistic = (
  measurement: Measurement,
  period: Period,
  sampleRate?: SampleRate,
) => {
  const fetch = useFetch();

  return useCallback(async () => {
    if (!measurement || !period) {
      return;
    }

    return await fetch<Array<[number, number]>>({
      url: 'statistics',
      params: { measurement, period, sampleRate },
    });
  }, [fetch, measurement, period, sampleRate]);
};

export const useTvlStatistic = (
  measurement: Measurement,
  period: Period,
  sampleRate?: SampleRate,
) => {
  const get = useGetStatistic(measurement, period, sampleRate);
  const [data, setData] = useState<Array<[number, number]>>();
  const getDefistation = useGetDefistationTvl();

  useEffect(() => {
    let mounted = true;
    Promise.all([get(), getDefistation()]).then(([ourData, defistationData]) => {
      if (!mounted) {
        return;
      }

      const first = ourData[0];
      // remove defistation after our data tracking start
      defistationData = first
        ? defistationData.filter((x) => x[0] < first[0])
        : defistationData;
      setData(defistationData.concat(ourData).sort((a, b) => a[0] - b[0]));
    });

    return () => (mounted = false);
  }, [get, getDefistation]);

  return data;
};

export const useGetDefistationTvl = () => {
  const fetchRaw = useFetchRaw();

  return useCallback(async () => {
    return await fetchRaw({
      url: 'https://api.defistation.io/chart/Iron%20Finance?days=30 ',
      headers: {
        Authorization: 'Basic OmMyNDVhNGEyLTYxZjgtMTFlYi1hZTkzLTAyNDJhYzEzMDAwMg==',
      },
    }).then((res) => {
      return Object.entries(res.result)
        .filter(([, value]) => value !== 0)
        .map(([key, value]) => [+key, value]) as [number, number][];
    });
  }, [fetchRaw]);
};

export const useGetRebalanceTransaction = () => {
  const fetch = useFetch();

  return useCallback(
    async (skip: number, take: number) => {
      return (await fetch({
        url: `history?source=treasury&eventName=BoughtBack&eventName=Recollateralized&skip=${skip}&take=${take}`,
      })) as Promise<any>;
    },
    [fetch],
  );
};

export const useGetTimelockTransaction = () => {
  const fetch = useFetch();

  return useCallback(
    async (skip: number, take: number) => {
      return (await fetch({
        url: `/timelock`,
        params: {
          skip,
          take,
        },
      })) as Promise<any>;
    },
    [fetch],
  );
};

export const useGetJobHistory = () => {
  const fetch = useFetch();

  return useCallback(
    async (skip: number, take: number) => {
      const oracles = ['iron_usdc', 'titan_matic'];
      return (await fetch({
        url: `jobs/history?` + oracles.map((t) => `oracles=${t}`).join('&'),
        params: {
          skip,
          take,
          tag: 'iron',
        },
      })) as Promise<any>;
    },
    [fetch],
  );
};

export const useGetHarvestLog = () => {
  const fetch = useFetch();

  return useCallback(
    async (skip: number, take: number) => {
      return (await fetch({
        url: '/vault/harvest',
        params: {
          skip,
          take,
          asset: 'iron',
        },
      })) as Promise<any>;
    },
    [fetch],
  );
};

export const useTotalValueLocked = () => {
  const fetch = useFetch();
  const [value, setValue] = useState<{
    diamond: number;
    iron: number;
    ironPolygon: number;
    total: number;
  }>();

  const reload = useCallback(async () => {
    const res = await fetch({
      url: '/statistics/tvl',
    });

    if (res) {
      setValue(res);
    }
  }, [fetch]);

  useEffect(() => {
    reload();
  }, [reload]);

  usePolling(reload, 10 * 60e3);

  return value;
};

export const useTokensInfo = (tokens: string[]) => {
  const fetch = useFetch();
  const [value, setValue] = useState<
    Record<
      string,
      {
        price: BigNumber;
        totalSupply: BigNumber;
        marketCap: BigNumber;
      }
    >
  >();

  const reload = useCallback(async () => {
    const res = await fetch<
      Array<{
        price: string;
        totalSupply: string;
        marketCap: string;
      }>
    >({
      url: '/token/info',
      method: 'post',
      data: {
        tokens,
      },
    });

    if (res) {
      setValue(
        zipWith(tokens, res, (x) => {
          return {
            price: BigNumber.from(x.price),
            totalSupply: BigNumber.from(x.totalSupply),
            marketCap: BigNumber.from(x.marketCap),
          };
        }),
      );
    }
  }, [fetch, tokens]);

  useEffect(() => {
    reload();
  }, [reload]);

  usePolling(reload, 10 * 60e3);

  return value;
};

export const useGetVaultInfos = (
  vaults: {
    address: string;
    templateId: number;
  }[],
) => {
  const fetch = useFetch();
  const [vaultInfos, setVaultInfos] = useState<VaultTvlInfo | undefined>(undefined);

  useEffect(() => {
    fetch({
      url: '/single-vault/all',
      method: 'post',
      data: {
        vaults,
      },
    }).then((data) => {
      setVaultInfos(data);
    });
  }, [fetch, vaults]);

  return vaultInfos;
};

export const useGetVaultTemplate = (templateId: number) => {
  const fetch = useFetch();
  const [templateInfo, setTemplateInfo] = useState<BackendVaultInfo | undefined>(undefined);

  useEffect(() => {
    fetch({
      url: `/single-vault/template?id=${templateId}`,
      method: 'get',
    }).then((data) => {
      setTemplateInfo(data);
    });
  }, [fetch, templateId]);

  return templateInfo;
};

export const useFetch = () => {
  const { backendUrl } = useConfiguration();
  const fetch = useCallback(
    async <T = any>(config: AxiosRequestConfig) => {
      if (!backendUrl) {
        return;
      }

      config.baseURL = backendUrl;
      config.responseType = 'json';
      config.params = {
        ...(config.params || {}),
        network: 'polygon',
      };
      return axios
        .request(config)
        .then((res) => res.data as T)
        .catch((e) => {
          if (e.response && e.response.status === 400) {
            return Promise.reject(e.response.data);
          }
          return Promise.reject(e.response || new Error('General error'));
        });
    },
    [backendUrl],
  );

  return fetch;
};

export const useFetchRaw = () => {
  const fetch = useCallback(async (config: AxiosRequestConfig) => {
    config.responseType = 'json';
    return axios
      .request(config)
      .then((res) => res.data)
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          return Promise.reject(e.response.data);
        }
        return Promise.reject(e.response || new Error('General error'));
      });
  }, []);

  return fetch;
};
