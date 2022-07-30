import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./component/Form";
import Todolist from "./component/Todolist";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterTodos, setFilteredTools] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTools(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTools(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTools(todos);
        break;
    }
  };

  /// Local Save
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Zafar's Todo List</h1>
      </header>
      <Form
        todo={todos}
        setTodo={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
        filterTodos={filterTodos}
      />
      <Todolist setTodos={setTodos} todos={todos} filterTodos={filterTodos} />
    </div>
  );
}

export default App;
