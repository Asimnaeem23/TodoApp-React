import { useState } from 'react';
import NoTodos from './NoTodos'
import '../reset.css';
import '../App.css';
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Go Grocery',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
      isEditing: false,
    },
  ]);

  const [idTodo,setIdTodo] = useState(4);
  const addTodo = (todo)=>{
    setTodos([...todos,{
      id:idTodo,
      title: todo,
      isComplete: false
    }])
    setIdTodo(prevIdTodo => prevIdTodo  + 1);
  }
  const deleteTodo = (id)=>{
    setTodos([...todos].filter(todo => todo.id !== id))
  }
  const completeTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if(todo.id === id){
        todo.isComplete = !todo.isComplete
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  const markEditing = (id) => {
    const updatedTodos = todos.map(todo => {
      if(todo.id === id){
        todo.isEditing = true
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  const cancelEdit = (id) => {
    const updatedTodos = todos.map(todo => {
      if(todo.id === id){
        todo.isEditing = false;
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  const updateTodo = (event,id) => {
    const updatedTodos = todos.map(todo => {
      if(todo.id === id){
        if(event.target.value.trim().length === 0){
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  return (
      <div className="todo-app-container">
        <div className="todo-app">
          <h2>Todo App</h2>
          <TodoForm addTodo={addTodo}/>
          {todos.length > 0 ? (
              <TodoList
              todos={todos}
              completeTodo={completeTodo}
              markEditing={markEditing}
              updateTodo={updateTodo}
              cancelEdit={cancelEdit}
              deleteTodo={deleteTodo}
              />
            ):(
                <NoTodos />
            )}
        </div>
      </div>
  );
}

export default App;