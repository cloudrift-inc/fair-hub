import { getFairApiUrl } from "../lib/faircompute";

export interface ProfileData {
    name: string;
    email: string;
}

export const fetchProfile = async (token: string): Promise<ProfileData> => {
    const apiUrl = getFairApiUrl();
    const response = await fetch(`${apiUrl}/api/v1/auth/me`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        let errorMessage = `Failed to fetch profile data. Status code: ${response.status}`;
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
        name: data.data.name,
        email: data.data.email
    };
};

