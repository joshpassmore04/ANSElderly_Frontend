'use client';

import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { makeBackendRequest } from './Request';
import { useNavigate } from 'react-router';

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await makeBackendRequest('/user/@me', null, false);
        setIsAllowed(true);
      } catch (e) {
        navigate("/login")
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  if (isLoading) return (
    <div className="w-full h-full justify-center items-center animate-pulse">Loading...</div>
  )
  if (!isAllowed) return null; // optional, as redirect has already occurred

  return <>{children}</>;
}
