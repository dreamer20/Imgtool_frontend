import React, { useRef, useState } from 'react';
import './RadioButton.scss';

function RadioButton (props) {

    const checkedClass = props.checked ? 'RadioButton__checked' : "";

    return (
        <label className={`RadioButton ${checkedClass}`}>
            <div className="RadioButton__view">
                <input
                    name={props.name}
                    onChange={props.onChange}
                    className="RadioButton__input"
                    type="radio" />                
            </div>
            <div 
                className="RadioButton__text">
                {props.text}
            </div>
        </label>
    )
}

export default RadioButton;