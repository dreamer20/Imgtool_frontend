import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import './BorderForm.scss';
import './helpers.scss';
import ValueInput from './ValueInput';
import Checkbox from './Checkbox';


function BorderForm(props) {
    const [border, setBorder] = useState({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    });
    const [bindParam, setBindParam] = useState(true);
    const [fill, setFill] = useState('#000000');

    function handleBindParamChange(e) {
        setBindParam(e.target.checked);
    }

    function handleFillChange(e) {
        setFill(e.target.value);
    }

    function handleBorderUp(side) {
        setBorder(border => {
            if (bindParam) {
                return {
                    left: border.left + 1,
                    right: border.right + 1,
                    top: border.top + 1,
                    bottom: border.bottom + 1,
                };
            }

            return {
                ...border,
                [side]: border[side] + 1
            };
        });
    }

    function handleBorderDown(side) {
        setBorder(border => {

            if (bindParam) {
                return {
                    left: border.left <= 0 ? 0 : border.left - 1,
                    right: border.right <= 0 ? 0 : border.right - 1,
                    top: border.top <= 0 ? 0 : border.top - 1,
                    bottom: border.bottom <= 0 ? 0 : border.bottom - 1,
                };
            }

            return {
                ...border,
                [side]: border[side] - 1
            };
        });
    }

    function handleBorderChange(e, side) {
        if (e.target.value.length === 0) {
            setBorder(border => {
                if (bindParam) {
                    return {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    };
                }

                return {
                    ...border,
                    [side]: 0
                };
            });
        }

        const newValue = parseInt(e.target.value);
        
        if (!isNaN(newValue)) {
            setBorder(border => {
                if (bindParam) {
                    return {
                        left: newValue,
                        right: newValue,
                        top: newValue,
                        bottom: newValue,
                    };
                }

                return {
                    ...border,
                    [side]: newValue
                };
            });
        }
    }

    function handleBorderImage() {
        props.onClose();
        props.onApply({
            border_left: border.left,
            border_top: border.top,
            border_right: border.right,
            border_bottom: border.bottom,
            fill: fill
        });
    }

    return (
      <Modal
        onClose={props.onClose}
        isVisible={props.isVisible}
        title='Граница'>
        <div className="BorderForm">
            <div className="BorderForm__row fl-end">
            <label className="BorderForm__color-label">
                <div className="BorderForm__color-label-text">
                    Цвет границы: 
                </div>                
                <input
                    className="BorderForm__color"
                    type="color"
                    value={fill}
                    onChange={handleFillChange}
                    />
            </label>
                <Checkbox
                    text='Связать параметры'
                    onChange={handleBindParamChange} 
                    checked={bindParam} />
            </div>                
            <div className="BorderForm__row">
                <div className="BorderForm__label">
                    Левая граница, px:
                </div>                
                <ValueInput
                    value={border.left}
                    onValueUp={() => handleBorderUp('left')}
                    onValueDown={() => handleBorderDown('left')}
                    onChange={handleBorderChange} />
            </div>
            <div className="BorderForm__row">
                <div className="BorderForm__label">
                    Верхняя граница, px:
                </div>                
                <ValueInput
                    value={border.top}
                    onValueUp={() => handleBorderUp('top')}
                    onValueDown={() => handleBorderDown('top')}
                    onChange={handleBorderChange} />
            </div>
            <div className="BorderForm__row">
                <div className="BorderForm__label">
                    Правая граница, px:
                </div>                
                <ValueInput
                    value={border.right}
                    onValueUp={() => handleBorderUp('right')}
                    onValueDown={() => handleBorderDown('right')}
                    onChange={handleBorderChange} />
            </div>
            <div className="BorderForm__row">
                <div className="BorderForm__label">
                    Нижняя граница, px:
                </div>                
                <ValueInput
                    value={border.bottom}
                    onValueUp={() => handleBorderUp('bottom')}
                    onValueDown={() => handleBorderDown('bottom')}
                    onChange={handleBorderChange} />
            </div>
            <div className="BorderForm__footer">
                <Button primary="true" onClick={handleBorderImage}>
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

export default BorderForm;