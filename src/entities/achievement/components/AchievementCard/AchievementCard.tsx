import {FC} from 'react';
import {AchievementType} from '@/shared/api/achievement';
import {ACHIEVEMENT_META} from '../../const/Achievements';
import {Card, Text} from '@gravity-ui/uikit';

import block from 'bem-cn-lite';
import './AchievementCard.scss';
const b = block('achievementCard');

type Props = {
    type: AchievementType;
    achievedAt?: string;
};

export const AchievementCard: FC<Props> = ({type, achievedAt}) => {
    const meta = ACHIEVEMENT_META[type];

    if (!meta) return;

    return (
        <Card className={b()} type="action" view="filled" size="l">
            <div className={b('imgContainer')}>
                <img src={meta.imageUrl} alt={meta.title} className={b('img')} />
            </div>

            <div className={b('info')}>
                <Text variant="subheader-3">{meta.title}</Text>
                <Text variant="body-1">{meta.description}</Text>
                {achievedAt && (
                    <Text variant="body-1">
                        Получено: {new Date(achievedAt).toLocaleDateString()}
                    </Text>
                )}
            </div>
        </Card>
    );
};
