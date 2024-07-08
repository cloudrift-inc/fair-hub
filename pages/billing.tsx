import React, { useCallback, useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import "../app/globals.css";
import { fetchProfile } from "../components/ProfileFetch";
import { useMutation } from "@tanstack/react-query";
import { getStripePublishableKey } from "@/lib/faircompute";

interface ProfileData {
  email: string;
}

const Billing: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      mutation.mutate(token);
      console.log("Token found:", token);
    } else {
      setError("No auth token found");
      console.error("No auth token found");
    }
  }, []);

  const fetchProfileData = async (token: string): Promise<ProfileData> => {
    try {
      const data = await fetchProfile(token);
      return data;
    } catch (error: any) {
      throw new Error(`Failed to fetch profile data: ${error.message}`);
    }
  };

  const mutation = useMutation<ProfileData, Error, string>({
    mutationFn: fetchProfileData,
    onSuccess: (data) => {
      setEmail(data.email);
      console.log("Email set:", data.email);
    },
    onError: (error) => {
      setError(error.message);
      console.error("Error fetching profile data:", error.message);
    },
  });

  const stripePromise = loadStripe(getStripePublishableKey());

  const fetchClientSecret = useCallback(async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Include the token in the request body
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.clientSecret) {
        setAmount(data.amount_total); // Set the amount in state

        return data.clientSecret; // Return only the client secret string
      } else {
        throw new Error("Client secret not found in response data.");
      }
    } catch (error) {
      console.error("Error fetching client secret:", error);
      throw error;
    }
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout" className="min-h-screen bg-[#191970]">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options }>
        <div className="pt-12">
          <EmbeddedCheckout />
        </div>
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default Billing;
