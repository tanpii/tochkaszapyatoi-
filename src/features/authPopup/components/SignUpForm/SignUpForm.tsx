import {FC} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {DatePicker} from '@gravity-ui/date-components';
import {DateTime} from '@gravity-ui/date-utils';
import {Button, TextInput} from '@gravity-ui/uikit';
import {FileUpload} from '@/shared/components';

import block from 'bem-cn-lite';
import './SignUpForm.scss';
import {useSignUp} from '@/shared/api/auth';
import {closeAuthPopup} from '../../model/slice';
import {useDispatch} from 'react-redux';

const b = block('signUpForm');

type FormValues = {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: DateTime | null;
    password: string;
    profileImage?: FileList;
};

export const SignUpForm: FC = () => {
    const dispatch = useDispatch();
    const {mutate: signUp, isPending} = useSignUp();

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<FormValues>({
        reValidateMode: 'onBlur',
        defaultValues: {
            birthDate: null,
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data.birthDate);
        signUp(
            {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                birthDate: data.birthDate!.format('YYYY-MM-DD'),
                profileImage: data.profileImage?.[0],
            },
            {
                onSuccess: () => {
                    dispatch(closeAuthPopup());
                },
            },
        );
    };

    return (
        <form className={b()} onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                className={b('input')}
                label="Почта"
                {...register('email', {required: 'Обязательное поле'})}
                error={errors.email?.message}
                type="email"
                hasClear
                size="l"
            />
            <TextInput
                className={b('input')}
                label="Имя"
                {...register('firstName', {required: 'Обязательное поле'})}
                error={errors.firstName?.message}
                hasClear
                size="l"
            />
            <TextInput
                className={b('input')}

                label="Фамилия"
                {...register('lastName', {required: 'Обязательное поле'})}
                error={errors.lastName?.message}
                hasClear
                size="l"
            />
            <Controller
                name="birthDate"
                control={control}
                rules={{required: 'Обязательное поле'}}
                render={({field}) => (
                    <DatePicker
                        className={b('input')}
                        label="Дата рождения"
                        placeholder="ДД.ММ.ГГГГ"
                        value={field.value}
                        onUpdate={field.onChange}
                        validationState={errors.birthDate ? 'invalid' : undefined}
                        errorMessage={errors.birthDate?.message}
                        size="l"
                        format="DD.MM.YYYY"
                    />
                )}
            />
            <TextInput
                className={b('input')}
                label="Пароль"
                {...register('password', {required: 'Обязательное поле'})}
                error={errors.password?.message}
                type="password"
                hasClear
                size="l"
                autoComplete={false}
            />

            <Controller
                name="profileImage"
                control={control}
                render={({field}) => (
                    <FileUpload
                        placeholder="Добавить фото профиля"
                        onFileChange={(file) => field.onChange([file])}
                        value={field.value?.[0] ? URL.createObjectURL(field.value[0]) : ''}
                    />
                )}
            />

            <Button className={b('button')} loading={isPending} type="submit" view="action" size="l" >
                Зарегистрироваться
            </Button>
        </form>
    );
};
