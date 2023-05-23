// Checkbox.js
import React from 'react';

function Checkbox({ option, selectedOption, onChange }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          name="options"
          value={option}
          checked={selectedOption === option}
          onChange={onChange}
        />
        {option}
      </label>
    </li>
  );
}

export default Checkbox;
