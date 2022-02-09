import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import './SolarizeForm.scss';
import './helpers.scss';
import Range from './Range';


function SolarizeForm(props) {
    const [threshold, setThreshold] = useState(128);

    function solarizeImage() {
        if (threshold === 0) {
            props.onClose();
        } else {
            props.onClose();
            props.onApply(threshold);
        }
    }

    return (
      <Modal
        onClose={props.onClose}
        isVisible={props.isVisible}
        title="Соляризация">
        <div className="SolarizeForm">
            <div className="SolarizeForm__body">
            <div className="SolarizeForm__label">
                Порог:
            </div>                
            <Range
                defaultValue={threshold}
                max={300}
                onChange={(value) => setThreshold(value)} />
            </div>
            <div className="SolarizeForm__footer">
                <Button primary="true" onClick={solarizeImage}>
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

export default SolarizeForm;