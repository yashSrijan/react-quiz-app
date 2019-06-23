import React from 'react'

export const Results = ({questionsArray, score, maxScore, handleRetakeQuiz}) => {
    return(
        <div>
            <div className = "row">
                <div className ="col-sm-8">
                    <h4>Results are here !</h4>
                    <p>Score : {score} out of {maxScore}</p>
                </div>
                <div className ="text-right col-sm-4">
                    <button className = "btn btn-outline-success btn-block" 
                        onClick = {handleRetakeQuiz}>
                        Retake Quiz
                    </button>
                </div>
            </div>
            
            
            {
                questionsArray.map((questionObj, index) => {
                    return (
                        <div className = {`result-question ${questionObj.correct ? 'correct' : 'incorrect'} `}
                            key = {index} 
                        >
                            <h5>Question {index + 1} — {questionObj.expressionString}</h5>
                            <p>Attempted Answer : {questionObj.attemptedAnswer}</p>
                            <p>Correct Answer : {questionObj.correctAnswer}</p>
                        </div>
                    )
                })
            }
        </div>
    )
    
}