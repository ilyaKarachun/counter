import React, {useEffect, useState} from 'react';

export const LocalStorage = () => {

    const [value, setValue] = useState(0)

    useEffect(() => {
        let valueAsString = localStorage.getItem("counterValue")
        if (valueAsString) {
            let valueAsNumber = JSON.parse(valueAsString)
            setValue(valueAsNumber)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("counterValue", JSON.stringify(value))
    }, [value])

    const incHandler = () => {
        setValue(value + 1)
    }

    return (
        <div>
            <h1>Local Storage: {value}</h1>
            <button onClick={incHandler}>inc</button>
        </div>
    );
};
