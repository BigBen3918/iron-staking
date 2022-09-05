import { ethers } from 'ethers';
import { Contract, Provider, setMulticallAddress } from 'ethers-multicall';

import Abis from './contracts/abis.json';
import Addresses from './contracts/addresses.json';
import { provider, supportChainId } from './providers';

// const multicallAddress = process.env.MULTIADDRESS || "0x402C435EA85DFdA24181141De1DE66bad67Cdf12"; // 4002 multiaddress
setMulticallAddress(4002, '0x402C435EA85DFdA24181141De1DE66bad67Cdf12');
const multicallProvider = new Provider(provider, supportChainId);

// make contract objects
const MasterChefV2 = new ethers.Contract(Addresses.MasterChefV2, Abis.MasterChefV2, provider);
const MasterChefV2_m = new Contract(Addresses.MasterChefV2, Abis.MasterChefV2);

const useERC20 = (address: string) => {
  return new ethers.Contract(address, Abis.ERC20, provider);
};

const useMasterChefV2 = (address: string) => {
  return new ethers.Contract(address, Abis.MasterChefV2, provider);
};

const useMasterChefV2_m = (address: string) => {
  return new Contract(address, Abis.MasterChefV2);
};

export {
  provider,
  multicallProvider,
  MasterChefV2,
  MasterChefV2_m,
  useERC20,
  useMasterChefV2,
  useMasterChefV2_m,
};
