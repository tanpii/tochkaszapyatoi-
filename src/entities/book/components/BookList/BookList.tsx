import {memo} from 'react';
import {BookCard} from '@/entities/book';
import {Book} from '@/shared/api/book';
import {WithClassName} from '@/shared/types';

export interface BookListProps extends WithClassName {
    books: Book[];
    onBookClick?: (bookId: string) => void;
    isLoading?: boolean;
    error?: Error | null;
}

export const BookList = memo(({className, books, onBookClick, isLoading, error}: BookListProps) => {
    if (isLoading) {
        return <div className={className}>Загрузка...</div>;
    }

    if (error) {
        return <div className={className}>Ошибка: {error.message}</div>;
    }

    if (!books.length) {
        return <div className={className}>Книги не найдены</div>;
    }

    return (
        <div className={className} role="list" aria-label="Список книг">
            {books.map((book) => (
                <BookCard 
                    key={book.bookId} 
                    book={book} 
                    onClick={onBookClick}
                />
            ))}
        </div>
    );
});

BookList.displayName = 'BookList';

export default BookList;
