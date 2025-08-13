import { useState, useRef } from "react";

function TodoForm({onAddTodo}) {
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    const todoTitleInput = useRef("");

    function handleAddTodo(event) {
        event.preventDefault();
        onAddTodo(workingTodoTitle);
        setWorkingTodoTitle("");
        todoTitleInput.current.focus();
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input
                id="todoTitle"
                name="title"
                // onChange will trigger change in state => re-render; updating value with state-value
                value={workingTodoTitle}
                ref={todoTitleInput} 
                type="text"
                // when input is detected => run setWorkingTodo function, adding value to end of state (workingTodo) string
                onChange={(event) => setWorkingTodoTitle(event.target.value)}
            />
            <button type="submit" disabled={!workingTodoTitle}>Add Todo</button>
        </form>
    )
}
export default TodoForm;