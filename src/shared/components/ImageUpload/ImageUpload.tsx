import React, {useState, forwardRef} from 'react';
import {Icon, Button, Avatar} from '@gravity-ui/uikit';
import {Camera, Person} from '@gravity-ui/icons';

import block from 'bem-cn-lite';
import './ImageUpload.scss';
const b = block('imageUpload');

interface ImageUploadProps {
    placeholder: string;
    onFileChange: (file: File | null) => void;
    value?: string;
}

export const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
    ({placeholder, onFileChange, value}, ref) => {
        const [preview, setPreview] = useState<string | null>(value || null);

        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files ? event.target.files[0] : null;
            if (file) {
                setPreview(URL.createObjectURL(file));
                onFileChange(file);
            }
        };

        return (
            <div className={b()}>
                <input
                    type="file"
                    accept="image/*"
                    className="file-upload-input"
                    onChange={handleFileChange}
                    style={{display: 'none'}}
                    id="file-upload"
                    ref={ref}
                />
                <Button
                    onClick={() => document.getElementById('file-upload')?.click()}
                    size="l"
                    view="normal"
                >
                    <Icon data={Camera} />
                    {placeholder}
                </Button>
                <Avatar
                    className={b('preview')}
                    imgUrl={preview || undefined}
                    icon={Person}
                    size="xl"
                    theme="brand"
                    view="outlined"
                />
            </div>
        );
    },
);
