import {useState, useCallback} from 'react';
import {Button, Spin} from '@gravity-ui/uikit';
import {ChangeUserParams, useGetSelfUser, useChangeSelfUser} from '@/shared/api/user';
import {UserDetailedInfo} from '@/entities/user';
import {UserEditPopup} from '@/features/userEditPopup';
import block from 'bem-cn-lite';
import './Page.scss';
import {UserBookInfo} from '@/widgets/userBookInfo';
import {LocalStorageKey} from '@/shared/config/consts';
import {useNavigate} from 'react-router-dom';
import {useGetSelfStats} from '@/shared/api/stats';
import {UserStat} from '@/entities/stat/components/UserStat/UserStat';

const b = block('cabinetPage');

export const Page = () => {
    const navigate = useNavigate();

    const {data, isPending, isError, refetch} = useGetSelfUser();
    const {data: statsData, isPending: isStatsLoading} = useGetSelfStats();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {mutateAsync: changeUser} = useChangeSelfUser();

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleModalSubmit = useCallback(
        async (user: ChangeUserParams) => {
            handleCloseModal();
            try {
                await changeUser(user);
                refetch();
            } catch (error) {
                console.error('Ошибка при обновлении пользователя:', error);
            }
        },
        [changeUser, refetch, handleCloseModal],
    );

    const handleLogOut = useCallback(() => {
        localStorage.removeItem(LocalStorageKey.AuthToken);
        navigate('/');
        window.location.reload();
    }, [navigate]);

    if (isPending) {
        return <Spin className="loader" />;
    }

    if (isError || !data) {
        return 'Произошла ошибка :(';
    }

    return (
        <>
            <div className={b()}>
                <div className={b('userInfo')}>
                    <UserDetailedInfo self userData={data.userData} />
                    {isStatsLoading ? (
                        <Spin className="loader" />
                    ) : statsData ? (
                        <UserStat stats={{bookStats: statsData.bookStats, commentStats: statsData.commentStats, userId: statsData.userId}} />
                    ) : null}
                    <Button view="action" onClick={handleOpenModal} size="l">
                        Изменить данные
                    </Button>
                    <Button view="normal" onClick={handleLogOut} size="l">
                        Выйти из аккаунта
                    </Button>
                </div>

                <UserBookInfo
                    self
                    uuid={data.userData.uuid}
                    book={data.bookInfo?.book}
                    dueTime={data.bookInfo?.dueDate}
                />
            </div>

            <UserEditPopup
                initialValue={data?.userData}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
            />
        </>
    );
};

export default Page;
