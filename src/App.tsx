import React from 'react';
import CanvasComponent from './CanvasComponent'
import BigTurntable from './BigTurntable'
import ComputerComponent from './ComputerComponent';
import './App.css';
// import './mock/mock'

function App() {
  return (
    <div className="App">
      {/* <CanvasComponent></CanvasComponent> */}
      {/* Big turntable */}
      {/* <BigTurntable></BigTurntable> */}
      <ComputerComponent uids={[124,132,139]}></ComputerComponent>
    </div>
  );
}

export default App;
