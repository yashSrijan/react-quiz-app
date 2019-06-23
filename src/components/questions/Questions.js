import React from 'react';
import { Results } from '../results/Results';

export class Questions extends React.Component {

    //props -> totalQuestionCount, quizOperandRange, quizOpertors
    constructor(props) {
        super(props);
        this.state = {
            questionsArray : [],
            currentQuestionCount : 0,
            answer : "",
            score : 0,
            resultsFlag : false,
            points : 5,
        }
    }

    getRandomNumber = () => {
        let min = this.props.quizOperandRange.rangeLowerBound
        let max = this.props.quizOperandRange.rangeUpperBound
        return Math.floor( Math.random() * (max - min + 1) ) + min;
    }

    componentDidMount() {
        this.createQuestion();
    }

    setAnswer = (value) => {
        this.setState({answer : value ? value : ""})
    }

    handleAnswerSubmit = (e) => {
        e.preventDefault();
        const {answer, points, currentQuestionCount, questionsArray, score} = this.state;
        let newArr = [...questionsArray];
        let index = newArr.length - 1;
        let correct = false;
        let score_ = score;
        //if the correctAnswer for this question is equal to the attempted answer then
        //update the score of the quiz and set the correct flag for this question to tru
        if(newArr[index].correctAnswer === answer) {
            correct = true;
            score_ = score_ + points;
        }
        //update this questionObj by spreading the previous properties
        //and over writing the attemptedAnswer and correct properties
        newArr[index] = {
            ...newArr[index], attemptedAnswer : answer, correct
        }
        this.setState( {
            questionsArray : newArr, score : score_
        }, () => {
            //only after the questionsArray has been updated create a new question if this is not the last question
            if(currentQuestionCount < this.props.totalQuestionCount)
                this.createQuestion();
            else {
                //else render the results component
                this.setState({ resultsFlag : true })
            } 
        } )
        
    }

    createQuestion = () => {
        let leftOperand = this.getRandomNumber();
        let rightOperand = this.getRandomNumber();
        let selectedOperators = this.props.quizOperators;
        let operator = selectedOperators[ Math.floor(Math.random()*selectedOperators.length) ];
        let exp = `${leftOperand} ${operator} ${rightOperand}`
        let answer = eval(exp);
        let finalAnswer;
        //if the answer has a decimal place in it then fix the answer to two decimal places
        //a decimal would be there only in the case of division (/)
        if(exp.includes('/') && answer.toString().includes('.')) {
            answer = answer.toFixed(2);
            
            finalAnswer = answer.toString();
            if(finalAnswer[finalAnswer.length - 1] === '0') {
                finalAnswer = finalAnswer.substring(0, finalAnswer.length - 1);
            }
        } else {
            finalAnswer = answer.toString();
        }
        
        let questionObj = {
            expressionString : exp,
            attemptedAnswer : null,
            correctAnswer : finalAnswer,
            correct : false
        }
        this.setState({
            questionsArray : [...this.state.questionsArray, questionObj], 
            currentQuestionCount : this.state.questionsArray.length + 1,
            answer : ""
        })
        
    }

    render() {
        const {currentQuestionCount, answer, score, questionsArray, resultsFlag, points} = this.state;
        const {totalQuestionCount} = this.props;
        const currentQuestionIndex = currentQuestionCount - 1;
        let component = currentQuestionCount ? (
            <div className = "quiz">
                <div className = "question">
                    <h4>Question {currentQuestionCount} of {totalQuestionCount} - </h4>
                    <p>Evaluate this : {questionsArray[currentQuestionIndex].expressionString}</p>
                    
                    <form onSubmit={this.handleAnswerSubmit}>
                        <input
                            type = "number"
                            value = {answer}
                            className = "form-control"
                            placeholder = "Answer"
                            onChange = {(e) => this.setAnswer(e.target.value)}
                        />
                        {
                            questionsArray[currentQuestionIndex].expressionString.includes('/') &&
                                <p className = "division-help">
                                    Write your answer up to two decimal places (If necessary)
                                </p>
                        }
                        <button type="submit" className="top-margin btn btn-outline-primary">
                            {
                                currentQuestionCount < totalQuestionCount ? 
                                "Submit and Next" : "Submit and Finish"
                            }
                        </button>
                    </form>
                </div>
                <div className = "score-card">
                    <hr/>
                    <p>Score : {score}</p>
                </div>
            </div>
            
        )  : <h4> Loading Quiz.. </h4>
        //if the result flag is true it means that the last question has just submitted by the 
        //user so show the Results component
        if(resultsFlag === true) {
            component = <Results 
                questionsArray = {questionsArray} 
                score = {score} 
                maxScore = {this.props.totalQuestionCount * points} 
                handleRetakeQuiz = {this.props.handleRetakeQuiz}
            />
        }
        return (
            component
        )
    }
}