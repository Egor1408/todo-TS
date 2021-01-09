/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react'
import {ITodoData} from '../../../interfaces';
import {onDoneClick, onEditClick, editingTask, deleteTask} from '../../../redux/todoList';
import {useDispatch} from 'react-redux';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './TodoListItem.css';
import styled from 'styled-components';

type TodoListItemProps = {
  todo: ITodoData
  activeFilter: string,
}
export const TodoListItem: React.FC<TodoListItemProps> = ({todo, activeFilter,
}) => {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState<string>(todo.description);
  const inputRef = useRef<any>(null);
  useEffect(() => {
    if(todo.taskEdit) {
      inputRef.current.focus();
    } else {
      dispatch(editingTask([todo.id, desc]))
    }
  }, [todo.taskEdit])

  const onLabelChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setDesc(event.currentTarget.value);
  };
  const handlePressEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch(editingTask([todo.id, desc]))
    }
  };
  const cls:Array<string> = ['list-item', `${activeFilter}-show`,];
  if (todo.taskDone) {
    cls.push('Completed')
  } else {
    cls.push('Active');
  }
  return (
    <ListItem 
      isEditing={todo.taskEdit}
      className={cls.join(' ')}>
      <ItemWrap isEditing={todo.taskEdit}>
          <input className='toggle' type="checkbox"
            checked={todo.taskDone}
            onChange={() => dispatch(onDoneClick(todo.id))}
          />
          <InputLabel>
              <TitleItem
                isDone={todo.taskDone}
                title={todo.description}
                onClick={() => dispatch(onDoneClick(todo.id))}
              >{todo.description}</TitleItem>
              <TimeCreated>Created {formatDistanceToNow(todo.createTime)}</TimeCreated>
          </InputLabel>
          {/* <Timer
            taskDone = {taskDone}
            timerMin = {timerMin}
            timerSec = {timerSec}
          /> */}
          <ButtonEdit
            isVisible={todo.taskDone}
            onClick={() => dispatch(onEditClick(todo.id))}
          />
          <ButtonDestroy
            onClick={() => dispatch(deleteTask(todo.id))}
          />
      </ItemWrap>
      <EditInput
        isEditing={todo.taskEdit}
        type="text"
        className="edit"
        placeholder="Editing task"
        ref={inputRef}
        value={desc}
        onBlur={() => {dispatch(editingTask([todo.id, desc]))}}
        onChange={onLabelChange}
        onKeyPress={handlePressEnter}
      />
    </ListItem>
  )
}

const ListItem = styled.li<{isEditing: boolean}>`
  position: relative;
  font-size: 24px;
  border-bottom: ${(props) => props.isEditing ? 'none' : '1px solid #ededed'};
  &:last-child {
    border-bottom: none;
  }

`
const ItemWrap = styled.div<{isEditing: boolean}>`
  display: ${(props) => props.isEditing && 'none'};
`
const InputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 85px 15px 60px;
`

const TimeCreated = styled.span`
  font-size: 13px;
  color: gray;
`

const TitleItem = styled.span<{isDone: boolean}>`
  word-break: break-all;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  font-weight: 400;
  cursor: pointer;
  color: ${(props) => props.isDone ? '#cdcdcd' : '#4d4d4d'};
  text-decoration: ${(props) => props.isDone && 'line-through'};
`

const EditInput = styled.input<{isEditing: boolean}>`
  position: relative;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: ${(props) => props.isEditing ? 'calc(100% - 53px)' : '100%'};
  margin: ${(props) => props.isEditing ? '0 0 0 43px' : '0'};
  padding: ${(props) => props.isEditing ? '12px 16px' : '6px'};
  display: ${(props) => props.isEditing ? 'block': 'none'};

  &:last-child {
    margin-bottom: -1px;
  }
`

const ButtonDestroy = styled.button`
  position: absolute;
  top: 0;
  bottom: -3px;
  width: 30px;
  height: 40px;
  font-size: 34px;
  color: #cc9a9a;
  margin: auto 0 11px;
  transition: color 0.2s ease-out;
  cursor: pointer;
  right: 10px;

  &:hover {
    color: #af5b5e;
  }

  &:after {
    content: "×";
  }
`

const ButtonEdit = styled(ButtonDestroy)<{isVisible: boolean}>`
  font-size: 19px;
  right: 45px;
  visibility: ${(props) => props.isVisible && 'hidden'};
  &:after {
    content: "✎";
  }
`