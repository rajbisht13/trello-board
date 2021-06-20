import React from 'react'
import { ITask } from '../../interface';

import './card.css';

interface ICardProps {
  task: ITask;
  removeTask(taskId: number): void;
}

export default function Card(props: ICardProps) {
  const { task, removeTask } = props;

  const handleDrag = (event: any) => {
    event.dataTransfer.setData('taskId', task.id);
  }

  return (
    <article className='card' draggable='true' onDragStart={handleDrag}>
      <div className='card-header'>
        <h4>{task.name}</h4>
        <button onClick={() => removeTask(task.id)}>X</button>
      </div>
      <div>
        {task.description}
      </div>
    </article>
  )
}
