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
            day: true,
            scientific: false
        };
    }

    getTempArray = (array) => array.slice(0, array.length - 1);

    appendNumber = (last, recent) => parseInt((last.toString()).concat(recent.toString()));

    isNum = (arg) => isNaN(arg) ? false : true;

    lastInput = () => this.state.inputArray[this.state.inputArray.length - 1];



    timeToggle = () => {
        console.log(this.state.day);
        this.setState({
            day: !this.state.day
        })


    }


    findRoot = () => {
        const { history, inputArray } = this.state;
        const tempArray = this.getTempArray(inputArray);
        const tempHistory = this.getTempArray(history);
        const lastInput = this.lastInput();
        if (this.isNum(lastInput)) {
            const changedInput = Math.sqrt(lastInput);
            if (this.isNum(changedInput)) {
                this.setState({
                    lastElement: changedInput,
                    inputArray: [...tempArray, changedInput],
                    history: [...tempHistory, changedInput]
                })

            }
            else {
                this.setState({
                    lastElement: 'NOT A NUMBER'
                })
            }
        }

    }

    findSquare = () => {
        const { history, inputArray } = this.state;
        const tempArray = this.getTempArray(inputArray);
        const tempHistory = this.getTempArray(history);
        const lastInput = this.lastInput();
        if (this.isNum(lastInput)) {
            const changedInput = lastInput * lastInput;
            console.log(changedInput);
            this.setState({
                lastElement: changedInput,
                inputArray: [...tempArray, changedInput],
                history: [...tempHistory, changedInput]
            })
        }
    }

    signChange = () => {

        const { history, inputArray } = this.state;
        const lastInput = this.lastInput();
        console.log(typeof (lastInput));
        const tempArray = this.getTempArray(inputArray);
        const tempHistory = this.getTempArray(history);
        if (this.isNum(lastInput)) {

            const changedInput = lastInput > 0 ? -lastInput : -lastInput;
            console.log(changedInput);
            this.setState({
                lastElement: changedInput,
                inputArray: [...tempArray, changedInput],
                history: [...tempHistory, changedInput]
            })
        }
    }

    buttonClicked = e => {

        const input = e.target.value;
        const { inputArray, history, equalLastClicked } = this.state;
        const lastInput = this.lastInput();
        const tempArray = this.getTempArray(inputArray);
        const triggerCalc = () => this.calc(inputArray[0], inputArray[1], inputArray[2]);

        if (this.isNum(input)) {        //if input is a number
            const numInput = parseInt(input)
            if (equalLastClicked) {
                this.setState({
                    inputArray: [numInput],
                    history: [...this.state.history, ',', numInput],
                    lastElement: numInput,
                    equalLastClicked: false
                })
            } else {

                lastInput ? (       //if array have inputs
                    this.isNum(lastInput) ? this.setState({         //if last input is a number then append this input with that number
                        inputArray: [...tempArray, this.appendNumber(lastInput, numInput)],
                        history: [...history, numInput],
                        lastElement: this.appendNumber(lastInput, numInput)
                    }) : this.setState({
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


        } else if (input === '=') {         //if input is '=' then check length if 3,then calculate the result of thre and store result

            if (inputArray.length === 3) {
                this.setState({       //if its equal to 3 then calculate and store result alongwith new input
                    inputArray: [triggerCalc()],
                    history: [...history, '=', triggerCalc()],
                    lastElement: triggerCalc(),
                    equalLastClicked: true
                })
            }


        } else {        //if input is not an equal but other operator

            console.log('inside  operator');
            if (lastInput) {        //if array have inputs
                if (this.isNum(lastInput)) {         //if last Input is a number then check the length of the array
                    inputArray.length === 3 ? this.setState({       //if its equal to 3 then calculate and store result alongwith new input
                        inputArray: [triggerCalc(), input],
                        history: [...history, input],
                        lastElement: triggerCalc(),
                        equalLastClicked: false
                    }, console.log(this.state))
                        :
                        this.setState({
                            inputArray: [...inputArray, input],
                            history: [...history, input],
                            equalLastClicked: false
                        })
                }       //if last input is an operator then dont add the operator input
            }
            else {
                this.setState({
                    inputArray: [0, input]
                })
            }



        };





    }

    onClear = () => {
        this.setState({
            inputArray: [],
            history: [],
            lastElement: 0,
            equalLastClicked: false
        })
    }

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

    showHistory = () => {
        const { history } = this.state;
        return (
            history.slice(Math.max(history.length - 15, 0))
        )
    }

    showDay = () => this.state.day ? false : true;

    toggleScientific = () => this.setState({
        scientific: !this.state.scientific
    });

    render() {
        return (
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
                        <CustomButton value="1" onClick={this.buttonClicked} inverted={this.showDay()}>1</CustomButton>
                        <CustomButton value="2" onClick={this.buttonClicked} inverted={this.showDay()}>2</CustomButton>
                        <CustomButton value="3" onClick={this.buttonClicked} inverted={this.showDay()}>3</CustomButton>
                        <CustomButton value="+" onClick={this.buttonClicked} operator inverted={this.showDay()}>+</CustomButton>
                    </div>
                    <div className="row">
                        <CustomButton value="4" onClick={this.buttonClicked} inverted={this.showDay()}>4</CustomButton>
                        <CustomButton value="5" onClick={this.buttonClicked} inverted={this.showDay()}>5</CustomButton>
                        <CustomButton value="6" onClick={this.buttonClicked} inverted={this.showDay()}>6</CustomButton>
                        <CustomButton value="-" onClick={this.buttonClicked} operator inverted={this.showDay()} >-</CustomButton>
                    </div>
                    <div className="row">
                        <CustomButton value="7" onClick={this.buttonClicked} inverted={this.showDay()}>7</CustomButton>
                        <CustomButton value="8" onClick={this.buttonClicked} inverted={this.showDay()}>8</CustomButton>
                        <CustomButton value="9" onClick={this.buttonClicked} inverted={this.showDay()}>9</CustomButton>
                        <CustomButton value="*" onClick={this.buttonClicked} operator inverted={this.showDay()}>*</CustomButton>
                    </div>
                    <div className="row">
                        <CustomButton value="clear" onClick={this.onClear} operator inverted={this.showDay()}>AC</CustomButton>
                        <CustomButton value="0" onClick={this.buttonClicked} inverted={this.showDay()}>0</CustomButton>
                        <CustomButton value="=" onClick={this.buttonClicked} operator inverted={this.showDay()}>=</CustomButton>
                        <CustomButton value="/" onClick={this.buttonClicked} operator inverted={this.showDay()}>/</CustomButton>
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