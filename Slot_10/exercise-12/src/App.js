import React from "react";
import Counter from "./components/Counter";
import ControlledInput from "./components/ControlledInput";
import ToggleText from "./components/ToggleText";
import TodoList from "./components/TodoList";
import ColorSwitcher from "./components/ColorSwitcher";
import SearchFilter from "./components/SearchFilter";
import DragDropList from "./components/DragDropList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Exercise 12: useState Hook</h1>
      <hr />
      <Counter />
      <hr />
      <ControlledInput />
      <hr />
      <ToggleText />
      <hr />
      <TodoList />
      <hr />
      <ColorSwitcher />
      <hr />
      <SearchFilter />
      <hr />
      <DragDropList />
    </div>
  );
}

export default App;
