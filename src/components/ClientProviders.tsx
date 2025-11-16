// src/components/ClientProviders.tsx
'use client';

import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}