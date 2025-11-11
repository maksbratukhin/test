'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Market } from '@product-portal/types';
import { marketContent } from '../../../lib/market-content';
import { credentials } from '../../../lib/credentials';
import { useUserStore } from '@product-portal/shared-lib';
import { BrandButton } from '../../../components/BrandButton';

export default function LoginPage({ params }: { params: Promise<{ market: string }> }) {
  const { market } = use(params);
  const router = useRouter();
  const content = marketContent[market as Market];
  const { setUser, user } = useUserStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const credential = credentials.find(
      (cred) => cred.username === username && cred.password === password && cred.market === market
    );

    if (credential) {
      setUser({
        username: credential.username,
        email: `${credential.username}@projectb.com`,
        market: credential.market,
        isLoggedIn: true,
      });
      router.push(`/${market}/products`);
    } else {
      setError('Invalid credentials for this market');
    }
  };

  if (user?.isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Already Logged In</h2>
          <p className="mb-4">You are already logged in as {user.username}</p>
          <BrandButton onClick={() => router.push(`/${market}/products`)}>
            Go to Products
          </BrandButton>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">{content.loginTitle}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <BrandButton type="submit" fullWidth>
            Sign In
          </BrandButton>
        </form>

        <div className="mt-6 p-4 bg-gray-100 rounded text-sm">
          <p className="font-semibold mb-2">Test Credentials:</p>
          <p>EN Market: user_en / password123</p>
          <p>CA Market: user_ca / password123</p>
        </div>
      </div>
    </div>
  );
}
