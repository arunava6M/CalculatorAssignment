import React from 'react';

import { ThemeContext } from '../../context/theme-context';
import Template from './template';


class Calculator extends React.Component {
    constructor() {
        super();
        this.state = {

            inputArray: [],
            history: [],
            lastElement: 0,
            equalLastClicked: false,
            rootLastFound: false,
            ui: 'light',
            scientific: false
        };
    }

    //frequently needed functions and variables
    reqVar = {
        lastInput: () => this.state.inputArray[this.state.inputArray.length - 1],
        triggerCalc: () => this.calc(this.state.inputArray[0], this.state.inputArray[1], this.state.inputArray[2]),
        storeInHistory: (num) => {
            if (num % 1 !== 0) {
                return num.toFixed(2)
            } else
                return num
        }
    }

    
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
    timeToggle = () => this.setState({
        ui: this.state.ui === 'light' ? 'dark' : 'light'
    })




    //to find the square root of two inputs
    findRoot = () => {
        const {inputArray,history}=this.state;
        const {  lastInput, storeInHistory } = this.reqVar;

        if (this.isNum(lastInput())) {     //to check if the last input is a number else do nothing
            const changedInput = Math.sqrt(lastInput());

            if (this.isNum(changedInput)) {
                this.setState({
                    lastElement: changedInput,
                    inputArray: [...inputArray.slice(0,inputArray.length-1), changedInput],
                    history: [...history.slice(0,history.length-1), storeInHistory(changedInput)],
                    rootLastFound: true
                });

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
        const {inputArray,history}=this.state;
        const { lastInput, storeInHistory } = this.reqVar;

        if (this.isNum(lastInput())) {           //to check if the last input is a number else do nothing
            const changedInput = lastInput() * lastInput();
            console.log(changedInput);
            this.setState({
                lastElement: changedInput,
                inputArray: [...inputArray.slice(0,inputArray.length-1), changedInput],
                history: [...history.slice(0,history.length-1), storeInHistory(changedInput)]
            })
        }
    }

    //to change a number from positive to negative and vice versa
    signChange = () => {
        const {inputArray,history}=this.state;
        const {  lastInput, storeInHistory } = this.reqVar;

        if (this.isNum(lastInput())) {           //to check if the last input is a number else do nothing
            const changedInput = -lastInput();         //ex: -8=>-(-8) || 8=>-8
            this.setState({
                lastElement: changedInput,
                inputArray: [...inputArray.slice(0,inputArray.length-1), changedInput],
                history: [...history.slice(0,history.length-1), storeInHistory(changedInput)]
            })
        }
    }

    //if input comes from the operand
    onOperandClick = e => {

        const numInput = parseInt(e.target.value);          //changing the typeof from string to number
        const { inputArray, history, equalLastClicked, rootLastFound } = this.state;
        const {  lastInput } = this.reqVar;

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
                    inputArray: [...inputArray.slice(0,inputArray.length-1), this.appendNumber(lastInput(), numInput)],
                    history: [...history.slice(0,history.length-1), this.appendNumber(lastInput(), numInput)],
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
        const { triggerCalc, storeInHistory } = this.reqVar;

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
                    rootLastFound: false
                }, console.log(this.state))
                    :
                    this.setState({
                        inputArray: [...inputArray, input],
                        history: [...history, input],
                        equalLastClicked: false,
                        rootLastFound: false
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
            rootLastFound: false
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
            <ThemeContext.Provider value={this.state.ui}>
                <Template access={this} />
            </ThemeContext.Provider>)




    }
};

export default Calculator;