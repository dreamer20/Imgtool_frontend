import React, { useRef, useState } from 'react';
import './App.scss';
import Menu from './Menu';
import MenuBar from './MenuBar';
import MenuItem from './MenuItem';
import ImagePreview from './ImagePreview';

const api_url = 'http://localhost:5000/api/'

function App() {

  const [openedImgSrc, setOpenedImgSrc] = useState(null);
  const [resultImgSrc, setResultImgSrc] = useState(null);
  const imgInputFileEl = useRef(null);

  function processImage(tool_name, processOptions) {
    if (!imgInputFileEl.current.files[0]) {
      alert('Файл не выбран');
      return;
    }
    const formData = new FormData();
    formData.append(
      'image',
      imgInputFileEl.current.files[0],
      imgInputFileEl.current.files[0].name
    );
    for (let key in processOptions) {
      formData.append(key, processOptions[key])
    }
    const fetchOptions = {
      method: 'POST',
      body: formData,
      mode: 'cors'
    };

    fetch(api_url + tool_name, fetchOptions)
      .then((response) => {
        if (response.status === 400) {
          response.json().then(data => alert(data.error));
        } else if (response.status === 200) {
          response.blob().then(blob => {
          const src = URL.createObjectURL(blob);
          setResultImgSrc(src);
          });
        } else {
          alert('Непредвиденная ошибка');
        }
      });

    }
    // check if file is available else show message
    // create form
    // send data and get response
    // if response status is 400 then show error message
    // if response status not 200 and 400 then show enother error message
    // if response is ok then get blob data
    // create url for image and update state

  function openImage() {
    imgInputFileEl.current.click();
  }

  function handleImgInputFileChange(e) {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    setOpenedImgSrc(imgUrl);
  }

  function reflectImage(direction) {
    processImage('reflect', {direction: direction});
  }

  function rotateImage(degree) {
    if (degree) {
      processImage('rotate', {degree: degree});
    }
  }

  return (
    <div className="App">
      <header className="App__header">
        <MenuBar>
          <Menu title="Изображение">
            <MenuItem onClick={openImage}>
              Открыть
            </MenuItem>            
          </Menu>
          <Menu title="Отражение">
            <MenuItem onClick={() => reflectImage('horizontally')}>
              Отразить по горизонтали
            </MenuItem>            
            <MenuItem onClick={() => reflectImage('vertically')}>
              Отразить по вертикали
            </MenuItem>            
          </Menu>
          <Menu title="Вращение">
            <MenuItem border onClick={() => rotateImage()}>
              Повернуть изображение
            </MenuItem>            
            <MenuItem onClick={() => rotateImage('90')}>
              Повернуть на 90&#176;
            </MenuItem>            
            <MenuItem onClick={() => rotateImage('180')}>
              Повернуть на 180&#176;
            </MenuItem>            
            <MenuItem onClick={() => rotateImage('270')}>
              Повернуть на 270&#176;
            </MenuItem>            
          </Menu>
        </MenuBar>
      </header>
      <h2 className="App__title">Оригинал:</h2>
      <ImagePreview onClick={openImage} src={openedImgSrc} image='original' />
      <h2 className="App__title">Результат:</h2>
      <ImagePreview image='result' src={resultImgSrc} />
      <input
        ref={imgInputFileEl} 
        type="file"
        accept="image/*" 
        onChange={handleImgInputFileChange}
        className="App__imgInput" /> 
    </div>
  );
}

export default App;
