export type Achievement = {
    achievementType: string;
    achievedAt: string;
};

export type AchievementResponse = {
    userId: string;
    achievements: Achievement[];
};

export enum AchievementType {
    BOOK_READ_1 = 'BOOK_READ_1',
    BOOK_READ_5 = 'BOOK_READ_5',
    BOOK_READ_10 = 'BOOK_READ_10',

    COMMENT_LEFT_1 = 'COMMENT_LEFT_1',
    COMMENT_LEFT_5 = 'COMMENT_LEFT_5',
    COMMENT_LEFT_10 = 'COMMENT_LEFT_10',

    BAD_COMMENT_LEFT_1 = 'BAD_COMMENT_LEFT_1',
    BAD_COMMENT_LEFT_5 = 'BAD_COMMENT_LEFT_5',
    BAD_COMMENT_LEFT_10 = 'BAD_COMMENT_LEFT_10',

    GOOD_COMMENT_LEFT_1 = 'GOOD_COMMENT_LEFT_1',
    GOOD_COMMENT_LEFT_5 = 'GOOD_COMMENT_LEFT_5',
    GOOD_COMMENT_LEFT_10 = 'GOOD_COMMENT_LEFT_10',
}
