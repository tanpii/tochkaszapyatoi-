import {AchievementType} from '@/shared/api/achievement';

import book1Img from '@/shared/assets/images/book1.webp';
import book5Img from '@/shared/assets/images/book5.jpg';
import book10Img from '@/shared/assets/images/book10.jpg';
import comment1Img from '@/shared/assets/images/comment1.jpg';
import comment5Img from '@/shared/assets/images/comment5.jpg';
import comment10Img from '@/shared/assets/images/comment10.jpg';
import bad1Img from '@/shared/assets/images/bad1.webp';
import bad5Img from '@/shared/assets/images/bad5.jpg';
import bad10Img from '@/shared/assets/images/bad10.jpg';
import good1Img from '@/shared/assets/images/good1.jpg';
import good5Img from '@/shared/assets/images/good5.jpg';
import good10Img from '@/shared/assets/images/good10.webp';

export const ACHIEVEMENT_META: Record<
    AchievementType,
    {
        title: string;
        imageUrl: string;
        description: string;
    }
> = {
    [AchievementType.BOOK_READ_1]: {
        title: '📖 Первый шаг в сказку',
        imageUrl: book1Img,
        description: 'За первую прочитанную книгу',
    },
    [AchievementType.BOOK_READ_5]: {
        title: '📚 Книжный червь',
        imageUrl: book5Img,
        description: 'За пять прочитанных книг',
    },
    [AchievementType.BOOK_READ_10]: {
        title: '🧠 Литературный чемпион',
        imageUrl: book10Img,
        description: 'За десять прочитанных книг',
    },
    [AchievementType.COMMENT_LEFT_1]: {
        title: '💬 Проба пера',
        imageUrl: comment1Img,
        description: 'За первый оставленный отзыв',
    },
    [AchievementType.COMMENT_LEFT_5]: {
        title: '🗣️ Комментатор в деле',
        imageUrl: comment5Img,
        description: 'За пять комментариев',
    },
    [AchievementType.COMMENT_LEFT_10]: {
        title: '🧵 Мудрец обсуждений',
        imageUrl: comment10Img,
        description: 'За десять комментариев',
    },
    [AchievementType.BAD_COMMENT_LEFT_1]: {
        title: '😬 Не удержался',
        imageUrl: bad1Img,
        description: 'За первый отрицательный отзыв',
    },
    [AchievementType.BAD_COMMENT_LEFT_5]: {
        title: '🧨 Критик с душой',
        imageUrl: bad5Img,
        description: 'За пять спорных отзывов',
    },
    [AchievementType.BAD_COMMENT_LEFT_10]: {
        title: '💥 Царь бури',
        imageUrl: bad10Img,
        description: 'За десять спорных отзывов',
    },
    [AchievementType.GOOD_COMMENT_LEFT_1]: {
        title: '🌞 Поднял настроение!',
        imageUrl: good1Img,
        description: 'За первый отзыв на 5 звезд',
    },
    [AchievementType.GOOD_COMMENT_LEFT_5]: {
        title: '💖 Душа сообщества',
        imageUrl: good5Img,
        description: 'За пять положительных отзывов',
    },
    [AchievementType.GOOD_COMMENT_LEFT_10]: {
        title: '🏅 Комментатор мечты',
        imageUrl: good10Img,
        description: 'За десять положительных отзывов',
    },
};
