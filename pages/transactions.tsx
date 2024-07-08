import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Layout from '../components/Layout';
import CreditsSection from '../components/CreditsSection';
import TransactionsTable from '../components/TransactionsTable';
import '../app/globals.css';
import { FAIR_API_VERSION, getFairProviderPubApiKey, getFairApiUrl } from "../lib/faircompute";

interface Transaction {
  created_at: string;
  amount: number;
  info: {
    Stripe: {
      checkout_session_id: string;
    };
  };
}

const fetchTransactions = async (token: string): Promise<Transaction[]> => {
  const apiUrl = getFairApiUrl();
  const response = await fetch(`${apiUrl}/api/v1/users/transactions/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": getFairProviderPubApiKey(),
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ version: FAIR_API_VERSION }),
  });

  if (!response.ok) {
    let errorMessage = `Failed to fetch transactions. Status code: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage += `, Error message: ${errorData.message}`;
      }
    } catch (error: any) {
      console.error("Failed to parse error response", error);
      errorMessage += `, Error parsing response: ${error.message}`;
    }
    throw new Error(errorMessage);
  }

  const responseData = await response.json();
  return responseData.data.transactions;
};

const BillingPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const mutation = useMutation<Transaction[], Error, string>({
    mutationFn: fetchTransactions,
    onSuccess: (data) => {
      console.log("Transactions fetched successfully:", data);
      setTransactions(data);
    },
    onError: (error) => {
      setError(error.message);
      console.error("Error fetching transactions:", error);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      mutation.mutate(token);
    } else {
      console.error("No auth token found");
      setError("Please Log In to access this page.");
    }
  }, []); 

  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      <Layout>
        <h1 className="mb-6 text-2xl font-medium text-white">Billing</h1>
        <CreditsSection />
        {transactions && <TransactionsTable transactions={transactions} />}
        {error && <div className="text-red-500">{error}</div>}
      </Layout>
    </div>
  );
};

export default BillingPage;
