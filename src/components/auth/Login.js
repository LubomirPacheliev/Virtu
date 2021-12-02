import React, { useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';

const Login = ({asideRef}) => {
    const history = useHistory();

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
                <Link to="/register">You haven't registered yet?</Link>
            </article>
            <a className="auth-goback" onClick={() => history.push('/profile')}>Go Back</a>
        </section>
    );
}
 
export default Login;