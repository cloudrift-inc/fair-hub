import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import Layout from '../components/Layout';
import CreditsSection from '../components/CreditsSection';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StripeTransactionTable from '../components/StripeTransactionTable';
import UsageTransactionTable from '../components/UsageTransactionTable';
import '../app/globals.css';
import { FAIR_API_VERSION, getFairProviderPubApiKey, getFairApiUrl } from "../lib/faircompute";

interface StripeTransaction {
  created_at: string;
  amount: number;
  info: {
    Stripe: {
      checkout_session_id: string;
    };
  };
}

interface UsageTransaction {
  created_at: string;
  amount: number;
  info: {
    Usage: {
      resource_id: string;
      usage_metadata: string;
    };
  };
}

type Transaction = StripeTransaction | UsageTransaction;

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
  const router = useRouter();
  const { type } = router.query;

  const [error, setError] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionType, setTransactionType] = useState<'stripe' | 'usage'>(
    (type as 'stripe' | 'usage') || 'stripe'
  );

  const mutation = useMutation<Transaction[], Error, string>({
    mutationFn: fetchTransactions,
    onSuccess: (data) => {
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

  useEffect(() => {
    if (type) {
      setTransactionType(type as 'stripe' | 'usage');
    }
  }, [type]);

  const handleTransactionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value as 'stripe' | 'usage';
    setTransactionType(selectedType);
    router.push({
      pathname: router.pathname,
      query: { type: selectedType },
    });
  };

  const stripeTransactions = transactions.filter((transaction): transaction is StripeTransaction => 'Stripe' in transaction.info);
  const usageTransactions = transactions.filter((transaction): transaction is UsageTransaction => 'Usage' in transaction.info);

  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      <Layout>
        <h1 className="mb-6 text-2xl font-medium text-white">Billing</h1>
        <CreditsSection />
        <div className="flex items-center mb-6">
          <h1 className="text-lg font-bold mr-4">Transaction Type:</h1>
          <div className="relative flex items-center bg-[#292929] text-white py-2 px-4 rounded-lg">
            <select
              id="transactionType"
              value={transactionType}
              onChange={handleTransactionTypeChange}
              className="bg-[#292929] text-white appearance-none pr-8"
            >
              <option value="stripe">Stripe</option>
              <option value="usage">Usage</option>
            </select>
            <ArrowDropDownIcon className="absolute right-2 pointer-events-none" />
          </div>
        </div>
        {transactionType === 'stripe'
          ? <StripeTransactionTable transactions={stripeTransactions} />
          : <UsageTransactionTable transactions={usageTransactions} />
        }
        {error && <div className="text-red-500">{error}</div>}
      </Layout>
    </div>
  );
};

export default BillingPage;
