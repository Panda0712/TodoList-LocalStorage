import { TaskItem } from "./TaskItem";

export function Task({ todo, setTodo, onDelete, onUpdateTodo, setValue }) {
  return (
    <div id="tasks">
      {todo.map((el) => (
        <TaskItem
          todoElement={el}
          setTodo={setTodo}
          onDelete={onDelete}
          onUpdateTodo={onUpdateTodo}
          setValue={setValue}
          key={el.id}
        />
      ))}
    </div>
  );
}
