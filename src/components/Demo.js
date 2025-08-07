import React from 'react';
import { useState } from 'react';

export default function Demo({ children, color }) {
	const [Bgcolor, setBgcolor]  = useState('Blue')

  function red(){
	  setBgcolor('red');
  }

  function green(){
	  setBgcolor('green');
  }

  return (
	  <div className="demo" style={{
		  backgroundColor: Bgcolor,
	          borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',}} >
	  ボタンをクリックするとここのボックスの背景が変化します<br />
	    <button onClick={red}>Red</button>
	    <button onClick={green}>Green</button>
	  </div>
  );
};
