import React from 'react';


function Button({}) {
  return (
      <button key={opt} onClick={this.handleAnswerClick} className="col-6">{opt}</button>
  );
}

export default Button;
