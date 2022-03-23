import React, { useState } from 'react';

function Calculator({ checkedStatus }) {

    const [firstNum, setFirstNum] = useState('0');
    const [secondNum, setSecondNum] = useState('');
    const [result, setResult] = useState(null);
    const [sign, setSign] = useState('');

    const handleNumbers = (e) => {
        setResult(null)
        if (sign === '') {
            if (firstNum === '0') {
                if (e.target.innerText === '.' && !firstNum.includes('.')) {
                    setFirstNum('0.');
                } else {
                    setFirstNum(e.target.innerText);
                }
            } else {
                if (e.target.innerText === '.' && firstNum.includes('.')) {
                } else {
                    if (firstNum.length < 8) {
                        setFirstNum(prevState => prevState + e.target.innerText);
                    }
                }
            }
        } else {
            if (secondNum.length === 0) {
                if (e.target.innerText === '.' && !secondNum.includes('.')) {
                    setSecondNum('0.');
                } else {
                    setSecondNum(e.target.innerText);
                }
            } else {
                if (e.target.innerText === '.' && secondNum.includes('.')) {
                } else {
                    if (secondNum.length < 8) {
                        setSecondNum(prevState => prevState + e.target.innerText);
                    }
                }
            }
        }
    }

    const handleSign = (e) => {
        if (e.target.innerText === 'AC') {
            if (result) {
                setResult(null)
            } else if (secondNum) {
                setSecondNum('');
            } else if (firstNum) {
                setFirstNum('0')
                setSign('');
            }
        } else if (e.target.innerText === '+/-') {
            if (result) {
                setResult(prevState => -(prevState));
            } else if (secondNum) {
                setSecondNum(prevState => -(prevState));
            } else if (firstNum) {
                setFirstNum(prevState => -(prevState));
            }
        } else if (e.target.innerText === '%') {
            if (result) {
                setResult(prevState => prevState / 100);
            } else if (secondNum) {
                setSecondNum(prevState => prevState / 100);
            } else if (firstNum) {
                setFirstNum(prevState => prevState / 100);
            }
        } else {
            setSign(e.target.innerText)
        }
    }

    const handleResult = () => {
        let num = '';

        if (firstNum && secondNum && sign) {
            if (sign === '+') {
                // setResult(Number(firstNum) + Number(secondNum));
                num = Number(firstNum) + Number(secondNum);
            } else if (sign === '-') {
                // setResult(Number(firstNum) - Number(secondNum));
                num = Number(firstNum) - Number(secondNum);
            } else if (sign === '×') {
                // setResult(Number(firstNum) * Number(secondNum));
                num = Number(firstNum) * Number(secondNum);
            } else if (sign === '÷') {
                if (secondNum === '0') {
                    setResult('Error')
                } else {
                    // setResult(Number(firstNum) / Number(secondNum));
                    num = Number(firstNum) / Number(secondNum);
                }
            }
        }

        let numInStr = String(num)

        if (numInStr.length > 8) {
            setResult('Broken..')
        } else {
            setResult(numInStr);
        }

        setFirstNum('0');
        setSecondNum('');
        setSign('');
    }

    return (
        <div className={checkedStatus ? 'calculator-dark' : 'calculator'}>
            <span className={checkedStatus ? 'calculator-result-dark' : 'calculator-result'}>{result ? result : secondNum.length === 0 ? firstNum : secondNum}</span>
            <div className='row'>
                <span className={checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>AC</span>
                <span className={checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>+/-</span>
                <span className={checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>%</span>
                <span className={checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>÷</span>
            </div>
            <div className='row'>
                <span className={checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>7</span>
                <span className={checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>8</span>
                <span className={checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>9</span>
                <span className={checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>×</span>
            </div>
            <div className='row'>
                <span className={checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>4</span>
                <span className={checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>5</span>
                <span className={checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>6</span>
                <span className={checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>-</span>
            </div>
            <div className='row'>
                <span className={checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>1</span>
                <span className={checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>2</span>
                <span className={checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>3</span>
                <span className={checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>+</span>
            </div>
            <div className='row'>
                <span className={checkedStatus ? 'num-zero-dark' : 'num-zero'} onClick={handleNumbers}>0</span>
                <span className={checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>.</span>
                <span className={checkedStatus ? 'icons-dark' : 'icons'} onClick={handleResult}>=</span>
            </div>
        </div>
    )
}

export default Calculator;