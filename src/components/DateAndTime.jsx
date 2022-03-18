import React, { useState, useEffect } from 'react';

function DateAndTime() {

    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const changeTime = setInterval(() => {
            setTime(new Date());
        }, 1000)

        return () => clearInterval(changeTime);
    })

    let monthInitials = { 1: 'JAN', 2: 'FEB', 3: 'MAR', 4: 'APR', 5: 'MAY', 6: 'JUN', 7: 'JUL', 8: 'AUG', 9: 'SEPT', 10: 'OCT', 11: 'NOV', 12: 'DEC' }
    let splitDate = date.toLocaleDateString().split('/');
    splitDate[0] = monthInitials[splitDate[0]];
    let customDate = splitDate.join('.');

    return (
        <div className='timeAndDate'>
            <p className='date'>{customDate}</p>
            <p className='time'>{time.toLocaleTimeString()}</p>
        </div>
    )
}

export default DateAndTime;