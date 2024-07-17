import { apiRequest } from "@/lib/faircompute";

export interface BalanceData {
    balance: number;
}

export const fetchBalance = async (token: string): Promise<BalanceData> => {

const response = await apiRequest<{ data: BalanceData }>("/api/v1/account/info", true, true,{});
    return {
        balance: response.data.balance
    };

}
