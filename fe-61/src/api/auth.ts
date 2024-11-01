import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { BASE_API_URL } from "./baseApi";

interface TokenPayload {
  exp: number;
  [key: string]: unknown;
}

function isTokenExpired(token: string) {
  const decoded = jwtDecode<TokenPayload>(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

const refreshAccessToken = async (refresh: string) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/auth/jwt/refresh/`, { refresh });
    const { access } = response.data;

    localStorage.setItem('access', access);
    return access;
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
}

export const getAccessToken = async () => {
  let access = localStorage.getItem('access') ?? '';

  if (isTokenExpired(access)) {
    const refresh = localStorage.getItem('refresh') ?? '';
    access = await refreshAccessToken(refresh);
  }

  return access;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

export interface LoginArgs {
  email: string;
  password: string;
}

export const login = async (body: LoginArgs): Promise<LoginResponse | undefined> => {
  try {
    const response = await axios.post(`${BASE_API_URL}/auth/jwt/create/`, body);
    const { access, refresh } = response.data;

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    return { access, refresh };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login error data:", error.response.data);
    } else {
      console.error("Failed to login:", error);
    }
  }
};

export interface SignUpBody {
  username: string;
  email: string;
  password: string;
  course_group?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

const handleApiError = (error: any) => {
  let errorMessage = '';

  if (axios.isAxiosError(error) && error.response) {
    switch (error.response.status) {
      case 400:
        errorMessage = 'Not valid Data';
        break;
    }
  }

  return errorMessage;
}

export const signUp = async (body: SignUpBody): Promise<User | undefined> => {
  try {
    const response = await axios.post(`${BASE_API_URL}/auth/users/`, body);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    console.error("Ошибка при регистрации:", errorMessage);
  }
};

export interface ActivateArgs {
  uid: string;
  token: string;
}

export type ActivateResponse = ActivateArgs;

export const activate = async (body: ActivateArgs): Promise<ActivateResponse | undefined> => {
  try {
    const response = await axios.post(`${BASE_API_URL}/auth/users/activation/`, body);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    console.error("Ошибка активации:", errorMessage);
  }
}
