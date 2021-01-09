import React from 'react';
import styled from 'styled-components';

type InputProps = {
  name: string
  type?: string
  cls: string
  value: string
  placeHolder: string
  onChange(event: React.FormEvent<HTMLInputElement>): void
}
export const Input: React.FC<InputProps> = ({
  name, type = 'text', cls, value, placeHolder,
  onChange,
}) => (
    <InputComponent
      className={cls} 
      name={name}
      type={type}
      placeholder={placeHolder}
      value={value}
      onChange={(event) => onChange(event)}
    />
)

const InputComponent = styled.input`
  position: relative;
  margin: 0;
  width: ${props => props.className === 'new-todo' ? '70%' : '15%'};
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 6px;
  padding-left: ${props => props.className === 'timer' && '16px'};
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`