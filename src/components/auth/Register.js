import React, { useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';

const Register = ({asideRef}) => {
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
                <input type="password" placeholder="confirm your password" />
                <button className="btn-login">register</button>
                <Link to="/login">You've already registered?</Link>
            </article>
            <a className="auth-goback" onClick={() => history.push('/profile')}>Go Back</a>
        </section>
    );
}
 
export default Register;