import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import ConnectWithSelect from './ConnectWithSelect';
import { getName } from '@/utils/getName';
import { shortenAddress } from '@/utils/shortenAddress';

type CardProps = {
  connector: MetaMask;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
  accounts?: string[];
};

const Card = ({
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError,
  ENSNames,
  accounts
}: CardProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '20rem',
        padding: '1rem',
        margin: '1rem',
        overflow: 'auto',
        border: '1px solid',
        borderRadius: '1rem'
      }}>
      <b>{getName(connector)}</b>
      <div style={{ marginBottom: '1rem' }}>
        isActive ? {isActive ? '🟢' : '🔴'}
      </div>
      <div>ChainId: {chainId}</div>
      <div style={{ marginBottom: '1rem' }}>
        <p>
          {accounts && accounts.length > 0
            ? shortenAddress(accounts[0])
            : 'NONE'}
        </p>
        <p>ENS: {ENSNames && ENSNames[0] ? ENSNames[0] : 'NONE'}</p>
      </div>
      <ConnectWithSelect
        connector={connector}
        chainId={chainId}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default Card;
