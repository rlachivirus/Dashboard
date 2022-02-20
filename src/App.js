import React, { useState, useEffect } from 'react';
import './App.css';

function Weather() {
  return (
    <div className='weather'>
      SHOW WEATHER
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
  return (
    <div className='calculator'>
      CALCULATOR
    </div>
  )
}

function HelloWorld() {
  const initialWord = '';

  const [ word, setWord ] = useState(initialWord);

  useEffect(() => {
    const changeFont = setInterval(() => {
      let font = document.getElementById('helloWorld');
      console.log(font.style.fontFamily)
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
