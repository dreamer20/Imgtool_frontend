import React, { useState, useEffect } from 'react';
import './MenuBar.scss';

function MenuBar(props) {
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);

  function openMenu(index) {
    if (index == openedMenuIndex) {
      setOpenedMenuIndex(null);
    } else {
      setOpenedMenuIndex(index);
    }
  };

  useEffect(() => {
    const closeMenu = () => {
      if (openedMenuIndex !== null) {
        setOpenedMenuIndex(null);
      }
      document.documentElement.removeEventListener('click', closeMenu);
    };
    document.documentElement.addEventListener('click', closeMenu);

    return () => document.documentElement.removeEventListener('click', closeMenu);
  });

  const menu = props.children.map((elem, index) => {
    const openedClass = index === openedMenuIndex ? 'MenuBar__opened' : '';
    const MenuStyle = {display: index == openedMenuIndex ? 'initial' : 'none'};

    return (
      <li
        onClick={() => openMenu(index)}
        className={`MenuBar__item ${openedClass}`} 
        key={elem.props.title}>
        {elem.props.title}
        <ul style={MenuStyle} className="MenuBar__menu">
          {elem}
        </ul>
      </li>
    );
  });

  return (
    <ul className="MenuBar">
      {menu}
    </ul>
  );
}

export default MenuBar;
