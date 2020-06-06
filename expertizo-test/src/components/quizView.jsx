import React, { Component } from "react";
import ProgressBar from "./progressBar";
import questions from "../questions.json";
import StarRatings from 'react-star-ratings';

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
                color: 'grey'
            },
            {
                value: 100,
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
        
        if(textContent === this.state.answer){
            answerStatus = "Correct!"
        }else{
            answerStatus = "Sorry!"
        }
        this.setState({ answerStatus })
    }

    handleNext = () => {
        const currentQuestion = this.state.currentQuestion + 1;
        this.getQuestion(currentQuestion)
    }

    getstatus = () => {
        return this.state.answerStatus ? <div className="align-center"> <p> {this.state.answerStatus} </p> <button onClick={this.handleNext}>Next Question</button> </div> : "" 
    }

  render() {
    return (
      <div className="container">
            <h4 className="ml-5"> Question {this.state.currentQuestion} of 20</h4>
            <br/>
            <p className="ml-5">{this.state.type}</p>
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
            <h4 className="ml-5"> {this.state.question}</h4>
            <div className="row">
                {this.state.options.map(opt => {
                    return <p key={opt} onClick={this.handleAnswerClick} className="col-6">{opt}</p>
                })}
            </div>
                {this.getstatus()}
            <ProgressBar readings={this.state.readings}/>
      </div>
    );
  }
}

export default QuizView;
