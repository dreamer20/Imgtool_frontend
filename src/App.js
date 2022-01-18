import React from 'react';
import './App.scss';
import Menu from './Menu';
import MenuBar from './MenuBar';
import MenuItem from './MenuItem';

function App() {
  return (
    <div>
      <header className="header">
        <MenuBar>
          <Menu title="Изображение">
            <MenuItem>
              Открыть
            </MenuItem>            
          </Menu>
          <Menu title="Test">
            <MenuItem>
              Test
            </MenuItem>            
          </Menu>
        </MenuBar>
      </header>
    </div>
  );
}

export default App;
