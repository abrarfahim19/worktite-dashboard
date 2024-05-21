import {useEffect, useState} from "react";

const useOnlineStatus = (): boolean => {
    const [isOnline, setIsOnline] = useState<boolean>(typeof window !== 'undefined' ? navigator.onLine : true);

    useEffect(() => {
        const updateOnlineStatus = () => setIsOnline(navigator.onLine);

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    return isOnline;
};

export default useOnlineStatus;