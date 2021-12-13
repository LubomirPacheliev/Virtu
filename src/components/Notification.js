import React from 'react';

const Notification = ({msg}) => {
    return (
        <div className="error-msg">
            <p>{msg}</p>
            <button>x</button>
        </div>
    );
}
 
export default Notification;