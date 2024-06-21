export function getFairApiUrl() : string {
    if (process.env.NODE_ENV === 'production') {
        return process.env.REACT_APP_PROD_FAIR_API_URL || '';
    } else {
        return process.env.REACT_APP_LOCAL_FAIR_API_URL || '';
    }
}

export function getFairApiKey() : string {
    if (process.env.NODE_ENV === 'production') {
        return process.env.PROD_FAIR_API_KEY || '';
    } else {
        return process.env.LOCAL_FAIR_API_KEY || '';
    }
}

export const FAIR_API_VERSION = "2024-06-17";
