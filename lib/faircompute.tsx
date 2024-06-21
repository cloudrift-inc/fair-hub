export function getApiUrl() : string {
    if (process.env.NODE_ENV === 'production') {
        return process.env.REACT_APP_PROD_FAIR_API_URL || '';
    } else {
        return process.env.REACT_APP_LOCAL_FAIR_API_URL || '';
    }
}

export function getApiKey() : string {
    if (process.env.NODE_ENV === 'production') {
        return process.env.PROD_FAIR_API_KEY || '';
    } else {
        return process.env.LOCAL_FAIR_API_KEY || '';
    }
}
