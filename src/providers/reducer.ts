import { combineReducers } from '@reduxjs/toolkit'
import { reducer as worksReducer } from 'src/entities/works'

export const rootReducer = combineReducers({
    worksReducer
})