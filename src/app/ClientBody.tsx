'use client';

import { useEffect } from 'react';
import { setupErrorLogger } from '@/lib/error-logger';

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize error logger in the browser
    setupErrorLogger();
    console.log('Error logger initialized');
  }, []);

  return <>{children}</>;
}
