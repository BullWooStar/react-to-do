import { useRef } from "react";
import useApi from "../hooks/use-api";

const TodoInput = () => {
  const newTodo = useRef();
  const { sendRequest: sendTodo } = useApi();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredValue = newTodo.current.value;
    sendTodo({
      url: "https://todo-api.roto.codes/choi",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `${enteredValue}`,
      }),
    });
    newTodo.current.value = "";
  };
  return (
    <form onSubmit={submitHandler}>
      <input type="text" ref={newTodo} />
      <button>추가</button>
    </form>
  );
};

export default TodoInput;
