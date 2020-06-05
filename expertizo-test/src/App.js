import React from 'react';
import ProgressBar from "./components/progressBar";


let readings = [
  {
      value: 50,
      color: 'black'
  },
  {
      value: 17,
      color: 'grey'
  },
  {
      value: 8,
      color: 'silver'
  }
];

function App() {
  return (
    <div className="App">
      <ProgressBar readings={readings}/>
    </div>
  );
}

export default App;
