import {useCallback, memo} from 'react';
import {Card, Text} from '@gravity-ui/uikit';
import {Book} from '@/shared/api/book';
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import GenreInfo from '../GenreInfo/GenreInfo';
import BookImage from './BookImage';

import block from 'bem-cn-lite';
import './BookCard.scss';
const b = block('bookcard');

export interface BookCardProps {
    book: Book;
    onClick?: (bookId: string) => void;
}

export const BookCard = memo(({book, onClick}: BookCardProps) => {
    const {bookId, bookName, authorName, authorPhotoUrl, genres} = book;

    const handleClick = useCallback(() => {
        onClick?.(bookId.toString());
    }, [bookId, onClick]);

    return (
        <Card 
            className={b()} 
            type="action" 
            view="filled" 
            size="l" 
            onClick={handleClick}
            role="article"
            aria-label={`Книга: ${bookName}`}
        >
            <BookImage book={book} />
            <div className={b('descriptionContainer')}>
                <Text className={b('title')} variant="subheader-1">
                    {bookName.toUpperCase()}
                </Text>
                <AuthorInfo authorImgSrc={authorPhotoUrl} authorName={authorName} />
                <GenreInfo genres={genres.map(({genreName}) => genreName)} showTooltip />
            </div>
        </Card>
    );
});

BookCard.displayName = 'BookCard';

export default BookCard;
