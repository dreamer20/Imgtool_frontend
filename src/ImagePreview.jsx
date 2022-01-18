import React from 'react';
import './ImagePreview.scss';

function ImagePreview(props) {
  let previewInner = null,
      previewContainerInner = null;

  if (props.image === 'original') {
    previewContainerInner = (
      <button 
        className="ImagePreview__button"
        onClick={props.onClick}>
        Выбрать изображение
      </button>
    );
  } else if (props.image === 'result') {
    previewContainerInner = (
      <div className="ImagePreview__text">
        Результат        
      </div>
    )
  }

  if (props.src) {
    previewInner = <img src={props.src} alt={props.image} className="ImagePreview__image" />;
  } else {
    previewInner = (
      <div className="ImagePreview__container">
        {previewContainerInner}
      </div>
    );
  }

  return (
    <div className="ImagePreview">
      {previewInner}        
    </div>
  );
}

export default ImagePreview;
