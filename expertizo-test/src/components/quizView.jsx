import React, { Component } from "react";
import StarRatings from 'react-star-ratings';
import ProgressBar from "./progressBar";
// import Button from "./button";
import questions from "../questions.json";


class QuizView extends Component {


    state = {
        currentQuestion: 0,
        question: "",
        options: [],
        readings : [
            {
                value: 0,
                color: 'black'
            },
            {
                value: 0,
                color: 'grey',
                number:0
            },
            {
                value: 0,
                color: 'silver'
            }
          ],
        answer : "",
        difficulty: 0,
        type: "",
        answerStatus:""
    };

    getQuestion = (currentQuestion) => {
        
        const currQues = questions[currentQuestion - 1];
        const question = decodeURIComponent(currQues.question);
    
        let options = currQues.incorrect_answers.map(val => decodeURIComponent(val));
        
        const answer = decodeURIComponent(currQues.correct_answer);
    
        options.push(answer);
    
        let difficulty;
    
        if(currQues.difficulty === "easy"){
            difficulty = 1;
        }else{
            if(currQues.difficulty === "medium"){
                difficulty = 2;
            }else{
                difficulty = 3;
            }
        }
        const type = decodeURIComponent(currQues.category);
        
        this.setState({question,answer,options,difficulty,type,currentQuestion,answerStatus:""})
    
    }


    componentDidMount() {
        this.getQuestion(1);
   }


   handleAnswerClick = (e) => {
        const { textContent } = e.currentTarget;
        let answerStatus = "";
        const readings = [...this.state.readings];

        if(textContent === this.state.answer){
            answerStatus = "Correct!"
            readings[1].number += 1;
            readings[1].value = (readings[1].number/ this.state.currentQuestion) * 100
        }else{
            answerStatus = "Sorry!"
        }
        this.setState({ answerStatus,readings })
    }

    handleNext = () => {
        const currentQuestion = this.state.currentQuestion + 1;
        this.getQuestion(currentQuestion)
    }

    getstatus = () => {
        return this.state.answerStatus ? <div className="ml-5"> <p className="text-center"> {this.state.answerStatus} </p> <button style={{"margin-left":"28%"}} className="btn btn-secondary" onClick={this.handleNext}>Next Question</button> </div> : "" 
    }

  render() {
    return (
      <div className="container mt-5 mb-5" id="mainContainer">
            
            <div style={{"border-top":"10px solid darkgray","width":(this.state.currentQuestion/20)*100 + "%" }}> </div>

            <h3 className="ml-5 mt-5"> Question {this.state.currentQuestion} of 20</h3>
            <p style={{"color":"darkgray" }} className="ml-5 mb-0">{this.state.type}</p>

            <div className="ml-5">
            <StarRatings
            rating={this.state.difficulty}
            starRatedColor="black"
            starDimension="10px"
            starSpacing="2px"
            numberOfStars={5}
            name='Difficulty'
            />
            </div>
            
            <h5 className="ml-5 mb-5 mt-4"> {this.state.question}</h5>
            <div className="row">
                {this.state.options.map(opt => {
                    
                    return (<div className="col-6 mb-5" key={opt}> <button className="ml-5 btn btn-primary" key={opt} onClick={this.handleAnswerClick}>{opt}</button> </div>)
                })}
            </div>
            
            {this.getstatus()}
            <ProgressBar readings={this.state.readings} currentQuestion={this.state.currentQuestion}/>
      </div>
    );
  }
}

export default QuizView;
