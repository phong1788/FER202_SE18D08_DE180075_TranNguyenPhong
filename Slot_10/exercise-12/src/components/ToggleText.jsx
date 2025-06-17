import React, { useState } from "react";

function ToggleText() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <h3>Toggle Visibility</h3>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"}
      </button>
      {visible && <p>Toggle me!</p>}
    </div>
  );
}

export default ToggleText;
