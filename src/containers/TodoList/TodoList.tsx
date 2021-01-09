import React from 'react';
import {TodoListItem} from './TodoListItem/TodoListItem';
import {ITodoData} from '../../interfaces';
import styled from 'styled-components';


type TodoListProps = {
  todoData: ITodoData[],
  activeFilter: string,
}

export const TodoList: React.FC<TodoListProps> = ({
    todoData,
    activeFilter, 
  }) => {
  return (
    <TodoListWrap>
      <TodoListUl>
        {todoData.map(todo => (
            <TodoListItem 
              activeFilter={activeFilter}
              key={todo.id}
              todo={todo} 
            />
          )
        )}
      </TodoListUl>
    </TodoListWrap>
  )
}

const TodoListWrap = styled.div`
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
`

const TodoListUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`