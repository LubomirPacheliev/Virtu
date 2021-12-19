import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../utils/firebase';
import { useCookies } from 'react-cookie';
import { GuestCtx } from '../../utils/GuestCtx';

const Balance = () => {
    const [cookies, setCookies] = useCookies();
    const [balance, setBalance] = useState(1000);
    const { firestore, firestoreInstance } = useContext(FirebaseContext);
    const { guestUSDT } = useContext(GuestCtx);
    const email = cookies.email;

    useEffect(async () => {
        if (typeof email !== 'undefined') {
            const docRef = await firestore.getDoc(firestore.doc(firestoreInstance, 'assets/' + email));
            const docVal = await docRef.data();
            setBalance(docVal.capital);
        } else {
            setBalance(guestUSDT);
        }
    }, []);

    return (
        <div>
            <h1 className="h1-portfolio">portfolio</h1>
            <article className="balance-usdt">
                <h3 className="one-em">your balance <br></br><h1>{balance} USDT</h1></h3>
            </article>
        </div>
    );
}
 
export default Balance;