import { FormEvent, ChangeEvent, useState } from "react";

export default function Todo(props: {
  name: string;
  completed: boolean;
  id: string;
  toggleCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newName: string) => void;
}) {
  const { name, completed, id, toggleCompleted, deleteTask, editTask } = props;
  const [isEditing, setEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newName.length > 0) {
      editTask(id, newName);
      setNewName("");
      setEditing(false);
    }
  }

  return (
    <li className="todo-list">
      {isEditing ? (
        <>
          <form className="todo-body" onSubmit={handleSubmit}>
            <div className="todo-edit">
              <label className="todo-label-edit" htmlFor={id}>
                New name for {name}
              </label>
              <input
                id={id}
                type="text"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="btn-group-edit">
              <button type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Save
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="todo-body">
            <div className="todo-title">
              <input
                id={id}
                type="checkbox"
                defaultChecked={completed}
                onChange={() => toggleCompleted(id)}
              />
              <label className="todo-label" htmlFor={id}>
                {name}
              </label>
            </div>
            <div className="btn-group">
              <button type="button" onClick={() => setEditing(true)}>
                Edit
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={() => deleteTask(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
}
