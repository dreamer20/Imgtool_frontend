import React, { useEffect, useState } from 'react';

import './ValueInput.scss';

function ValueInput(props) {
    return (
        <div className="ValueInput">
            <input
                onChange={props.onChange}
                value={props.value} 
                className="ValueInput__input" 
                type="text" 
                name={props.name} />
            <div className="ValueInput__unit">              
                {props.unitSymbol}
            </div>
            <div className="ValueInput__buttons">
                <button
                    // disabled
                    onClick={props.onValueUp}
                    className="ValueInput__button ValueInput__button_up">&#65087;</button>
                <button
                    // disabled
                    onClick={props.onValueDown}
                    className="ValueInput__button ValueInput__button_down">&#65088;</button>
            </div>
        </div>
    );
}

export default ValueInput;