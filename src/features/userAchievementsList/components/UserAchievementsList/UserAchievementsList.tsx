import {useGetSelfAchievements, useGetUserAchievements} from '@/shared/api/achievement';
import {FC} from 'react';
import block from 'bem-cn-lite';
import './UserAchievementsList.scss';
import {AchievementCard} from '@/entities/achievement';
import {Spin, Text, Card} from '@gravity-ui/uikit';

const b = block('userAchievementsList');

type Props = {
    userId?: string;
    self?: boolean;
};

export const UserAchievementsList: FC<Props> = ({userId, self = false}) => {
    const {data, isPending, isError} =
        !self && userId ? useGetUserAchievements(userId) : useGetSelfAchievements();
    console.log(self);
    console.log('userId', userId);

    if (isPending) {
        return <Spin className={'loader'} />;
    }

    if (isError) {
        return 'Произошла ошибка :(';
    }

    if (!data?.achievements || data.achievements.length === 0) {
        return (
            <Card view="filled" size="l" className={b('noAchievements')} width={'max'}>
                <Text variant="body-2">
                    {self
                        ? 'У вас еще нет ачивок. Начните читать книги и получать достижения!'
                        : 'У пользователя еще нет ачивок'}
                </Text>
            </Card>
        );
    }

    return (
        <div className={b()}>
            {data?.achievements.map((achievement) => (
                <AchievementCard
                    key={achievement.achievementType}
                    type={achievement.achievementType}
                    achievedAt={achievement.achievedAt}
                />
            ))}
        </div>
    );
};
