import React from 'react'
import { IList } from '../../interface';

import './list.css';

interface IListProps {
  list: IList,
  addTask(listId: number): void;
  removeList(listId: number): void;
  children: JSX.Element;
}

export default function List(props: IListProps) {
  const { list, addTask, removeList, children } = props;
  return (
    <div className='list'>
      <div className='list-header'>
        <h3>{list.name}</h3>
        <button onClick={() => removeList(list.id)}>X</button>
      </div>
      {children}
      <div className='list-footer'>
        <button onClick={() => addTask(list.id)}>Add Task</button>
      </div>
    </div>
  )
}
