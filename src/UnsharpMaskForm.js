import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import './UnsharpMaskForm.scss';
import Range from './Range';
import ValueInput from './ValueInput';


function UnsharpMaskForm(props) {
    const [radius, setRadius] = useState(2);
    const [percent, setPercent] = useState(150);
    const [threshold, setThreshold] = useState(3);
    const [minPercent, maxPercent] = [0, 300];
    const [minThreshold, maxThreshold] = [0, 100];

    function blurImage() {
        if (radius === 0) {
            props.onClose();
        } else {
            props.onClose();
            props.onApply(radius, percent, threshold);
        }
    }

    function setPercentUp() {
        if (percent >= maxPercent) return;
        setPercent(oldValue => oldValue + 1);
    }

    function setPercentDown() {
        if (percent <= minPercent) return;
        setPercent(oldValue => oldValue - 1);
    }

    function handlePercentChange(e) {
        if (e.target.value.length === 0) {
            setPercent(0);
            return;
        }

        const newValue = parseInt(e.target.value);
        
        if (!isNaN(newValue) &&
            newValue >= minPercent &&
            newValue <= maxPercent) {
            setPercent(newValue);
        }
    }

    function setThresholdUp() {
        if (threshold >= maxThreshold) return;
        setThreshold(oldValue => oldValue + 1);
    }

    function setThresholdDown() {
        if (threshold <= minThreshold) return;
        setThreshold(oldValue => oldValue - 1);
    }

    function handleThresholdChange(e) {
        if (e.target.value.length === 0) {
            setThreshold(0);
            return;
        }

        const newValue = parseInt(e.target.value);
        
        if (!isNaN(newValue) &&
            newValue >= minThreshold &&
            newValue <= maxThreshold) {
            setThreshold(newValue);
        }
    }

    return (
      <Modal
        onClose={props.onClose}
        isVisible={props.isVisible}
        title={props.title}>
        <div className="UnsharpMaskForm">
            <div className="UnsharpMaskForm__body">
                <div className="UnsharpMaskForm__row">
                    <div className="UnsharpMaskForm__label">
                        Радиус размытия:
                    </div>                
                    <Range
                        defaultValue={radius}
                        max={100}
                        onChange={(value) => setRadius(value)} />                
                </div>
                <div className="UnsharpMaskForm__row">
                    <div className="UnsharpMaskForm__label">
                        Сила, %:
                    </div>
                    <ValueInput
                        value={percent}
                        onValueUp={setPercentUp}
                        onValueDown={setPercentDown}
                        onChange={handlePercentChange} />
                </div>
                <div className="UnsharpMaskForm__row">
                    <div className="UnsharpMaskForm__label">
                        Порог:
                    </div>                
                    <ValueInput
                        value={threshold}
                        onValueUp={setThresholdUp}
                        onValueDown={setThresholdDown}
                        onChange={handleThresholdChange} />
                </div>
            </div>
            <div className="UnsharpMaskForm__footer">
                <Button primary="true" onClick={blurImage}>
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

export default UnsharpMaskForm;