import React, { useEffect, useState } from 'react';
import Link from './foundational/Link';
import { useMutation } from "@tanstack/react-query";
import Button from './foundational/Button';
import { BalanceData, fetchBalance } from "./BalanceFetch";

const AvailableCredits: React.FC = () => {
  const [credit, setCredit] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [error, setError] = useState<string>("");

  const fetchBalanceData = async (token: string): Promise<BalanceData> => {
    try {
      return await fetchBalance(token);
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  };

  const balanceMutation = useMutation<BalanceData, Error, string>({
    mutationFn: fetchBalanceData,
    onSuccess: (data) => {
      setBalance(data);
      setCredit(data.balance / 100);
    },
    onError: (error) => {
      setError(error.message);
      console.error("Error fetching balance:", error);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      setIsLoggedIn(true);
      balanceMutation.mutate(token);

      const interval = setInterval(() => {
        balanceMutation.mutate(token);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <b className="text-sm inline-block">Available Credit: ${isLoggedIn ? credit : 0}</b>
      {isLoggedIn && (
        <Link href="/billing">
          <Button className="rounded-full bg-[#191970] py-2 px-4 font-bold text-sm">
            Add Credits
          </Button>
        </Link>
      )}
    </div>
  );
};

export default AvailableCredits;
