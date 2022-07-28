import useApi from "../hooks/use-api";

const TodoList = ({ todos, readTodos }) => {
  const { sendRequest: deleteTodo, sendRequest: toggleTodo } = useApi();

  const deleteTodoHandler = async (id) => {
    await deleteTodo({
      url: `https://todo-api.roto.codes/choi/${id}`,
      method: "DELETE",
    });
    readTodos();
  };

  const toggleTodoHandler = async (id) => {
    await toggleTodo({
      url: `https://todo-api.roto.codes/choi/${id}/toggle`,
      method: "PUT",
    });
    readTodos();
  };

  return todos.length === 0 ? (
    <p>할일을 입력하세요</p>
  ) : (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          <article>
            <button
              onClick={() => {
                toggleTodoHandler(todo._id);
              }}
            >
              완료
            </button>
            {todo.content}
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
