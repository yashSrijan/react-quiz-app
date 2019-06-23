import React from 'react';
import { Checkboxes } from '../checkboxes/Checkboxes';

export class Starter extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            quizOperators : [...this.props.allOperators],
            quizOperandRange : {...this.props.defaultOperandRange},
            totalQuestionCount : this.props.totalQuestionCount,
            errors : {
                operatorsError : "",
                operandsError : ""
            }
        }
    }

    isFormValid = () => {
        let formValid = true;
        const {quizOperators, quizOperandRange, totalQuestionCount} = this.state;
        let operatorsError = "", operandsError = "", totalQuestionCountError = "";
        if(quizOperandRange.rangeLowerBound === "" || quizOperandRange.rangeUpperBound === "") {
            formValid = false;
            operandsError = "Choose a valid range value";
        } else if(quizOperandRange.rangeLowerBound >= quizOperandRange.rangeUpperBound) {
            formValid = false;
            operandsError = "Lower Bound should be smaller than Upper Bound";
        }
        if(quizOperators.length === 0) {
            formValid = false;
            operatorsError = "Choose at least one operand";
        }
        if(totalQuestionCount === "") {
            formValid = false;
            totalQuestionCountError = "Choose a valid count value"
        } else if (totalQuestionCount <= 0) {
            formValid = false;
            totalQuestionCountError = "Count can't be negative or zero"
        }
        this.setState({
            errors : {operandsError, operatorsError, totalQuestionCountError}
        });
        return formValid;
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if(this.isFormValid()) {
            this.props.setOperatorsAndOperandRange(
                this.state.quizOperators,
                this.state.quizOperandRange,
                this.state.totalQuestionCount
            )
        }
    }

    handleChange = (e) => {
        let {value, name} = e.target; 
        //handle operators checkboxes here
        if(name === 'operators') {
            let quizOperators = []
            if (e.target.checked) {
                quizOperators = [...this.state.quizOperators, value];
            } else {
                quizOperators = this.state.quizOperators.filter( (ele) => ele !== value );
            }
            this.setState({ quizOperators})
        } 
        //handle total questions count
        else if(name === 'totalQuestionCount') {
            this.setState({[name] : value})
        }
        //hangle operands range inputs
        else {
            let quizOperandRange = {
                ...this.state.quizOperandRange,
                [name] : value ? parseInt(value, 10) : 0
            }
            this.setState({ quizOperandRange })
        }
    }

    render() {
        return (
            <div>
                <h2>Initial Selections</h2>
                <form onSubmit = {this.onFormSubmit}>

                    {/* range input ----------------------------*/}
                    <label className="top-margin">Operands : </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Lower & Upper Bound</span>
                        </div>
                        <input type="number" name = "rangeLowerBound" className="form-control" 
                            placeholder="range start"
                            value = {this.state.quizOperandRange.rangeLowerBound}
                            onChange = {(e) => {this.handleChange(e)}}
                        />
                        <input type="number" name = "rangeUpperBound" className="form-control" 
                            placeholder="range end"
                            value = {this.state.quizOperandRange.rangeUpperBound}
                            onChange = {(e) => {this.handleChange(e)}}
                        />
                    </div>
                    {
                        this.state.errors.operandsError && 
                            <div className = "error-msg">{this.state.errors.operandsError}</div>
                    }

                    {/* operators checkbox ----------------------------*/}
                    <label className="top-margin">Operators : </label>
                    <div>
                        <Checkboxes 
                            quizOperators = {this.state.quizOperators} 
                            allOperators = {this.props.allOperators}
                            onChange = { (e) => this.handleChange(e) }
                        />
                    </div>
                    {
                        this.state.errors.operatorsError && 
                            <div className = "error-msg">{this.state.errors.operatorsError}</div>
                    }

                    {/* number of questions input */}
                    <label className="top-margin">Number of questions : </label>
                    <div>
                        <input type="number" name = "totalQuestionCount" className="form-control"
                            value = {this.state.totalQuestionCount}
                            onChange = {(e) => {this.handleChange(e)}}
                        />
                    </div>
                    {
                        this.state.errors.totalQuestionCountError && 
                            <div className = "error-msg">{this.state.errors.totalQuestionCountError}</div>
                    }

                    <p className = "top-margin instructions">Instructions : </p>
                    <ul>
                        <li>There is no negative marking.</li>
                        <li>5 points will be earned for every correct answer.</li>
                        <li>Answers once submitted, can't be edited.</li>
                        <li>See your current score in the bottom pane of the quiz.</li>
                        <li>Results will be displayed at the very end of the quiz.</li>
                    </ul>
                    {/* Create button ------------------------------*/}
                    <button type="submit" className="top-margin btn btn-outline-success">Start Quiz</button>
                
                </form>
            </div>
        )
    }
}