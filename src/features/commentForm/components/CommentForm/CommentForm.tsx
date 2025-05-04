import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Button, TextArea, Text} from '@gravity-ui/uikit';
import {RatingInput} from '../RatingInput/RatingInput';

import block from 'bem-cn-lite';
import './CommentForm.scss';
const b = block('commentForm');

export interface ReviewFormProps {
    onSubmit?: (reviewData: {text: string; rating: number}) => void;
}

type FormValues = {
    text: string;
    rating: number;
};

export const CommentForm: React.FC<ReviewFormProps> = ({onSubmit}) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: {
            text: '',
            rating: 0,
        },
    });

    const onValidSubmit = (data: FormValues) => {
        onSubmit?.(data);
        reset();
    };

    return (
        <form className={b()} onSubmit={handleSubmit(onValidSubmit)}>
            <Controller
                name="text"
                control={control}
                rules={{required: 'Отзыв и оценка обязательны для заполнения'}}
                render={({field}) => (
                    <TextArea
                        {...field}
                        placeholder="Напишите ваш отзыв здесь..."
                        rows={4}
                        size="xl"
                        error={!!errors.text}
                    />
                )}
            />

            <div className={b('block')}>
                <Controller
                    name="rating"
                    control={control}
                    rules={{
                        validate: (value) =>
                            value > 0 || 'Отзыв и оценка обязательны для заполнения',
                    }}
                    render={({field}) => (
                        <RatingInput
                            totalStars={5}
                            initialRating={field.value}
                            onRatingChange={field.onChange}
                        />
                    )}
                />

                {(errors.text || errors.rating) && (
                    <Text color="danger" variant="body-2">
                        {errors.text?.message || errors.rating?.message}
                    </Text>
                )}

                <Button className={b('submitButton')} type="submit" view="action" size="xl">
                    Отправить свой
                </Button>
            </div>
        </form>
    );
};
