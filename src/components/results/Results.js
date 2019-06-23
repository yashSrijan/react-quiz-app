import React from 'react'

export const Results = ({questionsArray, score, maxScore, handleRetakeQuiz}) => {
    return(
        <div>
            <h4>Results are here !</h4>
            <p>Score : {score} out of {maxScore}</p>
            <button className = "btn btn-outline-success" onClick = {handleRetakeQuiz}>Retake Quiz</button>
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