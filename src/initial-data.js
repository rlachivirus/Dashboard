const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage1' },
        'task-2': { id: 'task-2', content: 'Take out the garbage2' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2'],
        },
        'column-2': {
            id: 'column-2',
            title: 'Done',
            taskIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2'],
}

export default initialData;