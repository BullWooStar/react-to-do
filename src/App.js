import "./App.css";
import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import useApi from "./hooks/use-api";

function App() {
  const [todos, setTodos] = useState([]);
  const { sendRequest: deleteAllTodos } = useApi();
  const readTodos = async () => {
    try {
      const response = await fetch("https://todo-api.roto.codes/choi");
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      setTodos(result);
    } catch {
      throw new Error("ERROR!");
    }
  };

  useEffect(() => {
    readTodos();
  }, []);

  const deleteAllTodosHandler = async () => {
    await deleteAllTodos({
      url: "https://todo-api.roto.codes/choi/all",
      method: "DELETE",
    });
    readTodos();
  };
  return (
    <div className="App">
      <h1>TO-DO List</h1>
      <TodoInput readTodos={readTodos} />
      <TodoList todos={todos} readTodos={readTodos} />
      <button onClick={deleteAllTodosHandler}>모두삭제</button>
    </div>
  );
}

export default App;
