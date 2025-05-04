import {useState} from 'react';
import {Pagination, Spin, Text} from '@gravity-ui/uikit';
import {CommentForm} from '@/features/commentForm';
import {useAddComment} from '@/shared/api/comment';
import {useGetBookComments} from '@/shared/api/comment';
import CommentList from '../CommentList/CommentList';

import block from 'bem-cn-lite';
import './CommentBlock.scss';
const b = block('commentBlock');

export interface CommentBlockProps {
    bookId: string;
}

const PAGE_SIZE = 10;

export const CommentBlock = ({bookId}: CommentBlockProps) => {
    const [page, setPage] = useState(1);

    const {data, isLoading, refetch} = useGetBookComments({
        page: page - 1,
        bookId,
    });

    const totalComments = data?.total || 0;
    const comments = data?.comments || [];

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const {mutateAsync: addComment} = useAddComment();

    const handleCommentSubmit = async (reviewData: {text: string; rating: number}) => {
        try {
            await addComment({
                bookId: bookId,
                comment: reviewData.text,
                rating: reviewData.rating,
            });
            refetch();
        } catch (error) {
            console.error('Ошибка добавления комментария:', error);
        }
    };

    return (
        <div className={b()}>
            <Text className={b('header')} variant="display-2">
                Отзывы наших читателей
            </Text>
            <CommentForm onSubmit={handleCommentSubmit} />
            {isLoading ? <Spin className="loader" /> : <CommentList comments={comments} />}
            {comments.length > 0 && (
                <Pagination
                    page={page}
                    pageSize={PAGE_SIZE}
                    total={totalComments}
                    onUpdate={handlePageChange}
                />
            )}
        </div>
    );
};

export default CommentBlock;
