import {useCallback} from 'react';
import {Book} from '@/shared/api/book';
import {Rating} from '@/shared/components';
import {AgeLimit} from '@/shared/components/AgeLimit/AgeLimit';
import stubImage from '@/shared/assets/stub.jpg';

import block from 'bem-cn-lite';
import './BookImage.scss';
const b = block('bookImage');

interface BookImageProps {
    book: Pick<Book, 'bookName' | 'photoUrl' | 'rating' | 'ageLimit'>;
}

export const BookImage = ({book}: BookImageProps) => {
    const {bookName, photoUrl, rating, ageLimit} = book;

    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = stubImage;
    }, []);

    return (
        <div className={b('imgContainer')}>
            {rating > 0 && <Rating rating={rating} className={b('rate')} />}
            <img 
                className={b('img')} 
                src={photoUrl || stubImage} 
                alt={bookName}
                loading="lazy"
                onError={handleImageError}
            />
            {ageLimit >= 12 && <AgeLimit ageLimit={ageLimit} className={b('ageLimit')} />}
        </div>
    );
};

export default BookImage; 