import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import "../app/globals.css";

const Return: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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
          setAmount(data.amount_total);
          setLoading(false);

          if (data.status === 'complete') {
            setTimeout(() => {
              router.push('/console');
            }, 3000);
          }
        })
        .catch((error) => {
          console.error('Error fetching session data:', error);
          setError('Something went wrong. Please contact support.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [router.query]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-gradient">
      <div className="text-center">
        {loading && <div className="loader">Loading...</div>}
        {status === 'complete' && !loading && (
          <div className="success">Transaction successful! Redirecting to console...</div>
        )}
        {error && !loading && <div className="error">Something went wrong. Please contact support.</div>}
      </div>
    </div>
  );
};

export default Return;
