import React, { useEffect, useState, useRef } from 'react';
import Modal from './Modal';
import ValueInput from './ValueInput';

function RotateForm(props) {

    const [degree, setDegree] = useState(0);
    const radioRef = useRef();
    const [min, max] = [0, 360];
    radioRef.current.checked = true;
    
    function setValueUp() {
        radioRef.current.checked = true;
        if (degree >= max) return;
        setDegree(oldValue => oldValue + 1);
    }

    function setValueDown() {
        radioRef.current.checked = true;
        if (degree <= min) return;
        setDegree(oldValue => oldValue - 1);
    }

    function handleDegreeChange(e) {
        const newValue = parseInt(e.target.value);
        console.log(newValue);
        if (!isNaN(newValue) &&
            newValue >= min &&
            newValue <= max) {
            setDegree(newValue);
        }
    }

    return (
      <Modal
        onClose={props.onClose}
        isVisible={props.isVisible}
        title="Повернуть изображение">
        <input type="radio" value="90" name="degree" /> 90&#176; <br/>
        <input type="radio" value="180" name="degree" /> 180&#176; <br/>
        <input type="radio" value="270" name="degree" /> 270&#176; <br/>
        <input type="radio" name="degree" ref={radioRef} /> Другое
        <ValueInput
            value={degree}
            unitSymbol="&#176;"
            onChange={handleDegreeChange}
            onValueUp={setValueUp}
            onValueDown={setValueDown}/>
      </Modal>
    );
}

export default RotateForm;