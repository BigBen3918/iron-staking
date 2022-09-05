import { Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/abstract-provider';
import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import { BigNumber } from '@ethersproject/bignumber';
import { getDisplayNumber } from '../utils/formatBN';
import { multicall } from './multicall';

class ERC20 {
  private contract: Contract;

  address: string;
  symbol: string;
  decimals: number;

  constructor(address: string, provider: Signer | Provider, symbol: string, decimals = 18) {
    this.contract = new Contract(address, ABI, provider);
    this.address = address;
    this.symbol = symbol;
    this.decimals = decimals;
  }

  connect(signerOrProvider: Signer | Provider) {
    this.contract = new Contract(this.address, ABI, signerOrProvider);
  }

  totalSupply(): Promise<BigNumber> {
    return this.contract.totalSupply();
  }

  balanceOf(account: string): Promise<BigNumber> {
    return this.contract.balanceOf(account);
  }

  transfer(recipient: string, amount: BigNumber): Promise<TransactionResponse> {
    return this.contract.transfer(recipient, amount);
  }

  allowance(owner: string, spender: string): Promise<BigNumber> {
    return this.contract.allowance(owner, spender);
  }

  approve(spender: string, amount: BigNumber): Promise<TransactionResponse> {
    return this.contract.approve(spender, amount);
  }

  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumber,
  ): Promise<TransactionResponse> {
    return this.contract.transferFro(sender, recipient, amount);
  }

  async displayedBalanceOf(account: string): Promise<string> {
    const balance = await this.balanceOf(account);
    return formatUnits(balance, this.decimals);
  }

  async displayedTotalSupply(): Promise<string> {
    const supply = await this.totalSupply();
    return Number(formatUnits(supply, this.decimals)).toFixed(0);
  }

  getDisplayNumber(amount: BigNumber, fractionDigits = 3) {
    return getDisplayNumber(amount, this.decimals, fractionDigits);
  }

  static async multicallTokenBalance(
    provider: JsonRpcProvider,
    multicallAddress: string,
    tokens: string[],
    account: string,
  ) {
    const balances = (await multicall(
      provider,
      multicallAddress,
      tokens.map((token) => {
        return {
          target: token,
          signature: 'balanceOf(address user) view returns (uint256)',
          params: [account],
        };
      }),
    )) as BigNumber[][];

    return tokens.reduce((memo, token, index) => {
      return {
        ...memo,
        [token]: balances[index][0],
      };
    }, {} as Record<string, BigNumber>);
  }
}

export default ERC20;

const ABI = [
  {
    name: 'Approval',
    type: 'event',
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
