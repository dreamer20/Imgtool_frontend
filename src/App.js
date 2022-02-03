import React, { useRef, useState } from 'react';
import './App.scss';

import Button from './Button';

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
      <Button>
        Ок
      </Button>
      <Button primary>
        Применить
      </Button>
    </div>
  );
}

export default App;
