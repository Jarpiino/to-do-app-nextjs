"use client";
import { useState } from "react";

const Form = (props) => {
  const placeholders = [
    {
      namePlaceholder: "Play sum league...",
    },
    {
      namePlaceholder: "Watch a movie...",
    },
    {
      namePlaceholder: "Wash dishes...",
    },
  ];
  const randomPlaceholder = () => {
    const len = placeholders.length;
    let placeholder = Math.floor(Math.random() * len);
    placeholder = placeholders[placeholder].namePlaceholder;
    return placeholder;
  };

  const [name, setName] = useState("");
  console.log(name);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: name,
          completed: false,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  // !! old method with state
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (name) {
  //     props.addTask(name);
  //     setName("");
  //   } else {
  //     alert("Please enter something");
  //   }
  // };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  return (
    <form>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        placeholder={randomPlaceholder()}
      />
      <button
        onClick={handleSubmit}
        type="submit"
        className="btn btn__primary btn__lg"
      >
        Add
      </button>
    </form>
  );
};

export default Form;
