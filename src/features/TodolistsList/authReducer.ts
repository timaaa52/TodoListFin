import { Dispatch } from 'redux'
import {
    SetAppErrorActionType,
    setAppIsInitializedAC, SetAppIsInitializedType,
    setAppStatusAC,
    SetAppStatusActionType
} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {clearTodosForLogoutAC} from "./todolists-reducer";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case "login/SET-IS-LOGGOUT":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsLoggOutAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGOUT', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            console.log(res.data)
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })


}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.logout()
        .then(res => {
            dispatch(setIsLoggOutAC(false))
            dispatch(setAppStatusAC("succeeded"))
            dispatch(clearTodosForLogoutAC())
        })
}

// types
type setIsLoggOutType = ReturnType<typeof setIsLoggOutAC>
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType | SetAppIsInitializedType | setIsLoggOutType