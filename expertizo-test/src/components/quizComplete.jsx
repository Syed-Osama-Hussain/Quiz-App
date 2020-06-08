import React from 'react';


function QuizComplete({correct}) {
  return (
    <div className="ml-4" style={{"height":"550px"}}>
        <h1 style={{"marginTop":"70px"}}>Quiz Complete.</h1>
        <h4 className="text-center" style={{"margin-top":"70px"}}> Correct Answers {correct}. </h4>        
        <h4 className="text-center mt-2"> Wrong Answers {20 - correct}. </h4>
        <h4 className="text-center mt-2">Your Total Score is {(correct/20)*100}%</h4>
        
        <button style={{"marginLeft":"30%","height":"40px","marginTop":"40px"}} onClick={() => {window.location.reload(false);}} className="correct-btn">Retake Test</button>
    </div>
  );
}

export default QuizComplete;
