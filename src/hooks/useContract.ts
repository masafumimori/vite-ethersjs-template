import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract, ContractInterface } from 'ethers';
import { getContract } from '@/utils/getContract';

export function useContract<T extends Contract = Contract>(
  contractAddress: string,
  ABI: ContractInterface,
  withSignerIfPossible = true
): T | null {
  const { provider: provider, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!contractAddress || !ABI || !chainId || !provider) return null;

    try {
      return getContract(
        contractAddress,
        ABI,
        provider,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [
    contractAddress,
    ABI,
    provider,
    chainId,
    withSignerIfPossible,
    account
  ]) as T;
}
