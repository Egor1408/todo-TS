import {createSlice} from '@reduxjs/toolkit';
import {ITodoData} from '../interfaces';

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: {
    todoData: [] as ITodoData[],
  },
  reducers: {
    addNewItem(state, action) {
      state.todoData = [action.payload, ...state.todoData]
    },
    onDoneClick(state, action) {
      state.todoData = state.todoData.map((item) => {
        if (item.id === action.payload) {
          item.taskDone = !item.taskDone
        }
        return item
      })
    },
    onEditClick(state, action) {
      state.todoData = state.todoData.map((item) => {
        if (item.id === action.payload) {
          item.taskEdit = true;
        } else {
          item.taskEdit = false;
        }
        return item;
      })
    },
    editingTask(state, action) {
      const [id, text] = action.payload
      state.todoData = state.todoData.map((item) => {
        if (item.id === id) {
          item.description = text;
          item.taskEdit = false;
        }
        return item;
      })
    },
    deleteTask(state, action) {
      state.todoData = state.todoData.filter((item) => item.id !== action.payload);
    },
    deleteCompletedTasks(state) {
      state.todoData = state.todoData.filter((item) => !item.taskDone);
    }
  }
})

export default todoListSlice.reducer
export const {addNewItem, onDoneClick, onEditClick, editingTask, deleteTask, deleteCompletedTasks} = todoListSlice.actions
