import './App.css';
import React, { useState } from 'react';
import initialData from './initial-data';
import HeaderTitle from './components/HeaderTitle';
import Switch from 'react-switch'
import DateAndTime from './components/DateAndTime';
import Weather from './components/Weather';
import Calculator from './components/Calculator';
import TodoList from './components/TodoList';

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
