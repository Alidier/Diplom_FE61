// UserInfo.js

import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss"; // Импортируем стили для UserInfo

interface UserInfoProps {
  avatarUrl: string;
  username: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ avatarUrl, username }) => {
  return (
    <Link to="/dashboard" className={styles.userInfo}>
      <div className={styles.avatar}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="User Avatar" />
        ) : (
          <div>No Avatar</div>
        )}
      </div>
      <span className={styles.username}>{username}</span>
    </Link>
  );
};

export default UserInfo;
