import {combineReducers, configureStore} from "@reduxjs/toolkit";
import todoListSlice from './todoList';
import filterListSlice from './filterList';
import newTodoInputSlice from './newTodoInput';

const rootReducer = combineReducers({
  todoList: todoListSlice,
  filterList: filterListSlice,
  newTodoInput: newTodoInputSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppState = ReturnType<typeof rootReducer>

