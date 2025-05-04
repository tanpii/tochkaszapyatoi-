import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../base';
import { StatsResponse } from './types';
import { statsApiUrl } from '@/shared/config/consts';

export const useGetUserStats = (userId: string) =>
    useQuery({
        queryKey: ['userStats', userId],
        queryFn: async () => {
            const res = await fetch(`${statsApiUrl}/${userId}`);
            if (!res.ok) throw new Error('Ошибка загрузки статистики пользователя');
            return res.json() as Promise<StatsResponse>;
        },
        enabled: !!userId,
    });

export const useGetSelfStats = () =>
    useQuery({
        queryKey: ['selfStats'],
        queryFn: async (): Promise<StatsResponse> => {
            const res = await fetchWithAuth(`${statsApiUrl}/self`);
            if (!res.ok) throw new Error('Ошибка загрузки собственной статистики');
            return res.json();
        },
    });
