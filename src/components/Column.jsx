import React, { useMemo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TodoForm from './TodoForm';
import Task from './Task'

function Column({ checkedStatus, column, iniData, addTodo, tasks }) {

    let showTasks = useMemo(() => {
        return (
            tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} checkedStatus={checkedStatus} column={column} />
            ))
        )
    }, [tasks])

    return (
        <div className={checkedStatus ? 'todos-dark' : 'todos'}>
            <div className={checkedStatus ? 'column-header-dark' : 'column-header'}>
                <div className='empty-placeholder'> </div>
                <p className='column-title'>{column.title}</p>
                <TodoForm title={column.title} iniData={iniData} addTodo={addTodo} checkedStatus={checkedStatus} />
            </div>
            <Droppable droppableId={column.id}>
                {provided => (
                    <ul
                        className='todo-lists'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {showTasks}
                        {/* {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} checkedStatus={checkedStatus} column={column} />
                        ))} */}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    )
}

export default Column;