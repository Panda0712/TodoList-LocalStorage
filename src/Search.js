export default function Search({ value, setValue, onAddTodo, selected }) {
  return (
    <div id="new-task">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter The Task Here..."
      />
      <button id="push" onClick={() => onAddTodo(value)}>
        {selected ? "Update" : "Add"}
      </button>
    </div>
  );
}
