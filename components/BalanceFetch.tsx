import { apiRequest } from "@/lib/faircompute";

export interface BalanceData {
    balance: number;
}

export const fetchBalance = async (token: string): Promise<BalanceData> => {

const response = await apiRequest<{ data: BalanceData }>("/api/v1/account/info", "POST", {}, true, true);

    if (!response || !response.data || response.data.balance === undefined) {
        throw new Error("Invalid response structure: " + JSON.stringify(response));
    }
    return {
        balance: response.data.balance
    };

}
