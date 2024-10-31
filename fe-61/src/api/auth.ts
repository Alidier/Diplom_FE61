import { jwtDecode } from "jwt-decode";
import { BASE_API_URL } from "./baseApi";

interface TokenPayload {
  exp: number; // Время истечения токена в формате Unix (в секундах)
  [key: string]: unknown; // Дополнительные свойства токена
}

function isTokenExpired(token: string) {
  const decoded  = jwtDecode<TokenPayload>(token);
  const currentTime = Date.now() / 1000;

  return decoded.exp < currentTime;
}

const refreshAccessToken = async (refresh: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/jwt/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'refresh': refresh })
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const { access } = await response.json();

    localStorage.setItem('access', access);

    return access;
  } catch (error) {
    console.error(error);
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
  email: string,
  password: string,
}

export const login = async (body: LoginArgs): Promise<LoginResponse | undefined> => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/jwt/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login error data:', errorData); // Логирование для проверки
      throw new Error('Failed to login');
    }
    

    const { access, refresh } = await response.json();
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    return { access, refresh };
  } catch (error) {
    console.error(error);
  }
};

export interface SignUpBody {
  username: string,
  email: string,
  password: string,
  course_group?: number
}

export interface User {
  id: number,
  username: string,
  email: string,
}

const handleApiError = (error: Response) => {
  console.log(error);
  let errorMessage = ''
  switch (error.status) {
    case 400:
      errorMessage = 'Not valid Data';
      break;
  }

  return errorMessage;
}

export const signUp = async (body: SignUpBody): Promise<User | undefined> => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      const errorData = await response.json(); // Получаем сообщение об ошибке
      console.error("Ошибка при регистрации:", errorData); // Логируем подробную ошибку
      throw new Error(handleApiError(response));
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Ошибка в процессе регистрации:", error);
  }
};


export interface ActivateArgs {
  uid: string,
  token: string,
} 

export type ActivateResponse = ActivateArgs

export const activate = async (body: ActivateArgs): Promise<ActivateResponse | undefined> => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/users/activation/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    
    if (!response.ok) {
      throw new Error(handleApiError(response));
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}