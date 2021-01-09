import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { AppState } from '../../redux/index';
import { setNewTask, resetNewTask } from '../../redux/newTodoInput';
import {Input} from '../../components/Input';
import styled from 'styled-components';

type TodoInputProps = {
  addNewTask(desc: string, min: number, sec: number): void
}
export const TodoInput: React.FC<TodoInputProps> = ({addNewTask}) => {
  const newTask = useSelector((state: AppState) => state.newTodoInput.newTodo);
  const dispatch = useDispatch();


  const handlePressEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const {desc, min, sec} = newTask
      addNewTask(desc, +min, +sec)
      dispatch(resetNewTask())
    }
  }

  const inputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    dispatch(setNewTask([name, value]));
  };

  return (
    <>
      <Title>todos</Title>
      <Form className='new-todo-form'
        onKeyPress={handlePressEnter}
      >
        <Input 
          cls="new-todo"
          name="desc"
          placeHolder="Task"
          value={newTask.desc}
          onChange={inputChange}
        />
        <Input 
          cls="timer"
          name="min"
          type="number"
          placeHolder="Min"
          value={newTask.min}
          onChange={inputChange}
        />
        <Input 
          cls="timer"
          name="sec"
          type="number"
          placeHolder="Sec"
          value={newTask.sec}
          onChange={inputChange}
        />
      </Form>
    </>
  )
}

const Title = styled.h1`
  position: absolute;
  top: -140px;
  width: 100%;
  font-size: 80px;
  font-weight: 200;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
`

const Form = styled.form`
  display: flex;
  margin-bottom: 0;
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

`
