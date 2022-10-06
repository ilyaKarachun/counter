type TsarType = ReturnType<typeof closeScreenAC> | ReturnType<typeof screenValueReducerAC> |
    ReturnType<typeof resetScreenValueAC> | ReturnType<typeof minValueAC> | ReturnType<typeof maxValueAC> |
    ReturnType<typeof setMaxMinValueAC>

export const closeScreenAC = (closeScreen: boolean) => ({
    type: "ClICK-ON-CLOSE-SCREEN",
    closeScreen
} as const)

export const screenValueReducerAC = (screenValue: number) => ({
    type: "SCREEN-VALUE",
    screenValue
} as const)

export const resetScreenValueAC = (minValue: number) => ({
    type: "RESET-SCREEN-VALUE",
    minValue
} as const)

export const minValueAC = (minValue: number) => ({
    type: "MIN-VALUE",
    minValue
} as const)

export const maxValueAC = (maxValue: number) => ({
    type: "MAX-VALUE",
    maxValue
} as const)

export const setMaxMinValueAC = (minValue: number) => ({
    type: "SET-MAX-MIN-VALUE",
    minValue
} as const)

type initialStateType = {
    minValue: number
    maxValue: number
    closeScreen: boolean
    screenValue: number
}

let initialState: initialStateType = {
    minValue: 0,
    maxValue: 5,
    closeScreen: true,
    screenValue: 0
}

export const counterReducer = (state: initialStateType = initialState, action: TsarType): initialStateType => {
    switch (action.type) {
        case "ClICK-ON-CLOSE-SCREEN": {
            return {...state, closeScreen: action.closeScreen}
        }
        case "SCREEN-VALUE": {
            return {...state, screenValue: action.screenValue + 1}
        }
        case "RESET-SCREEN-VALUE": {
            return {...state, screenValue: action.minValue}
        }
        case "MIN-VALUE": {
            return {...state, minValue: action.minValue}
        }
        case "MAX-VALUE": {
            return { ...state, maxValue: action.maxValue}
        }
        case "SET-MAX-MIN-VALUE": {
            return {...state, minValue: action.minValue, screenValue: action.minValue}
        }
        default:
            return state
    }
};