export interface ITodoData  {
  id: string,
  description: string,
  createTime: number,
  taskDone: boolean,
  taskEdit: boolean,
  timerMin: number,
  timerSec: number,
}

export interface IFilterData {
  className: string,
  description: string,
  id: number
}
