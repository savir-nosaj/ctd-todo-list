import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import './App.css';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(title) {
    const newTodo = {
      id: Date.now(),
      title: title
    }
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <ToDoForm
        onAddTodo = {addTodo}
      />
      <ToDoList
        todoList = {todoList}
      />
    </div>
  );
}

export default App