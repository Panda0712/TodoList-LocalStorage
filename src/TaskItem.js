import { useState } from "react";

export function TaskItem({
  todoElement,
  setTodo,
  onDelete,
  onUpdateTodo,
  setValue,
}) {
  const [isCompleted, setIsCompleted] = useState(todoElement.completed);

  function handleUpdateTodo(e) {
    e.stopPropagation();
    console.log(e.target);

    setValue(todoElement.todoText);
    onUpdateTodo(todoElement.id);
  }

  function handleCompleted() {
    setIsCompleted((completed) => !completed);
    setTodo((todo) => {
      const newTodo = todo.map((el) =>
        el.id === todoElement.id ? { ...el, completed: !isCompleted } : el
      );
      localStorage.setItem("todo", JSON.stringify(newTodo));
      return newTodo;
    });
  }

  return (
    <li
      onClick={handleCompleted}
      className={isCompleted ? "task completed" : "task"}
    >
      <span>{todoElement.todoText}</span>
      <div>
        <button className="edit" onClick={handleUpdateTodo}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="delete" onClick={() => onDelete(todoElement.id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
}
