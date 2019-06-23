import React from 'react';
import {Starter} from './initialSelection/Starter';
import {Questions} from './questions/Questions';
import '../assets/css/styles.css';

export class App extends React.Component{
    state = {
        starter : true,
        allOperators : ["+", "-", "/", "*", "%"],
        defaultOperandRange : {
            rangeLowerBound : 1,
            rangeUpperBound : 10
        },
        totalQuestionCount : "",
        quizOperators : [],
        quizOperandRange : { },
    }

    setOperatorsAndOperandRange = (quizOperators, quizOperandRange, totalQuestionCount) => {
        this.setState({
            quizOperandRange, quizOperators, totalQuestionCount, starter : false
        })
    }

    handleRetakeQuiz = () => this.setState({starter : true, totalQuestionCount : ""})

    render() {

        const component = this.state.starter ? 
            <Starter
                setOperatorsAndOperandRange = {this.setOperatorsAndOperandRange}
                allOperators = {this.state.allOperators}
                defaultOperandRange = {this.state.defaultOperandRange}
                totalQuestionCount = {this.state.totalQuestionCount}
            /> : 
            <Questions
                totalQuestionCount = {this.state.totalQuestionCount}
                quizOperandRange={this.state.quizOperandRange}
                quizOperators={this.state.quizOperators}
                handleRetakeQuiz={this.handleRetakeQuiz}
            />
        return (
            <div className = "container" style = {{marginTop:'40px'}}>
                <div className = "row">
                    <div className = "col-sm-3"></div>
                    <div className = "col-sm-6">
                        <h3 className="text-center header">Arithmetic Quiz</h3>
                        <hr/>
                        {component}
                    </div>
                    <div className = "col-sm-3"></div>
                </div>
            </div>
        )
    }
}