import { Draggable } from 'react-beautiful-dnd';

function Task({ task, index, checkedStatus, column }) {
    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
                <p
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={checkedStatus ? 'todo-memo-dark' : 'todo-memo'}
                >
                    <span className='todo-memo-priority'>{column.title === 'To do' ? `#${index + 1}` : null}</span><br />
                    {task.content}
                </p>
            )}
        </Draggable>
    )
}

export default Task;