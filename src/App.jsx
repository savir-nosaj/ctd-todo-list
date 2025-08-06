import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import './App.css';
import { useState } from 'react';

function App() {
  const [newTodo, setNewTodo] = useState("Example Text");
  return (
    <div>
      <h1>My Todos</h1>
      <ToDoForm/>
      <p>{newTodo}</p>
      <ToDoList/>
    </div>
  );
}

export default App