import {useQuery, useMutation} from '@tanstack/react-query';
import {bookApiUrl} from '@/shared/config/consts';
import {Book, Genre} from './types';
import {User} from '../user';
import {fetchWithAuth} from '../base';

type BookPageParams = {
    page: number;
    bookName?: string;
    author?: string;
    genres?: number[];
};

type BookPageResponse = {
    total?: number;
    books: Book[];
};

type BookResponse = {
    book: Book;
    userData?: User;
    self: boolean;
};

type UserRentHistoryParams = {
    uuid: string;
    page: number;
};

export const useGetBookPage = (params: BookPageParams) =>
    useQuery({
        queryKey: ['bookPage', params],
        queryFn: async () => {
            const url = new URL(`${bookApiUrl}/book/list`);
            Object.entries(params).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => url.searchParams.append(`${key}[]`, v.toString()));
                } else if (value !== undefined) {
                    url.searchParams.append(key, value.toString());
                }
            });

            const response = await fetch(url.toString());
            if (!response.ok) throw new Error('Ошибка загрузки книг');
            return response.json() as Promise<BookPageResponse>;
        },
    });

export const useGetGenreList = () =>
    useQuery({
        queryKey: ['genres'],
        queryFn: async () => {
            const response = await fetch(`${bookApiUrl}/genre`);
            if (!response.ok) throw new Error('Ошибка загрузки жанров');
            return response.json() as Promise<Genre[]>;
        },
    });

export const useGetBookById = (id: string) =>
    useQuery({
        queryKey: ['bookById', id],
        queryFn: async () => {
            const response = await fetchWithAuth(`${bookApiUrl}/book/info/${id}`);
            if (!response.ok) throw new Error('Ошибка получения книги');
            return response.json() as Promise<BookResponse>;
        },
    });

export const useGetUserRentHistory = (params: UserRentHistoryParams) =>
    useQuery({
        queryKey: ['userRentHistory', params],
        queryFn: async () => {
            const url = new URL(`${bookApiUrl}/rent/${params.uuid}/history`);
            url.searchParams.append('page', params.page.toString());
            const response = await fetchWithAuth(url.toString());
            if (!response.ok) throw new Error('Ошибка истории аренды');
            return response.json() as Promise<BookPageResponse>;
        },
    });

export const useReserveBook = () =>
    useMutation({
        mutationFn: async ({bookId}: {bookId: string}) => {
            const response = await fetchWithAuth(`${bookApiUrl}/reservation/${bookId}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({dueDate: '2024-12-01'}),
            });
            if (!response.ok) throw new Error('Ошибка при резервировании');
        },
    });

export const useCancelBookReservation = () =>
    useMutation({
        mutationFn: async () => {
            const response = await fetchWithAuth(`${bookApiUrl}/reservation`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Ошибка отмены резервации');
        },
    });
