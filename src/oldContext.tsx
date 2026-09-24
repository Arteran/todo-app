import { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import * as api from './api/todos';

type ContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filterParam: Filter;
  setFilterParam: React.Dispatch<React.SetStateAction<Filter>>;
  handleChangeStatus: (todo: Todo) => void;
  handleAddNewTodo: (newTodoTitle: string) => void;
  handleToggleAll: () => void;
};

export const TodosContext = createContext<ContextType | null>(null);

export const useTodosContext = () => {
  const obj = useContext(TodosContext);

  if (!obj) {
    throw new Error('Somthing went wrong');
  }

  return obj;
};

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterParam, setFilterParam] = useState<Filter>(Filter.all);

  useEffect(() => {
    api.getAll().then(setTodos);
  }, []);

  const handleChangeStatus = (todo: Todo) =>
    setTodos(prev =>
      prev.map(item =>
        item.id === todo.id ? { ...item, completed: !item.completed } : item,
      ),
    );

  const handleAddNewTodo = (todoTitle: string) => {
    if (todoTitle.trim()) {
      const newTodo = {
        id: todos.reduce((max, todo) => (todo.id > max ? todo.id : max), 0) + 1,
        title: todoTitle,
        completed: false,
      };

      setTodos(prev => [...prev, newTodo]);
    }
  };

  const handleToggleAll = () => {
    const ishaveingUncompleatedTodo =
      todos.filter(todo => !todo.completed).length !== 0;

    setTodos(prev =>
      prev.map(item =>
        ishaveingUncompleatedTodo
          ? { ...item, completed: true }
          : { ...item, completed: false },
      ),
    );
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        filterParam,
        setFilterParam,
        handleChangeStatus,
        handleAddNewTodo,
        handleToggleAll,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
