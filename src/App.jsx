import ToDoForm from './features/TodoForm';
import ToDoList from './features/TodoList/TodoList';
import './App.css';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(title) {
    const newTodo = {
      id: Date.now(),
      title: title,
      isCompleted: false
    }
    setTodoList([...todoList, newTodo]);
  }

  function onCompletedTodo(id) {
    const updatedTodos = todoList.map((todo) => {
      if(todo.id === id) {
        return {...todo, isCompleted: true}
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  // update the obj's title prop to updated value sent from ToDoListItem
  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) => {
      if(todo.id === editedTodo.id) {
        return {...editedTodo};
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <ToDoForm
        onAddTodo = {addTodo}
      />
      <ToDoList
        todoList = {todoList}
        onCompletedTodo={onCompletedTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default App