import React from 'react';
import Balance from './Balance.js';
import Cards from './Cards.js';
import Statistics from './Statistics.js';

const Profile = () => {

    return (
        <section className="portfolio">
            <Balance />
            <Cards />
            <Statistics />
        </section>
    );
}
 
export default Profile;