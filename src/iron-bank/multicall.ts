import { FunctionFragment, Interface } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';

const MulticallAbi = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct Multicall.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
      { internalType: 'bytes[]', name: 'returnData', type: 'bytes[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'blockNumber', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ internalType: 'bytes32', name: 'blockHash', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ internalType: 'address', name: 'coinbase', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ internalType: 'uint256', name: 'difficulty', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ internalType: 'uint256', name: 'gaslimit', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ internalType: 'uint256', name: 'timestamp', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ internalType: 'bytes32', name: 'blockHash', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export type Call = {
  contract?: Contract;
  method?: string;
  target?: string;
  signature?: string;
  params?: any[];
};

const encodeCallData = (call: Call) => {
  const iface = call.contract
    ? call.contract.interface
    : new Interface([`function ${call.signature}`]);
  const method = call.method || FunctionFragment.fromString(call.signature).name;
  const callData = iface.encodeFunctionData(method, call.params || []);
  return callData;
};

const decodeReturnData = (call: Call, data: any) => {
  const iface = call.contract
    ? call.contract.interface
    : new Interface([`function ${call.signature}`]);
  const method = call.method || FunctionFragment.fromString(call.signature).name;
  try {
    const result = iface.decodeFunctionResult(method, data);
    return result as any[];
  } catch (e) {
    console.warn('Can not decode result of call', {
      address: call.target || call.contract?.address,
      method: call.signature || call.method,
    });

    return [];
  }
};

const multicallInterface = new Interface(MulticallAbi);

export const multicall = async (
  provider: JsonRpcProvider,
  multicallAddress: string,
  calls: Call[],
) => {
  if (!calls || !calls.length) {
    return [];
  }
  const callData = calls.map((call) => {
    return [call.target || call.contract?.address, encodeCallData(call)];
  });
  const aggregateData = multicallInterface.encodeFunctionData('aggregate', [callData]);

  const response = await provider.send('eth_call', [
    {
      to: multicallAddress,
      data: aggregateData,
    },
    'latest',
  ]);
  const { returnData } = multicallInterface.decodeFunctionResult('aggregate', response);

  return calls.map((call, index) => {
    return decodeReturnData(call, returnData[index]);
  });
};
