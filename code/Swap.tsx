import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosClient, AptosAccount, TokenClient } from '@aptos-labs/aptos-sdk';

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');

const Swap: React.FC = () => {
  const { connect, disconnect, account } = useWallet();
  const [amount, setAmount] = useState<string>('');
  const [fromToken, setFromToken] = useState<string>('');
  const [toToken, setToToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSwap = async () => {
    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      setLoading(true);
      const tokenClient = new TokenClient(client);

      // Swap logic
      // 1. Check balances
      const fromBalance = await tokenClient.getAccountBalance(account.address, fromToken);
      if (Number(fromBalance) < Number(amount)) {
        alert('Insufficient balance.');
        return;
      }

      // 2. Execute swap (assuming there's a smart contract for swapping)
      // This part should call the appropriate swap function in the smart contract
      // Example:
      // const txn = await tokenClient.swapTokens(account, fromToken, toToken, amount);

      alert('Swap successful!');
    } catch (error) {
      console.error(error);
      alert('Swap failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={connect}>Connect Wallet</button>
      <button onClick={disconnect}>Disconnect Wallet</button>
      <br />
      <input
        type="text"
        placeholder="From Token"
        value={fromToken}
        onChange={(e) => setFromToken(e.target.value)}
      />
      <input
        type="text"
        placeholder="To Token"
        value={toToken}
        onChange={(e) => setToToken(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSwap} disabled={loading}>
        {loading ? 'Swapping...' : 'Swap'}
      </button>
    </div>
  );
};

export default Swap;
