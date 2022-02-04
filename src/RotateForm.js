import React, { useEffect, useState, useRef } from 'react';
import Modal from './Modal';
import ValueInput from './ValueInput';
import RadioButton from './RadioButton';
import Button from './Button';
import './RotateForm.scss';
import './helpers.scss';


function RotateForm(props) {

    const [degree, setDegree] = useState(0);
    const [checkedRadio, setCheckedRadio] = useState(-1);
    const [min, max] = [0, 360];
    
    function setValueUp() {
        setCheckedRadio(-1);
        if (degree >= max) return;
        setDegree(oldValue => oldValue + 1);
    }

    function setValueDown() {
        setCheckedRadio(-1);
        if (degree <= min) return;
        setDegree(oldValue => oldValue - 1);
    }

    function handleDegreeChange(e) {
        setCheckedRadio(-1);
        if (e.target.value.length === 0) {
            setDegree(0);
            return;
        }

        const newValue = parseInt(e.target.value);
        
        if (!isNaN(newValue) &&
            newValue >= min &&
            newValue <= max) {
            setDegree(newValue);
        }
    }

    function checkRadio(degree) {
        setDegree(degree);
        setCheckedRadio(degree);
    }

    function rotateImage() {
        if (degree === 0) {
            props.onClose();
        } else {
            props.onClose()
            props.onApply(degree);            
        }
    }

    return (
      <Modal
        onClose={props.onClose}
        isVisible={props.isVisible}
        title="Повернуть изображение">
        <div className="RotateForm">
            <div className="mr-b-5">
                <RadioButton
                    name="degree"
                    text="90&#176;"
                    checked={checkedRadio === 90}
                    onChange={() => checkRadio(90)}/>
            </div>
            <div className="mr-b-5">
                <RadioButton
                    name="degree"
                    text="180&#176;"
                    checked={checkedRadio === 180}
                    onChange={() => checkRadio(180)}/>                
            </div>
            <div className="mr-b-5">
                <RadioButton
                    name="degree"
                    text="270&#176;"
                    checked={checkedRadio === 270}
                    onChange={() => checkRadio(270)}/>                
            </div>
            <div className="RotateForm__custom-input_wrapper">
                <RadioButton
                    name="degree"
                    text="Другое"
                    checked={checkedRadio === -1}
                    onChange={() => setCheckedRadio(-1)}/>
                <div className="mr-l-10">
                    <ValueInput 
                        value={degree}
                        unitSymbol="&#176;"
                        onValueUp={setValueUp}
                        onValueDown={setValueDown}
                        onChange={handleDegreeChange} />
                </div>
            </div>
            <div className="RotateForm__footer">
                <Button primary="true" onClick={rotateImage}>
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

export default RotateForm;