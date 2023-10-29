import { LoginForm } from '@/features/authByUsername';
import { Page } from '@/widgets/Page';

import cls from './LoginPage.module.scss';

const LoginPage = () => (
    <Page className={cls.LoginPage}>
        <LoginForm />
    </Page>
);

export default LoginPage;
