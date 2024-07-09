/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_LOCAL_FAIR_API_URL: "http://localhost:8000",
    NEXT_PUBLIC_LOCAL_FAIR_PROVIDER_PUB_KEY: "debug_api_key",
    NEXT_PUBLIC_OMNISEND_API_KEY: "6441e7b4a28cdc684ee4b438-u88LjqLhlOEsMXcYTezm1g8uenQT4zGULZ2Qe27IyoLok9YIh5",
  },
};

export default nextConfig;
