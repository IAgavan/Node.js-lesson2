import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';

import { fieldUrl, moveUrl, resetUrl, playerUrl, statusUrl } from './constants';

function App() {
  const [field, setField] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [currentPlayer, setCurrentPlayer] = useState(' ');
  const [currentStatus, setCurrentStatus] = useState(' ');

  const updateField = function() {
    axios.get(fieldUrl).then(res => {
      setField(res.data);
    })
  }

  const updateCurrentPlayer = function(){
    axios.get(playerUrl).then(res => {
      setCurrentPlayer(res.data);
    });
  }

  const move = function(x, y){
    axios.post(moveUrl, {
      x: x,
      y: y
    }).then(updateField)
    .then(checkGame)
    .then(updateCurrentPlayer);
  }

  const checkGame = function(){
    axios.get(statusUrl).then(res => {
      setCurrentStatus(res.data);
    });
  }

  const reset = function(){
    axios.post(resetUrl)
    .then(updateField);
  }

  

  useEffect(() => {
    updateCurrentPlayer();
    updateField();   
    checkGame();
    setInterval(checkGame, 2000); 
    setInterval(updateField, 2000);
    setInterval(updateCurrentPlayer, 2000);
  }, []);

  const showCell = function(value) {
    if (!value) return ' ';
    return value === 'x' ? 'x' : 'o';
  }


  return (
    <div className="App">
      <div className="currentPlayer"> Ходит {currentPlayer}! </div>
      <div className="field">
        {field.map((row, y) => <div className="row">
          {row.map((el, x) => <div className="cell" onClick={() => move(x, y)}>{showCell(el)}</div>)}
        </div>)}
      </div>
      <div className="resetButton" onClick={() => reset()}> Reset Field </div>
      <div className="status"> {currentStatus}</div>
    </div>
  );
}

export default App;
