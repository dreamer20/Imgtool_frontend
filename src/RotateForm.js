import React, { useEffect, useState, useRef } from 'react';
import Modal from './Modal';
import ValueInput from './ValueInput';
import RadioButton from './RadioButton';
import './RotateForm.scss';


function RotateForm(props) {

    const [degree, setDegree] = useState(0);
    const [checkedRadio, setCheckedRadio] = useState(3);
    const [min, max] = [0, 360];
    
    function setValueUp() {
        setCheckedRadio(3);
        if (degree >= max) return;
        setDegree(oldValue => oldValue + 1);
    }

    function setValueDown() {
        setCheckedRadio(3);
        if (degree <= min) return;
        setDegree(oldValue => oldValue - 1);
    }

    function handleDegreeChange(e) {
        if (e.target.value.length === 0) {
            setDegree(0);
            return;
        }

        const newValue = parseInt(e.target.value);
        console.log(e.target.value);
        
        if (!isNaN(newValue) &&
            newValue >= min &&
            newValue <= max) {
            setDegree(newValue);
        }
    }

    function checkRadio(e, id) {
        if (e.target.value) {
            setDegree(parseInt(e.target.value));
        }

        setCheckedRadio(id);
    }

    function rotateImage() {
        props.onApply(degree);
        props.onClose()
    }

    return (
      <Modal
        onClose={props.onClose}
        isVisible={props.isVisible}
        title="Повернуть изображение"
        onApply={rotateImage}>
        <div className="RotateForm">
            <div className="RotateForm__top">
                <div className="RotateForm__section">
                    <RadioButton 
                        text="90&#176;" 
                        name="degree" 
                        value="90" 
                        checked={checkedRadio === 0} 
                        onChange={(e) => checkRadio(e ,0)}/>
                </div>
                <div className="RotateForm__section">
                    <RadioButton 
                        text="180&#176;" 
                        name="degree" 
                        value="180" 
                        checked={checkedRadio === 1} 
                        onChange={(e) => checkRadio(e ,1)}/>
                </div>
                <div className="RotateForm__section">
                    <RadioButton 
                        text="270&#176;" 
                        name="degree" 
                        value="270" 
                        checked={checkedRadio === 2} 
                        onChange={(e) => checkRadio(e ,2)}/>
                </div>
            </div>
            <div className="RotateForm__bottom">
                <div className="RotateForm__section_half">
                    <RadioButton 
                        text="Другое" 
                        name="degree" 
                        checked={checkedRadio === 3} 
                        onChange={(e) => checkRadio(e, 3)}/>
                </div>
                <div className="RotateForm__section_half1">
                <ValueInput
                    value={degree}
                    unitSymbol="&#176;"
                    onChange={handleDegreeChange}
                    onValueUp={setValueUp}
                    onValueDown={setValueDown}/>
                </div>                            
            </div>
        </div>
      </Modal>
    );
}

export default RotateForm;