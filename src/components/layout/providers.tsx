'use client';

import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}
