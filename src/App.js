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
      <div className='todos'>
        <ul className='todo-lists'>
          {props.lists.map((list, idx) => {

              return (
                <span key={`todo-${idx}`}>{list}
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
      <div className='done'>
        <ul className='done-lists'>
          {props.done.map((list, idx) => {

            return <span key={`todo-${idx}`}>{list}</span>
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
