import React, {useEffect, useState} from 'react';
import './App.css';
import {Button} from "./Button/Button";
import {ScreenCounter} from "./screenCounter/ScreenCounter";
import {Input} from "./Input/Input";
import s from "./screenCounter/ScreenCounter.module.css"


function App() {
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(5)
    const [screenValue, setScreenValue] = useState(minValue)
    const [closeScreen, setCloseScreen] = useState(true)

    useEffect(() => {
        let minValueAsString = localStorage.getItem("minValue")
        let maxValueAsString = localStorage.getItem("maxValue")
        if(minValueAsString !== null && maxValueAsString !== null) {
            setMinValue(JSON.parse(minValueAsString))
            setMaxValue(JSON.parse(maxValueAsString))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("minValue", JSON.stringify(minValue))
        localStorage.setItem("maxValue", JSON.stringify(maxValue))
    }, [minValue, maxValue])

    const clickOnMinValue = (value: string) => {
        if (+value >= 0 && +value < 1000 && +value <= maxValue) {
            setMinValue(+value)
            setCloseScreen(true)
        }
    }

    const clickOnMaxValue = (value: string) => {
        if (+value >= 0 && +value < 1000 && +value >= minValue) {
            setMaxValue(+value)
            setCloseScreen(true)
        }
    }

    const incScreenValue = () => {
        if (screenValue < maxValue) {
            setScreenValue(screenValue + 1)
        }
    }

    const resetScreenValue = () => {
        setScreenValue(minValue)
    }

    const setMaxMinValue = () => {
        setScreenValue(minValue)
        setCloseScreen(false)
    }

    const incorrectValue = minValue === maxValue ? "incorrectValue" : ""

    const screenValueColor = maxValue === screenValue ? s.maxScreenValue : ""

    return (
        <div className="App">
            <div className="App-header">
                <div>
                    <ScreenCounter
                        incorrectValue={minValue === maxValue}
                        className={screenValueColor}
                        closeScreen={closeScreen}
                        value={screenValue}
                    />
                </div>
                <div>
                    <Button name={"inc"} disabled={closeScreen || screenValue === maxValue} callBack={incScreenValue}/>
                    <Button name={"reset"} disabled={closeScreen} callBack={resetScreenValue}/>
                </div>
            </div>
            <div className="App-header">
                <div className={"inputSetter"}>
                    <div>
                        <span>
                            Max value:
                        </span>
                        <Input className={incorrectValue} value={maxValue} callBack={clickOnMaxValue} type={"number"}/>
                    </div>
                    <div>
                        <span>
                            Min value:
                        </span>
                        <Input className={incorrectValue} value={minValue} type={"number"} callBack={clickOnMinValue}/>
                    </div>
                </div>
                <div>
                    <div>
                        <Button name={"set"} callBack={setMaxMinValue}
                                disabled={!closeScreen || (minValue === maxValue)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
