/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import nextId from 'react-id-generator';
import {useDispatch, useSelector} from 'react-redux';
import { AppState } from '../../redux/index';
import { ITodoData } from '../../interfaces';
import { TodoFilters } from '../TodoFilters/TodoFilters';
import { TodoInput } from '../TodoInput/TodoInput';
import { TodoList } from '../TodoList/TodoList';
import { addNewItem } from '../../redux/todoList';
import styled from 'styled-components'


const App: React.FC = () => {
  const todoData = useSelector((state: AppState) => state.todoList.todoData )
  const activeFilter = useSelector((state: AppState) => state.filterList.activeFilter )
  const dispatch = useDispatch();
  
  const addNewTask = (desc: string, min: number = 0, sec: number = 0) => {
    const newItem: ITodoData = {
      id: nextId(),
      description: desc,
      createTime: Date.now(),
      taskDone: false,
      taskEdit: false,
      timerMin: min,
      timerSec: sec,
    } 
    dispatch(addNewItem(newItem))
  };
  useEffect(() => {
    addNewTask('task1', 29, 5);
    addNewTask('task2', 0, 5);
    addNewTask('task3', 60);
  }, []);



  const doneCount = todoData.length - todoData.filter((el) => el.taskDone).length;
  return (
    <Wrapper>
      <TodoInput 
        addNewTask={addNewTask}
      />
      <TodoList 
        todoData={todoData}
        activeFilter={activeFilter}
      />
      <TodoFilters 
        doneCounter={doneCount}
      />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

  & input::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.4);
  }
`