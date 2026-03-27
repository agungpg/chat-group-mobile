import { useMutation } from '@tanstack/react-query';
import { login, register, AuthResponse, LoginPayload, SignUpPayload, checkAccount, CheckAccountPayload, CheckAccountResponse } from 'app/api/auth';
import { ApiError } from 'app/api/client';
import { useAuth } from 'app/providers/AuthProvider';

export const useLoginMutation = () => {
  const { login: setToken } = useAuth();

  return useMutation<AuthResponse, ApiError, LoginPayload>({
    mutationFn: login,
    onSuccess: ({ token }) => {
      console.log({token})
      if (token) setToken(token);
    },
  });
};

export const useRegisterMutation = () =>
  useMutation<AuthResponse, ApiError, SignUpPayload>({
    mutationFn: register,
  });
  
export const useCheckAccountMutation = () =>
  useMutation<CheckAccountResponse, ApiError, CheckAccountPayload>({
    mutationFn: checkAccount,
  });

