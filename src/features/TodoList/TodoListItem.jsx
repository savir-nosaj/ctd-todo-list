import TextInputWithLabel from '../../shared/TextInputWithLabel';
import {useEffect, useState} from 'react';

function ToDoListItem({todo, onCompletedTodo, onUpdateTodo}) {
    // when set to true, To-Do label in UL will change into input element, containing title as value
    const [isEditing, setIsEditing] = useState(false);
    // state will have todo title by default
    const [workingTitle, setWorkingTitle] = useState(todo.title);
    // 
    useEffect(() => {
        setWorkingTitle(todo.title);
    }, [todo.title]);

    // reset workingTitle state to default value (todo title)
    function handleCancel() {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    }

    // onChange event listener, attached to input element inside TextInputWithLabel, will concatenate input in workingTitle state
    function handleEdit(e) {
        setWorkingTitle(e.target.value);
    }

    // onSubmit event will send newly created text value stored in workingTitle data back to parent (ToDoList => App)
    function handleUpdate(e) {
        if(!isEditing){
            return;
        }
        e.preventDefault();
        onUpdateTodo({...todo, title: workingTitle});
        setIsEditing(false);
    }

    return (
        <li>
            <form onSubmit={handleUpdate}>
                {/* unique input field displayed when onClick event attached to title, is clicked */}
                {isEditing ? (
                    <>
                        <TextInputWithLabel
                            value={workingTitle}
                            onChange={handleEdit}
                        />
                        <button onClick={handleCancel} type='button'>Cancel</button>
                        <button onClick={handleUpdate} type='button'>Update</button>
                    </>
                ) : (      
                <>
                    <label>
                        <input
                            type="checkbox"
                            // I'm not sure what code below is for, or the syntax structure
                            id={`checkbox${todo.id}`}
                            // will only display check if todo.isCompleted === true
                            checked={todo.isCompleted}
                            // when checkbox clicked => either 1) comm. data back to parent 2) invoke onCompleteTodo function, passing item's unique key
                            onChange={() => onCompletedTodo(todo.id)}
                        />
                    </label>
                    <span onClick={() => setIsEditing(true)}>
                        {todo.title}
                    </span>
                </>              
                )}
            </form>
        </li>
    );
}

export default ToDoListItem
