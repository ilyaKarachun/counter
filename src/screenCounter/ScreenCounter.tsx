import React, {FC} from "react";
import s from "./ScreenCounter.module.css"

type ScreenCounterType = {
    value: number
    closeScreen: boolean
    className: string
    incorrectValue: boolean
}


export const ScreenCounter: FC<ScreenCounterType> = (props) => {
    return (
        <div className={'input'}>
            {
                props.closeScreen
                    ?
                    (props.incorrectValue ?<div className={s.incorrectValue}>incorrect value!</div> : <div className={s.screen}>enter values and press "set"</div>)
                    :
                    <div className={props.className}>{props.value}</div>
            }
        </div>
    )
}