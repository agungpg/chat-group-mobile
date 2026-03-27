import { apiFetch } from './client';

export type LoginPayload = {
  username: string;
  password: string;
};

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};


export type CheckAccountPayload = {
  username: string;
  email: string;
};
export type CheckAccountResponse = {
  data: {
    isUsernameTaken: boolean;
    isEmailTaken: boolean;
  };
  message: string;
};

export type AuthResponse = {
  token: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
};

export const login = (payload: LoginPayload) =>{ console.log({payload})
  return apiFetch<AuthResponse>('/auth/login', { method: 'POST', body: payload, auth: false })};

export const register = (payload: SignUpPayload) =>
  apiFetch<AuthResponse>('/auth/register', { method: 'POST', body: payload, auth: false });

export const checkAccount = (payload: CheckAccountPayload) =>
  apiFetch<CheckAccountResponse>('/auth/check-account', { method: 'POST', body: payload, auth: false });
