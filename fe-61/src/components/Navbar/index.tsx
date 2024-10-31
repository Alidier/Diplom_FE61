// Navbar.js

import { Link } from "react-router-dom";
import Burger from "../Burger";
import ThemeToggleButton from "../ThemeToggleButton";
import styles from "./styles.module.scss";
import Button from "components/Button";
import { useLogOut } from "shared/hooks/useLogout";
import UserInfo from "components/UserInfo"; // Импортируем UserInfo
import { useAppContext } from "shared/contexts";

const Navbar = () => {
  const { userToken, avatarUrl, username } = useAppContext(); // Получаем avatarUrl и username из контекста
  const logOut = useLogOut();

  return (
    <div className={styles.navbar}>
      <Burger />
      
      {userToken && (
        <UserInfo avatarUrl={avatarUrl} username={username} /> // Используем UserInfo
      )}
    </div>
  );
};

export default Navbar;
