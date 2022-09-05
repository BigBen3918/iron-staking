import { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from 'use-wallet';
import { toBigNum, fromBigNum } from '../../utils';
import {
  provider,
  multicallProvider,
  MasterChefV2,
  MasterChefV2_m,
  useERC20,
  useMasterChefV2,
} from '../../contract';

// create context
const BlockchainContext = createContext<any>({});

function reducer(state: any, { type, payload }: { type: any; payload: any }) {
  return {
    ...state,
    [type]: payload,
  };
}

const INIT_STATE: {
  balance: string | number;
  signer: any;
  provider: any;
} = {
  balance: 0,
  signer: null,
  provider: null,
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
          type: 'signer',
          payload: signer,
        });
        dispatch({
          type: 'provider',
          payload: provider,
        });
      } else {
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
  const approveERC20 = async (address: string, to: string, value: string | number) => {
    if (!state.signer) throw new Error("Wallet isn't connected!");
    const tokenContract = useERC20(address).connect(state.signer);
    const tx = await tokenContract.approve(to, toBigNum(value, 18));
    return tx;
  };
  /**
   * deposit token to masterchef contract
   * @param {Number} id
   * @param {String|Number} value
   * @returns {tx}
   */
  const deposit = async (address: string, id: number, value: string | number) => {
    if (!state.signer) throw new Error("Wallet isn't connected!");
    const tx = await useMasterChefV2(address)
      .connect(state.signer)
      .deposit(String(id), toBigNum(value, 18));
    return tx;
  };
  /**
   * withdraw from masterchef contract
   * @param {Number} id
   * @param {String|Number} value
   * @returns {tx}
   */
  const withdraw = async (address: string, id: number, value: string | number) => {
    if (!state.signer) throw new Error("Wallet isn't connected!");
    const tx = await useMasterChefV2(address)
      .connect(state.signer)
      .deposit(String(id), toBigNum(value, 18));
    return tx;
  };

  /*--------- view functions --------- */
  const checkERC20Balance = async (address: string) => {
    if (!state.signer) throw new Error("Wallet isn't connected!");
    const tokenContract = useERC20(address).connect(state.signer);

    const balance = await tokenContract.balanceOf(wallet.account);
    return balance;
  };
  const checkUserInfo = async (address: string, id: number, value: string | number) => {
    if (!state.signer) throw new Error("Wallet isn't connected!");
    const UserInfo = await useMasterChefV2(address)
      .connect(state.signer)
      .userInfo(String(id), wallet.account);
    return UserInfo;
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
            checkERC20Balance,
            checkUserInfo,
          },
        ],
        [state],
      )}
    >
      {children}
    </BlockchainContext.Provider>
  );
}
