import { useState } from "react";
import Search from "./Search";

// Helper functions for localStorage
function getLocalStorageData(key) {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function setLocalStorageData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export default function App() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState(() => getLocalStorageData("todo") || []);
  const [selected, setSelected] = useState(null);

  function handleUpdateAddTodo(value) {
    if (!value) return;

    if (selected) {
      setTodo((todo) => {
        const newTodo = todo.map((element) =>
          element.id === selected ? { ...element, todoText: value } : element
        );
        setLocalStorageData("todo", newTodo);
        return newTodo;
      });
      setValue("");
      setSelected(null);
      return;
    }

    const id = crypto.randomUUID();
    const newTodo = {
      id,
      todoText: value,
      completed: false,
    };
    setTodo((todo) => {
      const addTodo = [...todo, newTodo];
      setLocalStorageData("todo", addTodo);
      return addTodo;
    });
    setValue("");
  }

  function handleDeleteTodo(id) {
    setTodo((todo) => {
      const newTodo = todo.filter((x) => x.id !== id);
      setLocalStorageData("todo", newTodo);
      return newTodo;
    });
  }

  return (
    <div className="container">
      <Search
        value={value}
        setValue={setValue}
        onAddTodo={handleUpdateAddTodo}
        selected={selected}
      />
      {todo.length > 0 && (
        <Task
          todo={todo}
          setTodo={setTodo}
          onDelete={handleDeleteTodo}
          onUpdateTodo={setSelected}
          setValue={setValue}
        />
      )}
    </div>
  );
}

function Task({ todo, setTodo, onDelete, onUpdateTodo, setValue }) {
  return (
    <div id="tasks">
      {todo.map((el) => (
        <TaskItem
          todoElement={el}
          todo={todo}
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

function TaskItem({
  todoElement,
  todo,
  setTodo,
  onDelete,
  onUpdateTodo,
  setValue,
}) {
  const [isCompleted, setIsCompleted] = useState(todoElement.completed);

  function handleUpdateTodo() {
    setValue(todoElement.todoText);
    onUpdateTodo(todoElement.id);
  }

  function handleCompleted() {
    setIsCompleted((completed) => !completed);
    setTodo((todo) => {
      const newTodo = todo.map((el) =>
        el.id === todoElement.id ? { ...el, completed: !isCompleted } : el
      );
      setLocalStorageData("todo", newTodo);
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
