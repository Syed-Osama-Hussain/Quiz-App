import React, { Component } from "react";
import StarRatings from 'react-star-ratings';
import ProgressBar from "./progressBar";
import QuizComplete from "./quizComplete";
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
                displayVal: 0,
                color: 'grey',
                number:0
            },
            {
                value: 100,
                displayVal: 100,
                color: 'silver'
            }
          ],
        answer : "",
        difficulty: 0,
        type: "",
        answerStatus:""
    };

    shuffleArray = (array) => {
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array;
    }


    getQuestion = (currentQuestion) => {

        if(currentQuestion > 20){
            this.setState({currentQuestion});
            return;
        }
        const currQues = questions[currentQuestion - 1];
        const question = decodeURIComponent(currQues.question);
    
        let optionVal = currQues.incorrect_answers.map(val => decodeURIComponent(val));

        const answer = decodeURIComponent(currQues.correct_answer);

        optionVal.push(answer);

        optionVal = this.shuffleArray(optionVal);

        let options = []
        
        optionVal.forEach((option,i) => {
            options.push({value:option,class:"ml-4 default-btn",disabled:false})          
        });

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
        const currentQuestion = this.state.currentQuestion;

        if(textContent === this.state.answer){
            answerStatus = "Correct!"
            readings[1].number += 1;
            
            let rd1 = (readings[1].number/ currentQuestion) * 100
            
            let rd0 = (readings[1].number / 20) * 100;

            let rd2= ((readings[1].number + (20 - this.state.currentQuestion))/ 20) * 100

            readings[1].displayVal = rd1;
            readings[2].displayVal = rd2;

            readings[1].value = rd1 - rd0
            readings[0].value = rd0
            readings[2].value = rd2 - (readings[1].value + rd0)

        }else{
            answerStatus = "Sorry!"
            readings[0].value = (readings[1].number / 20) * 100;
            let rd1 = (readings[1].number/ currentQuestion) * 100

            let rd2 = ((readings[1].number + (20 - this.state.currentQuestion))/ 20) * 100
            readings[1].displayVal = rd1;
            readings[2].displayVal = rd2;

            e.currentTarget.className = "ml-4 wrong-btn"


            readings[1].value = rd1 - readings[0].value
            readings[2].value = rd2 - (readings[1].value + readings[0].value)
        }
        const options = [...this.state.options];
        options.forEach(opt => {
            if(opt.value === this.state.answer){
                opt.class = "ml-4 correct-btn";
            }else{
                if(opt.value !== textContent)
                    opt.class = "ml-4 remaining-btn";
            }
            opt.disabled = true;
        })

        this.setState({ answerStatus,readings,options })
    }

    handleNext = () => {
        const currentQuestion = this.state.currentQuestion + 1;
        this.getQuestion(currentQuestion)
    }

    getstatus = () => {
        return this.state.answerStatus ? <div className="ml-5"> <h5 className="resultText" style={{"fontWeight":"bold"}}> {this.state.answerStatus} </h5> <button style={{"marginLeft":"28%","height":"40px"}} className="default-btn" onClick={this.handleNext}>Next Question</button> </div> : "" 
    }


    getView(){
        if(this.state.currentQuestion > 20){
            return <QuizComplete correct={this.state.readings[1].number}/>
        }else{
            return( 
            <div>
            <div style={{"marginLeft":"-15px","borderTop":"10px solid darkgray","width":(this.state.currentQuestion/20)*100 + "%" }}> </div>

            <h3 className="ml-4 mt-5"> Question {this.state.currentQuestion} of 20</h3>
            <p style={{"color":"darkgray" }} className="ml-4 mb-0">{this.state.type}</p>

            <div className="ml-4">
            <StarRatings
            rating={this.state.difficulty}
            starRatedColor="black"
            starDimension="10px"
            starSpacing="2px"
            numberOfStars={5}
            name='Difficulty'
            />
            </div>
            
            <h5 className="ml-4 mb-5 mt-4"> {this.state.question}</h5>
            <div className="row">
                {this.state.options.map(opt => {
                    
                    return (<div className="col-6 mb-5" key={opt.value}> 
                    
                    <button className={opt.class} style={{"width":"83%"}} key={opt.value} disabled={opt.disabled} onClick={this.handleAnswerClick}>{opt.value}</button> </div>)
                })}
            </div>
            
            {this.getstatus()}
            <ProgressBar style={{"marginTop":"100px"}} readings={this.state.readings} currentQuestion={this.state.currentQuestion}/>
                
            </div>)
            
        }
    
    }

  render() {
    return (
      <div className="container mt-5 mb-5" id="mainContainer">
        {this.getView()}
      </div>
    );
  }
}

export default QuizView;
