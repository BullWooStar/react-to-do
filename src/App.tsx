import "./App.css";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  function queryErrorHandler(error: unknown): void {
    throw new Error("ERROR!");
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: queryErrorHandler,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>TO-DO List</h1>
        <TodoInput />
        <TodoList />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
