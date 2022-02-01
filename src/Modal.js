import React, { useEffect, useState } from 'react';
import Button from './Button';
import './Modal.scss';

function Modal(props) {

  function handleClick(e) {
    if (e.target == e.currentTarget) {
      props.onClose();
    }
  }

  useEffect(() => {
    if (props.isVisible) {
      const clientWidthScroll = document.body.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      const clientWidthNoScroll = document.body.clientWidth;
      const scrollWidth = clientWidthNoScroll - clientWidthScroll;
      document.body.style.paddingRight = `${scrollWidth}px`;
    }
    return () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.paddingRight = "";
    }
  });

  const style = {display: props.isVisible ? 'flex' : 'none'};
  const cancelButton = (<Button onClick={props.onClose}>
            Отмена
          </Button>);

  return (
    <div className="Modal" style={style} onClick={handleClick}>
      <div className="Modal__window">
        <div className="Modal__header">
          <div className="Modal__title">{props.title}</div>
          <div className="Modal__close" onClick={props.onClose}>&#215;</div>
        </div> 
        <div className="Modal__content">
          {props.children}
        </div>
        <div className="Modal__footer">
          <Button onClick={props.onApply} primary="true">
            {props.applyButtonText || "Ок"}
          </Button>
          {props.cancel ? cancelButton : ""}
        </div>
      </div>
    </div>
  );
}

export default Modal;
