import {useMutation, useQuery} from '@tanstack/react-query';
import {commentApiUrl} from '@/shared/config/consts';
import {fetchWithAuth} from '../base';
import {Comment} from './types';

type BookCommentParams = {
    bookId: string;
    page: number;
};

type UserCommentParams = {
    page: number;
};

type AddCommentParams = {
    bookId: string;
    comment: string;
    rating: number;
};

type BookCommentResponse = {
    total?: number;
    comments: Comment[];
};

// Получение комментариев к книге
export const useGetBookComments = (params: BookCommentParams) =>
    useQuery({
        queryKey: ['bookComments', params],
        queryFn: async () => {
            const url = new URL(`${commentApiUrl}/${params.bookId}`);
            url.searchParams.append('page', params.page.toString());

            const res = await fetchWithAuth(url.toString());
            if (!res.ok) throw new Error('Ошибка загрузки комментариев');
            return res.json() as Promise<BookCommentResponse>;
        },
    });

// Получение комментариев пользователя
export const useGetUserComments = (params: UserCommentParams) =>
    useQuery({
        queryKey: ['userComments', params],
        queryFn: async () => {
            const url = new URL(`${commentApiUrl}/user`);
            url.searchParams.append('page', params.page.toString());

            const res = await fetchWithAuth(url.toString());
            if (!res.ok) throw new Error('Ошибка загрузки комментариев пользователя');
            return res.json() as Promise<BookCommentResponse>;
        },
    });

// Добавление комментария
export const useAddComment = () =>
    useMutation({
        mutationFn: async ({bookId, comment, rating}: AddCommentParams) => {
            const res = await fetchWithAuth(`${commentApiUrl}/${bookId}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({comment, rating}),
            });
            if (!res.ok) throw new Error('Ошибка добавления комментария');
        },
    });

// Удаление комментария
export const useDeleteComment = () =>
    useMutation({
        mutationFn: async ({commentId}: {commentId: string}) => {
            const res = await fetchWithAuth(`${commentApiUrl}/${commentId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Ошибка удаления комментария');
        },
    });
