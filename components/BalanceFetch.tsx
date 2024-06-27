import { FAIR_API_VERSION, getFairProviderPubApiKey, getFairApiUrl } from "../lib/faircompute";

export interface BalanceData {
    balance: number;
}

export const fetchBalance = async (token: string): Promise<BalanceData> => {
    const apiUrl = getFairApiUrl();
    const response = await fetch(`${apiUrl}/api/v1/users/info`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-API-Key": getFairProviderPubApiKey(),
        },
        body: JSON.stringify({
            version: FAIR_API_VERSION,
        })
    });

    if (!response.ok) {
        let errorMessage = `Failed to fetch balance data. Status code: ${response.status}`;
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

    const data = await response.json();
    return {
        balance: data.data.balance
    };
};
