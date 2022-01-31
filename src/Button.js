import React from 'react';
import "./Button.scss"

function Button(props) {

    const className = `Button ${props.primary ? "Button_primary" : ""}`

    return (
        <button className={className} {...props}>
            {props.children}
        </button>
    );
}

export default Button;