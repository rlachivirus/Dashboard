const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage1' },
        'task-2': { id: 'task-2', content: 'Take out the garbage2' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2']
        },
    },
    columnOrder: ['column-1'],
}

export default initialData;