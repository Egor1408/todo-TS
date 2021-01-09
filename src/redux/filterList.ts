import {createSlice} from '@reduxjs/toolkit';

const filterListSlice = createSlice({
  name: 'filterList',
  initialState: {
    filterData: [
      { className: 'selected', description: 'All', id: 1 },
      { className: '', description: 'Active', id: 2 },
      { className: '', description: 'Completed', id: 3 },
    ],
    activeFilter: 'All'
  },
  reducers: {
    onFilterClick(state, action) {
      state.filterData = state.filterData.map((item) => {
        if (item.id === action.payload) {
          state.activeFilter = item.description
          item.className = 'selected'
        } else {
          item.className = ''
        }
        return item
      })
    }
  }
})

export default filterListSlice.reducer
export const {onFilterClick} = filterListSlice.actions