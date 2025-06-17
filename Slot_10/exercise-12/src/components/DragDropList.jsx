import React, { useState } from "react";

function DragDropList() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]);
  const [draggingItem, setDraggingItem] = useState(null);

  const handleDragStart = (index) => {
    setDraggingItem(index);
  };

  const handleDragEnter = (index) => {
    if (draggingItem === null || draggingItem === index) return;
    const updatedItems = [...items];
    const draggedItem = updatedItems.splice(draggingItem, 1)[0];
    updatedItems.splice(index, 0, draggedItem);
    setDraggingItem(index);
    setItems(updatedItems);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  return (
    <div>
      <h3>Drag and Drop List</h3>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DragDropList;
