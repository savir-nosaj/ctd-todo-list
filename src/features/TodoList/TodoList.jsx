import ToDoListItem from "./ToDoListItem";

function ToDoList({todoList, onCompletedTodo, onUpdateTodo, isLoading}) {
    // var containing array of filtered items, whose onComplete prop, is set to false
    const filteredTodoList = todoList.filter(todo => todo.isCompleted === false);

    // display depending if:
    return (
        isLoading ? (
            <p>Todo List Loading ...</p>
        ) : filteredTodoList.length === 0 ? (
            <p>Add To-Do Above to Get Started</p>
        ) : (
            <ul>
                {filteredTodoList.map((todo) => (
                    // for each value in state arr, create instance of ToDoListItem comp., passing same props of parent
                    <ToDoListItem
                        key={todo.id}
                        todo={todo}
                        onCompletedTodo={onCompletedTodo}
                        onUpdateTodo={onUpdateTodo}
                    />
                ))}
            </ul>
        )
    );
}

export default ToDoList;