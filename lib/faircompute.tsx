export function getFairApiUrl(): string {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return process.env.NEXT_PUBLIC_PROD_FAIR_API_URL || '';
    } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
        return process.env.NEXT_PUBLIC_PREVIEW_FAIR_API_URL || '';
    } else {
        return process.env.NEXT_PUBLIC_LOCAL_FAIR_API_URL || '';
    }
}

export function getFairProviderPubApiKey(): string {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return process.env.NEXT_PUBLIC_PROD_FAIR_PROVIDER_PUB_KEY || '';
    } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
        return process.env.NEXT_PUBLIC_PREVIEW_FAIR_PROVIDER_PUB_KEY || '';
    } else {
        return process.env.NEXT_PUBLIC_LOCAL_FAIR_PROVIDER_PUB_KEY || '';
    }
}

export function getStripePublishableKey(): string {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return process.env.NEXT_PUBLIC_PROD_STRIPE_PUBLISHABLE_KEY || '';
    } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
        return process.env.NEXT_PUBLIC_PREVIEW_STRIPE_PUBLISHABLE_KEY || '';
    } else {
        return process.env.NEXT_PUBLIC_LOCAL_STRIPE_PUBLISHABLE_KEY || '';
    }
}

export function getStripeSecretKey(): string {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return process.env.PROD_STRIPE_SECRET_KEY || '';
    } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
        return process.env.PREVIEW_STRIPE_SECRET_KEY || '';
    } else {
        return process.env.LOCAL_STRIPE_SECRET_KEY || '';
    }
}

export function getOmnisendApiKey(): string {
    return process.env.NEXT_PUBLIC_OMNISEND_API_KEY || '';
}

export const FAIR_API_VERSION = "2024-07-04";
