import React, { useEffect, useContext, createRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../utils/firebase';
import fetch from 'isomorphic-fetch';

const Register = ({asideRef}) => {
    const history = useHistory();
    const { app, auth, setEmail } = useContext(FirebaseContext);
    const [emailRef, passRef] = [
        createRef(),
        createRef()
    ];
    

    useEffect(() => {
        asideRef.current.style.display = 'none';
        return () => {
            asideRef.current.style.display = 'flex';
        }
    });

    const loginFirebase = async () => {
        const user = { email: emailRef.current.value, password: passRef.current.value };
        await fetch('http://localhost:5000/auth/login', {
            method: 'POST', 
            body: JSON.stringify(user), 
            headers: {'Content-Type': 'application/json'}
        });
        await auth.signInWithEmailAndPassword(auth.getAuth(app), emailRef.current.value, passRef.current.value);
        await setEmail(user.email);
        history.push('/profile');
    }

    return (
        <section className="auth">
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
 
export default Register;