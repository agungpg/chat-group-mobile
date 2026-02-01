import { API_BASE_URL } from 'app/config/api';
import { storage } from 'app/storage';

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  /**
   * Whether to attach the Authorization header automatically.
   */
  auth?: boolean;
  signal?: AbortSignal;
};

const baseUrl = API_BASE_URL.replace(/\/$/, '');

export const apiFetch = async <T>(
  path: string,
  { method = 'GET', body, headers = {}, auth = true, signal }: ApiRequestOptions = {},
): Promise<T> => {
  const token = auth ? storage.getString('user.token') : undefined;
  const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
  console.log("apiFetch: ", {method, path, body})
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const parsed = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof parsed === 'string' ? parsed : parsed?.message || 'Request failed';
    throw new ApiError(response.status, message, parsed);
  }

  return parsed as T;
};
