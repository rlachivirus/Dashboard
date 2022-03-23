import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

function TodoList({ iniData, setIniData, addTodo, checkedStatus }) {

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

        const start = iniData.columns[source.droppableId];
        const finish = iniData.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...iniData,
                columns: {
                    ...iniData.columns,
                    [newColumn.id]: newColumn,
                }
            }

            setIniData(newState);
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
            ...iniData,
            columns: {
                ...iniData.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setIniData(newState);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {iniData.columnOrder.map(columnId => {
                const column = iniData.columns[columnId];
                const tasks = column.taskIds.map(taskId => iniData.tasks[taskId]);

                return <Column key={column.id} column={column} tasks={tasks} iniData={iniData} addTodo={addTodo} checkedStatus={checkedStatus} />
            })}
        </DragDropContext>
    )
}

export default TodoList;