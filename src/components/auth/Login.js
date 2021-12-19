import React, { useEffect, useContext, createRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../utils/firebase';
import fetch from 'isomorphic-fetch';
import { useCookies } from 'react-cookie';
import Notification from '../Notification';

const Login = ({asideRef}) => {
    const history = useHistory();
    const { app, auth } = useContext(FirebaseContext);
    const [cookies, setCookies] = useCookies();
    const [emailRef, passRef] = [
        createRef(),
        createRef()
    ];
    const [error, setError] = useState({});
    

    useEffect(() => {
        asideRef.current.style.display = 'none';
        return () => {
            asideRef.current.style.display = 'flex';
        }
    });

    const loginFirebase = async () => {
        const user = { email: emailRef.current.value, password: passRef.current.value };
        try {
            await auth.signInWithEmailAndPassword(auth.getAuth(app), emailRef.current.value, passRef.current.value);
            await fetch('http://localhost:5000/auth/login', {
                method: 'POST', 
                body: JSON.stringify(user), 
                headers: {'Content-Type': 'application/json'}
            });
            setCookies('email', user.email);
            history.push('/profile');
        } catch(e) {
            setError({error: true, msg: e.message});
            setTimeout(() => {
                setError({error: false});
            }, 3000);
            return clearTimeout();
        }
    }

    return (
        <section className="auth">
            {error.error && <Notification msg={error.msg} parent="auth-error" />}
            <article className="auth-bg"></article>
            <article className="auth-form">
                <input type="text" placeholder="your email" ref={emailRef} />
                <input type="password" placeholder="your password" ref={passRef} />
                <button className="btn-login" onClick={loginFirebase}>login</button>
                <Link to="/register">You haven't registered yet?</Link>
            </article>
            <a className="auth-goback" onClick={() => history.push('/profile')}>Go Back</a>
        </section>
    );
}
 
export default Login;