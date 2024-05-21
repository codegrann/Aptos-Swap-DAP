import React from 'react';
import { WalletProvider } from '@aptos-labs/wallet-adapter-react';
import { AptosWalletAdapter } from '@aptos-labs/wallet-adapter-ant-design';
import Swap from './Swap';

const wallets = [new AptosWalletAdapter()];

const App: React.FC = () => {
  return (
    <WalletProvider wallets={wallets} autoConnect>
      <div>
        <h1>Aptos Token Swap dApp</h1>
        <Swap />
      </div>
    </WalletProvider>
  );
};

export default App;
