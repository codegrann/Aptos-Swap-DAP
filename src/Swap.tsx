import React, { useState } from 'react';
import { AptosClient, Account, AptosConfig, Network } from '@aptos-labs/ts-sdk';

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptos = new AptosClient(aptosConfig);

const Swap: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromToken, setFromToken] = useState<string>('');
  const [toToken, setToToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSwap = async () => {
    try {
      setLoading(true);
      // Example of creating an account and funding it
      const alice = Account.generate();
      await aptos.fundAccount({ accountAddress: alice.accountAddress, amount: 100000000 });

      // Example of transferring APT coin
      const bobAddress = '0xb0b';
      const transaction = await aptos.transaction.build.simple({
        sender: alice.accountAddress,
        data: {
          function: '0x1::aptos_account::transfer_coins',
          typeArguments: ['0x1::aptos_coin::AptosCoin'],
          functionArguments: [bobAddress, 100],
        },
      });
      const pendingTransaction = await aptos.signAndSubmitTransaction({ signer: alice, transaction });

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
