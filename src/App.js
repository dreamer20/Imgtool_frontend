import React, { useRef, useState } from 'react';
import './App.scss';

import RadioButton from './RadioButton';

const api_url = 'http://localhost:5000/api/';

function App() {
  const [degree, setDegree] = useState(0);
  const [checkedRadio, setCheckedRadio] = useState(0);

  function handleChange(value) {
    setDegree(value);
    setCheckedRadio(value);
  }

  return (
    <div className="App">
      <RadioButton
        text="90"
        name="test"
        checked={checkedRadio === 90 ? true : false} 
        onChange={() => handleChange(90)}/> <br />

      <RadioButton
        text="180"
        name="test"
        checked={checkedRadio === 180 ? true : false}
        onChange={() => handleChange(180)}/> <br />

      <RadioButton
        text="270"
        name="test"
        checked={checkedRadio === 270 ? true : false}
        onChange={() => handleChange(270)}/> <br />

      <RadioButton
        text="Другое"
        name="test"
        checked={checkedRadio === -1 ? true : false}
        onChange={() => setCheckedRadio(-1)}/>
    </div>
  );
}

export default App;
