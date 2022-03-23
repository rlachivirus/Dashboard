import { Droppable } from 'react-beautiful-dnd';
import TodoForm from './TodoForm';
import Task from './Task'

function Column(props) {
    return (
        <div className={props.checkedStatus ? 'todos-dark' : 'todos'}>
            <div className={props.checkedStatus ? 'column-header-dark' : 'column-header'}>
                <div className='empty-placeholder'> </div>
                <p className='column-title'>{props.column.title}</p>
                <TodoForm title={props.column.title} iniData={props.iniData} addTodo={props.addTodo} checkedStatus={props.checkedStatus} />
            </div>
            <Droppable droppableId={props.column.id}>
                {provided => (
                    <ul
                        className='todo-lists'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {props.tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} checkedStatus={props.checkedStatus} column={props.column} />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    )
}

export default Column;