import React from 'react';
import './MenuItem.scss';

function MenuItem(props) {
  return (
    <li onClick={props.onClick} className="MenuItem">
        {props.children}
    </li>
  );
}

export default MenuItem;
