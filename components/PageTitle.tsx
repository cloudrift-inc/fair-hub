// components/PageTitle.tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

interface PageTitleProps {
  prefix?: string;
}

export function PageTitle({ prefix = 'FairCompute' }: PageTitleProps) {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState(`${prefix}`);

  useEffect(() => {
    const path = router.pathname;
    const pageName = path.split('/').pop() || 'Home';
    const capitalizedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    const newTitle = `${prefix} | ${capitalizedPageName}`;
    setPageTitle(newTitle);
  }, [router.pathname, prefix]);

  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
}