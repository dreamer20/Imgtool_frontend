import React, { useRef, useState } from 'react';
import './Checkbox.scss';

function Checkbox (props) {

    const checkedClass = props.checked ? 'Checkbox__checked' : "";

    return (
        <label className={`Checkbox ${checkedClass}`}>
            <div
                className="Checkbox__text">
                {props.text}
            </div>
            <div className="Checkbox__view">
                <input
                    name={props.name}
                    onChange={props.onChange}
                    checked={props.checked}
                    className="Checkbox__input"
                    type="checkbox" />                
            </div>
        </label>
    )
}

export default Checkbox;