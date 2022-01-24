import React, { useEffect, useState } from 'react';

import './Modal.scss'

function Modal(props) {

  useEffect(() => {
    if (props.isVisible) {
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.documentElement.style.overflow = 'auto';
    }
  });

  const style = {display: props.isVisible ? 'flex' : 'none'};

  return (
    <div className="Modal" style={style} onClick={props.onClose}>
      <div className="Modal__window">
        
      </div>
    </div>
  );
}

export default Modal;
