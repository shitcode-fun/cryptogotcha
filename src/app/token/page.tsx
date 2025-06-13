"use client";

import { useAccount, useReadContract, useReadContracts } from 'wagmi';
import { formatUnits } from 'ethers';
import TokenABI from '@/abis/Token.json';

const TOKEN_ADDRESS = '0x7effc7be6b591801e16f6b5dc29f08296a2b9dbe';

export default function TokenPage() {
  const { address, isConnected } = useAccount();

  const {
    data: contractData,
    isError: isErrorContract,
    isLoading: isLoadingContract,
  } = useReadContracts({
    contracts: [
      { address: TOKEN_ADDRESS, abi: TokenABI, functionName: 'name' },
      { address: TOKEN_ADDRESS, abi: TokenABI, functionName: 'symbol' },
      { address: TOKEN_ADDRESS, abi: TokenABI, functionName: 'decimals' },
      { address: TOKEN_ADDRESS, abi: TokenABI, functionName: 'totalSupply' },
    ],
  });

  const name = contractData?.[0] as string;
  const symbol = contractData?.[1] as string;
  const decimals = contractData?.[2] as number;
  const rawTotalSupply = contractData?.[3] as bigint;
  const totalSupply = rawTotalSupply ? formatUnits(rawTotalSupply, decimals) : undefined;

  const {
    data: balanceData,
    isError: isErrorBalance,
    isLoading: isLoadingBalance,
  } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: isConnected,
  });

  const rawBalance = balanceData as bigint;
  const balance = rawBalance ? formatUnits(rawBalance, decimals) : undefined;

  if (isLoadingContract) {
    return <div>Loading token data...</div>;
  }

  if (isErrorContract) {
    return <div>Error loading token data.</div>;
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Token Information</h1>
      <p>
        <span className="font-semibold">Name:</span> {name}
      </p>
      <p>
        <span className="font-semibold">Symbol:</span> {symbol}
      </p>
      <p>
        <span className="font-semibold">Total Supply:</span> {totalSupply}
      </p>
      {isConnected && (
        isLoadingBalance ? (
          <p>Loading your balance...</p>
        ) : isErrorBalance ? (
          <p>Error loading your balance.</p>
        ) : (
          <p>
            <span className="font-semibold">Your Balance:</span> {balance} {symbol}
          </p>
        )
      )}
      {!isConnected && <p>Connect your wallet to view your balance.</p>}
    </div>
  );
}