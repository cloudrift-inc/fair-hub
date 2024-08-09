import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import Button from './foundational/Button';
import { apiRequest } from "@/lib/faircompute";

interface PromoCodeResponse {
  success: boolean;
}

const applyPromoCode = async (code: string): Promise<PromoCodeResponse> => {
  try {
    return await apiRequest<PromoCodeResponse>("/api/v1/users/transactions/create/promo", true, { promo_code: code });
  } catch (error: any) {
    throw new Error("The promo code is invalid.");
  }
};

const PromoCodeInput: React.FC = () => {
  const [promoCode, setPromoCode] = useState('');
  const [message, setMessage] = useState('');

  const mutation = useMutation<PromoCodeResponse, Error, string>({
    mutationFn: applyPromoCode,
    onSuccess: () => {
      setMessage("Promo code applied successfully");
      setPromoCode('');
    },
    onError: (error) => {
      setMessage(error.message);
      console.error("Error applying promo code:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      mutation.mutate(promoCode);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center">
        <div className="text-md font-medium mr-4">Have a promo code?</div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="bg-[#292929] text-white py-2 px-4 rounded-lg outline-none text-md mr-2"
            placeholder="Enter promo code"
          />
          <Button 
            type="submit" 
            className="rounded-lg bg-[#191970] py-2 px-5 font-bold text-md"
          >
            Apply
          </Button>
        </form>
      </div>
      {message && (
        <div className={`text-sm mt-2 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;
