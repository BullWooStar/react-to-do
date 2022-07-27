import { useEffect, useState } from "react";
import useApi from "../hooks/use-api";

const TodoList = (props) => {
  return props.todos.length === 0 ? (
    <p>없음</p>
  ) : (
    <ul>
      {props.todos.map((todo) => (
        <li>{todo.content}</li>
      ))}
    </ul>
  );
};

export default TodoList;
