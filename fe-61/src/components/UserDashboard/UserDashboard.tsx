import { useEffect, useState } from "react";
import { useGetMeQuery } from "api/endpoints/user";
import { ImageUploading } from "components/ImageUploading";
import styles from './styles.module.scss';

const UserDashboard = () => {
    const { data } = useGetMeQuery();
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [isAvatarUploadOpen, setIsAvatarUploadOpen] = useState(false);

    useEffect(() => {
        const savedAvatar = localStorage.getItem('avatarUrl');
        if (savedAvatar) {
            setAvatarUrl(savedAvatar);
        }
    }, []);

    const updateAvatarUrl = (newAvatarUrl: string) => {
        setAvatarUrl(newAvatarUrl);
        localStorage.setItem('avatarUrl', newAvatarUrl);
    };

    const handleAvatarChange = (file?: File) => {
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
        <div className={styles.dashboardContainer}>
            <div className={styles.userInfo}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="User Avatar" className={styles.avatarImage} />
                        ) : (
                            <div className={styles.avatarPlaceholder}>No Avatar</div>
                        )}
                    </div>
                    <button 
                        onClick={() => setIsAvatarUploadOpen(!isAvatarUploadOpen)} 
                        className={styles.changeAvatarButton}
                    >
                        Change Avatar
                    </button>
                    {isAvatarUploadOpen && (
                        <div className={styles.avatarUploader}>
                            <ImageUploading onChange={handleAvatarChange} />
                        </div>
                    )}
                </div>
                <div className={styles.details}>
                    <h2>{data?.username}</h2>
                    <p>{data?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
