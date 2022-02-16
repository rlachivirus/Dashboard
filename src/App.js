import React, { useState, useEffect } from 'react';
import './App.css';

function Weather() {
  return (
    <div>
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
    <form onSubmit={handleSubmit}>
      <label>Things to do</label>
      <br/>
      <input type='text' value={todo} onChange={handleChange}/>
      <input type='submit' value='Add'/>
    </form>
  )
}

function TodoList(props) {
  return (
    <div>
      <ul>
        {props.lists.map((list, idx) => {
            return <li key={`todo-${idx}`}>{list}</li>
          })}
      </ul>
    </div>
  )
}

function TodoDone() {
  return (
    <div>

    </div>
  )
}

function Calculator() {
  return (
    <div>

    </div>
  )
}

function App() {
  const todoLists = [];

  const [ lists, setLists ] = useState(todoLists);

  const addTodo = (todo) => {
    setLists([...lists, todo]);
  }

  return (
    <div>
      <Weather />
      <TodoForm addTodo={addTodo}/>
      <TodoList lists={lists}/>
      <TodoDone />
      <Calculator />
    </div>
  );
}

export default App;
