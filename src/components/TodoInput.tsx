import React, { useRef } from "react";
import useApi from "../hooks/use-api";

const TodoInput: React.FC<{ readTodos: () => void }> = ({ readTodos }) => {
  const newTodo = useRef<HTMLInputElement>(null);
  const { sendRequest: sendTodo } = useApi();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredValue = newTodo.current!.value;
    if (enteredValue.trim() === "") {
      alert("값을 입력하세요");
      return;
    }
    await sendTodo({
      url: "https://todo-api.roto.codes/choi",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `${enteredValue}`,
      }),
    });
    readTodos();
    newTodo.current!.value = "";
  };
  return (
    <form onSubmit={submitHandler}>
      <input type="text" ref={newTodo} />
      <button type="submit">추가</button>
    </form>
  );
};

export default TodoInput;
