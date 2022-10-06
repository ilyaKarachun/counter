import React, {FC} from 'react';

type ButtonType = {
    name: string
    callBack: () => void
    disabled: boolean
}

export const Button: FC<ButtonType> = (props) => {
    const buttonCallBackHandler = () => {
        props.callBack()
    }
    return (
        <button disabled={props.disabled} className={"button"} onClick={buttonCallBackHandler}>{props.name}</button>
    );
};
