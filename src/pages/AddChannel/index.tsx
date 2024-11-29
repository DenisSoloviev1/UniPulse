import React, { useEffect, useState } from "react";
import {addTelegramChannel} from "../../entities/user";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../../entities/auth";


export const AddChannel: React.FC = () => {
    const navigate = useNavigate();
    const { isAuth, userId, setUserId } = useAuthStore();

    const [channelId, setChannelId] = useState<string | null>(null);

    useEffect(() => {
        console.log("qweqweqweqweqewqwe")
        // Получаем текущий URL
        const url = new URL(window.location.href);
        // Извлекаем параметр id
        const id = url.searchParams.get("id");
        setChannelId(id);

        console.log('isAuth', isAuth)

        if (!isAuth) {

            if (id != null) {
                console.log('donme')
                setUserId(id)
            }
            navigate('/');
        } else {
            void addTelegram()
        }

        async function addTelegram(){
            try {
                const result = await addTelegramChannel(id);

                console.log('Успех:', result);
                if (result.success) {
                    // Если сервер вернул положительный ответ
                    navigate("/myNotif")
                }
            } catch (error) {
                console.error('Ошибка при добавлении канала:', error);
            }
        }
        // Сохраняем в состояние

    }, []);

    return (
        <div>
            <h1>Add Channel</h1>
            {channelId ? (
                <p>Channel ID: {channelId}</p>
            ) : (
                <p>No Channel ID found</p>
            )}
        </div>
    );
};
