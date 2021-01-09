import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  desc: '',
  min: '',
  sec: '',
}

const newTodoInputSlice = createSlice({
  name: 'newTodoInput',
  initialState: {
    newTodo: initialState
  },
  reducers: {
    setNewTask(state, action) {
      const [name, value] = action.payload
      state.newTodo = {...state.newTodo, [name]: value}
    },
    resetNewTask(state) {
      state.newTodo = initialState;
    }
  }
})
  
export default newTodoInputSlice.reducer
export const { setNewTask, resetNewTask } = newTodoInputSlice.actions