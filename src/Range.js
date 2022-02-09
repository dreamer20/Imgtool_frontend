import React, { useState, useRef, useEffect } from 'react';
import './Range.scss';

function Range (props) {
    const divRef = useRef();
    const [value, setValue] = useState(0);
    const [isDragged, setIsDragged] = useState(false);

    useEffect(() => {
        if (isDragged) {
            document.addEventListener('mousemove', handleMouseMove);        
            document.addEventListener('mouseup', mouseUp);            
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', mouseUp);
        }        
    });

    useEffect(() => props.onChange(value));

    function calculateValue(clientX) {
        const rect = divRef.current.getBoundingClientRect();
        const scaleWidth = rect.width;
        const part = Math.floor(scaleWidth) / 100;
        const current = clientX - rect.left;
        const value = Math.floor(current / part);

        if (value > 100) return 100;
        if (value < 0) return 0;

        return Math.floor(value);
    }

    function handleMouseDown(e) {
        setIsDragged(true);
        const value = calculateValue(e.clientX);
        setValue(value);
    }

    function mouseUp(e) {
        setIsDragged(false);
    }

    function handleMouseMove(e) {
        const value = calculateValue(e.clientX);
        setValue(value);
    }

    function onValueDown() {
        setValue(oldValue => {
            if (oldValue <= 0) return 0;
            return oldValue - 1;
        });
    }

    function onValueUp() {
        setValue(oldValue => {
            if (oldValue >= 100) return 100;
            return oldValue + 1;
        });
    }

    const style = {width: `${value}%`};

    return (
        <div className="Range">
            <button className="Range__button Range__button-down" onClick={onValueDown}>
                &lt;     
            </button>
            <div ref={divRef} className="Range__scale" onMouseDown={handleMouseDown}>
                <div className="Range__value">
                    {value}
                </div>
                <div className="Range__slider" style={style}>
                </div>
            </div>
            <button className="Range__button Range__button-up" onClick={onValueUp}>
                &gt;
            </button>
        </div>
    )
}

export default Range;