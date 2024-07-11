import React, { useEffect, useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import Link from './foundational/Link';
import Button from './foundational/Button';
import { BalanceData, fetchBalance } from "./BalanceFetch";

const CreditsSection: React.FC = () => {
  const [credit, setCredit] = useState(0);
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
      setCredit(data.balance / 100);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      balanceMutation.mutate(token);

      const interval = setInterval(() => {
        balanceMutation.mutate(token);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="flex justify-between items-center p-6 mb-6 mx-auto rounded-lg bg-[#111111] bg-grain shadow-md">
      <div>
        <h2 className="text-2xl font-medium">Credit Balance: ${credit}</h2>
      </div>
      <Link href="/billing">
        <Button className="rounded-lg bg-[#191970] py-2 px-5 font-bold text-md">
          Add Credit
        </Button>
      </Link>
    </div>
  );
};

export default CreditsSection;
