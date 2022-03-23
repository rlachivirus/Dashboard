import React, { useState, useEffect } from 'react';

function HeaderTitle({ checkedStatus }) {
    const initialWord = 'leave your day to me';

    const [word, setWord] = useState(initialWord);

    useEffect(() => {
        const changeFont = setInterval(() => {
            let title1 = document.getElementById('header-title1');
            let title2 = document.getElementById('header-title2');
            let title3 = document.getElementById('header-title3');
            // console.log(font.style.fontFamily)
            if (word === 'leave your day to me') {
                title1.innerText = 'LET ME';
                title2.innerText = 'HANDLE';
                title3.innerText = 'YOUR DAY';
                setWord('let me handle your day');
            } else if (word === 'let me handle your day') {
                title1.innerText = 'I WILL';
                title2.innerText = 'TAKE CARE OF';
                setWord('i will take care of your day');
            } else {
                title1.innerText = 'LEAVE';
                title2.innerText = 'YOUR DAY';
                title3.innerText = 'TO ME';
                setWord('leave your day to me');
            }
        }, 10000)

        return () => clearInterval(changeFont);
    })

    return (
        // <p className='helloNewYork'>Hello <span id='helloNewYork'>{word}</span></p>
        <div className={checkedStatus ? 'header-left-dark' : 'header-left'}>
            {/* <p className={props.checkedStatus ? 'header-title-dark' : 'header-title'}>LEAVE <br /> YOUR DAY <br /> <span className={props.checkedStatus ? 'header-title-span-dark' : 'header-title-span'}>TO ME</span></p> */}
            <p id='header-title1'>LEAVE</p>
            <p id='header-title2'>YOUR DAY</p>
            <p id='header-title3'>TO ME</p>
        </div>
    )
}

export default HeaderTitle;