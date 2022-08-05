import { useCallback, useState } from 'react';
import { MetaMask } from '@web3-react/metamask';
import type { Web3ReactHooks } from '@web3-react/core';
import { CHAINS, getAddChainParameters } from '@/utils/chains';

type ChainSelectProps = {
  chainId: number;
  switchChain: (desiredChainId: number) => void | undefined;
  chainIds: number[];
};

const ChainSelect = ({ chainId, switchChain, chainIds }: ChainSelectProps) => {
  return (
    <select
      value={chainId}
      onChange={event => {
        switchChain?.(Number(event.target.value));
      }}
      disabled={switchChain === undefined}>
      {chainIds.map(chainId => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  );
};

type ConnectWithSelectProps = {
  connector: MetaMask;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
};

const ConnectWithSelect = ({
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError
}: ConnectWithSelectProps) => {
  const chainIds = Object.keys(CHAINS).map(chainId => Number(chainId));

  const [desiredChainId, setDesiredChainId] = useState<number>(-1);

  const switchChain = useCallback(
    (desiredChainId: number): void => {
      setDesiredChainId(desiredChainId);
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) {
        setError(undefined);
        return;
      }

      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) {
        setError(undefined);
        return;
      }

      if (connector instanceof MetaMask) {
        connector
          .activate(
            desiredChainId === -1
              ? undefined
              : getAddChainParameters(desiredChainId)
          )
          .then(() => setError(undefined))
          .catch(setError);
      } else {
        setError(new Error('Invalid connector'));
      }
    },
    [connector, chainId, setError]
  );

  const onClick = useCallback((): void => {
    setError(undefined);
    if (connector instanceof MetaMask) {
      connector
        .activate(
          desiredChainId === -1
            ? undefined
            : getAddChainParameters(desiredChainId)
        )
        .then(() => setError(undefined))
        .catch(setError);
    } else {
      setError(new Error('Invalid connector'));
    }
  }, [connector, desiredChainId, setError]);

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          <ChainSelect
            chainId={desiredChainId}
            switchChain={switchChain}
            chainIds={chainIds}
          />
        }
        <div style={{ marginBottom: '1rem' }} />
        <button onClick={onClick}>Try Again?</button>
      </div>
    );
  } else if (isActive) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          <ChainSelect
            chainId={
              desiredChainId < 0
                ? desiredChainId
                : chainId !== undefined
                ? chainId
                : desiredChainId
            }
            switchChain={switchChain}
            chainIds={chainIds}
          />
        }
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={() => {
            if (connector?.deactivate) {
              void connector.deactivate();
            } else {
              void connector.resetState();
            }
          }}>
          Disconnect
        </button>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          <ChainSelect
            chainId={desiredChainId}
            switchChain={isActivating ? switchChain : switchChain}
            chainIds={chainIds}
          />
        }
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={
            isActivating
              ? undefined
              : () =>
                  connector
                    .activate(
                      desiredChainId === -1
                        ? undefined
                        : getAddChainParameters(desiredChainId)
                    )
                    .then(() => setError(undefined))
                    .catch(setError)
          }
          disabled={isActivating}>
          Connect
        </button>
      </div>
    );
  }
};

export default ConnectWithSelect;
