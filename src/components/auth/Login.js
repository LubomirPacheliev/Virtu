import React, { useEffect, useContext, createRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../utils/firebase';

const Register = ({asideRef}) => {
    const history = useHistory();
    const { app, auth } = useContext(FirebaseContext);
    const [email, pass] = [
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
        await auth.signInWithEmailAndPassword(auth.getAuth(app), email.current.value, pass.current.value);
        history.push('/profile');
    }

    return (
        <section className="auth">
            <article className="auth-bg"></article>
            <article className="auth-form">
                <input type="text" placeholder="your email" ref={email} />
                <input type="password" placeholder="your password" ref={pass} />
                <button className="btn-login" onClick={loginFirebase}>login</button>
                <Link to="/register">You haven't registered yet?</Link>
            </article>
            <a className="auth-goback" onClick={() => history.push('/profile')}>Go Back</a>
        </section>
    );
}
 
export default Register;