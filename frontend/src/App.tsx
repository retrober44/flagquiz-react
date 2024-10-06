import './App.css';
import React from 'react';
import Quiz from './components/quiz';
import bild from './../src/img-background/2.png';

function App() {

  return (
    <React.Fragment>
      <div className="App" style={{ 
        backgroundImage: `url(${bild})`,  
        backgroundRepeat: 'repeat', 
        backgroundSize: 'auto', 
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}> 
        <h1>Flaggenquiz</h1>
        <Quiz/>
      </div>
    </React.Fragment>
  )

}

export default App;
