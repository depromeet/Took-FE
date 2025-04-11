'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ComponentType } from 'react';
import { FallbackProps, ErrorBoundary } from 'react-error-boundary';

interface PropsType {
  children: React.ReactNode;
  fallbackComponent: ComponentType<FallbackProps>;
}

export default function ErrorHandlingWrapper({ children, fallbackComponent: FallbackComponent }: PropsType) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
