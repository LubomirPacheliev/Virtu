import React, { useEffect, useContext, useRef, createRef } from 'react';
import fetch from 'isomorphic-fetch';
import { Link, useHistory} from 'react-router-dom';
import { FirebaseContext } from '../../utils/firebase';
import { useCookies } from 'react-cookie';

const Register = ({asideRef}) => {
    const history = useHistory();
    const { app, auth } = useContext(FirebaseContext);
    const [cookies, setCookies] = useCookies();
    const [emailRef, passRef, repassRef] = [
        createRef(),
        createRef(),
        createRef()
    ];
    

    useEffect(() => {
        asideRef.current.style.display = 'none';
        return () => {
            asideRef.current.style.display = 'flex';
        }
    });

    const registerFirebase = async () => {
        if (passRef.current.value !== repassRef.current.value) return alert('passwords need to match');
        const user = { email: emailRef.current.value, password: passRef.current.value };
        await fetch('http://localhost:5000/auth/register', {
            method: 'POST', 
            body: JSON.stringify(user), 
            headers: {'Content-Type': 'application/json'}
        });
        try {
            await auth.createUserWithEmailAndPassword(auth.getAuth(app), emailRef.current.value, passRef.current.value);
            setCookies('email', user.email);
            history.push('/profile');
        } catch(error) {
            return alert(error.message);
        }
    }

    return (
        <section className="auth">
            <article className="auth-bg"></article>
            <article className="auth-form">
                <input type="text" placeholder="your email" ref={emailRef} />
                <input type="password" placeholder="your password" ref={passRef} />
                <input type="password" placeholder="confirm your password" ref={repassRef} />
                <button className="btn-login" onClick={registerFirebase}>register</button>
                <Link to="/login">You've already registered?</Link>
            </article>
            <a className="auth-goback" onClick={() => history.push('/profile')}>Go Back</a>
        </section>
    );
}
 
export default Register;