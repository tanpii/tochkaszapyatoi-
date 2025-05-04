import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {authApiUrl, LocalStorageKey} from '@/shared/config/consts';

export type SignInParams = {
    email: string;
    password: string;
};

export type SignUpParams = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    profileImage?: File;
};

export const useSignIn = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (credentials: SignInParams) => {
            const response = await fetch(`${authApiUrl}/signin`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Ошибка входа');
            }

            return response.json();
        },
        onSuccess: (data) => {
            localStorage.setItem(LocalStorageKey.AuthToken, data.token);
            navigate('/cabinet');
        },
        onError: (error) => {
            console.error('Ошибка при входе:', error);
        },
    });
};

export const useSignUp = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (params: SignUpParams) => {
            const formData = new FormData();
            formData.append('email', params.email);
            formData.append('password', params.password);
            formData.append('firstName', params.firstName);
            formData.append('lastName', params.lastName);
            formData.append('birthDate', params.birthDate);
            if (params.profileImage) {
                formData.append('profileImage', params.profileImage);
            }

            const response = await fetch(`${authApiUrl}/signup`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Ошибка регистрации');
            }

            return response.json();
        },
        onSuccess: (data) => {
            localStorage.setItem(LocalStorageKey.AuthToken, data.token);
            navigate('/cabinet');
        },
        onError: (error) => {
            console.error('Ошибка при регистрации:', error);
        },
    });
};
