import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import ValueInput from './ValueInput';
import './EnhanceForm.scss';

function EnhanceForm(props) {
    const [factor, setFactor] = useState('1.0');
    const [min, max] = [0, 2.0];

    function sharpenImage() {
        props.onClose();
        props.onApply(parseFloat(factor));
    }

    function handleValueUp() {
        setFactor(oldValue => {
            const value_int = parseFloat(oldValue);
            if (value_int === max) return oldValue;
            const newValue = value_int + 0.1;
            return newValue.toFixed(1);
        });
    }

    function handleValueDown() {
        setFactor(oldValue => {
            const value_int = parseFloat(oldValue);
            if (value_int === min) return value_int;
            const newValue = value_int - 0.1;
            return newValue.toFixed(1);
        });
    }

    function handleValueChange(e) {
        const value = e.target.value;
        const re = /^\d(?!\d)\.?\d?$/;
        const re_zero = /^0\d$/;

        if (value.length === 0) {
            setFactor(0);
            return;
        }

        if (re_zero.test(value)) {
            if (parseFloat(value) >= min &&
                parseFloat(value) <= max) {
                setFactor(value.replace('0', ''));
                return;
            }

        }

        if (re.test(value)) {
            if (parseFloat(value) >= min &&
                parseFloat(value) <= max) {
                setFactor(value);
                return;
            }
        }
    }

    return (
      <Modal
        onClose={props.onClose}
        isVisible={props.isVisible}
        title={props.title}>
        <div className="EnhanceForm">
            <div className="EnhanceForm__body">
                <div className="EnhanceForm__label">
                    Коэффициент:
                </div>
                <ValueInput
                    name="factor"
                    value={factor}
                    onChange={handleValueChange}
                    onValueUp={handleValueUp}
                    onValueDown={handleValueDown}
                />
            </div>
            <div className="EnhanceForm__footer">
                <Button primary="true" onClick={sharpenImage}>
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

export default EnhanceForm;