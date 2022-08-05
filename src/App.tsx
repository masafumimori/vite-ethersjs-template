import MetaMaskCard from './components/MetaMaskCard';

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
      <MetaMaskCard />
    </div>
  );
};

export default App;
