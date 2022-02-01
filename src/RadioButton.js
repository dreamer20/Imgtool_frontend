import React, { useRef, useState } from 'react';
import './RadioButton.scss';

function RadioButton (props) {
    const activeClass = props.checked ? "RadioButton__radio-circle_checked" : ""
    return (
        <label className="RadioButton">
            <div className={`RadioButton__radio-circle ${activeClass}`}>
                <input
                    {...props}
                    className="RadioButton__input"
                    type="radio"
                    name={props.name}
                    onChange={props.onChange}
                    value={props.value} />
                
            </div>
            <div className="RadioButton__text">
                {props.text}
            </div>
        </label>
    )
}

export default RadioButton;