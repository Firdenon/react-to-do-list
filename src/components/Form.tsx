import { FormEvent, ChangeEvent, useState } from "react";

export default function Form(props: { addTask: (task: string) => void }) {
  const [task, setTask] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (task.length > 0) {
      props.addTask(task);
      setTask("");
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>
          <label>What needs to be done</label>
        </h2>
        <input
          type="text"
          name="text"
          id="new-todo-input"
          autoComplete="off"
          value={task}
          onChange={handleChange}
        />
        <button className="btn-primary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
