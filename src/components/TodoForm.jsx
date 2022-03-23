import React, { useState } from 'react';

function TodoForm({ addTodo, title, checkedStatus }) {
    const [todo, setTodo] = useState('');
    const [modal, setModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo) return;
        addTodo(todo);
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
        <div className='column-form' onClick={() => handleModal(true)}>{title === 'To do' ? '+' : null}</div>
    ) : (
        // <div className='modal-background' onClick={() => handleModal(false)}>
        <>
            <p className='modal-exit' onClick={() => handleModal(false)}>x</p>
            <form className={checkedStatus ? 'input-form-dark' : 'input-form'} onSubmit={handleSubmit}>
                <br />
                <input autoFocus type='text' placeholder='Add New Todo' value={todo} onChange={handleChange} />
                <input type='submit' value='Add' />
            </form>
        </>
        // </div>
    )

    return showModal
}

export default TodoForm;