import React, { useRef, useState } from 'react';
import './App.scss';
import Menu from './Menu';
import MenuBar from './MenuBar';
import MenuItem from './MenuItem';
import ImagePreview from './ImagePreview';

function App() {

  const [openedImgSrc, setOpenedImgSrc] = useState(null);
  const imgInputFileEl = useRef(null);

  function openImage() {
    imgInputFileEl.current.click();
  }

  function handleImgInputFileChange(e) {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    setOpenedImgSrc(imgUrl);
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
          <Menu title="Test">
            <MenuItem>
              Test
            </MenuItem>            
          </Menu>
        </MenuBar>
      </header>
      <h2 className="App__title">Оригинал:</h2>
      <ImagePreview onClick={openImage} src={openedImgSrc} image='original' />
      <h2 className="App__title">Результат:</h2>
      <ImagePreview image='result' />
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
