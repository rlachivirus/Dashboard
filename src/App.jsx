import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import axios from 'axios'
import Switch from 'react-switch'
import initialData from './initial-data';

function Column(props) {

  return (
    <div className={props.checkedStatus ? 'todos-dark' : 'todos'}>
      <div className={props.checkedStatus ? 'column-header-dark' : 'column-header'}>
        <div className='empty-placeholder'> </div>
        <p className='column-title'>{props.column.title}</p>
        <TodoForm title={props.column.title} iniData={props.iniData} addTodo={props.addTodo} />
      </div>
      <Droppable droppableId={props.column.id}>
        {provided => (
          <ul
            className='todo-lists'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <>
                    <p 
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={props.checkedStatus ? 'todo-memo-dark' : 'todo-memo'}
                    >
                      <span>{props.column.title === 'To do' ? index + 1 : null}</span><br />
                      {task.content}
                    </p>
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}

function TodoList(props) {
  // const [ iniData, setIniData ] = useState(props.initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = props.iniData.columns[source.droppableId];
    const finish = props.iniData.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
  
      const newState = {
        ...props.iniData,
        columns: {
          ...props.iniData.columns,
          [newColumn.id]: newColumn,
        }
      }
  
      props.setIniData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...props.iniData,
      columns: {
        ...props.iniData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    props.setIniData(newState);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {props.iniData.columnOrder.map(columnId => {
        const column = props.iniData.columns[columnId];
        const tasks = column.taskIds.map(taskId => props.iniData.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} iniData={props.iniData} addTodo={props.addTodo} checkedStatus={props.checkedStatus}/>
      })}
    </DragDropContext>
  )
}


function Weather(props) {
  const [ weather, setWeather ] = useState(null);
  const [ degreeType, setDegreeType ] = useState('F')

  useEffect(() => {
    axios.get('http://api.weatherapi.com/v1/forecast.json?key=3d83602b387a49c39ba33428222102&q=New York&days=7&aqi=no&alerts=no')
      .then((response) => setWeather(response.data))
  }, [weather]);

  // const changeDegree = () => {
  //   if (degreeType === 'F') {
  //     setDegreeType('C');
  //   } else {
  //     setDegreeType('F');
  //   }
  // }
  let day = { '1': 'MONDAY', '2': 'TUESDAY', '3': 'WEDNESDAY', '4': 'THURSDAY', '5': 'FRIDAY', '6': 'SATURDAY', '0': 'SUNDAY' };
  let d = new Date();
  let dayNum = d.getDay();

  if ((!weather)) return <div className={props.checkedStatus ? 'loadingSign-dark' : 'loadingSign'}>Loading...</div>;

  return (
    <div className={props.checkedStatus ? 'weather-dark' : 'weather'}>
      <p className={props.checkedStatus ? 'forecast-weekday-dark' : 'forecast-weekday'}>{day[dayNum]} • NEW YORK</p>
      <p className={props.checkedStatus ? 'forecast-temperature-dark' : 'forecast-temperature'}>{weather.current.temp_f}°F</p>
      <p className={props.checkedStatus ? 'forecast-condition-dark' : 'forecast-condition'}>{weather.current.condition.text.toUpperCase()}</p>
      <img className='forecast-image' src={weather.current.condition.icon} />
    </div>
  )
  // return (
  //   <div className='weather'>
  //     {weather.forecast.forecastday.map((weath) => {
  
  //       let temperature = degreeType === 'F' ? (
  //         <span className='forecast-temp'>{`${weath.day.mintemp_f}°F / ${weath.day.maxtemp_f}°F`}</span>
  //       ) : (
  //         <span className='forecast-temp'>{`${weath.day.mintemp_c}°C / ${weath.day.maxtemp_c}°C`}</span>
  //       )

  //       let splitDate = weath.date.split('-');
  //       let currMonth = splitDate[1][0] === '0' ? splitDate[1][1] : splitDate[1];
  //       let weatherDates = currMonth + '/' + splitDate[2] + '/' + splitDate[0];

  //       return (
  //         <div key={weath.date} className='forecast'>
  //           <span className='forecast-date'>{weatherDates}</span>
  //           <img className='forecast-img' src={weath.day.condition.icon} />
  //           <span className='forecast-text'>{weath.day.condition.text}</span>
  //           {/* <span className='forecast-temp'>{`${weath.day.mintemp_f}°F / ${weath.day.maxtemp_f}°F`}</span> */}
  //           {temperature}
  //         </div>
  //         )
  //       })}
  //     <button className='degreeType' onClick={() => changeDegree()}>{degreeType === 'F' ? '°C' : '°F'}</button>
  //   </div>
  // )
}

function TodoForm(props) {
  const [ todo, setTodo ] = useState('');
  const [ modal, setModal ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    props.addTodo(todo);
    setTodo('');
    setModal(false);
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleModal = (mod) => {
    if (mod) {
      setModal(true);
    } else {
      setModal(false);
    }
  }

  let showModal = modal === false ? (
    <div className='column-form' onClick={() => handleModal(true)}>{props.title === 'To do' ? '+' : null}</div>
  ) : (
    // <div className='modal-background' onClick={() => handleModal(false)}>
      <form className='input-form' onSubmit={handleSubmit}>
        <br />
        <input type='text' placeholder='Add New Todo' value={todo} onChange={handleChange} />
        <input type='submit' value='Add' />
      </form>
    // </div>
  )

  return showModal
}

// function TodoList(props) {

//   const sendToDone = (idx) => {
//     props.done(idx);
//   }

//   const priorityUp = (idx) => {
//     props.moveUp(idx);
//   }

//   const priorityDown = (idx) => {
//     props.moveDown(idx);
//   }

//   // let newTodo = Box('new todo')
//   return (
//     <div className={props.checkedStatus ? 'todos-dark' : 'todos'}>
//       <ul className='todo-lists'>
//         {/* {newTodo} */}
//         {props.lists.map((list, idx) => {
//             return (
//               <span className='todo-memo' key={`todo-${idx}`}>#{idx + 1}
//                 <p>{list}</p>
//                 <div className='todo-buttons'>
//                   <button onClick={() => sendToDone(idx)}>></button>
//                   <button onClick={() => priorityUp(idx)}>↑</button>
//                   <button onClick={() => priorityDown(idx)}>↓</button>
//                 </div>
//               </span>
//             )
//           })}
//       </ul>
//     </div>
//   )
// }

// function TodoDone(props) {
//   return (
//     <div className={props.checkedStatus ? 'done-dark' : 'done'}>
//       <ul className='done-lists'>
//         {props.done.map((list, idx) => {

//           return (
//             <span className='done-memo' key={`todo-${idx}`}>
//               <p>{list}</p>
//             </span>
//           )
//         })}
//       </ul>
//     </div>
//   )
// }

function Calculator(props) {

  const [ firstNum, setFirstNum ] = useState('0');
  const [ secondNum, setSecondNum ] = useState('');
  const [ result, setResult ] = useState(null);
  const [ sign, setSign ] = useState('');

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
    <div className={props.checkedStatus ? 'calculator-dark' : 'calculator'}>
      <span className={props.checkedStatus ? 'calculator-result-dark' : 'calculator-result'}>{ result ? result : secondNum.length === 0 ? firstNum : secondNum }</span>
      <div className='row'>
        <span className={props.checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>AC</span>
        <span className={props.checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>+/-</span>
        <span className={props.checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>%</span>
        <span className={props.checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>÷</span>
      </div>
      <div className='row'>
        <span className={props.checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>7</span>
        <span className={props.checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>8</span>
        <span className={props.checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>9</span>
        <span className={props.checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>×</span>
      </div>
      <div className='row'>
        <span className={props.checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>4</span>
        <span className={props.checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>5</span>
        <span className={props.checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>6</span>
        <span className={props.checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>-</span>
      </div>
      <div className='row'>
        <span className={props.checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>1</span>
        <span className={props.checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>2</span>
        <span className={props.checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>3</span>
        <span className={props.checkedStatus ? 'icons-dark' : 'icons'} onClick={handleSign}>+</span>
      </div>
      <div className='row'>
        <span className={props.checkedStatus ? 'num-zero-dark' : 'num-zero'} onClick={handleNumbers}>0</span>
        <span className={props.checkedStatus ? 'numbers-dark' : 'numbers'} onClick={handleNumbers}>.</span>
        <span className={props.checkedStatus ? 'icons-dark' : 'icons'} onClick={handleResult}>=</span>
      </div>
    </div>
  )
}

function HelloNewYork(props) {
  const initialWord = 'leave your day to me';

  const [ word, setWord ] = useState(initialWord);

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
    <div className={props.checkedStatus ? 'header-left-dark' : 'header-left'}>
      {/* <p className={props.checkedStatus ? 'header-title-dark' : 'header-title'}>LEAVE <br /> YOUR DAY <br /> <span className={props.checkedStatus ? 'header-title-span-dark' : 'header-title-span'}>TO ME</span></p> */}
      <p id='header-title1'>LEAVE</p>
      <p id='header-title2'>YOUR DAY</p>
      <p id='header-title3'>TO ME</p>
    </div>
  ) 
}

function DateAndTime() {

  const [ time, setTime ] = useState(new Date());
  const [ date, setDate ] = useState(new Date());

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

function App() {
  const [ iniData, setIniData ] = useState(initialData)

  const todoLists = [];
  const doneLists = []

  const [ lists, setLists ] = useState(todoLists);
  const [ done, setDone ] = useState(doneLists);
  const [ checked, setChecked ] = useState(false)

  const moveUp = (idx) => {
    if (idx - 1 >= 0) {
      let idxToMove = lists.splice(idx, 1);
      lists.splice(idx - 1, 0, idxToMove);
      setLists([...lists]);
    }
  }

  const moveDown = (idx) => {
    let idxToMove = lists.splice(idx, 1);
    lists.splice(idx + 1, 0, idxToMove);
    setLists([...lists]);
  }

  const todoDone = (idx) => {
    let newList = lists.splice(idx, 1)
    setLists([...lists]);
    setDone([newList, ...done]);
  }

  const addTodo = (todo) => {
    let orderNum = Object.keys(iniData.tasks).length;
    // setIniData((prevState) => ({
    //   ...prevState,
    //   tasks: {
    //     ...prevState.tasks,
    //     [`task-${orderNum + 1}`]: { id: `task-${orderNum + 1}`, content: todo }
    //   }
    // }))

    setIniData({
      ...iniData,
      tasks: {
        ...iniData.tasks,
        [`task-${orderNum + 1}`]: { id: `task-${orderNum + 1}`, content: todo },
      },
      columns: {
        ...iniData.columns,
        'column-1': {
          ...iniData.columns['column-1'],
          taskIds: [...iniData.columns['column-1'].taskIds, `task-${orderNum + 1}`]
        }
      }
    })
    }

  const handleChange = (checked) => {
    setChecked(checked)
  }

  return (
    <div className={checked ? 'entire-screen-dark' : 'entire-screen'}>
      <div className='entire-structure'>
        <div className='header'>
          <HelloNewYork checkedStatus={checked} />

          <div className={checked ? 'header-right-dark' : 'header-right'}>
            <Switch
              onChange={handleChange}
              checked={checked}
              uncheckedIcon={false}
              checkedIcon={false}
              offColor='#000' 
              onColor='#ffffff' 
              offHandleColor='#ffffff' 
              onHandleColor='#000' 
              handleDiameter={22} 
              width={55} 
            />
            <DateAndTime />
          </div>
        </div>
        <div className='main-body'>
          <Weather checkedStatus={checked} />
          <Calculator checkedStatus={checked} />
          <TodoList addTodo={addTodo} iniData={iniData} setIniData={setIniData} checkedStatus={checked} lists={lists} done={todoDone} moveUp={moveUp} moveDown={moveDown} />
          {/* <TodoForm iniData={iniData} addTodo={addTodo}/> */}
          {/* <TodoDone checkedStatus={checked} done={done} /> */}
        </div>

        {/* <Weather />

        <div className='todo-structure'>
          <div>
            <TodoForm addTodo={addTodo}/>
            <Calculator />
          </div>

          <div>
            <label>Todo</label>
            <TodoList lists={lists} done={todoDone} moveUp={moveUp} moveDown={moveDown}/>
          </div>

          <div>
            <label>Done</label>
            <TodoDone done={done}/>
          </div>
        </div>

        <p className='copyRight'>AK © 2022</p> */}
      </div>
    </div>
  );
}

export default App;
