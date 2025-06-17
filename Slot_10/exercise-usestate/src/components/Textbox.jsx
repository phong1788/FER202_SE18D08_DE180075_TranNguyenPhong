import React, { useState } from 'react';

function Textbox() {
  const [name, setName] = useState('Adam');
  const [age, setAge] = useState(35);

  return (
    <div>
      <h2>Controlled Input Field</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          console.log(e.target.value);
        }}
      />
      <p>My name is {name}</p>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value, 10))}
      />
      <p>My age is {age}</p>
    </div>
  );
}

export default Textbox;