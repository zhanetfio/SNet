import React from 'react';
import {Checkbox, Input, Space} from 'antd';
import styles from './Login.module.css'
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {Redirect} from 'react-router-dom';
import {login} from './auth-reducer';
import {useFormik} from 'formik';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captchaUrl?: string
}

export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const captchaUrl = useAppSelector(state => state.auth.captchaUrl)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captchaUrl: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 3) {
                errors.password = 'Must be more than 3 symbols'
            }
            return errors;
        },
        onSubmit: ({email, password, rememberMe, captchaUrl}) => {
            dispatch(login(email, password, rememberMe, captchaUrl))
        },
    })

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <p>To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                               target={'_blank'} rel="noopener noreferrer">here</a> or
                    use common test
                    account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>
            <div className={styles.container}>
                <h1 className={styles.login}>Login</h1>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <Space direction="vertical">
                        <Input placeholder="Login"
                               {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email && formik.touched.email &&
                            <div className={styles.error}>{formik.errors.email}</div>}
                        <Input.Password
                            placeholder="Password"
                            {...formik.getFieldProps('password')}
                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        />
                    </Space>
                    {formik.errors.password && formik.touched.password &&
                        <div className={styles.error}>{formik.errors.password}</div>}
                    <div className={styles.rememberMe}>
                        <Checkbox
                            checked={formik.values.rememberMe}
                            {...formik.getFieldProps('rememberMe')}
                        /> Remember me
                    </div>
                    {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
                    {captchaUrl && <input className={styles.captchaInput}
                                          {...formik.getFieldProps('captchaUrl')}
                    />}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

