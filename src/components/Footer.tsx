import { useTodosContext } from '../context';
import cn from 'classnames';
import { Filter } from '../types/Filter';

type Props = {};

export const Footer: React.FC<Props> = ({}) => {
  const { todos, filterParam, setFilterParam, setTodos } = useTodosContext();

  const ammountNotCompletedTodos = todos.filter(todo => !todo.completed).length;
  const isHavingCompleated = todos.filter(todo => todo.completed).length !== 0;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span
        className={cn('todo-count', { hidden: ammountNotCompletedTodos === 0 })}
        data-cy="TodosCounter"
      >
        {ammountNotCompletedTodos} item left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {[
          { name: 'All', param: Filter.all },
          { name: 'Active', param: Filter.active },
          { name: 'Completed', param: Filter.completed },
        ].map(item => (
          <a
            href="#/"
            className={cn('filter__link', {
              selected: item.param === filterParam,
            })}
            data-cy={`FilterLink${item.name}`}
            key={item.name}
            onClick={() => setFilterParam(item.param)}
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className={cn('todoapp__clear-completed', {
          hidden: !isHavingCompleated,
        })}
        data-cy="ClearCompletedButton"
        disabled={!isHavingCompleated}
        onClick={() => setTodos(todos.filter(todo => !todo.completed))}
      >
        Clear completed
      </button>
    </footer>
  );
};
