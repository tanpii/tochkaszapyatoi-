import {Spin, Text} from '@gravity-ui/uikit';
import {BookCard, BookList} from '@/entities/book';
import {Book, BookStatus} from '@/shared/api/book';
import {useNavigate} from 'react-router-dom';
import {Carousel} from '@/shared/components';
import {useGetUserRentHistory} from '@/shared/api/book';

import block from 'bem-cn-lite';
import './UserBookInfo.scss';
import {formatDate} from '@/shared/helpers';
import UserBookInfoStub from '../UserBookInfoStub/UserBookInfoStub';
import {UserAchievementsList} from '@/features/userAchievementsList/components/UserAchievementsList/UserAchievementsList';

const b = block('userBookInfo');

export interface UserBookInfoProps {
    uuid: string;
    self?: boolean;
    book?: Book;
    dueTime?: string;
}

export const UserBookInfo = ({uuid, self, book, dueTime}: UserBookInfoProps) => {
    const navigate = useNavigate();

    const {data, isLoading} = useGetUserRentHistory({
        page: 0,
        uuid,
    });

    return (
        <div className={b()}>
            {book && (
                <div className={b('readingNow')}>
                    <Text className={b('header')} variant="display-1">
                        Читает сейчас
                    </Text>
                    {dueTime &&
                        (book.status === BookStatus.BOOKED ? (
                            <Text variant="body-2">
                                Нужно забрать из библиотеки до {formatDate(dueTime)}
                            </Text>
                        ) : (
                            <Text variant="body-2">
                                Доступно для чтения дома до {formatDate(dueTime)}
                            </Text>
                        ))}
                    <BookCard book={book} onClick={(id) => navigate(`/book/${id}`)} />
                </div>
            )}

            <div className={b('achievementsList')}>
                <Text className={b('header')} variant="display-1">
                    Достижения читателя
                </Text>
                {isLoading ? (
                    <Spin className="loader" />
                ) : (
                    <UserAchievementsList userId={uuid} self={self} />
                )}
            </div>

            {!!data && data.books.length > 0 && (
                <div className={b('bookHistory')}>
                    <Text className={b('header')} variant="display-1">
                        Последние прочитанные книги
                    </Text>
                    {isLoading ? (
                        <Spin className="loader" />
                    ) : (
                        <Carousel itemCount={data.books.length}>
                            <BookList
                                className={b('bookList')}
                                books={data.books}
                                onBookClick={(id) => navigate(`/book/${id}`)}
                            />
                        </Carousel>
                    )}
                </div>
            )}

            {!book && (!data || data?.books.length === 0) && (
                <div className={b('bookHistory')}>
                    <Text className={b('header')} variant="display-1">
                        Прочитанные книги
                    </Text>
                    <UserBookInfoStub />
                </div>
            )}
        </div>
    );
};

export default UserBookInfo;
