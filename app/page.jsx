"use client";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Todo from "@components/Todo";
import Form from "@components/Form";
import FilterButton from "@components/FilterButton";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const DATA = [
  // { id: "todo-0", name: "Eat", completed: true },
  // { id: "todo-1", name: "Sleep", completed: false },
  // { id: "todo-2", name: "Repeat", completed: false },
];

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function Home() {
  const session = useSession();
  const [tasks, setTasks] = useState(DATA);
  const [filter, setFilter] = useState("All");

  // const [andmed, setAndmed] = useState([]);
  // const [error, setError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  //     // The return value is *not* serialized
  //     // You can return Date, Map, Set, etc.

  //     // Recommendation: handle errors
  //     if (!res.ok) {
  //       setError(true);
  //     }
  //     const data = res.json();
  //     setAndmed(data);
  //     setIsLoading(false);
  //   };
  //   getData();
  // }, []);
  // console.log(andmed);

  // !LOCAL STORAGE USE EFFECTS
  // useEffect(() => {
  //   const data = localStorage.getItem("my-todo-list-key");
  //   if (data !== null) setTasks(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("my-todo-list-key", JSON.stringify(tasks));
  // }, [tasks]);

  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      // if the task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };
  const editTask = (id, newName) => {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/todos",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);
  const data2 = Object.entries(data)[0][1];

  const taskList = data2
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task._id}
        name={task.name}
        completed={task.completed}
        key={task._id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const tasksReaminingNoun = filter !== "Completed" ? "remaining" : "completed";
  const headingText = `${taskList.length} ${tasksNoun} ${tasksReaminingNoun}`;

  // // !FOR MOVIES
  // const { data, error, isLoading } = useSWR(
  //   "http://localhost:3000/api/movies",
  //   fetcher
  // );

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  // console.log(
  //   Object.entries(data)[0][1].map((person) => console.log(person.plot))
  // );

  return (
    <div className="todoapp stack-large">
      <h1 className="text-6xl">Todo List</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default Home;
