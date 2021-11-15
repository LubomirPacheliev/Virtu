import React, { useState } from 'react';

const Profile = () => {
    const [assets, setAssets] = useState([{amount: 1000, symbol: 'USDT'}]);
    return (
        <div>
            <h1>Portfolio</h1>
            <h2>I currently have: {assets[0].amount} {assets[0].symbol}</h2>
        </div>
    );
}
 
export default Profile;