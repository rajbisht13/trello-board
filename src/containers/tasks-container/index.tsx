import React from 'react'
import { Card } from '../../components';
import { ITask } from '../../interface';

import './tasks-container.css';

interface IPayload {
  listId: number;
  taskId: number;
}

interface ITasksContainerProps {
  listId: number;
  tasks: ITask[];
  moveTask(payload: IPayload): void;
  removeTask(taskId: number): void;  
}

export default function TasksContainer(props: ITasksContainerProps) {
  const { listId, tasks, moveTask, removeTask } = props;
  const filteredTask = tasks.filter((task: any) => task.listId === listId);
  const sortedTask = filteredTask.sort(
    (taskA: any, taskB: any) => Number(new Date(taskB.createdAt)) - Number(new Date(taskA.createdAt))
  );

  const handleDrop = (event: any) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('taskId');
    const payload = {
      listId,
      taskId: Number(taskId)
    }
    moveTask(payload);
  }

  const allowDrop = (event: any) => {
    event.preventDefault();
  }

  return (
    <section className='tasks-container' onDrop={handleDrop} onDragOver={allowDrop}>
      {sortedTask.map((task: any) => (
        <Card
          key={task.id}
          task={task}
          removeTask={removeTask}
        />
      ))}
    </section>
  )
}
