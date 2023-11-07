import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

enum FilterEnum {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

interface ITask {
  id: string;
  name: string;
  completed: boolean;
}

const TASK_DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: true },
  { id: "todo-2", name: "Code", completed: false },
];

const FILTER_MAP = {
  All: () => true,
  Active: (task: ITask) => !task.completed,
  Completed: (task: ITask) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>([...TASK_DATA]);
  const [filter, setFilter] = useState<string>(FilterEnum.All);
  const notCompletedTask = tasks.filter((task) => task.completed === false);

  function addTask(task: string) {
    const newTask = { id: `todo-${nanoid()}`, name: task, completed: false };
    setTasks([...tasks, newTask]);
  }

  function editTask(id: string, newName: string) {
    const editedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTasks);
  }

  function toggleTaskCompleted(id: string) {
    const updatedTask = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTask);
  }

  function deleteTask(id: string) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  return (
    <div className="card">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div>
        <div className="btn-group">
          {FILTER_NAMES.map((value) => (
            <FilterButton
              key={value}
              name={value}
              isPressed={value === filter}
              setFilter={(filter: string) => setFilter(filter)}
            />
          ))}
        </div>
        <h2 className="list-heading">
          {notCompletedTask.length > 0
            ? notCompletedTask.length + " tasks "
            : "0 task "}
          remaining
        </h2>
        <ul role="list" aria-labelledby="list-heading">
          {tasks.filter(FILTER_MAP[filter as FilterEnum]).map((task) => (
            <Todo
              key={task.id}
              name={task.name}
              completed={task.completed}
              id={task.id}
              toggleCompleted={toggleTaskCompleted}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
