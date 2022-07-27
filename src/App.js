import "./App.css";
import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([1]);
  // useEffect(() => {
  //   async function readTodos() {
  //     const response = await fetch("https://todo-api.roto.codes/choi");
  //     const result = await response.json();
  //     setTodos(result);
  //   }
  //   readTodos();
  // }, []);

  const readTodos = async () => {
    const response = await fetch("https://todo-api.roto.codes/choi");
    const result = await response.json();
    setTodos(result);
  };

  return (
    <div className="App">
      <h1>TO-DO List</h1>
      <button onClick={readTodos}>readTodos</button>
      <TodoInput todos={todos} />
      <TodoList />
    </div>
  );
}

export default App;
