import { useState } from "react";
import Search from "./Search";
import { Task } from "./Task";

export default function App() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState(
    () => JSON.parse(localStorage.getItem("todo")) || []
  );
  const [selected, setSelected] = useState(null);

  function handleUpdateAddTodo(value) {
    if (!value) return;

    if (selected) {
      setTodo((todo) => {
        const newTodo = todo.map((element) =>
          element.id === selected ? { ...element, todoText: value } : element
        );
        localStorage.setItem("todo", JSON.stringify(newTodo));
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
      localStorage.setItem("todo", JSON.stringify(addTodo));
      return addTodo;
    });
    setValue("");
  }

  function handleDeleteTodo(id) {
    setTodo((todo) => {
      const newTodo = todo.filter((x) => x.id !== id);
      localStorage.setItem("todo", JSON.stringify(newTodo));
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
