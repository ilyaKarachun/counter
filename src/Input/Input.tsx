import {ChangeEvent, FC} from "react";

type InputType = {
    type: string
    value: number
    callBack: (value: string) => void
    className: string
}

export const Input: FC<InputType> = (props) => {
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.value)
    }

    const errorInput = props.value < 0  ? "errorInput" : "inputOutline"

    return (
        <input type={props.type}  className={ `${errorInput} ${props.className}` } value={props.value.toString()} onChange={onChangeInputHandler}/>
    )
}