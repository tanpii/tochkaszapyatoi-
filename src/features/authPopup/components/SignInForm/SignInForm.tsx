import {FC, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Button, TextInput, Text} from '@gravity-ui/uikit';

import block from 'bem-cn-lite';
import './SignInForm.scss';
import {useSignIn} from '@/shared/api/auth';
import {closeAuthPopup} from '../../model/slice';
import {useDispatch} from 'react-redux';

const b = block('signInForm');

type FormValues = {
    email: string;
    password: string;
};

export const SignInForm: FC = () => {
    const dispatch = useDispatch();
    const {mutate: signIn, isPending} = useSignIn();
    const [globalError, setGlobalError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        setGlobalError(null);

        signIn(
            {...data},
            {
                onSuccess: () => {
                    dispatch(closeAuthPopup());
                },
                onError: () => {
                    setGlobalError('Что-то пошло не так! Проверьте правильность данных.');
                },
            },
        );
    };

    return (
        <form className={b()} onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                label="Почта"
                {...register('email', {required: 'Обязательное поле'})}
                errorMessage={errors.email?.message}
                type="email"
                hasClear
                size="l"
            />
            <TextInput
                label="Пароль"
                {...register('password', {required: 'Обязательное поле'})}
                errorMessage={errors.password?.message}
                type="password"
                hasClear
                size="l"
            />

            {globalError && (
                <Text color="danger" className={b('error')}>
                    {globalError}
                </Text>
            )}

            <Button loading={isPending} type="submit" view="action" size="l">
                Войти
            </Button>
        </form>
    );
};
