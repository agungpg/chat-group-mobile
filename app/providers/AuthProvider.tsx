import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useMMKVString } from 'react-native-mmkv';
import { storage } from 'app/storage';

type AuthContextType = {
  isLogedIn: boolean;
  token?: string;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLogedIn: false,
  token: undefined,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext)

function AuthProvider({
    children
}: {
    children: ReactNode
}) {
  const [token, setToken] = useMMKVString("user.token", storage);
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    setIsLogedIn(Boolean(token));
  }, [token]);

  const login = useCallback((tkn: string) => {
    setToken(tkn);
    setIsLogedIn(true);
  }, [setToken]);

  const logout = useCallback(() => {
    setIsLogedIn(false);
    setToken(undefined);
  }, [setToken]);
  
  return (
    <AuthContext.Provider 
    value={{
      isLogedIn,
      token: token ?? undefined,
      login,
      logout
    }}>
        {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider
