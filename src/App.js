import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './making dynamically created list as draggable';
import MDD from './multiplediv_draggable';
import Draggable from './Drag and drop of parent div containing multiple child divs';
import Mypr from './3input_selection';
import ForDraggable from './making draggable dynamically div containing multiple div and sending data to server using axios';
import ForDraggable2 from './ForDraggable2';

class App extends Component {
  render() {
    return (
      <div className="App">
      <ForDraggable />
    </div>
    );
  }
}

export default App;
