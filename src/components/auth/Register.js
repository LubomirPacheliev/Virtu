import React, { useEffect, useContext, useRef, createRef } from 'react';
import fetch from 'isomorphic-fetch';
import { Link, useHistory} from 'react-router-dom';
import { FirebaseContext } from '../../utils/firebase';

const Register = ({asideRef}) => {
    const history = useHistory();
    const { app, auth } = useContext(FirebaseContext);
    const [email, pass, repass] = [
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
        if (pass.current.value !== repass.current.value) return alert('password need to match');
        const user = { email: email.current.value, password: pass.current.value };
        await fetch('http://localhost:5000/auth/register', {
            method: 'POST', 
            body: JSON.stringify(user), 
            headers: {'Content-Type': 'application/json'}
        });
        history.push('/profile');
    }

    return (
        <section className="auth">
            <article className="auth-bg"></article>
            <article className="auth-form">
                <input type="text" placeholder="your email" ref={email} />
                <input type="password" placeholder="your password" ref={pass} />
                <input type="password" placeholder="confirm your password" ref={repass} />
                <button className="btn-login" onClick={registerFirebase}>register</button>
                <Link to="/login">You've already registered?</Link>
            </article>
            <a className="auth-goback" onClick={() => history.push('/profile')}>Go Back</a>
        </section>
    );
}
 
export default Register;