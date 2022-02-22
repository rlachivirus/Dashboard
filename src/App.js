import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

function Weather() {
  const [ weather, setWeather ] = useState(null);

  useEffect(() => {
    axios.get('http://api.weatherapi.com/v1/forecast.json?key=3d83602b387a49c39ba33428222102&q=New York&days=7&aqi=no&alerts=no')
      .then((response) => setWeather(response.data))
  }, []);

  if ((!weather)) return null;
  // console.log(weather)
  return (
    <div className='weather'>
      {/* <div className='forecast'> */}
        {weather.forecast.forecastday.map((weath) => {
          return (
            <div key={weath.date} className='forecast'>
              <span className='forecast-date'>{weath.date}</span>
              <img className='forecast-img' src={weath.day.condition.icon} />
              <span className='forecast-text'>{weath.day.condition.text}</span>
              <span className='forecast-temp'>{`${weath.day.mintemp_f}° / ${weath.day.maxtemp_f}°`}</span>
            </div>
            )
          })}
          {/* </div> */}
    </div>
  )
}

function TodoForm(props) {
  const [ todo, setTodo ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    props.addTodo(todo);
    setTodo('');
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  return (
    <form className='input-form' onSubmit={handleSubmit}>
      <label>Add things to do</label>
      <br/>
      <input type='text' value={todo} onChange={handleChange}/>
      <input type='submit' value='Add'/>
    </form>
  )
}

function TodoList(props) {

  const sendToDone = (idx) => {

    props.done(idx);
  }

  return (
    <label>To dos
      <hr />
      <div className='todos'>
        <ul className='todo-lists'>
          {props.lists.map((list, idx) => {

              return (
                <span className='todo-memo' key={`todo-${idx}`}>
                  <p>{list}</p>
                  <button onClick={() => sendToDone(idx)}>></button>
                </span>
              )
            })}
        </ul>
      </div>
    </label >
  )
}

function TodoDone(props) {
  return (
    <label>Done
      <hr />
      <div className='done'>
        <ul className='done-lists'>
          {props.done.map((list, idx) => {

            return <span className='done-memo' key={`todo-${idx}`}>{list}</span>
          })}
        </ul>
      </div>
    </label>
  )
}

function Calculator() {

  const [ firstNum, setFirstNum ] = useState('0');
  const [ secondNum, setSecondNum ] = useState('');
  const [ result, setResult ] = useState(null);
  const [ sign, setSign ] = useState('');
  // const numbers = [];

  const handleNumbers = (e) => {
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
          setFirstNum(prevState => prevState + e.target.innerText);
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
          setSecondNum(prevState => prevState + e.target.innerText);
        }
      }
    }
  }

  const handleSign = (e) => {
    console.log(e.target.innerText)
    setSign(e.target.innerText)
  }

  console.log(firstNum)
  console.log(secondNum)
  console.log(sign)
  return (
    <div className='calculator'>
      <span className='calculator-result'>{ result ? result : secondNum.length === 0 ? firstNum : secondNum }</span>
      <div className='row'>
        <span className='icons'>AC</span>
        <span className='icons' onClick={handleSign}>+/-</span>
        <span className='icons'>%</span>
        <span className='icons'>÷</span>
      </div>
      <div className='row'>
        <span className='numbers' onClick={handleNumbers}>7</span>
        <span className='numbers' onClick={handleNumbers}>8</span>
        <span className='numbers' onClick={handleNumbers}>9</span>
        <span className='icons'>×</span>
      </div>
      <div className='row'>
        <span className='numbers' onClick={handleNumbers}>4</span>
        <span className='numbers' onClick={handleNumbers}>5</span>
        <span className='numbers' onClick={handleNumbers}>6</span>
        <span className='icons'>-</span>
      </div>
      <div className='row'>
        <span className='numbers' onClick={handleNumbers}>1</span>
        <span className='numbers' onClick={handleNumbers}>2</span>
        <span className='numbers' onClick={handleNumbers}>3</span>
        <span className='icons' onClick={handleSign}>+</span>
      </div>
      <div className='row'>
        <span className='num-zero' onClick={handleNumbers}>0</span>
        <span className='numbers' onClick={handleNumbers}>.</span>
        <span className='icons'>=</span>
      </div>
    </div>
  )
}

function HelloWorld() {
  const initialWord = '';

  const [ word, setWord ] = useState(initialWord);

  useEffect(() => {
    const changeFont = setInterval(() => {
      let font = document.getElementById('helloWorld');
      // console.log(font.style.fontFamily)
      if (font.style.fontFamily === 'times') {
        font.style.fontFamily = 'comicsansms'
        setWord('World!');
      } else if (font.style.fontFamily === 'comicsansms') {
        font.style.fontFamily = 'helvetica'
        setWord('World!!');
      } else if (font.style.fontFamily === 'helvetica') {
        font.style.fontFamily = 'times'
        setWord('World!!!');
      } else if (font.style.fontFamily !== 'default') {
        font.style.fontFamily = 'times'
        setWord('World');
      }
    }, 1000)

    return () => clearInterval(changeFont);
  })

  return (
    <p>Hello <span id='helloWorld'>{word}</span></p>
  )
}

function App() {
  const todoLists = [];
  const doneLists = []

  const [ lists, setLists ] = useState(todoLists);
  const [ done, setDone ] = useState(doneLists);

  const todoDone = (idx) => {
    let newList = lists.splice(idx, 1)
    setLists([...lists]);
    setDone([...done, newList]);
  }

  const addTodo = (todo) => {
    setLists([...lists, todo]);
  }

  return (
    <div className='entire-structure'>
      <HelloWorld />
      <Weather />
      <div className='todo-structure'>
        <div>
          <TodoForm addTodo={addTodo}/>
          <Calculator />
        </div>
        <TodoList lists={lists} done={todoDone}/>
        <TodoDone done={done}/>
      </div>
    </div>
  );
}

export default App;
