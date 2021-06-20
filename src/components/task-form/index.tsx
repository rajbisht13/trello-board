import React, { useState } from 'react'

export default function TaskForm(props: any) {
  const { onSubmit, listId } = props;
  const [formState, setFormState] = useState({});

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      ...formState,
      listId,
      id: Date.now(),
      createdAt: Date.now()
    }
    onSubmit(payload);
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h4 className='text-center'>Add Task</h4>
      <div className='padding-tb-16'>
        <label htmlFor="name">Name</label>
        <input className='d-block' type="text" name='name' required onChange={handleChange} />
      </div>
      <div className='padding-tb-16'>
        <label htmlFor="description">Description</label>
        <textarea className='d-block' required name='description' onChange={handleChange}/>
      </div>
      <div className='padding-tb-16 text-center'>
        <button type='submit'>
          Add
        </button>
      </div>
    </form>
  )
};
