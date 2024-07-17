export async function apiRequest<T>(endpoint: string, api:boolean, token:boolean,  requestData?: any): Promise<T> {
    const apiUrl = getFairApiUrl();
    const method="POST";
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };
    if (token){
        headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }

    if(api){
        headers["X-API-Key"] = getFairProviderPubApiKey();
    }

    const body: any = { data: requestData || {} };
    
    body.version = FAIR_API_VERSION;

    const response = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers,
        body: JSON.stringify(body),
    });

    const textResponse = await response.text();
    if (!textResponse) {
        if (!response.ok) {
            throw new Error(`API call failed with status code: ${response.status}`);
          }
        return {} as T; 
    }
    let jsonResponse;
    try {
        jsonResponse = JSON.parse(textResponse);
    } catch (error) {
        throw new Error(`Failed to parse response JSON. Status code: ${response.status}, response: ${textResponse}`);
    }

    if (!response.ok) {
        let errorMessage = `Failed to fetch data. Status code: ${response.status}`;
        if (jsonResponse && jsonResponse.message) {
        errorMessage += `, Error message: ${jsonResponse.message}`;
        }
        throw new Error(errorMessage);
    }

    // Return the parsed JSON response if data is present, otherwise return an empty object
    return jsonResponse.data ? jsonResponse : ({} as T);

}

export function getFairApiUrl(): string {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return process.env.NEXT_PUBLIC_PROD_FAIR_API_URL || '';
    } else {
        return process.env.NEXT_PUBLIC_LOCAL_FAIR_API_URL || '';
    }
}

export function getFairProviderPubApiKey(): string {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return process.env.NEXT_PUBLIC_PROD_FAIR_PROVIDER_PUB_KEY || '';
    } else {
        return process.env.NEXT_PUBLIC_LOCAL_FAIR_PROVIDER_PUB_KEY || '';
    }
}

export function getStripePublishableKey(): string {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return process.env.NEXT_PUBLIC_PROD_STRIPE_PUBLISHABLE_KEY || '';
    } else {
        return process.env.NEXT_PUBLIC_LOCAL_STRIPE_PUBLISHABLE_KEY || '';
    }
}

export function getStripeSecretKey(): string {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return process.env.PROD_STRIPE_SECRET_KEY || '';
    } else {
        return process.env.LOCAL_STRIPE_SECRET_KEY || '';
    }
}

export function getStripePriceID(): string {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return process.env.PROD_STRIPE_PRICE_ID || '';
    } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
        return process.env.PREVIEW_STRIPE_PRICE_ID || '';
    } else {
        return process.env.LOCAL_STRIPE_PRICE_ID || '';
    }
}

export function getOmnisendApiKey(): string {
    return process.env.NEXT_PUBLIC_OMNISEND_API_KEY || '';
}


export const FAIR_API_VERSION = "2024-07-04";