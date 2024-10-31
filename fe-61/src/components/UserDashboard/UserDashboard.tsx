import { useEffect, useState } from "react";
import { useGetMeQuery } from "api/endpoints/user";
import styles from './styles.module.scss';

const UserProfile = () => {
    const { data } = useGetMeQuery();
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    // Загрузка аватара из localStorage при монтировании компонента
    useEffect(() => {
        const savedAvatar = localStorage.getItem('avatarUrl');
        if (savedAvatar) {
            setAvatarUrl(savedAvatar);
        }
    }, []);

    // Функция для обновления avatarUrl
    const updateAvatarUrl = (newAvatarUrl: string) => {
        setAvatarUrl(newAvatarUrl);
        localStorage.setItem('avatarUrl', newAvatarUrl);
    };

    // Функция для обработки загрузки файла
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    updateAvatarUrl(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                {avatarUrl ? (
                    <img src={avatarUrl} alt="User Avatar" className={styles.avatarImage} />
                ) : (
                    <div className={styles.avatarPlaceholder}>No Avatar</div>
                )}
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <h2>{data?.username}</h2>
            <p>{data?.email}</p>
        </div>
    );
};

export default UserProfile;
