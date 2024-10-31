import { createContext, useContext, useState } from "react";

// Определяем типы для SnackBar и контекста
// eslint-disable-next-line react-refresh/only-export-components
export enum SnackBarType {
  Error = 'Error',
  Ok = 'Ok'
}

interface SnackBar {
  id: number;
  type: SnackBarType;
  message: string;
}

interface SnackBarsContext {
  items: SnackBar[];
  onClose: (id: number) => void;
  addSnackBar: (message: string, type?: SnackBarType, ) => void;
}

// Инициализация контекста с заглушками
const initialContext: SnackBarsContext = {
  items: [],
  onClose: () => {},
  addSnackBar: () => {}
};

// Создаем контекст
export const SnackBarContext = createContext<SnackBarsContext>(initialContext);

// Провайдер для контекста
export const SnackBarContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<SnackBar[]>(initialContext.items);

  // Закрыть уведомление
  const onClose = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Добавить новое уведомление
  const addSnackBar = (message: string, type: SnackBarType = SnackBarType.Ok,) => {
    const newItem: SnackBar = {
      id: Date.now(), // Используем timestamp для уникального ID
      type,
      message
    };
    setItems(prev => [...prev, newItem]);

    setTimeout(() => {
      onClose(newItem.id);
    }, 5000)
  };

  return (
    <SnackBarContext.Provider value={{
      items,
      onClose,
      addSnackBar
    }}>
      {children}
    </SnackBarContext.Provider>
  );
};

// Пользовательский хук для использования контекста
// eslint-disable-next-line react-refresh/only-export-components
export const useSnackBarContext = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error('useSnackBarContext must be used within a SnackBarContextProvider');
  }
  return context;
};
