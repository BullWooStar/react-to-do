import "./TodoList.css";
import { useGetTodos } from "../hooks/useApi";
import {
  useMutation,
  useQueryClient,
  useIsFetching,
  useIsMutating,
} from "react-query";

//mutate함수를 hook으로 못빼나??

async function deleteAllTodos() {
  await fetch("https://todo-api.roto.codes/choi/all", { method: "DELETE" });
}

async function deleteTodo(id: any) {
  // id : string 이면 오류
  await fetch(`https://todo-api.roto.codes/choi/${id}`, { method: "DELETE" });
}

async function toogleTodo(id: any) {
  await fetch(`https://todo-api.roto.codes/choi/${id}/toggle`, {
    method: "PUT",
  });
}

const TodoList: React.FC = () => {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const deleteAllTodosMutation = useMutation(deleteAllTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todoList");
    },
  });

  const deleteTodoMutation = useMutation((id) => deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todoList");
    },
  });

  const toogleTodoMutation = useMutation((id) => toogleTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todoList");
    },
  });

  const todos = useGetTodos();

  return (
    <>
      <span>{isFetching || isMutating ? "Loading" : ""}</span>
      <div>
        {todos.length === 0 ? (
          <p>할일을 입력하세요</p>
        ) : (
          <div>
            <ul className="todo-lists">
              {todos.map((todo: any) => (
                <li key={todo._id}>
                  <article>
                    <button
                      onClick={() => {
                        toogleTodoMutation.mutate(todo._id);
                      }}
                    >
                      완료
                    </button>
                    <span
                      className={`todo-content ${
                        todo.isCompleted ? "todo-content-done" : null
                      }`}
                    >
                      {todo.content}
                    </span>
                    <button
                      onClick={() => {
                        deleteTodoMutation.mutate(todo._id);
                      }}
                    >
                      삭제
                    </button>
                  </article>
                </li>
              ))}
            </ul>
            <button onClick={() => deleteAllTodosMutation.mutate()}>
              모두삭제
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TodoList;
