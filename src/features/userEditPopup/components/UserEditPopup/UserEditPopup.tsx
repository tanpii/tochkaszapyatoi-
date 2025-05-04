import {useCallback} from 'react';
import {Button, Modal, TextInput} from '@gravity-ui/uikit';
import {dateTimeParse, DateTime, dateTime} from '@gravity-ui/date-utils';
import {DatePicker} from '@gravity-ui/date-components';
import {ChangeUserParams, User} from '@/shared/api/user';
import {FileUpload} from '@/shared/components';
import {useForm, Controller} from 'react-hook-form';

import block from 'bem-cn-lite';
import './UserEditPopup.scss';
const b = block('userEditPopup');

export interface UserEditPopupProps {
    initialValue: User;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: ChangeUserParams) => void;
}

export const UserEditPopup = ({initialValue, isOpen, onClose, onSubmit}: UserEditPopupProps) => {
    const {
        control,
        getValues,
        setValue,
        formState: {errors},
    } = useForm<{
        email: string;
        firstName: string;
        lastName: string;
        birthDate: DateTime;
        password: string;
        profileImage?: File;
    }>({
        defaultValues: {
            email: initialValue.email,
            firstName: initialValue.firstName,
            lastName: initialValue.lastName,
            birthDate: dateTime({input: initialValue.birthDate}),
            password: '',
            profileImage: undefined,
        },
    });

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = useCallback(() => {
        const data = getValues();
        onSubmit({
            ...data,
            birthDate: data.birthDate.format('YYYY-MM-DD'),
        });
    }, [onSubmit]);

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <div className={b()}>
                <div className={b('form')}>
                    <Controller
                        name="email"
                        control={control}
                        render={({field}) => (
                            <TextInput
                                {...field}
                                label="Почта"
                                type="email"
                                hasClear
                                size="l"
                                error={errors.email && 'Некорректная почта'}
                            />
                        )}
                    />
                    <Controller
                        name="firstName"
                        control={control}
                        render={({field}) => (
                            <TextInput
                                {...field}
                                label="Имя"
                                hasClear
                                size="l"
                                error={errors.firstName && 'Имя обязательно'}
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({field}) => (
                            <TextInput
                                {...field}
                                label="Фамилия"
                                hasClear
                                size="l"
                                error={errors.lastName && 'Фамилия обязательна'}
                            />
                        )}
                    />
                    <Controller
                        name="birthDate"
                        control={control}
                        render={({field}) => (
                            <DatePicker
                                {...field}
                                label="Дата рождения"
                                placeholder=" "
                                value={dateTimeParse(field.value)}
                                onUpdate={(value) => value && setValue('birthDate', value)}
                                size="l"
                                errorMessage={errors.birthDate && 'Дата рождения обязательна'}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({field}) => (
                            <TextInput
                                {...field}
                                label="Пароль"
                                type="password"
                                hasClear
                                size="l"
                                error={errors.password && 'Пароль обязателен'}
                            />
                        )}
                    />
                    <Controller
                        name="profileImage"
                        control={control}
                        render={({field}) => (
                            <FileUpload
                                {...field}
                                placeholder="Изменить фото профиля"
                                onFileChange={(file) => file && setValue('profileImage', file)}
                                value={field.value ? URL.createObjectURL(field.value) : ''}
                            />
                        )}
                    />
                </div>
                <Button view="action" onClick={handleSubmit} size="l">
                    Изменить
                </Button>
                <Button onClick={handleClose} size="l">
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};

export default UserEditPopup;
