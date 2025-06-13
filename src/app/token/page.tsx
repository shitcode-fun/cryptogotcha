"use client";

import { useState, useEffect, type FormEvent } from 'react';
import { useAccount, useReadContract, useReadContracts, useWriteContract } from 'wagmi';
import { formatUnits, parseUnits } from 'ethers';
import TokenABI from '@/abis/Token.json';
import { useToast } from '@/components/ToastProvider';
import { Skeleton } from '@/components/Skeleton';

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

  const name = contractData?.[0]?.result as string;
  const symbol = contractData?.[1]?.result as string;
  const decimals = contractData?.[2]?.result as number;
  const rawTotalSupply = contractData?.[3]?.result as bigint;
  const totalSupply = rawTotalSupply ? formatUnits(rawTotalSupply, decimals) : undefined;

  const {
    data: balanceData,
    isError: isErrorBalance,
    isLoading: isLoadingBalance,
    refetch: refetchBalance,
  } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: { enabled: isConnected },
  });

  const rawBalance = balanceData as bigint;
  const balance = rawBalance ? formatUnits(rawBalance, decimals) : undefined;

  const [approveSpender, setApproveSpender] = useState('');
  const [approveAmount, setApproveAmount] = useState('');
  const [transferRecipient, setTransferRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  const {
    writeContract: approveWrite,
    isPending: isApproveLoading,
    isSuccess: isApproveSuccess,
    error: approveError,
  } = useWriteContract();

  const {
    writeContract: transferWrite,
    isPending: isTransferLoading,
    isSuccess: isTransferSuccess,
    error: transferError,
  } = useWriteContract();

  const handleApprove = (e: FormEvent) => {
    e.preventDefault();
    approveWrite({
      address: TOKEN_ADDRESS,
      abi: TokenABI,
      functionName: 'approve',
      args: [approveSpender as `0x${string}`, parseUnits(approveAmount, decimals)],
    });
  };

  const handleTransfer = (e: FormEvent) => {
    e.preventDefault();
    transferWrite({
      address: TOKEN_ADDRESS,
      abi: TokenABI,
      functionName: 'transfer',
      args: [transferRecipient as `0x${string}`, parseUnits(transferAmount, decimals)],
    });
  };

  const toast = useToast();

  useEffect(() => {
    if (isTransferSuccess) {
      refetchBalance();
      setTransferRecipient('');
      setTransferAmount('');
      toast('Transfer successful!', 'success');
    }
  }, [isTransferSuccess, refetchBalance, toast]);

  useEffect(() => {
    if (isApproveSuccess) {
      setApproveSpender('');
      setApproveAmount('');
      toast('Approval successful!', 'success');
    }
  }, [isApproveSuccess, toast]);

  useEffect(() => {
    if (approveError) {
      toast(approveError.message, 'error');
    }
  }, [approveError, toast]);

  useEffect(() => {
    if (transferError) {
      toast(transferError.message, 'error');
    }
  }, [transferError, toast]);

  if (isLoadingContract) {
    return (
      <div className="max-w-md mx-auto space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-2/3" />
      </div>
    );
  }

  if (isErrorContract) {
    return (
      <div className="text-center text-red-600">
        <p>Failed to load token data.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        >
          Retry
        </button>
      </div>
    );
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
        <>
          {isLoadingBalance ? (
            <Skeleton className="h-4 w-1/2" />
          ) : isErrorBalance ? (
            <p className="text-red-600">Error loading your balance.</p>
          ) : (
            <p>
              <span className="font-semibold">Your Balance:</span> {balance} {symbol}
            </p>
          )}
        </>
      )}
      {!isConnected && <p>Connect your wallet to view your balance.</p>}
      {isConnected && (
        <>
          <form onSubmit={handleApprove} className="space-y-2 border-t pt-4">
            <h2 className="text-xl font-semibold">Approve Tokens</h2>
            <input
              type="text"
              placeholder="Spender Address"
              value={approveSpender}
              onChange={(e) => setApproveSpender(e.target.value)}
            className="w-full px-2 py-1 border rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors"
            />
            <input
              type="text"
              placeholder={`Amount (${symbol})`}
              value={approveAmount}
              onChange={(e) => setApproveAmount(e.target.value)}
              className="w-full px-2 py-1 border rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors"
            />
            <button
              type="submit"
              disabled={isApproveLoading}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 transition-colors"
            >
              {isApproveLoading ? 'Approving...' : 'Approve'}
            </button>
          </form>
          <form onSubmit={handleTransfer} className="space-y-2 border-t pt-4">
            <h2 className="text-xl font-semibold">Transfer Tokens</h2>
            <input
              type="text"
              placeholder="Recipient Address"
              value={transferRecipient}
              onChange={(e) => setTransferRecipient(e.target.value)}
            className="w-full px-2 py-1 border rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors"
            />
            <input
              type="text"
              placeholder={`Amount (${symbol})`}
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="w-full px-2 py-1 border rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors"
            />
            <button
              type="submit"
              disabled={isTransferLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors"
            >
              {isTransferLoading ? 'Transferring...' : 'Transfer'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}