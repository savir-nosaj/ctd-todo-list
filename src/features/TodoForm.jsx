import TextInputWithLabel from '../shared/TextInputWithLabel';
import { useState, useRef } from 'react';

function ToDoForm ({onAddTodo}) {
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    const todoTitleInput = useRef("");
    
    // local handleAddTodo function performs the following:
    function handleAddTodo(event){
        // prevent page re-render
        event.preventDefault();
        // comm. current state (workingTodo) data back to parent
        onAddTodo(workingTodoTitle);
        // clear state
        setWorkingTodoTitle("");
        // focus on input after submit
        todoTitleInput.current.focus();
    }

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                elementId="todoTitle"
                // onChange will trigger change in state => re-render; updating value with state-value
                value={workingTodoTitle}
                ref={todoTitleInput}
                // when input is detected => run setWorkingTodo function, adding value to end of state (workingTodo) string
                onChange={(event) => setWorkingTodoTitle(event.target.value)}
                labelText="Todo:"
            />
            <button type="submit" disabled={!workingTodoTitle}>Add Todo</button>
        </form>
    );
}

export default ToDoForm;