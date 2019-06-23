import React from 'react';

export const Checkboxes = ({quizOperators, onChange, allOperators}) => {
    return (
        <div>
            {
                allOperators.map((singleOperator, index) => {
                    return(
                        <div key = {index} className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" 
                                name="operators" id={ `${singleOperator}_op` } 
                                value={singleOperator} 
                                checked = {quizOperators.includes(singleOperator)}
                                onChange = {onChange}
                            />
                            <label className="form-check-label" htmlFor={ `${singleOperator}_op` } >{singleOperator}</label>
                        </div>
                    )
                })
            }
        </div>
    )
}