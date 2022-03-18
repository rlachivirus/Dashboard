import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import Switch from 'react-switch'
import initialData from './initial-data';
import Calculator from './components/Calculator';
import HeaderTitle from './components/HeaderTitle';
import DateAndTime from './components/DateAndTime';
import Weather from './components/Weather';

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


// function Weather(props) {
//   const [ weather, setWeather ] = useState(null);
//   const [ degreeType, setDegreeType ] = useState('F')

//   useEffect(() => {
//     axios.get('http://api.weatherapi.com/v1/forecast.json?key=3d83602b387a49c39ba33428222102&q=New York&days=7&aqi=no&alerts=no')
//       .then((response) => setWeather(response.data))
//   }, [weather]);

//   // const changeDegree = () => {
//   //   if (degreeType === 'F') {
//   //     setDegreeType('C');
//   //   } else {
//   //     setDegreeType('F');
//   //   }
//   // }
//   let day = { '1': 'MONDAY', '2': 'TUESDAY', '3': 'WEDNESDAY', '4': 'THURSDAY', '5': 'FRIDAY', '6': 'SATURDAY', '0': 'SUNDAY' };
//   let d = new Date();
//   let dayNum = d.getDay();

//   if ((!weather)) return <div className={props.checkedStatus ? 'loadingSign-dark' : 'loadingSign'}>Loading...</div>;

//   return (
//     <div className={props.checkedStatus ? 'weather-dark' : 'weather'}>
//       <p className={props.checkedStatus ? 'forecast-weekday-dark' : 'forecast-weekday'}>{day[dayNum]} • NEW YORK</p>
//       <p className={props.checkedStatus ? 'forecast-temperature-dark' : 'forecast-temperature'}>{weather.current.temp_f}°F</p>
//       <p className={props.checkedStatus ? 'forecast-condition-dark' : 'forecast-condition'}>{weather.current.condition.text.toUpperCase()}</p>
//       <img className='forecast-image' src={weather.current.condition.icon} />
//     </div>
//   )
// }

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

function App() {
  const [ iniData, setIniData ] = useState(initialData)
  const [ checked, setChecked ] = useState(false)

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
          <HeaderTitle checkedStatus={checked} />

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
          <TodoList addTodo={addTodo} iniData={iniData} setIniData={setIniData} checkedStatus={checked} />
        </div>

        {/* <p className='copyRight'>AK © 2022</p> */}
      </div>
    </div>
  );
}

export default App;
