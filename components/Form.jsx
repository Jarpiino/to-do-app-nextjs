"use client";
import { useState } from "react";

const Form = (props) => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      props.addTask(name);
      setName("");
    } else {
      alert("Please enter something");
    }
  };
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
        placeholder="Play sum league..."
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
