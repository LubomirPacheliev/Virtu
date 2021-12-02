import React, { useEffect } from 'react';

const Login = ({asideRef}) => {
    useEffect(() => {
        asideRef.current.style.display = 'none';
        return () => {
            asideRef.current.style.display = 'flex';
        }
    });

    return (
        <section className="auth">
            <article className="auth-bg"></article>
            <article className="auth-form">
                <input type="text" placeholder="your email" />
                <input type="password" placeholder="your password" />
                <button className="btn-login">login</button>
            </article>
        </section>
    );
}
 
export default Login;