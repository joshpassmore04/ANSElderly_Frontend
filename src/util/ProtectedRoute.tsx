'use client';

import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { makeBackendRequest } from './Request';
import { useNavigate } from 'react-router';
import { Role, RoleAction } from './Role';
import { useUser } from './UserState';

type ProtectedRouteProps = {
  role?: Role
  children: ReactNode;
};

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await makeBackendRequest('/user/@me', null, false);
        if (role) {
          if (user.loggedIn) {
            await makeBackendRequest("/user/role", {
              user_id: user.id,
              role: role,
              action: RoleAction.CHECK
            })
          } else {
            throw new Error("Not logged in?")
          }
        }
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
