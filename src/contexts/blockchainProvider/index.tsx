import { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from 'use-wallet';
import { BigNumber } from '@ethersproject/bignumber';
import { toBigNum, fromBigNum, AddNotification } from '../../utils';
import {
  provider,
  multicallProvider,
  useERC20,
  useERC20_m,
  useMasterChefV2,
  useMasterChefV2_m,
  usePairContract_m,
} from '../../contract';
import { Tokens } from 'src/farms';

// create context
const BlockchainContext = createContext<any>({});

function reducer(state: any, { type, payload }: { type: any; payload: any }) {
  // add tvls to state
  if (type == 'tvls') {
    return {
      ...state,
      tvls: {
        ...state['tvls'],
        ...payload,
      },
    };
  }
  return {
    ...state,
    [type]: payload,
  };
}

const INIT_STATE: any = {
  balance: 0,
  signer: null,
  provider: null,
  tvls: {},
};

// use contexts
export function useBlockchainContext() {
  return useContext(BlockchainContext);
}

export default function Provider({ children }: any) {
  const wallet = useWallet();
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // set signer
  useEffect(() => {
    (async () => {
      if (wallet.status === 'connected') {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = await provider.getSigner();
        dispatch({
          type: 'provider',
          payload: provider,
        });
        dispatch({
          type: 'account',
          payload: wallet.account,
        });
        dispatch({
          type: 'signer',
          payload: signer,
        });
      } else {
        if (wallet.status === 'error') {
          AddNotification(
            'Unsupported chain',
            'Please connect wallet to Fantom mainnet!',
            'danger',
          );
        }
        dispatch({
          type: 'signer',
          payload: null,
        });
      }
    })();
  }, [wallet.status]);

  /* ------- blockchain interaction functions ------- */
  /**
   * approve token to contract
   * @param {String} address
   * @param {String} to
   * @param {String} value
   * @returns {tx}
   */
  const approveERC20 = async (address: string, to: string, value: BigNumber) => {
    if (!state.signer) throw new Error("Wallet isn't connected!");
    const tokenContract = useERC20(address).connect(state.signer);
    const tx = await tokenContract.approve(to, value);
    return tx;
  };

  /**
   * deposit token to masterchef contract
   * @param {Number} id
   * @param {String|Number} value
   * @returns {tx}
   */
  const deposit = async (address: string, id: number, value: BigNumber) => {
    if (!state.signer) throw new Error("Wallet isn't connected!");
    const tx = await useMasterChefV2(address).connect(state.signer).deposit(String(id), value);
    return tx;
  };

  /**
   * withdraw from masterchef contract
   * @param {Number} id
   * @param {String|Number} value
   * @returns {tx}
   */
  const withdraw = async (address: string, id: number, value: BigNumber) => {
    if (!state.signer) throw new Error("Wallet isn't connected!");
    const tx = await useMasterChefV2(address).connect(state.signer).withdraw(String(id), value);
    return tx;
  };
  /*--------- view functions --------- */

  const checkPoolStatus = async (
    address: string,
    id: number | string,
    tokenAddress: string,
  ) => {
    // pool balance, poolInfo, total AllocPoint, lithPerBlock
    const poolBalanceCall = useERC20_m(tokenAddress).balanceOf(address);
    const poolInfoCall = useMasterChefV2_m(address).poolInfo(String(id));
    const totalAllocPointCall = useMasterChefV2_m(address).totalAllocPoint();
    const lithPerBlockCall = useMasterChefV2_m(address).lithPerBlock();
    const [poolBalance, poolInfo, totalAllocPoint, lithPerBlock] = await multicallProvider.all([
      poolBalanceCall,
      poolInfoCall,
      totalAllocPointCall,
      lithPerBlockCall,
    ]);
    return {
      poolBalance,
      poolInfo,
      totalAllocPoint,
      lithPerBlock,
    };
  };
  const checkUserStatus = async (
    address: string,
    id: number | string,
    tokenAddress: string,
  ) => {
    if (!state.signer) throw new Error("Wallet isn't connected!");
    // pool balance, poolInfo, total AllocPoint, lithPerBlock
    const poolBalanceCall = useERC20_m(tokenAddress).balanceOf(address);
    const poolInfoCall = useMasterChefV2_m(address).poolInfo(String(id));
    const totalAllocPointCall = useMasterChefV2_m(address).totalAllocPoint();
    const lithPerBlockCall = useMasterChefV2_m(address).lithPerBlock();

    // user balance, user pool info, pending reward, allowance
    const userBalanceCall = useERC20_m(tokenAddress).balanceOf(state.account);
    const userInfoCall = useMasterChefV2_m(address).userInfo(String(id), state.account);
    const pendingRewardCall = useMasterChefV2_m(address).pendingLith(String(id), state.account);
    const allowanceCall = useERC20_m(tokenAddress).allowance(state.account, address);

    const [
      poolBalance,
      poolInfo,
      totalAllocPoint,
      lithPerBlock,
      userBalance,
      userInfo,
      pendingReward,
      allowance,
    ] = await multicallProvider.all([
      poolBalanceCall,
      poolInfoCall,
      totalAllocPointCall,
      lithPerBlockCall,
      userBalanceCall,
      userInfoCall,
      pendingRewardCall,
      allowanceCall,
    ]);
    return {
      poolBalance,
      poolInfo,
      totalAllocPoint,
      lithPerBlock,
      userBalance,
      userInfo,
      pendingReward,
      allowance,
    };
  };

  const checkLPPrice = async (address: string, prices: any) => {
    const pairContract = usePairContract_m(address);
    const token0Call = pairContract.token0();
    const token1Call = pairContract.token1();
    const reservesCall = pairContract.getReserves();
    const totalSupplyCall = pairContract.totalSupply();
    const [token0, token1, reserves, totalSupply] = await multicallProvider.all([
      token0Call,
      token1Call,
      reservesCall,
      totalSupplyCall,
    ]);

    const tokenPrices: any = {};
    for (const tokenName in prices) {
      tokenPrices[Tokens[tokenName?.toUpperCase()]] = prices[tokenName];
    }

    const lpPrice =
      (tokenPrices[token0] * fromBigNum(reserves[0], 18) +
        tokenPrices[token1] * fromBigNum(reserves[1], 18)) /
      fromBigNum(totalSupply, 18);

    return lpPrice;
  };

  return (
    <BlockchainContext.Provider
      value={useMemo(
        () => [
          state,
          {
            dispatch,
            approveERC20,
            deposit,
            withdraw,
            checkPoolStatus,
            checkUserStatus,
            checkLPPrice,
          },
        ],
        [state],
      )}
    >
      {children}
    </BlockchainContext.Provider>
  );
}
