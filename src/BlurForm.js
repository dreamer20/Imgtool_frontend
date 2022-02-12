import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import './BlurForm.scss';
import Range from './Range';


function BlurForm(props) {
    const [radius, setRadius] = useState(0);

    function blurImage() {
        if (radius === 0) {
            props.onClose();
        } else {
            props.onClose();
            props.onApply(radius);
        }
    }

    return (
      <Modal
        onClose={props.onClose}
        isVisible={props.isVisible}
        title={props.title}>
        <div className="BlurForm">
            <div className="BlurForm__body">
            <div className="BlurForm__label">
                Радиус размытия:
            </div>                
            <Range
                defaultValue={radius}
                max={100}
                onChange={(value) => setRadius(value)} />
            </div>
            <div className="BlurForm__footer">
                <Button primary="true" onClick={blurImage}>
                    Применить
                </Button>
                <Button onClick={props.onClose}>
                    Close
                </Button>
            </div>
        </div>
      </Modal>
    );
}

export default BlurForm;