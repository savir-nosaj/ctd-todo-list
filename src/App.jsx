import ToDoForm from './features/ToDoForm';
import ToDoList from './features/TodoList/ToDoList';
import './App.css';
import { useEffect, useState } from 'react';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      }
      try {
        const resp = await fetch(url, options);
        console.log(resp);
        if(!resp.ok) {
          // console.log(resp.message);
          throw new Error(resp.message);
        }
        const apiQuery = await resp.json();
        // console.log(apiQuery);
        const fetchedTodos = apiQuery.records.map((value) => {
          const todo = {
            id: value.id,
            ...value.fields
          };
          if(!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });
        setTodoList([...fetchedTodos]);
      } catch (error) {
        console.log(error);
        // console.error(error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      };
    };
    fetchTodos();
  }, []);

  // function recieves data from child comp (ToDoForm) => appends new object (newTodo) into todoList arr, with specific props
  const handleAddTodo = async (title) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      isCompleted: false
    }
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted
          }
        }
      ]
    }
    const options = {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    try {
      setIsSaving(true);
      const resp = await fetch(url, options);
      if(!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields
      }
      if(!records[0].isCompleted) {
        savedTodo.isCompleted = false;
      }
      // push newTodo object into todoList arr
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error)
    } finally {
      setIsSaving(false);
    }
  }

  // retrieves data from child (ToDoList), containing id of item checked in form => sets isCompleted prop to true
  const onCompleteTodo = async (id) => {
    const payload = {
      records: [
        {
          id: id,
          fields: {
            isCompleted: true
          }
        }
      ]
    }
    const options = {
      method: 'PATCH',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    try {
      setIsSaving(true);
      setIsLoading(true);
      const resp = await fetch(url, options);
      if(!resp.ok) {
        throw new Error(resp.message);
      }
      const updatedTodos = todoList.map((todo) => {
        if(todo.id === id) {
          // add same item, but with isCompleted prop changed to true
          return {...todo, isCompleted: true}
        }
        return todo;
      });
      // updatedTodos (on re-render) will update array and store objects with prop isCompleted, then push to and update toDo list
      setTodoList(updatedTodos);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
      setIsLoading(false);
    }
  }

  // update the obj's title prop to updated value sent from ToDoListItem
  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    const updatedTodos = todoList.map((todo) => {
      if(todo.id === editedTodo.id) {
        return {...editedTodo};
      }
      return todo;
    });

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted
          }
        }
      ]
    }
    const options = {
      method: 'PATCH',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    try {
      setIsSaving(true);
      const resp = await fetch(url, options);
      if(!resp.ok) {
        throw new Error(resp.message);
      }
      setTodoList(updatedTodos);
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if(todo.id === originalTodo.id) {
          return originalTodo;
        }
        return todo;
      });
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <h1>My Todos</h1>
      <ToDoForm
        onAddTodo={handleAddTodo}
        isSaving={isSaving}
      />
      <ToDoList
        todoList={todoList}
        onCompletedTodo={onCompleteTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />
      {errorMessage != '' && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
