import React from 'react';
import CustomButton from '../custom-button/custom-button.component';

import './calculator.styles.scss';

class Calculator extends React.Component {
    constructor() {
        super();
        this.state = {

            inputArray: [],
            history: [],
            lastElement: 0,
            equalLastClicked: false,
            rootLastFound: false,
            day: true,
            scientific: false
        };
    }

    //frequently needed functions and variables
    reqVar = {
        tempArray: () => this.getTempArray(this.state.inputArray),
        tempHistory: () => this.getTempArray(this.state.history),
        lastInput: () => this.state.inputArray[this.state.inputArray.length - 1],
        triggerCalc: () => this.calc(this.state.inputArray[0], this.state.inputArray[1], this.state.inputArray[2]),
        storeInHistory: (num) => {
            if (num % 1 !== 0) {
                return num.toFixed(2)
            } else
                return num
        }
    }

    getTempArray = (array) => array.slice(0, array.length - 1);
    appendNumber = (last, recent) => parseInt((last.toString()).concat(recent.toString()));
    isNum = (arg) => isNaN(arg) ? false : true;
    lastInput = () => this.state.inputArray[this.state.inputArray.length - 1];
    showDay = () => this.state.day ? false : true;
    calc = (arg1, op, arg2) => {
        switch (op) {
            case '+':
                return arg1 + arg2;
            case '-':
                return arg1 - arg2;
            case '*':
                return arg1 * arg2;
            case '/':
                return arg1 / arg2;
            default:
                return null;
        }
    }


    //to toggle the UI from light to dark and vice versa 
    timeToggle = () => {
        console.log(this.state.day);
        this.setState({
            day: !this.state.day
        })


    }

    //to find the square root of two inputs
    findRoot = () => {
        const { tempArray, tempHistory, lastInput,storeInHistory} = this.reqVar;

        if (this.isNum(lastInput())) {          //to check if the last input is a number else do nothing
            const changedInput = Math.sqrt(lastInput());
            if (this.isNum(changedInput)) {
                this.setState({
                    lastElement: changedInput,
                    inputArray: [...tempArray(), changedInput],
                    history: [...tempHistory(), storeInHistory(changedInput)],
                    rootLastFound: true
                })

            }
            else {          //if user tries to find square root which is a complex number or NaN return
                this.setState({
                    lastElement: 'NOT A NUMBER',
                    rootLastFound: true
                })
            }
        }

    }

    //to find the square of two numbers
    findSquare = () => {
        const { tempArray, tempHistory, lastInput,storeInHistory } = this.reqVar;

        if (this.isNum(lastInput())) {           //to check if the last input is a number else do nothing
            const changedInput = lastInput() * lastInput();
            console.log(changedInput);
            this.setState({
                lastElement: changedInput,
                inputArray: [...tempArray(), changedInput],
                history: [...tempHistory(), storeInHistory(changedInput)]
            })
        }
    }

    //to change a number from positive to negative and vice versa
    signChange = () => {
        const { tempArray, tempHistory, lastInput ,storeInHistory} = this.reqVar;

        if (this.isNum(lastInput())) {           //to check if the last input is a number else do nothing
            const changedInput = -lastInput();         //ex: -8=>-(-8) || 8=>-8
            this.setState({
                lastElement: changedInput,
                inputArray: [...tempArray(), changedInput],
                history: [...tempHistory(), storeInHistory(changedInput)]
            })
        }
    }

    //if input comes from the operand
    onOperandClick = e => {

        const numInput = parseInt(e.target.value);          //changing the typeof from string to number
        const { inputArray, history, equalLastClicked, rootLastFound } = this.state;
        const { tempArray, lastInput, tempHistory } = this.reqVar;

        //if last time equal is clicked, already an expression evaluated so for number input start with a new expression
        if (equalLastClicked) {
            this.setState({
                inputArray: [numInput],
                history: [...history, ',', numInput],
                lastElement: numInput,
                equalLastClicked: false
            })
        } else if (rootLastFound) {
            this.setState({
                inputArray: [numInput],
                history: [...history, ',', numInput],
                lastElement: numInput,
                rootLastFound: false
            })
        } else {

            lastInput() ? (       //if array have inputs
                this.isNum(lastInput()) ? this.setState({         //if last input is a number then append this input with that number
                    inputArray: [...tempArray(), this.appendNumber(lastInput(), numInput)],
                    history: [...tempHistory(), this.appendNumber(lastInput(), numInput)],
                    lastElement: this.appendNumber(lastInput(), numInput)
                }) : this.setState({            //if last input is an operator then simply addon the number 
                    inputArray: [...inputArray, numInput],
                    history: [...history, numInput],
                    lastElement: numInput
                })
            )
                :
                this.setState({
                    inputArray: [numInput],
                    history: [...history, numInput],
                    lastElement: numInput
                })


        }

    }

    //while equal to is clicked
    equalOnClick = () => {

        const { inputArray, history } = this.state;
        const { triggerCalc,storeInHistory } = this.reqVar;

        if (inputArray.length === 3) {
            this.setState({       //if its equal to 3 then calculate and store result alongwith new input otherwise do nothing
                inputArray: [triggerCalc()],
                history: [...history, '=', storeInHistory(triggerCalc())],
                lastElement: triggerCalc(),
                equalLastClicked: true
            })
        }
    }

    //while (-,+,*,/) is clicked
    operatorOnClick = e => {
        const input = e.target.value;
        const { inputArray, history } = this.state;
        const { triggerCalc, lastInput } = this.reqVar;

        if (lastInput()) {        //if array have inputs
            if (this.isNum(lastInput())) {         //if last Input is a number then check the length of the array
                inputArray.length === 3 ? this.setState({       //if its equal to 3 then calculate and store result alongwith new input
                    inputArray: [triggerCalc(), input],
                    history: [...history, input],
                    lastElement: triggerCalc(),
                    equalLastClicked: false,
                    rootLastFound:false
                }, console.log(this.state))
                    :
                    this.setState({
                        inputArray: [...inputArray, input],
                        history: [...history, input],
                        equalLastClicked: false,
                        rootLastFound:false
                    })
            }       //if last input is an operator then do nothing for this input
        }
        else {          //if input array is empty then start with a '0' and then the input 
            this.setState({
                inputArray: [0, input],
                history: [0, input]
            })
        }
    }

    //while clear button is pressed ,take the state values to initial position
    onClear = () => {
        this.setState({
            inputArray: [],
            history: [],
            lastElement: 0,
            equalLastClicked: false,
            rootLastFound:false
        })
    }

    //return maximum last 15 elements of the history array
    showHistory = () => {
        const { history } = this.state;
        return (
            history.slice(Math.max(history.length - 15, 0))
        )
    }

    // showLastElement = () => this.state.lastElement;
    //to show/hide the scientific buttons
    toggleScientific = () => this.setState({
        scientific: !this.state.scientific
    });

    render() {
        return (

            //depending on showDay return, add or remove inverted class, that inverts the UI color; sameway CustomButton sends true/false to its inverted props.

            <div className={`${this.showDay() ? 'inverted' : ''} calculatorBody`}>
                <div className="display">
                    <div className="toggle" onClick={this.timeToggle}>
                        <div onClick={this.timeToggle} className={`${this.showDay() ? 'night' : 'day'} timeButton`} >
                            <i className={`${this.state.day ? 'fas fa-sun ' : ' fas  fa-moon'} `}></i>
                        </div>
                    </div>
                    <div className="displayText">{this.state.lastElement}</div>
                </div>
                <div className="history">
                    <div className="historyText">
                        {this.showHistory()}
                    </div>
                </div>
                <div className="input">
                    <div className="row">
                        <CustomButton value="1" onClick={this.onOperandClick} inverted={this.showDay()}>1</CustomButton>
                        <CustomButton value="2" onClick={this.onOperandClick} inverted={this.showDay()}>2</CustomButton>
                        <CustomButton value="3" onClick={this.onOperandClick} inverted={this.showDay()}>3</CustomButton>
                        <CustomButton value="+" onClick={this.operatorOnClick} operator inverted={this.showDay()}>+</CustomButton>
                    </div>
                    <div className="row">
                        <CustomButton value="4" onClick={this.onOperandClick} inverted={this.showDay()}>4</CustomButton>
                        <CustomButton value="5" onClick={this.onOperandClick} inverted={this.showDay()}>5</CustomButton>
                        <CustomButton value="6" onClick={this.onOperandClick} inverted={this.showDay()}>6</CustomButton>
                        <CustomButton value="-" onClick={this.operatorOnClick} operator inverted={this.showDay()} >-</CustomButton>
                    </div>
                    <div className="row">
                        <CustomButton value="7" onClick={this.onOperandClick} inverted={this.showDay()}>7</CustomButton>
                        <CustomButton value="8" onClick={this.onOperandClick} inverted={this.showDay()}>8</CustomButton>
                        <CustomButton value="9" onClick={this.onOperandClick} inverted={this.showDay()}>9</CustomButton>
                        <CustomButton value="*" onClick={this.operatorOnClick} operator inverted={this.showDay()}>*</CustomButton>
                    </div>
                    <div className="row">
                        <CustomButton value="clear" onClick={this.onClear} operator inverted={this.showDay()}>AC</CustomButton>
                        <CustomButton value="0" onClick={this.onOperandClick} inverted={this.showDay()}>0</CustomButton>
                        <CustomButton value="=" onClick={this.equalOnClick} operator inverted={this.showDay()}>=</CustomButton>
                        <CustomButton value="/" onClick={this.operatorOnClick} operator inverted={this.showDay()}>/</CustomButton>
                    </div>
                    <div className={`${this.state.scientific ? 'showSc' : ''} scientific`}>
                        <CustomButton onClick={this.signChange} inverted={this.showDay()}>-/+</CustomButton>
                        <CustomButton onClick={this.findSquare} inverted={this.showDay()}>^2</CustomButton>
                        <CustomButton onClick={this.findRoot} inverted={this.showDay()}>√</CustomButton>
                    </div>
                    <div className="scToggleWrap">
                        <div className={`${this.showDay() ? 'night' : 'day'} scToggle`} onClick={this.toggleScientific} >SCIENTIFIC</div>
                    </div>
                </div>

            </div >
        )
    }
};

export default Calculator;