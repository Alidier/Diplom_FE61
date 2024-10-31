import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useAppContext } from "shared/contexts";
import { useLogOut } from "shared/hooks/useLogout";
import Button from "components/Button";
import ThemeToggleButton from "components/ThemeToggleButton";


interface BurgerProps {
  initialIsOpen?: boolean;
  onToggleMenu?: (isOpen: boolean) => void;
}

const Burger: React.FC<BurgerProps> = ({
  initialIsOpen = false,
  onToggleMenu,
}) => {
  const [isOpen, setIsMenuOpen] = useState(initialIsOpen);

  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsMenuOpen(newIsOpen);
    onToggleMenu?.(newIsOpen);
  };
  const { userToken, avatarUrl, username } = useAppContext(); // Получаем avatarUrl и username из контекста
  const logOut = useLogOut();


  return (
    <div className="burgerBtnWrap">
      <button className={`burger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>
      {isOpen && ( // Условное отображение меню при открытии
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <ThemeToggleButton />
          <Button onClick={logOut}> LOG OUT </Button>
        </div>
      )}
    </div>
  );
};

export default Burger;
