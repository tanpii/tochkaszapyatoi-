import {Button, Tooltip, Text} from '@gravity-ui/uikit';
import {BookStatus} from '@/shared/api/book';
import {UserInfo} from '@/entities/user';
import {useSelector} from 'react-redux';
import {getUserAuthorized} from '@/features/authPopup';
import {useState} from 'react';
import block from 'bem-cn-lite';
import './BookActions.scss';

const b = block('bookActions');

interface BookActionsProps {
    status: BookStatus;
    handleReserve: () => void;
    handleCancelReservation: () => void;
    self?: boolean;
    userData?: any;
}

export const BookActions = ({
    status,
    handleReserve,
    handleCancelReservation,
    self,
    userData,
}: BookActionsProps) => {
    const isAuthorized = useSelector(getUserAuthorized);
    const [reserveError, setReserveError] = useState<string | null>(null);

    const handleReserveWithError = async () => {
        try {
            setReserveError(null);
            await handleReserve();
        } catch (error) {
            setReserveError('Ошибка бронирования! Возможно, у вас уже есть забронированная книга или вы не авторизованы');
        }
    };

    return (
        <div className={b()}>
            <div className={b('rentButton')}>
                {!self && (
                    <Tooltip
                        content={
                            <Text variant="body-2">Книгу необходимо забрать в течение 3 дней</Text>
                        }
                        placement="top"
                        openDelay={100}
                    >
                        <Button
                            view="action"
                            size="xl"
                            onClick={handleReserveWithError}
                            disabled={status !== BookStatus.AVAILABLE || !isAuthorized}
                        >
                            Забронировать
                        </Button>
                    </Tooltip>
                )}
                {self && (
                    <Button
                        view="action"
                        size="xl"
                        onClick={handleCancelReservation}
                        disabled={status !== BookStatus.BOOKED}
                    >
                        Отменить бронь
                    </Button>
                )}

                {userData && (
                    <div>
                        <Text>Сейчас читает: </Text>
                        <UserInfo
                            self={!!self}
                            uuid={userData.userId}
                            name={`${userData.firstName} ${userData.lastName}`}
                            avatarUrl={userData.photoUrl}
                        />
                    </div>
                )}
            </div>

            {reserveError && (
                <Text className={b('error')} variant="body-2" color="danger">
                    {reserveError}
                </Text>
            )}

            <Text className={b('infoText')} variant="body-2" color="hint">
                Забронируйте книгу и заберите её из библиотеки в течение трёх дней. Она будет доступна
                для домашнего чтения на 30 дней, после чего её необходимо вернуть обратно в библиотеку.
            </Text>
        </div>
    );
};

export default BookActions;
