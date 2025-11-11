import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Project B - Product Portal',
  description: 'Red-themed product portal for Project B',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
