import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import ValueInput from './ValueInput';
import './SharpnessForm.scss';

function SharpnessForm(props) {
    const [factor, setFactor] = useState(1.0);
    const [min, max] = [0, 2.0]

    function solarizeImage() {
        props.onClose();
        props.onApply(factor);
    }

    function correctValue(value) {
        return parseFloat(value.toFixed(1));
    }

    function handleValueUp() {
        setFactor(oldValue => {
            if (oldValue === max) return oldValue;
            return correctValue(oldValue + 0.1);
        });
    }

    function handleValueDown() {
        setFactor(oldValue => {
            if (oldValue === min) return oldValue;
            return correctValue(oldValue - 0.1);
        });
    }

    function handleValueChange(e) {
        if (e.target.value.length === 0) {
            setFactor(0);
            return;
        }

        const newValue = parseFloat(e.target.value)

        if (!isNaN(newValue) &&
            newValue >= min &&
            newValue <= max) {
            setFactor(correctValue(newValue));
        }
    }

    return (
      <Modal
        onClose={props.onClose}
        isVisible={props.isVisible}
        title="Резкость">
        <div className="SharpnessForm">
            <div className="SharpnessForm__body">
            <div className="SharpnessForm__label">
                Коэффициент:
            </div>
            <ValueInput
                name="factor"
                value={factor}
                onChange={handleValueChange}
                onValueUp={handleValueUp}
                onValueDown={handleValueDown}
            />
            <div className="SharpnessForm__footer">
                <Button primary="true" onClick={solarizeImage}>
                    Применить
                </Button>
                <Button onClick={props.onClose}>
                    Close
                </Button>
            </div>
            </div>
        </div>
      </Modal>
    );
}

export default SharpnessForm;