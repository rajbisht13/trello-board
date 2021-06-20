import React, { useState } from 'react'

export default function ListForm(props: any) {
  const { onSubmit } = props;
  const [formState, setFormState] = useState({});

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      ...formState,
      id: Date.now(),
    };
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
    <form onSubmit={handleSubmit}>
      <h4 className='text-center'>Add List</h4>
      <div className='padding-tb-16'>
        <label htmlFor='name'>Name</label>
        <input className='d-block' type='text' name='name' onChange={handleChange} required/>
      </div>
      <div className='text-center'>
        <button type='submit'>
          Add
        </button>
      </div>
    </form>
  )
}
