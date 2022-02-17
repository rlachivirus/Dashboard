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

  const sendToDone = (idx) => {
    props.done(idx);
  }

  return (
    <div>
      <label>To dos</label>
      <ul>
        {props.lists.map((list, idx) => {

            return (
              <li key={`todo-${idx}`}>{list}
              <button onClick={(idx) => sendToDone(idx)}>Done</button>
                {/* <button>-</button>
                <span>5</span>
                <button>+</button> */}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

function TodoDone(props) {
  return (
    <div>
      <label>Done</label>
      <ul>
        {props.done.map((list, idx) => {

          return <li key={`todo-${idx}`}>{list}</li>
        })}
      </ul>
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
    <div>
      <Weather />
      <TodoForm addTodo={addTodo}/>
      <TodoList lists={lists} done={todoDone}/>
      <TodoDone done={done}/>
      <Calculator />
    </div>
  );
}

export default App;
