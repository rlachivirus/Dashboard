import './App.css';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
        <TodoForm title={props.column.title} iniData={props.iniData} addTodo={props.addTodo} checkedStatus={props.checkedStatus}/>
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
                      <span className='todo-memo-priority'>{props.column.title === 'To do' ? `#${index + 1}` : null}</span><br />
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
      setTodo('');
    }
  }

  let showModal = modal === false ? (
    <div className='column-form' onClick={() => handleModal(true)}>{props.title === 'To do' ? '+' : null}</div>
  ) : (
    // <div className='modal-background' onClick={() => handleModal(false)}>
    <>
      <p className='modal-exit' onClick={() => handleModal(false)}>x</p>
      <form className={props.checkedStatus ? 'input-form-dark' : 'input-form'} onSubmit={handleSubmit}>
        <br />
        <input autoFocus type='text' placeholder='Add New Todo' value={todo} onChange={handleChange} />
        <input type='submit' value='Add' />
      </form>
    </>
    // </div>
  )

  return showModal
}

// function HeaderTitle(props) {
//   const initialWord = 'leave your day to me';

//   const [word, setWord] = useState(initialWord);

//   useEffect(() => {
//     const changeFont = setInterval(() => {
//       let title1 = document.getElementById('header-title1');
//       let title2 = document.getElementById('header-title2');
//       let title3 = document.getElementById('header-title3');
//       // console.log(font.style.fontFamily)
//       if (word === 'leave your day to me') {
//         title1.innerText = 'LET ME';
//         title2.innerText = 'HANDLE';
//         title3.innerText = 'YOUR DAY';
//         setWord('let me handle your day');
//       } else if (word === 'let me handle your day') {
//         title1.innerText = 'I WILL';
//         title2.innerText = 'TAKE CARE OF';
//         setWord('i will take care of your day');
//       } else {
//         title1.innerText = 'LEAVE';
//         title2.innerText = 'YOUR DAY';
//         title3.innerText = 'TO ME';
//         setWord('leave your day to me');
//       }
//     }, 10000)

//     return () => clearInterval(changeFont);
//   })

//   return (
//     // <p className='helloNewYork'>Hello <span id='helloNewYork'>{word}</span></p>
//     <div className={props.checkedStatus ? 'header-left-dark' : 'header-left'}>
//       {/* <p className={props.checkedStatus ? 'header-title-dark' : 'header-title'}>LEAVE <br /> YOUR DAY <br /> <span className={props.checkedStatus ? 'header-title-span-dark' : 'header-title-span'}>TO ME</span></p> */}
//       <p id='header-title1'>LEAVE</p>
//       <p id='header-title2'>YOUR DAY</p>
//       <p id='header-title3'>TO ME</p>
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
