function ToDoListItem({todo, onCompletedTodo}) {
    return (
        <li>
            <form>
                <input
                    type="checkbox"
                    // will only display check if todo.isCompleted === true
                    checked={todo.isCompleted}
                    // when checkbox clicked => either 1) comm. data back to parent 2) invoke onCompleteTodo function, passing item's unique key
                    onChange={() => onCompletedTodo(todo.id)}
                />
                {todo.title}
            </form>
        </li>
    );
}

export default ToDoListItem
