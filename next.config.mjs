/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_LOCAL_FAIR_API_URL: "http://localhost:8000",
    NEXT_PUBLIC_LOCAL_FAIR_PROVIDER_PUB_KEY: "debug_api_key",
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "pk_test_51P8p0qDYAJe6ks0CnIzogZa8tL0JkxPub5vQx96AQCRpjQwwvVP75QAyqFcQydW7tPiAnXe6QQkeUvoEi15AY8uv00rPJW4Oe5",
    STRIPE_SECRET_KEY: "sk_test_51P8p0qDYAJe6ks0CHSf6ITUdi02QmxKKjxGahHxl5x7ncoXkzgVGBJ4JYPEkwFYJQxOrBTwKB4R5mplKUJholREe00fvE9oUSF",
    PRICE_ID: "price_1PMEa7DYAJe6ks0C72zOPEwq",
  },
};

export default nextConfig;
