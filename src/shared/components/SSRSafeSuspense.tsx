'use client';

import { useState, useEffect, ComponentProps, Suspense } from 'react';

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export default function SSRSafeSuspense(props: ComponentProps<typeof Suspense>) {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }
  return <>{props.fallback}</>;
}
