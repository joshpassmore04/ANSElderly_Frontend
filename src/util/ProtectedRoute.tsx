import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { makeBackendRequest } from './Request';
import { useNavigate } from 'react-router';
import { Role, useRoleCheck } from './Role';
import { useUser } from './UserState';

type ProtectedRouteProps = {
  role?: Role; // `role` is now typed as `Role | undefined`
  children: ReactNode;
};

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [sessionChecked, setSessionChecked] = useState(false);

  // Only call `useRoleCheck` if `role` is defined
  const {
    data: isAllowed,
    isLoading: roleLoading,
    isError,
  } = useRoleCheck(role);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await makeBackendRequest("/user/@me", null, false);
        setUser({
          ...user,
          loggedIn: true,
        });
      } catch (e) {
        console.error("Session check failed:", e);
        navigate("/login");
      } finally {
        setSessionChecked(true); // Always set this
      }
    };
  
    checkSession(); // Always run on mount
  }, [navigate]);

  // If session is still being checked or role is loading, show loading spinner
  if (!sessionChecked || (role && roleLoading)) {
    return (
      <div className="w-full h-full flex justify-center items-center animate-pulse">
        Loading...
      </div>
    );
  }

  // If role check failed or user is not allowed, navigate to login
  if (isError || (role && !isAllowed)) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
}
