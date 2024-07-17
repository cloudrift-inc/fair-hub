import { apiRequest } from "@/lib/faircompute";

export interface ProfileData {
    name: string;
    email: string;
}

export const fetchProfile = async (token: string): Promise<ProfileData> => {
  
    const response = await apiRequest<{ data: ProfileData }>(
      "/api/v1/auth/me", "POST",false, true,false,{});
  
    if (!response || !response.data) {
      throw new Error("Invalid response structure: " + JSON.stringify(response));
    }
  
    return {
      name: response.data.name,
      email: response.data.email,
    };
  };
  