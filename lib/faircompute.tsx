export async function apiRequest<T>(endpoint: string, token:boolean,  requestData?: any): Promise<T> {
    const apiUrl = getFairApiUrl();
    const method="POST";
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        "X-API-Key": getFairProviderPubApiKey(),
    };
    if (token){
        headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }

    const body: any = {};
    if (requestData) {
        body.data = requestData;
        body.version = getFairApiVersion();
    }

    const response = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers,
        body: JSON.stringify(body),
    })

    const textResponse = await response.text();

    if (!response.ok) {
        let errorMessage = `API call failed with status code: ${response.status}`;
        if (textResponse.length > 0) {
            try {
                const errorJson = JSON.parse(textResponse);
                if (errorJson && errorJson.message) {
                    errorMessage += `, Error message: ${errorJson.message}`;
                }
            } catch {
                errorMessage += `, Response: ${textResponse}`;
            }
        }
        throw new Error(errorMessage);
    }

    let jsonResponse: any = {};
    if (textResponse.length > 0) {
        try {
            jsonResponse = JSON.parse(textResponse);
        } catch (error) {
            throw new Error(`Failed to parse response JSON. Status code: ${response.status}, response: ${textResponse}`);
        }
    }

    return jsonResponse.data ? jsonResponse : ({} as T);
}

export function getFairApiUrl(): string {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return process.env.NEXT_PUBLIC_PROD_FAIR_API_URL || '';
    } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
        return process.env.NEXT_PUBLIC_PREVIEW_FAIR_API_URL || '';
    }else {
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

export function getFairApiVersion(): string {
    const FAIR_PROD_API_VERSION = "2024-07-04";
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return FAIR_PROD_API_VERSION;
    } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
        return FAIR_PROD_API_VERSION;
    } else {
        return "~upcoming";
    }
}
