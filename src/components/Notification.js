import React from 'react';

const Notification = ({msg, parent}) => {
    return (
        <div className={"error-msg " + parent}>
            <p>{msg}</p>
        </div>
    );
}
 
export default Notification;