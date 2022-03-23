import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

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
        finishTaskIds.splice(destination.index, 0, draggableId);

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

                return <Column key={column.id} column={column} tasks={tasks} iniData={props.iniData} addTodo={props.addTodo} checkedStatus={props.checkedStatus} />
            })}
        </DragDropContext>
    )
}

export default TodoList;