import React from 'react';
import './App.css';

const App = () => {

    const handleClick = () => {
        if(navigator.bluetooth) {
            navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
              })
        } else {
            alert("This navigator doesn't support bluetooth..");
        }
      };

     return (
         <div className="main-container">
            <h1 className="text-al-c">MONITOREO DE SIGNOS VITALES</h1>
            <button onClick={handleClick}>Conectarse a dispositivo</button>
         </div>
        );
}

export default App;