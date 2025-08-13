import ToDoListItem from "./ToDoListItem";

function ToDoList({todoList, onCompletedTodo}) {
    // var containing array of filtered items, whose onComplete prop, is set to false
    const filteredTodoList = todoList.filter(todo => todo.isCompleted === false);

    // display depending if:
    return (
        // 1) no value in state (todoList) arr
        filteredTodoList.length === 0 ? (
            <p>Add To-Do Above to Get Started</p>
        ) : (
        // 2) minimum of 1 value in state arr
            <ul>
                {filteredTodoList.map((todo) => (
                    // for each value in state arr, create instance of ToDoListItem comp., passing same props of local parent
                    <ToDoListItem
                        key={todo.id}
                        todo={todo}
                        onCompletedTodo={onCompletedTodo}
                    />
                ))}
            </ul>
        )
    );
}

export default ToDoList;
