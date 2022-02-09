import React, { useState, useRef, useEffect } from 'react';
import './Range.scss';

function Range (props) {
    const divRef = useRef();
    const [rangeParams, setRangeParams] = useState({
        scalePosition: props.defaultValue ? (100 / props.max) * props.defaultValue : 0,
        value: props.defaultValue || 0
    });
    // const [value, setValue] = useState(props.defaultValue || 0);
    // const [scaleValue, setScaleValue] = useState(props.defaultValue || 0);
    const [isDragged, setIsDragged] = useState(false);
    const valuePart = props.max / 100;

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

    useEffect(() => props.onChange(rangeParams.value));

    function calculateValue(clientX) {
        const rect = divRef.current.getBoundingClientRect();
        const scaleWidth = rect.width;
        const part = Math.floor(scaleWidth) / 100;
        const current = clientX - rect.left;
        const scalePosition = Math.floor(current / part);

        if (scalePosition > 100) return 100;
        if (scalePosition < 0) return 0;

        return Math.floor(scalePosition);
    }

    function handleMouseDown(e) {
        setIsDragged(true);
        const scalePosition = calculateValue(e.clientX);
        setRangeParams({
            scalePosition: scalePosition,
            value: scalePosition * valuePart
        });
    }

    function mouseUp(e) {
        setIsDragged(false);
    }

    function handleMouseMove(e) {
        const scalePosition = calculateValue(e.clientX);
        setRangeParams({
            scalePosition: scalePosition,
            value: scalePosition * valuePart
        });
    }

    function onValueDown() {
        setRangeParams(oldState => {
            if (oldState.scalePosition <= 0) {
                return {
                    scalePosition: 0,
                    value: 0
                }
            }

            return {
                scalePosition: oldState.scalePosition - 1,
                value: (oldState.scalePosition - 1) * valuePart
            };
        });
    }

    function onValueUp() {
        setRangeParams(oldState => {
            if (oldState.scalePosition >= 100) {
                return {
                    scalePosition: 100,
                    value: 100 * valuePart
                }
            }

            return {
                scalePosition: oldState.scalePosition + 1,
                value: (oldState.scalePosition + 1) * valuePart
            };
        });
    }

    const style = {width: `${rangeParams.scalePosition}%`};

    return (
        <div className="Range">
            <button className="Range__button Range__button-down" onClick={onValueDown}>
                &lt;     
            </button>
            <div ref={divRef} className="Range__scale" onMouseDown={handleMouseDown}>
                <div className="Range__value">
                    {rangeParams.value}
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