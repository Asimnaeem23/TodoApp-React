import { useState } from 'react';
import '../reset.css';
import '../App.css';

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

  const [todoInput,setTodoInput] = useState('');
  const [idTodo,setIdTodo] = useState(4);
  const addTodo = (event)=>{
    event.preventDefault()
    if(todoInput.trim().length === 0)
      return;
    setTodos([...todos,{
      id:idTodo,
      title: todoInput,
      isComplete: false
    }])
    setTodoInput('');
    setIdTodo(prevIdTodo => prevIdTodo  + 1);
  }
  const handleInput = (event)=>{
    setTodoInput(event.target.value);
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
  const updateTodo = (event,id) => {
    const updatedTodos = todos.map(todo => {
      if(todo.id === id){
        if(event.target.value.trim().length === 0){
          todo.isEditing = false;
          return
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
          <form action="#" onSubmit={addTodo}>
            <input
                type="text"
                value={todoInput}
                onChange={handleInput}
                className="todo-input"
                placeholder="What do you need to do?"
            />
          </form>

          <ul className="todo-list">
            {todos.map((todo, index) => (
                <li className="todo-item-container" key={todo.id}>
                  <div className="todo-item">
                    <input type="checkbox" onChange={ () => completeTodo(todo.id)} checked={todo.isComplete ? true : false} />
                    {!todo.isEditing ? (
                    <span onDoubleClick={ () => markEditing(todo.id)} className={`todo-item-label ${todo.isComplete ? 'line-through' : ''}`}>{todo.title}</span>
                        ) : (
                     <input onBlur={ (event) => updateTodo(event,todo.id)} type="text" className="todo-item-input" defaultValue={todo.title} autoFocus/>
                    )}
                  </div>
                  <button className="x-button" onClick={()=>deleteTodo(todo.id)}>
                    <svg
                        className="x-button-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
            ))}
          </ul>

          <div className="check-all-container">
            <div>
              <div className="button">Check All</div>
            </div>

            <span>3 items remaining</span>
          </div>

          <div className="other-buttons-container">
            <div>
              <button className="button filter-button filter-button-active">
                All
              </button>
              <button className="button filter-button">Active</button>
              <button className="button filter-button">Completed</button>
            </div>
            <div>
              <button className="button">Clear completed</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;