import {FC} from 'react';
import {Card, Icon, Text} from '@gravity-ui/uikit';
import {StatsResponse} from '@/shared/api/stats';

import block from 'bem-cn-lite';
import './UserStat.scss';
import {CircleInfo} from '@gravity-ui/icons';
const b = block('userStat');

type Props = {
    stats: StatsResponse;
};

export const UserStat: FC<Props> = ({stats}) => {
    return (
        <Card className={b()} type="container" view="filled" size="l">
            <Text variant="subheader-3" className={b('header')}>
                Статистика читателя <Icon data={CircleInfo} size={18} />
            </Text>
            <Text variant="body-2">Прочитано книг: {stats.bookStats?.booksRead ?? 0}</Text>
            <Text variant="body-2">Оставлено отзывов: {stats.commentStats?.commentsLeft ?? 0}</Text>
        </Card>
    );
};
