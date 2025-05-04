import {useQuery, useMutation} from '@tanstack/react-query';
import {userApiUrl} from '@/shared/config/consts';
import {User} from './types';
import {Book} from '../book';
import {fetchWithAuth} from '../base';

type UserResponse = {
    userData: User;
    bookInfo?: {
        book: Book;
        dueDate: string;
    };
};

export const useGetUser = (userId: string) =>
    useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            const res = await fetch(`${userApiUrl}/profile/${userId}`);
            if (!res.ok) throw new Error('Ошибка загрузки пользователя');
            return res.json() as Promise<UserResponse>;
        },
        enabled: !!userId,
    });

export const useGetSelfUser = () =>
    useQuery({
        queryKey: ['selfUser'],
        queryFn: async (): Promise<UserResponse> => {
            const response = await fetchWithAuth(`${userApiUrl}/profile/self`);
            if (!response.ok) throw new Error('Ошибка при получении данных профиля');
            return response.json();
        },
    });

export type ChangeUserParams = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    profileImage?: File;
};

const toFormData = (params: ChangeUserParams): FormData => {
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            formData.append(key, value);
        }
    });
    return formData;
};

export const useChangeSelfUser = () =>
    useMutation({
        mutationFn: async (params: ChangeUserParams) => {
            const formData = toFormData(params);

            const res = await fetchWithAuth(`${userApiUrl}/profile/self`, {
                method: 'PUT',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Ошибка обновления профиля');
            }
        },
    });
