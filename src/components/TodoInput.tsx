import React, { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";

async function addTodo(enteredValue: any) {
  await fetch("https://todo-api.roto1.codes/choi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `${enteredValue}`,
    }),
  });
}

const TodoInput: React.FC = () => {
  const newTodo = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(
    (inputValue: string) => addTodo(inputValue),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todoList");
      },
    }
  );

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredValue = newTodo.current!.value;
    if (enteredValue.trim() === "") {
      alert("값을 입력하세요");
      return;
    }
    addTodoMutation.mutate(newTodo.current!.value);
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
