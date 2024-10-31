import React, { useCallback, useState, useEffect } from "react";

// Интерфейс для аргументов токена пользователя
interface SaveUserTokenArg {
    access: string;
    refresh: string;
    avatarUrl?: string; // Опционально
    username?: string;  // Теперь это также опционально
}

// Интерфейс контекста приложения
interface IAppContext {
    theme: string;
    toggleTheme: () => void;
    userToken: string;
    avatarUrl: string;
    username: string; // Добавлено свойство username
    saveUserToken: (tokens: SaveUserTokenArg) => void;
    clearToken: () => void;
}

// Начальное состояние контекста
const initialContext: IAppContext = {
    theme: 'light',
    toggleTheme: () => {},
    userToken: '',
    avatarUrl: localStorage.getItem("avatarUrl") || '',
    username: localStorage.getItem("username") || '', // Инициализация username
    saveUserToken: () => {},
    clearToken: () => {},
};

const AppContext = React.createContext<IAppContext>(initialContext);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userToken, setUserToken] = useState<string>(localStorage.getItem('access') || '');
    const [avatarUrl, setAvatarUrl] = useState<string>(localStorage.getItem("avatarUrl") || '');
    const [username, setUsername] = useState<string>(localStorage.getItem("username") || ''); // Состояние для username
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");

    // Эффект для применения темы из localStorage при монтировании
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    // Функция для переключения темы
    const toggleTheme = useCallback(() => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }, [theme]);

    // Функция для сохранения токена и информации о пользователе
    const saveUserToken = (tokens: SaveUserTokenArg) => {
        setUserToken(tokens.access);
        if (tokens.avatarUrl) {
            setAvatarUrl(tokens.avatarUrl);
            localStorage.setItem("avatarUrl", tokens.avatarUrl);
        }
        if (tokens.username) {
            setUsername(tokens.username); // Устанавливаем username
            localStorage.setItem("username", tokens.username); // Сохраняем в localStorage
        }
    };

    // Функция для очистки токена и информации о пользователе
    const clearToken = () => {
        setUserToken('');
        setAvatarUrl(''); 
        setUsername(''); // Сброс username
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("avatarUrl");
        localStorage.removeItem("username"); // Удаляем username из localStorage
    };

    return (
        <AppContext.Provider value={{
            theme,
            toggleTheme,
            userToken,
            avatarUrl,
            username, // Передаем username
            saveUserToken,
            clearToken
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Хук для использования контекста приложения
export const useAppContext = () => React.useContext(AppContext);

export default AppContextProvider;