import React from "react";
import ItemManager from "./components/ItemList";
import QuestionBank from "./components/QuestionBank";
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  return (
    <div className="App">
      <ItemManager />
      <br/>
      <QuestionBank />
    </div>
  );
}

export default App;