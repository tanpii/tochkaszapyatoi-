import {useQuery} from '@tanstack/react-query';
import {achieveApiUrl} from '@/shared/config/consts';
import {AchievementType} from './types';
import {fetchWithAuth} from '../base';

type AchievementResponse = {
    userId: string;
    achievements: {achievementType: AchievementType; achievedAt: string}[];
};

export const useGetUserAchievements = (userId: string) =>
    useQuery({
        queryKey: ['userAchievements', userId],
        queryFn: async () => {
            const res = await fetch(`${achieveApiUrl}/${userId}`);
            if (!res.ok) throw new Error('Ошибка загрузки ачивок пользователя');
            return res.json() as Promise<AchievementResponse>;
        },
        enabled: !!userId,
    });

export const useGetSelfAchievements = () =>
    useQuery({
        queryKey: ['selfAchievements'],
        queryFn: async () => {
            const res = await fetchWithAuth(`${achieveApiUrl}/self`);
            if (!res.ok) throw new Error('Ошибка загрузки ачивок');
            return res.json() as Promise<AchievementResponse>;
        },
    });
