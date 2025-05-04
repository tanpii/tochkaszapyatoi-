import React from 'react';
import {useQueryClient} from '@tanstack/react-query'; // Импортируем queryClient
import {Text} from '@gravity-ui/uikit';
import {AuthorInfo, GenreInfo} from '@/entities/book';
import {Book} from '@/shared/api/book';
import {User} from '@/shared/api/user';
import {useReserveBook, useCancelBookReservation} from '@/shared/api/book/query';
import {AgeLimit, Rating} from '@/shared/components';
import {BookActions} from '@/features/bookActions';
import stubImage from '@/shared/assets/stub.jpg';
import block from 'bem-cn-lite';
import './BookOverview.scss';

const b = block('bookOverview');

export interface BookOverviewProps {
    book: Book;
    self?: boolean;
    userData?: User;
    refetch: () => void;
}

export const BookOverview: React.FC<BookOverviewProps> = ({
    book,
    self,
    userData,
    refetch,
}: BookOverviewProps) => {
    const {
        bookId,
        bookName,
        authorName,
        authorPhotoUrl,
        ageLimit,
        description,
        photoUrl,
        rating,
        status,
        genres,
    } = book;

    const queryClient = useQueryClient(); // Получаем queryClient
    const {mutateAsync: reserveBook} = useReserveBook();
    const {mutateAsync: cancelBookReservation} = useCancelBookReservation();

    const handleReserve = async () => {
        await reserveBook({bookId: bookId.toString()});

        // Инвалидируем запросы для обновления данных о книге
        queryClient.invalidateQueries({
            queryKey: ['bookById', bookId],
            refetchType: 'all',
        });
        refetch();
    };

    const handleCancelReservation = async () => {
        await cancelBookReservation();

        // Инвалидируем запросы для обновления данных о книге
        queryClient.invalidateQueries({
            queryKey: ['bookById', bookId],
            refetchType: 'all',
        });
        refetch();
    };

    return (
        <div className={b()}>
            <img className={b('bookImage')} src={photoUrl || stubImage} alt={bookName} />
            <div className={b('bookInfo')}>
                <div className={b('bookName')}>
                    <Text variant="display-2">{bookName.toUpperCase()}</Text>
                    {rating > 0 && <Rating rating={rating} className={b('rate')} />}
                    <AgeLimit ageLimit={ageLimit} className={b('ageLimit')} />
                </div>

                {!!genres && genres.length > 0 && (
                    <GenreInfo genres={genres.map(({genreName}) => genreName)} />
                )}
                <AuthorInfo authorName={authorName} authorImgSrc={authorPhotoUrl} />

                <Text className={b('description')} variant="body-2">
                    {description}
                </Text>

                <div className={b('rentBlock')}>
                    <BookActions
                        status={status}
                        handleReserve={handleReserve}
                        handleCancelReservation={handleCancelReservation}
                        self={self}
                        userData={userData}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookOverview;
