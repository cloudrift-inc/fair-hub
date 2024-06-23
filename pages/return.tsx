import { useRouter } from 'next/router';
import {FAIR_API_VERSION, getFairProviderPubApiKey, getFairApiUrl} from "@/lib/faircompute";
import React, { useEffect, useState, useCallback } from 'react';
import "../app/globals.css";

const Return: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const createStripeTransaction = useCallback(async (sessionId: string, amount: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No auth token found');
    }
    const apiUrl = getFairApiUrl();
    console.log(sessionId);

    try {
      const response = await fetch(`${apiUrl}/api/v1/users/transactions/create/stripe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': getFairProviderPubApiKey(),
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          version: FAIR_API_VERSION,
          data: {
            amount: amount,
            stripe_transaction_id: sessionId,
          },
        }),
      });

      if (response.status === 200) {
        console.log('Stripe transaction created:', await response.text());
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          router.push('/console');
        }, 3000);
      } else {
        setError('Something went wrong. Please contact support.');
        setLoading(false);
        throw new Error(`API request failed with status ${response.status}`);
      }
    } catch (error: any) {
      console.error('Error creating Stripe transaction:', error);
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const { session_id: sessionId } = router.query;

    if (sessionId) {
      fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
          setAmount(data.amount);
          if (data.status === 'complete') {
            createStripeTransaction(sessionId as string, data.amount);
          }
        })
        .catch((error) => {
          console.error('Error fetching session data:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [router.query, createStripeTransaction]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-gradient">
      <div className="text-center">
        {loading && <div className="loader">Loading...</div>}
        {success && !loading && <div className="success">Transaction successful! Redirecting to console...</div>}

        {error && !loading && <div className="error">Something went wrong. Please contact support.</div>}
      </div>
    </div>
  );
};

export default Return;
