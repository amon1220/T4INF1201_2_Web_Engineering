import React, { useState } from "react";
import DraggableWindow from "./draggableWindow.js";
import '../App.css';
import '98.css';

/**
 *  Just the basic UI button
 * @param OnOpen just determines the component thats called on in App.js to open the tab

 * @returns a button with an icon that registers if clicked, connected to Desktop.js
 */

export default function Calculator({ onMinimize, onClose }) {
    // States. Rerenders if something changes
    const [display, setDisplay] = useState("0");
    const [firstOperand, setFirstOperand] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [history, setHistory] = useState("");

    // handle input whether integer or decimal point is pressed
    function inputDigit(digit) {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === "0" ? digit : display + digit);
        }
    }
    // gets value from input and save them or compute operation with current first operant/value.
    function inputOperator(nextOperator) {
        const inputValue = parseFloat(display); // take current number and save it
        if (firstOperand === null) {
            setFirstOperand(inputValue);
            setHistory(display + " " + nextOperator);
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            setDisplay(String(result)); // show result on display
            setFirstOperand(result);
            setHistory((prev) => prev + " " + display + " " + nextOperator) // update history display
        }
        setOperator(nextOperator); // save clicked operator as new operator
        setWaitingForOperand(true); // number is needed in the next step, if no number was entered, then use last number
    }

    function calculate(a, b, operator) {
        switch (operator) {
            case "+": return a + b;
            case "-": return a - b;
            case "×": return a * b;
            case "/": return b === 0 ? "Error" : a / b;
            default: return b; // when no number was enterd, use last number
        }
    }

    function handleEquals() {
        if (operator && firstOperand !== null) {
            const result = calculate(firstOperand, parseFloat(display), operator);
            setDisplay(String(result));
            setHistory(history + " " + display + " =");
            setFirstOperand(null);
            setOperator(null);
            setWaitingForOperand(true);
        }
    }
    // Reset everything
    function handleClear() {
        setDisplay("0");
        setFirstOperand(null);
        setHistory("");
        setOperator(null);
        setWaitingForOperand(false);
    }
    // delete one digit
    function handleBack() {
        if (display.length === 1) {
            setDisplay("0");
        } else {
            setDisplay(display.slice(0, -1));
        }
    }
    // changes plus or minus to the other operator
    function handlePlusMinus() {
        if (display !== "0") {
            setDisplay(display.charAt(0) === "-" ? display.slice(1) : "-" + display);
        }
    }
    return (
        <DraggableWindow initialPosition={{ x: 200, y: 100 }} handleSelector=".title-bar">
            <div className="window"
                 style={{
                     position: "absolute", top: "30%", left: "50%"
                 }}>

                <div className="title-bar">
                    <div className="title-bar-text">Calculator</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" onClick={onMinimize}></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close" onClick={onClose}></button>
                    </div>
                </div>


                <div className="window-body" style={{
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column"
                }}>

                    {/*Display*/}
                    {/*show calculation path*/}
                    <div
                        style={{
                            width: "97%",
                            textAlign: "right",
                            color: "grey",
                            fontSize: 13,
                            minHeight: 18,
                            fontFamily: "monospace",
                        }}
                    >

                    {history}
                    </div>
                    {/*show current input*/}
                    <input
                        className="display"
                        type="text"
                        value={display}
                        readOnly
                        style={{
                            width: "98%",
                            marginBottom: 10,
                            fontSize: 15,
                            background: "white",
                            textAlign: "right"
                        }}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
                        <div></div>
                        <button className="button" onClick={handleBack} style={{ color: "darkred", fontWeight: "bold"}}>Back</button>
                        <button className="button" onClick={handleClear} style={{ color: "darkred", fontWeight: "bold"}}>C</button>
                        <button className="button" onClick={handlePlusMinus}>+/-</button>


                        <button className="button" onClick={ () => inputDigit("7")}>7</button>
                        <button className="button" onClick={ () => inputDigit("8")}>8</button>
                        <button className="button" onClick={ () => inputDigit("9")}>9</button>
                        <button className="button" onClick={ () => inputOperator("/")}>/</button>

                        <button className="button" onClick={ () => inputDigit("4")}>4</button>
                        <button className="button" onClick={ () => inputDigit("5")}>5</button>
                        <button className="button" onClick={ () => inputDigit("6")}>6</button>
                        <button className="button" onClick={ () => inputOperator("×")}>×</button>


                        <button className="button" onClick={ () => inputDigit("1")}>1</button>
                        <button className="button" onClick={ () => inputDigit("2")}>2</button>
                        <button className="button" onClick={ () => inputDigit("3")}>3</button>
                        <button className="button" onClick={ () => inputOperator("-")}>-</button>

                        <button className="button" onClick={() => inputDigit("0")}>0</button>
                        <button className="button" onClick={() => inputDigit(".")}>.</button>
                        <button className="button" onClick={handleEquals}>=</button>
                        <button className="button" onClick={ () => inputOperator("+")}>+</button>
                    </div>

                </div>


            </div>

        </DraggableWindow>
    );
}
