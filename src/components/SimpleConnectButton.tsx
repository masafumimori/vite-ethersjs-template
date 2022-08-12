import { useState } from 'react';
import { hooks, metaMask } from '@/connectors/metamask';

const { useIsActive } = hooks;

const SimpleConnectButton = () => {
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  const isActive = useIsActive();

  const connect = async () => {
    setError('');
    setIsPending(true);
    try {
      await metaMask.activate();
    } catch (e) {
      setError('Something went wrong. Please try again');
    } finally {
      setIsPending(false);
    }
  };

  const disconnect = async () => {
    setError('');
    setIsPending(true);
    try {
      if (metaMask?.deactivate) {
        await metaMask.deactivate();
      } else {
        await metaMask.resetState();
      }
    } catch (e) {
      setError('Something went wrong. Please try again');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      {!isActive ? (
        <button onClick={connect} disabled={isPending}>
          Connect to MetaMask
        </button>
      ) : (
        <button onClick={disconnect} disabled={isPending}>
          Disconnect
        </button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default SimpleConnectButton;
