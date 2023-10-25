import { memo, ReactNode, useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames';

import cls from './Page.module.scss';

interface PageProps {
    children: ReactNode;
    className?: string;
}

export const Page = memo(({ children, className }: PageProps) => {
    const [mountAnimateClass, setMountAnimateClass] = useState<string>('');

    useEffect(() => {
        setMountAnimateClass(cls.mount);
    }, []);

    return (
        <main
            className={classNames(cls.Page, {}, [className, mountAnimateClass])}
        >
            {children}
            <div style={{ height: '100px' }} />
        </main>
    );
});
