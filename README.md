This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local Development

1. Run the development server:
    ```bash
    vercel dev
    ```
2. Start the Fair Compute server (in faircompute repo) to simulate a server machine
    ```bash
    cargo run --bin fair-server -- -vv
    ```
3. Start local provider (in a separate terminal in faircompute repo) to simulate a provider machine:
    ```bash
    FAIR_USER_EMAIL=debug@provider.com cargo run --bin fair-desktop -- -vv
    ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Deployment

** Deployment happens automatically on push to main branch **

If you want to test production deployment locally, you can run `vercel --prod`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
