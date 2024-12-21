import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = createContext<{
  signIn: (userid: string) => void;
  signOut: () => void;
  session?: string | null;
  user?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  user: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [[, user], setUser] = useStorageState('user')

  return (
    <AuthContext.Provider
      value={{
        signIn: (userid) => {
          // Perform sign-in logic here
          setSession('xxx');
          setUser(userid)
        },
        signOut: () => {
          setSession(null);
          setUser(null)
        },
        session,
        user,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
