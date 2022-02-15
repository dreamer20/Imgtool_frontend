import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import './PosterizeForm.scss';
import './helpers.scss';
import ValueInput from './ValueInput';


function PosterizeForm(props) {
    const [bits, setBits] = useState(0);
    const [min, max] = [0, 8];

    function handleBitsUp() {
        setBits(bits => {
            if (bits >= max) return max;
            return bits + 1;
        });
    }

    function handleBitsDown() {
        setBits(bits => {
            if (bits <= min) return min;
            return bits - 1;
        });
    }

    function handleBitsChange(e) {
        if (e.target.value.length === 0) {
            setBits(0);
            return;
        }

        const newValue = parseInt(e.target.value);
        
        if (!isNaN(newValue) &&
            newValue <= max &&
            newValue >= min) {
            setBits(newValue);
        }
    }

    function handlePosterizeImage() {
        if (bits === 0) {
            props.onClose();
            return;
        }
        props.onClose();
        props.onApply(bits);            
    }

    return (
      <Modal
        onClose={props.onClose}
        isVisible={props.isVisible}
        title='Постеризация'>
        <div className="PosterizeForm">
            <div className="PosterizeForm__row">
                <div className="PosterizeForm__label">
                    Количество битов:
                </div>                
                <ValueInput
                    value={bits}
                    onValueUp={handleBitsUp}
                    onValueDown={handleBitsDown}
                    onChange={handleBitsChange} />
            </div>
            <div className="PosterizeForm__footer">
                <Button primary="true" onClick={handlePosterizeImage}>
                    Применить
                </Button>
                <Button onClick={props.onClose}>
                    Отмена
                </Button>
            </div>
        </div>
      </Modal>
    );
}

export default PosterizeForm;