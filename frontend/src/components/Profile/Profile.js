import React, { useContext } from 'react';
import { portfolioContext } from '../../portfolioContext';

const Profile = () => {
    const {portfolio} = useContext(portfolioContext);
    return (
        <div>
            <h1>Portfolio</h1>
            <h2>I currently have: {portfolio.portfolio[0].amount} {portfolio.portfolio[0].symbol}</h2>
        </div>
    );
}
 
export default Profile;