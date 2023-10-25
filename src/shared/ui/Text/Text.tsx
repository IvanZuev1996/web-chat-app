import { ReactNode, memo } from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames';

import cls from './Text.module.scss';

type TextSize = 'XS' | 'S' | 'LARGE_S' | 'M' | 'L' | 'XL';
type HeaderTagType = 'h1' | 'h2' | 'h3' | 'p';
type TextTheme = 'primary' | 'error';
type TextAlign = 'center' | 'left' | 'right';
type TextWeight = 'normal_weight' | 'bold_weight';

interface TextProps {
    className?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    weight?: TextWeight;
    max?: boolean;
    children?: ReactNode;
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    XS: 'p',
    S: 'p',
    LARGE_S: 'p',
    M: 'h3',
    L: 'h2',
    XL: 'h1'
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        children,
        max,
        align = 'left',
        theme = 'primary',
        size = 'S',
        weight = 'normal_weight'
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    const mods: Mods = {
        [cls.max]: max
    };

    return (
        <div
            className={classNames('', mods, [
                className,
                cls[theme],
                cls[align],
                cls[size]
            ])}
        >
            {children && (
                <HeaderTag className={classNames(cls.text, {}, [cls[weight]])}>
                    {children}
                </HeaderTag>
            )}
        </div>
    );
});
