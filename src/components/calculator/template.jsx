import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './calculator.styles.scss';
import { ThemeContext } from '../../context/theme-context';

const Template = (prop) => {
    const { timeToggle, state, showHistory, onOperandClick, operatorOnClick, equalOnClick, signChange, onClear, findSquare, findRoot, toggleScientific } = prop.access;
    return (

        <ThemeContext.Consumer>
            {
                ui => (
                    <div className={`${ui} calculatorBody`}>
                        <div className="display">
                            <div className="toggle" onClick={timeToggle}>
                                <div onClick={timeToggle} className={`${ui} timeButton`} >
                                    <i className={`${ui ==='light' ? 'fas fa-sun ' : ' fas  fa-moon'} `}></i>
                                </div>
                            </div>
                            <div className="displayText">{state.lastElement}</div>
                        </div>
                        <div className="history">
                            <div className="historyText">
                                {showHistory()}
                            </div>
                        </div>
                        <div className="input">
                            <div className="row">
                                <CustomButton value="1" onClick={onOperandClick} >1</CustomButton>
                                <CustomButton value="2" onClick={onOperandClick} >2</CustomButton>
                                <CustomButton value="3" onClick={onOperandClick} >3</CustomButton>
                                <CustomButton value="+" onClick={operatorOnClick} operator >+</CustomButton>
                            </div>
                            <div className="row">
                                <CustomButton value="4" onClick={onOperandClick} >4</CustomButton>
                                <CustomButton value="5" onClick={onOperandClick} >5</CustomButton>
                                <CustomButton value="6" onClick={onOperandClick} >6</CustomButton>
                                <CustomButton value="-" onClick={operatorOnClick} operator  >-</CustomButton>
                            </div>
                            <div className="row">
                                <CustomButton value="7" onClick={onOperandClick} >7</CustomButton>
                                <CustomButton value="8" onClick={onOperandClick} >8</CustomButton>
                                <CustomButton value="9" onClick={onOperandClick} >9</CustomButton>
                                <CustomButton value="*" onClick={operatorOnClick} operator >*</CustomButton>
                            </div>
                            <div className="row">
                                <CustomButton value="clear" onClick={onClear} operator >AC</CustomButton>
                                <CustomButton value="0" onClick={onOperandClick} >0</CustomButton>
                                <CustomButton value="=" onClick={equalOnClick} operator>=</CustomButton>
                                <CustomButton value="/" onClick={operatorOnClick} operator >/</CustomButton>
                            </div>
                            <div className={`${state.scientific ? 'showSc' : ''} scientific`}>
                                <CustomButton onClick={signChange} >-/+</CustomButton>
                                <CustomButton onClick={findSquare} >^2</CustomButton>
                                <CustomButton onClick={findRoot} >√</CustomButton>
                            </div>
                            <div className="scToggleWrap">
                                <div className={`${ui} scToggle`} onClick={toggleScientific} >SCIENTIFIC</div>
                            </div>
                        </div>

                    </div >


                )
            }
        </ThemeContext.Consumer>


    )
}

export default Template;