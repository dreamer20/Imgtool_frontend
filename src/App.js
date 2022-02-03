import React, { useRef, useState } from 'react';
import './App.scss';

import Button from './Button';
import RotateForm from './RotateForm';

const api_url = 'http://localhost:5000/api/';

function App() {
  const [degree, setDegree] = useState(0);
  const [checkedRadio, setCheckedRadio] = useState(0);
  const [modal, setModal] = useState(0);

  function handleChange(value) {
    setDegree(value);
    setCheckedRadio(value);
  }

  return (
    <div className="App">
      <RotateForm isVisible={modal === 1} onClose={() => setModal(0)}/>
      <Button onClick={() => setModal(1)}>
        Show MOdal
      </Button>
    </div>
  );
}

export default App;
