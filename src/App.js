import React, { useRef, useState } from 'react';
import './App.scss';
import Menu from './Menu';
import MenuBar from './MenuBar';
import MenuItem from './MenuItem';
import ImagePreview from './ImagePreview';
import Modal from './Modal';
import RotateForm from './RotateForm';
import SolarizeForm from './SolarizeForm';
import EnhanceForm from './EnhanceForm';
import BlurForm from './BlurForm';
import ResizeForm from './ResizeForm';
import UnsharpMaskForm from './UnsharpMaskForm';

const api_url = 'http://localhost:5000/api/';

function App() {

  const [openedImgSrc, setOpenedImgSrc] = useState(null);
  const [openedModal, setOpenedModal] = useState(null);
  const [resultImgSrc, setResultImgSrc] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageParams, setImageParams] = useState({width: 1, height: 1});
  const [range, setRange] = useState(0);
  const imgInputFileEl = useRef(null);

  function processImage(tool_name, processOptions) {
    if (!imgInputFileEl.current.files[0]) {
      showErrorMessage('Файл не выбран.');
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
          response.json().then(data => showErrorMessage(data.error));
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

  function handleImageParams(e) {
    setImageParams({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    });
  }

  function handleImgInputFileChange(e) {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    setOpenedImgSrc(imgUrl);
  }

  function reflectImage(direction) {
    processImage('reflect', {direction: direction});
  }

  function rotateImage(degree) {
    console.log(degree);
    if (degree) {
      processImage('rotate', {degree: degree});
    } else {
      setOpenedModal('rotate');
    }
  }

  function solarizeImage(threshold) {
    processImage('solarize', {threshold: threshold});
  }

  function applyUnsharpMask(radius, percent, threshold) {
    processImage('unsharp_mask', {
      radius,
      percent,
      threshold
    });
  }

  function enhanceImage(property , factor) {
    processImage(property, {factor: factor});
  }

  function applyFilter(filterName) {
    processImage('filter', {filterName});
  }

  function showErrorMessage(message) {
    setErrorMessage(message);
    setOpenedModal('error');
  }

  function closeModal() {
    setOpenedModal(null)
  }

  function showModal(modalName) {
    setOpenedModal(modalName);
  }

  let resizeForm = null;

  if (openedModal === 'resize') {
    resizeForm = <ResizeForm
          height={imageParams.height}
          width={imageParams.width}
          onApply={(width, height) => processImage('resize', {width, height})}
          onClose={closeModal}
          isVisible={openedModal === 'resize'}/>
  }

  return (
    <div className="App">
      <header className="App__header">
        <MenuBar>
          <Menu title="Изображение">
            <MenuItem border onClick={openImage}>
              Открыть
            </MenuItem>            
            <MenuItem onClick={() => showModal('resize')}>
              Изменить размер
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
          <Menu title="Фильтры">
            <MenuItem onClick={() => applyFilter('CONTOUR')}>
              Контур
            </MenuItem>                        
            <MenuItem onClick={() => applyFilter('DETAIL')}>
              Уточнение
            </MenuItem>                        
            <MenuItem onClick={() => applyFilter('EMBOSS')}>
              Тиснение
            </MenuItem>                        
            <MenuItem onClick={() => applyFilter('EDGE_ENHANCE')}>
              Уточнить край
            </MenuItem>                        
            <MenuItem onClick={() => applyFilter('SMOOTH')}>
              Сгладить
            </MenuItem>                        
            <MenuItem border onClick={() => applyFilter('FIND_EDGES')}>
              Выделение краев
            </MenuItem>                        
            <MenuItem onClick={() => showModal('solarize')}>
              Соляризация
            </MenuItem>                        
            <MenuItem onClick={() => showModal('unsharpMask')}>
              Маска нерезкости
            </MenuItem>                        
          </Menu>
          <Menu title="Усилить">
            <MenuItem onClick={() => showModal('sharpness')}>
              Резкость
            </MenuItem>                                    
            <MenuItem onClick={() => showModal('brightness')}>
              Яркость
            </MenuItem>                                    
            <MenuItem onClick={() => showModal('contrast')}>
              Контраст
            </MenuItem>                                    
            <MenuItem onClick={() => showModal('color')}>
              Цвет
            </MenuItem>                                    
          </Menu>
          <Menu title="Размытие">
            <MenuItem onClick={() => showModal('blur')}>
              Размытие
            </MenuItem>                                    
            <MenuItem onClick={() => showModal('gaussianBlur')}>
              Размытие по Гауссу
            </MenuItem>                                    
          </Menu>
        </MenuBar>
      </header>
      <h2 className="App__title">Оригинал:</h2>
      <ImagePreview onLoad={handleImageParams} onClick={openImage} src={openedImgSrc} image='original' />
      <h2 className="App__title">Результат:</h2>
      <ImagePreview image='result' src={resultImgSrc} />
      <input
        ref={imgInputFileEl} 
        type="file"
        accept="image/*" 
        onChange={handleImgInputFileChange}
        className="App__imgInput" /> 
      <RotateForm
          onApply={rotateImage}
          onClose={closeModal}
          isVisible={openedModal === 'rotate' ? true : false}/>
      <SolarizeForm
          onApply={solarizeImage}
          onClose={closeModal}
          isVisible={openedModal === 'solarize' ? true : false}/>
      <UnsharpMaskForm
          onApply={applyUnsharpMask}
          onClose={closeModal}
          isVisible={openedModal === 'unsharpMask'}/>
      <EnhanceForm
          title='Резкость'
          onApply={(factor) => enhanceImage('sharpness', factor)}
          onClose={closeModal}
          isVisible={openedModal === 'sharpness'}/>
      <EnhanceForm
          title='Яркость'
          onApply={(factor) => enhanceImage('brightness', factor)}
          onClose={closeModal}
          isVisible={openedModal === 'brightness'}/>
      <EnhanceForm
          title='Контраст'
          onApply={(factor) => enhanceImage('contrast', factor)}
          onClose={closeModal}
          isVisible={openedModal === 'contrast'}/>
      <EnhanceForm
          title='Цвет'
          onApply={(factor) => enhanceImage('color', factor)}
          onClose={closeModal}
          isVisible={openedModal === 'color'}/>
      <BlurForm
          title='Размытие'
          onApply={(radius) => processImage('box_blur', {radius})}
          onClose={closeModal}
          isVisible={openedModal === 'blur'}/>
      <BlurForm
          title='Размытие по Гауссу'
          onApply={(radius) => processImage('gaussian_blur', {radius})}
          onClose={closeModal}
          isVisible={openedModal === 'gaussianBlur'}/>
      <BlurForm
          title='Размытие по Гауссу'
          onApply={(radius) => processImage('gaussian_blur', {radius})}
          onClose={closeModal}
          isVisible={openedModal === 'gaussianBlur'}/>
      {resizeForm}
      <Modal
        onClose={closeModal}
        isVisible={openedModal === 'error' ? true : false}
        onApply={closeModal}>
        {errorMessage}
      </Modal>
    </div>
  );
}

export default App;
