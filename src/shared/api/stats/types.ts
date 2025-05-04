export type BookStats = {
    booksRead: number;
    minDaysReadTime: number;
};

export type CommentStats = {
    commentsLeft: number;
    goodRateCount: number;
    badRateCount: number;
};

export type StatsResponse = {
    userId: string;
    bookStats: BookStats;
    commentStats: CommentStats;
};
