import React, {useEffect} from 'react';
import './App.css';
import {Button} from "./Button/Button";
import {ScreenCounter} from "./screenCounter/ScreenCounter";
import {Input} from "./Input/Input";
import s from "./screenCounter/ScreenCounter.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStore} from "./redux/store";
import {
    closeScreenAC,
    maxValueAC,
    minValueAC,
    resetScreenValueAC,
    screenValueReducerAC,
    setMaxMinValueAC
} from "./redux/counterReducer";


function AppWithRedux() {
    const minValue = useSelector<AppRootStore, number>(state => state.state.minValue)
    const maxValue = useSelector<AppRootStore, number>(state => state.state.maxValue)
    const screenValue = useSelector<AppRootStore, number>(state => state.state.screenValue)
    const closeScreen = useSelector<AppRootStore, boolean>(state => state.state.closeScreen)

    const dispatch = useDispatch()

    useEffect(() => {
        let minValueAsString = localStorage.getItem("minValue")
        let maxValueAsString = localStorage.getItem("maxValue")
        if(minValueAsString !== null && maxValueAsString !== null) {
            // dispatchMinValueReducer(JSON.parse(minValueAsString))
            // dispatchMaxValueReducer(JSON.parse(maxValueAsString))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("minValue", JSON.stringify(minValue))
        localStorage.setItem("maxValue", JSON.stringify(maxValue))
    }, [minValue, maxValue])

    const incScreenValue = () => {
        if (screenValue < maxValue) {
            dispatch(screenValueReducerAC(screenValue))
        }
    }

    const resetScreenValue = () => {
        dispatch(resetScreenValueAC(minValue))
    }

    const clickOnMinValue = (value: string) => {
        if (+value >= 0 && +value < 1000 && +value <= maxValue) {
            dispatch(minValueAC(+value))
            dispatch(closeScreenAC(true))
        }
    }

    const clickOnMaxValue = (value: string) => {
        if (+value >= 0 && +value < 1000 && +value >= minValue) {
            dispatch(maxValueAC(+value))
            dispatch(closeScreenAC(true))
        }
    }

    const setMaxMinValue = () => {
        dispatch(setMaxMinValueAC(minValue))
        dispatch(closeScreenAC(false))

    }

    const incorrectValue = minValue === maxValue ? "incorrectValue" : "";

    const screenValueColor = maxValue === screenValue ? s.maxScreenValue : "";

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

export default AppWithRedux;
