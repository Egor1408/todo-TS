import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCompletedTasks} from '../../redux/todoList';
import {onFilterClick} from '../../redux/filterList';
import {AppState} from '../../redux/index';
import styled from 'styled-components';

type TodoFiltersProps = {
  doneCounter: number,
}
export const TodoFilters: React.FC<TodoFiltersProps> = ({
  doneCounter,
}) => {

  const filterData = useSelector((state: AppState) => state.filterList.filterData)
  const dispatch = useDispatch();

  const filter = filterData.map(item => {
    const {description, id} = item;
    return (
      <FilterItem key={id}>
        <FilterItemButton 
          onClick={() => {dispatch(onFilterClick(id))}}
        >
          {description}
        </FilterItemButton>
      </FilterItem>
    )
  })
  return (
    <FilterWrap>
        <TodoCount>
          {doneCounter} items left
        </TodoCount>
        <FilterList>
          {filter}
        </FilterList>
        <ClearCompletedButton
          onClick = {() => dispatch(deleteCompletedTasks())}
        >
          Clear completed
        </ClearCompletedButton>
    </FilterWrap>
  )
}

const FilterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  font-size: 15px;
  border-top: 1px solid #e6e6e6;
  color: gray;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 430px) {
    height: 50px;
    bottom: 10px;
}
`

const TodoCount = styled.span`
  text-align: left;

  & strong {
    font-weight: 300;
  }
`
const ClearCompletedButton = styled.button`
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const FilterList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  right: 0;
  left: 0;
`

const FilterItem = styled.li`
  display: inline;
  cursor: default;

  &:hover button {
    border-color: rgba(175, 47, 47, 0.1);
  }
`
const FilterItemButton = styled.button`
  display: inline-block;
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px; 

  &:not(.selected) {
    cursor: pointer;
  }

  &.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }
`