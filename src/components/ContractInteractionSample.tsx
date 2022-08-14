import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useContract } from '@/hooks/useContract';
import { SampleContract } from '@/types/SampleContract';

// Contract address deployed to Mumbai network
const SAMPLE_CONTRACT_ADDRESS = '0xF671Fa0653CaF290D4Ac66eb5D144D9c84Ea3FDE';

const ContractInteractionSample = () => {
  const [data, setData] = useState<{
    name: string;
    owner: string;
    count: BigNumber;
  }>({
    name: '',
    owner: '',
    count: BigNumber.from(0)
  });
  const [isLoading, setIsLoading] = useState(true);

  const { account, provider, chainId } = useWeb3React();
  const contract = useContract<SampleContract>(
    SAMPLE_CONTRACT_ADDRESS,
    ABI,
    true
  );

  useEffect(() => {
    const load = async () => {
      if (!contract || !account) return;

      setIsLoading(true);

      try {
        const name = await contract.name();
        const owner = await contract.owner();
        const count = await contract.getCount();
        setData({ name, owner, count });
      } catch (e) {
        console.error('Failed to fetch data from contract : ', e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [contract, account, chainId]);

  const increment = async () => {
    if (!contract || !provider) return;
    setIsLoading(true);

    try {
      const tx = await contract.increment();
      await provider.waitForTransaction(tx.hash);

      const count = await contract.getCount();
      setData(prev => ({ ...prev, count }));
    } catch (e) {
      console.error('Failed to call `increment` function : ', e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !data) return <div>Loading ...</div>;

  if (chainId && chainId !== 80001)
    return <p style={{ color: 'red' }}>Switch to Mumbai network</p>;

  return (
    <>
      {!data && <p>No Data</p>}
      {data && (
        <div>
          <p>Contract name: {data.name}</p>
          <p>Contract owner: {data.owner}</p>
          <p>
            Count: {data.count.toNumber()}
            <button
              onClick={increment}
              disabled={isLoading || !account}
              style={{ marginLeft: 20 }}>
              +
            </button>
          </p>
        </div>
      )}
    </>
  );
};

const ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'getCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'increment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

export default ContractInteractionSample;
