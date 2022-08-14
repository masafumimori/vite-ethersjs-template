import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
import { ContractInterface } from 'ethers';
import { isAddress } from 'ethers/lib/utils';

export const getContract = (
  address: string,
  ABI: ContractInterface,
  library: JsonRpcProvider,
  account?: string
): Contract => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
};

// account is optional
const getProviderOrSigner = (
  library: JsonRpcProvider,
  account?: string
): JsonRpcProvider | JsonRpcSigner => {
  return account ? getSigner(library, account) : library;
};

// account is not optional
const getSigner = (
  library: JsonRpcProvider,
  account: string
): JsonRpcSigner => {
  return library.getSigner(account);
};
