import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import './ResizeForm.scss';
import './helpers.scss';
import ValueInput from './ValueInput';
import Checkbox from './Checkbox';


function ResizeForm(props) {
    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);
    const [paramBind, setParamBind] = useState(true);

    function handleWidthUp() {
        if (paramBind) {
            setHeight(height => height + 1);
        }
        setWidth(width => width + 1);
    }

    function handleHeightUp() {
        if (paramBind) {
            setWidth(width => width + 1);
        }
        setHeight(height => height + 1);
    }

    function handleWidthDown() {
        if (paramBind) {
            setHeight(height => {
                if (height <= 1) return height;
                return height - 1;
            });            
        }

        setWidth(width => {
            if (width <= 1) return width;
            return width - 1;
        });
    }

    function handleHeightDown() {
        if (paramBind) {
            setWidth(width => {
                if (width <= 1) return width;
                return width - 1;
            });
        }

        setHeight(height => {
            if (height <= 1) return height;
            return height - 1;
        });
    }

    function handleParamBindChange(e) {
        setParamBind(e.target.checked);
    }

    function handleHeightChange(e) {
        if (e.target.value.length === 0) {
            setHeight(1);

            if (paramBind) {
                setWidth(1);
            }

            return;
        }

        const newValue = parseInt(e.target.value);
        
        if (!isNaN(newValue)) {
            setHeight(newValue);

            if (paramBind) {
                setWidth(newValue);
            }
        }
    }

    function handleWidthChange(e) {
        if (e.target.value.length === 0) {
            setWidth(1);

            if (paramBind) {
                setHeight(1);
            }

            return;
        }

        const newValue = parseInt(e.target.value);
        
        if (!isNaN(newValue)) {
            setWidth(newValue);

            if (paramBind) {
                setHeight(newValue);
            }
        }
    }

    function handleResizeImage() {
        props.onClose();
        props.onApply(width, height);            
    }

    return (
      <Modal
        onClose={props.onClose}
        isVisible={props.isVisible}
        title='Изменить размер'>
        <div className="ResizeForm">
            <div className="ResizeForm__body">
                <div className="ResizeForm__row">
                    <div className="ResizeForm__label">
                        Ширина, px:
                    </div>
                    <ValueInput
                        value={width}
                        onValueUp={handleWidthUp}
                        onValueDown={handleWidthDown}
                        onChange={handleWidthChange} />
                </div>
                <div className="ResizeForm__row fl-end">
                <Checkbox
                    onChange={handleParamBindChange}
                    checked={paramBind === true}
                    text='Связать параметры'/>
                </div>
                <div className="ResizeForm__row">
                    <div className="ResizeForm__label">
                        Высота, px:
                    </div>                
                    <ValueInput
                        value={height}
                        onValueUp={handleHeightUp}
                        onValueDown={handleHeightDown}
                        onChange={handleHeightChange} />
                </div>
            </div>
            <div className="ResizeForm__footer">
                <Button primary="true" onClick={handleResizeImage}>
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

export default ResizeForm;