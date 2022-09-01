import useApi from "../hooks/use-api";
import "./TodoList.css";
import Todo from "../models/Todo";

const TodoList: React.FC<{ todos: Todo[]; readTodos: () => void }> = ({
  todos,
  readTodos,
}) => {
  const { sendRequest: deleteTodo, sendRequest: toggleTodo } = useApi();

  const deleteTodoHandler = async (id: string) => {
    await deleteTodo({
      url: `https://todo-api.roto.codes/choi/${id}`,
      method: "DELETE",
    });
    readTodos();
  };

  const toggleTodoHandler = async (id: string) => {
    await toggleTodo({
      url: `https://todo-api.roto.codes/choi/${id}/toggle`,
      method: "PUT",
    });
    readTodos();
  };

  return todos.length === 0 ? (
    <p>할일을 입력하세요</p>
  ) : (
    <ul className="todo-lists">
      {todos.map((todo: Todo) => (
        <li key={todo._id}>
          <article>
            <button
              onClick={() => {
                toggleTodoHandler(todo._id);
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
                deleteTodoHandler(todo._id);
              }}
            >
              삭제
            </button>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
