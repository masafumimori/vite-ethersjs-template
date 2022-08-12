import MetaMaskCard from './components/MetaMaskCard';
import SimpleConnectButton from './components/SimpleConnectButton';

const App = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <h1 style={{ textAlign: 'center' }}>Vite and ethers.js sample</h1>
      <h2>MetaMask Card</h2>
      <MetaMaskCard />
      <h2>Simple Connect Button</h2>
      <SimpleConnectButton />
    </div>
  );
};

export default App;
